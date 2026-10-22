//#region node_modules/eventsource-parser/dist/errors.js
/**
* Error thrown when encountering an issue during parsing.
*
* @public
*/
var ParseError = class extends Error {
	constructor(message, options) {
		super(message);
		this.name = "ParseError";
		this.type = options.type;
		this.field = options.field;
		this.value = options.value;
		this.line = options.line;
	}
};
//#endregion
//#region node_modules/eventsource-parser/dist/parse.js
/**
* EventSource/Server-Sent Events parser
* @see https://html.spec.whatwg.org/multipage/server-sent-events.html
*/
var LF = 10;
var CR = 13;
var SPACE = 32;
var MAX_FIELD_PREFIX_LENGTH = 6;
/**
* Creates a new EventSource parser.
*
* @param config - Parser configuration. Accepts callbacks (see {@link ParserCallbacks})
*   and options like `maxBufferSize` (see {@link ParserConfig}).
*
* @returns A new EventSource parser, with `feed` and `reset` methods.
* @public
*/
function createParser(config) {
	if (typeof config === "function") throw new TypeError("`config` must be an object, got a function instead. Did you mean `createParser({onEvent: fn})`?");
	const { maxBufferSize, onComment, onError, onEvent, onId, onRetry } = config;
	const pendingFragments = [];
	let pendingFragmentsLength = 0;
	let bomPrefix = "";
	let id;
	let data = "";
	let dataLines = 0;
	let eventType;
	let terminated = false;
	let skippingLine = false;
	let skipNextLineFeed = false;
	/**
	* Feeds a chunk of the SSE stream to the parser. Any trailing bytes that do
	* not yet form a complete line are held back and prepended to the next chunk,
	* so callers can pass arbitrary slices of the stream without worrying about
	* line boundaries.
	*
	* Per the SSE spec, one leading UTF-8 BOM is stripped before parsing,
	* even when split across chunks. This handles both the raw 3-byte form (0xEF 0xBB
	* 0xBF) and a single decoded U+FEFF, so a leading BOM is ignored regardless of
	* how the caller decoded the bytes.
	*
	* @see https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream
	*/
	function feed(chunk) {
		if (terminated) throw new Error("Cannot feed parser: it was terminated after exceeding the configured max buffer size. Call `reset()` to resume parsing.");
		if (bomPrefix !== void 0) {
			chunk = bomPrefix + chunk;
			if (chunk === "" || chunk === "ï" || chunk === "ï»") {
				bomPrefix = chunk;
				return;
			}
			bomPrefix = void 0;
			chunk = chunk.replace(/^(?:\uFEFF|\xEF\xBB\xBF)/, "");
		}
		if (skippingLine || skipNextLineFeed) {
			chunk = resumeAfterSkip(chunk);
			if (!chunk) return;
		}
		if (!pendingFragments.length) {
			const trailing = processLines(chunk);
			if (trailing !== "") storeTrailing(trailing);
			checkForBufferOverflow();
			return;
		}
		if (chunk.indexOf("\n") === -1 && chunk.indexOf("\r") === -1) {
			if (pendingFragmentsLength < MAX_FIELD_PREFIX_LENGTH) {
				if (!shouldBufferTrailing(pendingFragments.join("") + chunk.slice(0, MAX_FIELD_PREFIX_LENGTH - pendingFragmentsLength))) {
					pendingFragments.length = 0;
					pendingFragmentsLength = 0;
					skippingLine = true;
					return;
				}
			}
			pendingFragments.push(chunk);
			pendingFragmentsLength += chunk.length;
			checkForBufferOverflow();
			return;
		}
		pendingFragments.push(chunk);
		const input = pendingFragments.join("");
		pendingFragments.length = 0;
		pendingFragmentsLength = 0;
		storeTrailing(processLines(input));
		checkForBufferOverflow();
	}
	function resumeAfterSkip(chunk) {
		if (chunk.length === 0) return chunk;
		if (skipNextLineFeed) {
			skipNextLineFeed = false;
			return chunk.charCodeAt(0) === LF ? chunk.slice(1) : chunk;
		}
		const crIndex = chunk.indexOf("\r");
		const lfIndex = chunk.indexOf("\n");
		const lineEnd = crIndex === -1 ? lfIndex : lfIndex === -1 ? crIndex : crIndex < lfIndex ? crIndex : lfIndex;
		if (lineEnd === -1) return "";
		if (lineEnd === chunk.length - 1 && chunk.charCodeAt(lineEnd) === CR) {
			skippingLine = false;
			skipNextLineFeed = true;
			return "";
		}
		skippingLine = false;
		return chunk.slice(lineEnd + (chunk.charCodeAt(lineEnd) === CR && chunk.charCodeAt(lineEnd + 1) === LF ? 2 : 1));
	}
	function storeTrailing(trailing) {
		if (!trailing) return;
		if (trailing.charCodeAt(trailing.length - 1) === CR) {
			parseLine(trailing, 0, trailing.length - 1);
			if (checkForBufferOverflow()) return;
			skipNextLineFeed = true;
			return;
		}
		if (shouldBufferTrailing(trailing)) {
			pendingFragments.push(trailing);
			pendingFragmentsLength = trailing.length;
			return;
		}
		skippingLine = true;
	}
	function shouldBufferTrailing(trailing) {
		const firstCharCode = trailing.charCodeAt(0);
		return firstCharCode === 58 && !!onComment || firstCharCode === 100 && isPotentialField(trailing, "data") || firstCharCode === 101 && isPotentialField(trailing, "event") || firstCharCode === 105 && isPotentialField(trailing, "id") || firstCharCode === 114 && isPotentialField(trailing, "retry");
	}
	function checkForBufferOverflow() {
		if (terminated) return true;
		if (maxBufferSize === void 0) return false;
		if (pendingFragmentsLength + data.length <= maxBufferSize) return false;
		terminated = true;
		pendingFragments.length = 0;
		pendingFragmentsLength = 0;
		id = void 0;
		data = "";
		dataLines = 0;
		eventType = void 0;
		skippingLine = false;
		skipNextLineFeed = false;
		onError === null || onError === void 0 || onError(new ParseError(`Buffered data exceeded max buffer size of ${maxBufferSize} characters`, { type: "max-buffer-size-exceeded" }));
		return true;
	}
	/**
	* Splits `chunk` into SSE lines and dispatches each to the appropriate handler.
	* Returns any trailing bytes that did not terminate with a line break, so the
	* caller can prepend them to the next chunk.
	*
	* The SSE spec permits three line terminators: `\n`, `\r`, and `\r\n`. Real-world
	* streams almost always use plain `\n`, so we take a fast path when no `\r` is
	* present in the chunk. The slow path is spec-correct but does more work per line.
	*/
	function processLines(chunk) {
		let searchIndex = 0;
		if (chunk.indexOf("\r") === -1) {
			let lfIndex = chunk.indexOf("\n", searchIndex);
			while (lfIndex !== -1) {
				if (searchIndex === lfIndex) {
					if (id !== void 0) onId === null || onId === void 0 || onId(id);
					if (dataLines > 0) onEvent === null || onEvent === void 0 || onEvent({
						id,
						event: eventType,
						data
					});
					id = void 0;
					data = "";
					dataLines = 0;
					eventType = void 0;
					searchIndex = lfIndex + 1;
					lfIndex = chunk.indexOf("\n", searchIndex);
					continue;
				}
				const firstCharCode = chunk.charCodeAt(searchIndex);
				if (isDataPrefix(chunk, searchIndex, firstCharCode)) {
					const valueStart = chunk.charCodeAt(searchIndex + 5) === SPACE ? searchIndex + 6 : searchIndex + 5;
					const value = chunk.slice(valueStart, lfIndex);
					if (dataLines === 0 && chunk.charCodeAt(lfIndex + 1) === LF) {
						if (id !== void 0) onId === null || onId === void 0 || onId(id);
						onEvent === null || onEvent === void 0 || onEvent({
							id,
							event: eventType,
							data: value
						});
						id = void 0;
						data = "";
						eventType = void 0;
						searchIndex = lfIndex + 2;
						lfIndex = chunk.indexOf("\n", searchIndex);
						continue;
					}
					data = dataLines === 0 ? value : `${data}\n${value}`;
					dataLines++;
				} else if (isEventPrefix(chunk, searchIndex, firstCharCode)) eventType = chunk.slice(chunk.charCodeAt(searchIndex + 6) === SPACE ? searchIndex + 7 : searchIndex + 6, lfIndex) || void 0;
				else parseLine(chunk, searchIndex, lfIndex);
				if (checkForBufferOverflow()) return "";
				searchIndex = lfIndex + 1;
				lfIndex = chunk.indexOf("\n", searchIndex);
			}
			return chunk.slice(searchIndex);
		}
		while (searchIndex < chunk.length) {
			const crIndex = chunk.indexOf("\r", searchIndex);
			const lfIndex = chunk.indexOf("\n", searchIndex);
			let lineEnd = -1;
			if (crIndex !== -1 && lfIndex !== -1) lineEnd = crIndex < lfIndex ? crIndex : lfIndex;
			else if (crIndex !== -1) if (crIndex === chunk.length - 1) lineEnd = -1;
			else lineEnd = crIndex;
			else if (lfIndex !== -1) lineEnd = lfIndex;
			if (lineEnd === -1) break;
			parseLine(chunk, searchIndex, lineEnd);
			if (checkForBufferOverflow()) return "";
			searchIndex = lineEnd + 1;
			if (chunk.charCodeAt(searchIndex - 1) === CR && chunk.charCodeAt(searchIndex) === LF) searchIndex++;
		}
		return chunk.slice(searchIndex);
	}
	function parseLine(chunk, start, end) {
		if (start === end) {
			dispatchEvent();
			return;
		}
		const firstCharCode = chunk.charCodeAt(start);
		if (isDataPrefix(chunk, start, firstCharCode)) {
			const valueStart = chunk.charCodeAt(start + 5) === SPACE ? start + 6 : start + 5;
			const value = chunk.slice(valueStart, end);
			data = dataLines === 0 ? value : `${data}\n${value}`;
			dataLines++;
			return;
		}
		if (isEventPrefix(chunk, start, firstCharCode)) {
			eventType = chunk.slice(chunk.charCodeAt(start + 6) === SPACE ? start + 7 : start + 6, end) || void 0;
			return;
		}
		if (firstCharCode === 105 && chunk.charCodeAt(start + 1) === 100 && chunk.charCodeAt(start + 2) === 58) {
			const value = chunk.slice(chunk.charCodeAt(start + 3) === SPACE ? start + 4 : start + 3, end);
			if (!value.includes("\0")) id = value;
			return;
		}
		if (firstCharCode === 58) {
			if (onComment) {
				const line = chunk.slice(start, end);
				onComment(line.slice(chunk.charCodeAt(start + 1) === SPACE ? 2 : 1));
			}
			return;
		}
		const line = chunk.slice(start, end);
		const fieldSeparatorIndex = line.indexOf(":");
		if (fieldSeparatorIndex === -1) {
			processField(line, "", line);
			return;
		}
		const field = line.slice(0, fieldSeparatorIndex);
		const offset = line.charCodeAt(fieldSeparatorIndex + 1) === SPACE ? 2 : 1;
		processField(field, line.slice(fieldSeparatorIndex + offset), line);
	}
	function processField(field, value, line) {
		switch (field) {
			case "event":
				eventType = value || void 0;
				break;
			case "data":
				data = dataLines === 0 ? value : `${data}\n${value}`;
				dataLines++;
				break;
			case "id":
				if (!value.includes("\0")) id = value;
				break;
			case "retry":
				if (/^\d+$/.test(value)) onRetry === null || onRetry === void 0 || onRetry(parseInt(value, 10));
				else onError === null || onError === void 0 || onError(new ParseError(`Invalid \`retry\` value: "${value}"`, {
					type: "invalid-retry",
					value,
					line
				}));
				break;
			default: onError === null || onError === void 0 || onError(new ParseError(`Unknown field "${field.length > 20 ? `${field.slice(0, 20)}…` : field}"`, {
				type: "unknown-field",
				field,
				value,
				line
			}));
		}
	}
	function dispatchEvent() {
		if (id !== void 0) onId === null || onId === void 0 || onId(id);
		if (dataLines > 0) onEvent === null || onEvent === void 0 || onEvent({
			id,
			event: eventType,
			data
		});
		id = void 0;
		data = "";
		dataLines = 0;
		eventType = void 0;
	}
	function reset(options = {}) {
		if (options.consume && pendingFragments.length > 0) {
			const incompleteLine = pendingFragments.join("");
			parseLine(incompleteLine, 0, incompleteLine.length);
		}
		bomPrefix = "";
		id = void 0;
		data = "";
		dataLines = 0;
		eventType = void 0;
		pendingFragments.length = 0;
		pendingFragmentsLength = 0;
		terminated = false;
		skippingLine = false;
		skipNextLineFeed = false;
	}
	return {
		feed,
		reset
	};
}
/**
* Checks if `chunk` starts with the literal `data:` at index `i`.
*
* Equivalent to `chunk.startsWith('data:', i)`, but benchmarks show this
* hand-unrolled char-code comparison is ~20% faster on common event types.
* The caller passes `firstCharCode` (the code at `i`) so it can be reused
* across prefix checks.
*
* ASCII: 'd' = 100, 'a' = 97, 't' = 116, 'a' = 97, ':' = 58
*/
function isDataPrefix(chunk, i, firstCharCode) {
	return firstCharCode === 100 && chunk.charCodeAt(i + 1) === 97 && chunk.charCodeAt(i + 2) === 116 && chunk.charCodeAt(i + 3) === 97 && chunk.charCodeAt(i + 4) === 58;
}
/**
* Checks if `chunk` starts with the literal `event:` at index `i`.
*
* See {@link isDataPrefix} for why this is hand-unrolled rather than using
* `String.prototype.startsWith`.
*
* ASCII: 'e' = 101, 'v' = 118, 'e' = 101, 'n' = 110, 't' = 116, ':' = 58
*/
function isEventPrefix(chunk, i, firstCharCode) {
	return firstCharCode === 101 && chunk.charCodeAt(i + 1) === 118 && chunk.charCodeAt(i + 2) === 101 && chunk.charCodeAt(i + 3) === 110 && chunk.charCodeAt(i + 4) === 116 && chunk.charCodeAt(i + 5) === 58;
}
function isPotentialField(line, field) {
	let i = 1;
	while (i < line.length && i < field.length) {
		if (line.charCodeAt(i) !== field.charCodeAt(i)) return false;
		i++;
	}
	return line.length <= field.length || line.charCodeAt(field.length) === 58;
}
//#endregion
export { createParser as t };
