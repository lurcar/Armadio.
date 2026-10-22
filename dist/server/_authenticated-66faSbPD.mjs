import { r as __toESM } from "./_runtime.mjs";
import { _ as require_react_dom, b as require_react, y as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as supabase } from "./_ssr/client-DPL8uosI.mjs";
import { r as useQueryClient, t as useQuery } from "./_libs/tanstack__react-query.mjs";
import { a as useItems, i as useImageUrls, n as categoryLabel, t as CATEGORIES } from "./_ssr/wardrobe-BndUKBIx.mjs";
import { r as cn, t as Button } from "./_ssr/button-CCQEfgNs.mjs";
import { C as CloudSun, S as Cloud, T as Check, _ as LoaderCircle, b as Heart, d as Search, f as RotateCcw, g as MapPin, i as WandSparkles, l as Snowflake, n as Wind, o as Trash2, p as Plus, s as Sun, t as X, w as CloudRain, y as ImagePlus } from "./_libs/lucide-react.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, t as Dialog } from "./_ssr/dialog-aeX1A5Qu.mjs";
import { t as Input } from "./_ssr/input-DoD5W07l.mjs";
import { n as useProfile } from "./_ssr/AppShell-Cu-94L5r.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as AlertDialogTrigger, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./_ssr/alert-dialog-BxSmFKrL.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as createParser } from "./_libs/eventsource-parser.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-66faSbPD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
async function streamImage(endpoint, input, onFrame, signal, headers) {
	const send = (stream) => {
		signal?.throwIfAborted();
		const requestHeaders = new Headers(headers);
		let body;
		if (input instanceof FormData) {
			const form = new FormData();
			input.forEach((value, name) => form.append(name, value));
			form.set("stream", String(stream));
			if (!stream) form.delete("partial_images");
			body = form;
			requestHeaders.delete("Content-Type");
		} else {
			const payload = {
				...input,
				stream
			};
			if (!stream) delete payload["partial_images"];
			body = JSON.stringify(payload);
			requestHeaders.set("Content-Type", "application/json");
		}
		return fetch(endpoint, {
			method: "POST",
			headers: requestHeaders,
			body,
			signal: signal ?? null
		});
	};
	const res = await send(true);
	if (!res.ok || !res.body) throw new Error(`Image generation failed: ${res.status} ${await res.text().catch(() => "")}`);
	let sawCompleted = false;
	let sawAnyEvent = false;
	let streamError;
	const parser = createParser({ onEvent(event) {
		let payload;
		try {
			payload = JSON.parse(event.data);
		} catch {
			payload = void 0;
		}
		if (event.event === "error" || payload?.type === "error") {
			sawAnyEvent = true;
			streamError = payload?.error?.message ?? "Image generation failed";
			return;
		}
		const type = event.event || payload?.type;
		if (type !== "image_generation.partial_image" && type !== "image_generation.completed" && type !== "image_edit.partial_image" && type !== "image_edit.completed") return;
		sawAnyEvent = true;
		if (!payload?.b64_json) {
			streamError = "Image event contained no image";
			return;
		}
		const b64 = payload.b64_json;
		const isFinal = type === "image_generation.completed" || type === "image_edit.completed";
		(0, import_react_dom.flushSync)(() => onFrame(`data:image/png;base64,${b64}`, isFinal));
		if (isFinal) sawCompleted = true;
	} });
	const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
	try {
		while (true) {
			let chunk;
			try {
				chunk = await reader.read();
			} catch (error) {
				if (signal?.aborted || sawAnyEvent || error instanceof Error && error.name === "AbortError") throw error;
				break;
			}
			if (chunk.done) break;
			parser.feed(chunk.value);
		}
	} finally {
		await reader.cancel().catch(() => {});
	}
	signal?.throwIfAborted();
	if (streamError) throw new Error(streamError);
	if (!sawAnyEvent) {
		const replay = await send(false);
		if (!replay.ok) throw new Error(`Image generation failed: ${replay.status} ${await replay.text().catch(() => "")}`);
		const b64 = (await replay.json()).data?.[0]?.b64_json;
		if (!b64) throw new Error("Image generation returned no image");
		onFrame(`data:image/png;base64,${b64}`, true);
		return;
	}
	if (!sawCompleted) throw new Error("Image stream ended without a completed event");
}
async function resizeImage(file, max = 1536) {
	const bmp = await createImageBitmap(file);
	const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(bmp.width * scale);
	canvas.height = Math.round(bmp.height * scale);
	canvas.getContext("2d").drawImage(bmp, 0, 0, canvas.width, canvas.height);
	return new Promise((res, rej) => canvas.toBlob((b) => b ? res(b) : rej(/* @__PURE__ */ new Error("resize")), "image/jpeg", .9));
}
async function removeDarkBorder(src) {
	const image = new Image();
	image.src = src;
	await image.decode();
	const canvas = document.createElement("canvas");
	canvas.width = image.naturalWidth;
	canvas.height = image.naturalHeight;
	const context = canvas.getContext("2d");
	if (!context) return src;
	context.drawImage(image, 0, 0);
	const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
	const { data, width, height } = pixels;
	const queue = [];
	const visited = new Uint8Array(width * height);
	const isDark = (index) => data[index * 4 + 3] > 0 && data[index * 4] < 55 && data[index * 4 + 1] < 55 && data[index * 4 + 2] < 55;
	const add = (x, y) => {
		const index = y * width + x;
		if (!visited[index] && isDark(index)) {
			visited[index] = 1;
			queue.push(index);
		}
	};
	for (let x = 0; x < width; x++) {
		add(x, 0);
		add(x, height - 1);
	}
	for (let y = 1; y < height - 1; y++) {
		add(0, y);
		add(width - 1, y);
	}
	for (let cursor = 0; cursor < queue.length; cursor++) {
		const index = queue[cursor];
		data[index * 4 + 3] = 0;
		const x = index % width;
		const y = Math.floor(index / width);
		if (x > 0) add(x - 1, y);
		if (x < width - 1) add(x + 1, y);
		if (y > 0) add(x, y - 1);
		if (y < height - 1) add(x, y + 1);
	}
	context.putImageData(pixels, 0, 0);
	return canvas.toDataURL("image/png");
}
function AddItemDialog({ open, onOpenChange, defaultCategory }) {
	const qc = useQueryClient();
	const [drafts, setDrafts] = (0, import_react.useState)([]);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [savingAll, setSavingAll] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const active = drafts.find((d) => d.id === activeId) ?? null;
	(0, import_react.useEffect)(() => {
		if (open) {
			setDrafts([]);
			setActiveId(null);
			setSavingAll(false);
		}
	}, [open]);
	function addFiles(files) {
		const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
		if (arr.length === 0) return;
		const newDrafts = arr.map((file) => ({
			id: crypto.randomUUID(),
			file,
			preview: URL.createObjectURL(file),
			aiImage: null,
			aiFinal: false,
			useAi: true,
			generating: false,
			category: defaultCategory ?? "maglie",
			name: "",
			brand: "",
			color: "",
			style: "",
			saved: false
		}));
		setDrafts((prev) => [...prev, ...newDrafts]);
		setActiveId(newDrafts[0].id);
		processNewDrafts(newDrafts);
	}
	async function processNewDrafts(newDrafts) {
		for (const draft of newDrafts) await makeCatalogPhoto(draft);
	}
	function removeDraft(id) {
		setDrafts((prev) => {
			const d = prev.find((x) => x.id === id);
			if (d) URL.revokeObjectURL(d.preview);
			const next = prev.filter((x) => x.id !== id);
			if (activeId === id) setActiveId(next[0]?.id ?? null);
			return next;
		});
	}
	function updateDraft(id, patch) {
		setDrafts((prev) => prev.map((d) => d.id === id ? {
			...d,
			...patch
		} : d));
	}
	async function makeCatalogPhoto(draft) {
		updateDraft(draft.id, {
			generating: true,
			aiFinal: false
		});
		try {
			const { data } = await supabase.auth.getSession();
			const form = new FormData();
			form.append("image", await resizeImage(draft.file), "capo.jpg");
			form.append("name", draft.name.trim());
			form.append("brand", draft.brand.trim());
			form.append("category", draft.category);
			let latestImage = "";
			await streamImage("/api/clean-image", form, (src, isFinal) => {
				latestImage = src;
				updateDraft(draft.id, {
					aiImage: src,
					aiFinal: isFinal
				});
			}, void 0, { Authorization: `Bearer ${data.session?.access_token ?? ""}` });
			const cleanedImage = latestImage ? await removeDarkBorder(latestImage) : null;
			updateDraft(draft.id, {
				aiImage: cleanedImage,
				aiFinal: !!cleanedImage,
				useAi: !!cleanedImage
			});
		} catch (err) {
			console.error(err);
			updateDraft(draft.id, {
				aiImage: null,
				aiFinal: false
			});
			const msg = err instanceof Error ? err.message : "";
			toast.error(msg.includes("402") ? "Crediti AI esauriti" : msg.includes("429") ? "Troppe richieste, riprova tra poco" : "Non sono riuscito a creare la foto, puoi usare l'originale");
		} finally {
			updateDraft(draft.id, { generating: false });
		}
	}
	async function saveDraft(draft) {
		if (!draft.name.trim()) return false;
		try {
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) throw new Error("Non sei collegato");
			const useCatalog = draft.useAi && draft.aiFinal && draft.aiImage;
			const body = useCatalog ? await (await fetch(draft.aiImage)).blob() : await resizeImage(draft.file, 1600);
			const ext = useCatalog ? "png" : "jpg";
			const path = `${u.user.id}/${crypto.randomUUID()}.${ext}`;
			const up = await supabase.storage.from("wardrobe").upload(path, body, { contentType: useCatalog ? "image/png" : "image/jpeg" });
			if (up.error) throw up.error;
			const { error } = await supabase.from("items").insert({
				name: draft.name.trim().slice(0, 80),
				brand: draft.brand.trim().slice(0, 40) || null,
				category: draft.category,
				color: draft.color.trim().slice(0, 40) || null,
				style: draft.style.trim().slice(0, 40) || null,
				image_path: path
			});
			if (error) {
				await supabase.storage.from("wardrobe").remove([path]);
				throw error;
			}
			updateDraft(draft.id, { saved: true });
			return true;
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Errore nel salvataggio");
			return false;
		}
	}
	async function saveAll() {
		const unsaved = drafts.filter((d) => !d.saved);
		const invalid = unsaved.filter((d) => !d.name.trim());
		if (invalid.length > 0) {
			toast.error(`${invalid.length} capi senza nome`);
			setActiveId(invalid[0].id);
			return;
		}
		setSavingAll(true);
		let ok = 0;
		for (const d of unsaved) if (await saveDraft(d)) ok++;
		setSavingAll(false);
		if (ok > 0) {
			toast.success(`${ok} capi aggiunti al guardaroba`);
			qc.invalidateQueries({ queryKey: ["items"] });
		}
		if (ok === unsaved.length) onOpenChange(false);
	}
	const shown = active ? active.useAi && active.aiImage ? active.aiImage : active.preview : null;
	const unsavedCount = drafts.filter((d) => !d.saved).length;
	const processing = drafts.some((draft) => draft.generating);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !savingAll && onOpenChange(o),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[92vh] overflow-y-auto rounded-3xl sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-xl font-extrabold",
				children: "Aggiungi vestiti"
			}) }), drafts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center text-surface-foreground/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "mx-auto h-10 w-10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-bold",
								children: "Tocca per scegliere le foto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Puoi selezionare più articoli insieme"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						multiple: true,
						className: "hidden",
						onChange: (e) => {
							if (e.target.files) addFiles(e.target.files);
							e.target.value = "";
						}
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 overflow-x-auto pb-1",
						children: [
							drafts.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveId(d.id),
								className: cn("relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 bg-surface", activeId === d.id ? "border-primary" : "border-border"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: d.useAi && d.aiImage ? d.aiImage : d.preview,
										alt: "",
										className: "h-full w-full object-cover"
									}),
									d.saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute inset-0 flex items-center justify-center bg-primary/80",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5 text-primary-foreground" })
									}),
									!d.saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										role: "button",
										tabIndex: 0,
										onClick: (e) => {
											e.stopPropagation();
											removeDraft(d.id);
										},
										onKeyDown: (e) => {
											if (e.key === "Enter") {
												e.stopPropagation();
												removeDraft(d.id);
											}
										},
										className: "absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/80 text-background",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
									})
								]
							}, d.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => fileRef.current?.click(),
								className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-border text-muted-foreground",
								"aria-label": "Aggiungi altre foto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/*",
								multiple: true,
								className: "hidden",
								onChange: (e) => {
									if (e.target.files) addFiles(e.target.files);
									e.target.value = "";
								}
							})
						]
					}),
					active && !active.saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => updateDraft(active.id, { category: c.value }),
									className: cn("rounded-full border px-3 py-1.5 text-sm font-bold", active.category === c.value ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground"),
									children: c.label
								}, c.value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Nome (es. Felpa grigia oversize)",
								value: active.name,
								onChange: (e) => updateDraft(active.id, { name: e.target.value }),
								maxLength: 80,
								className: "h-11 rounded-full px-5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Marchio (es. Nike, Zara…)",
								value: active.brand,
								onChange: (e) => updateDraft(active.id, { brand: e.target.value }),
								maxLength: 40,
								className: "h-11 rounded-full px-5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-border bg-surface",
								children: [
									shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: shown,
										alt: "Anteprima",
										className: cn("h-full w-full object-contain p-4 transition-[filter] duration-500", active.useAi && active.aiImage && !active.aiFinal ? "blur-2xl" : "blur-0")
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-surface-foreground/60",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "mx-auto h-8 w-8" })
									}),
									active.generating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground",
										children: "Creo la foto da catalogo…"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
										className: "hidden",
										disabled: active.generating,
										onChange: (e) => {
											if (e.target.files?.[0]) {
												const f = e.target.files[0];
												URL.revokeObjectURL(active.preview);
												updateDraft(active.id, {
													file: f,
													preview: URL.createObjectURL(f),
													aiImage: null,
													aiFinal: false
												});
											}
											e.target.value = "";
										}
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "La foto viene ripulita automaticamente con AI: sfondo uniforme, bordi rifiniti e capo centrato. Puoi comunque usare l’originale se preferisci."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: !active.aiImage || !active.aiFinal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									onClick: () => makeCatalogPhoto(active),
									disabled: active.generating,
									className: "h-11 flex-1 rounded-full font-bold",
									children: active.generating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1 h-4 w-4 animate-spin" }), " Attendi…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "mr-1 h-4 w-4" }), " Crea foto da catalogo con AI"] })
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-1 rounded-full bg-secondary p-1",
									children: [true, false].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => updateDraft(active.id, { useAi: v }),
										className: cn("flex-1 rounded-full py-2 text-sm font-bold", active.useAi === v ? "bg-primary text-primary-foreground" : "text-secondary-foreground"),
										children: v ? "Foto AI" : "Originale"
									}, String(v)))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => makeCatalogPhoto(active),
									className: "h-11 rounded-full font-bold",
									"aria-label": "Rifai foto AI",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" })
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Colore",
									value: active.color,
									onChange: (e) => updateDraft(active.id, { color: e.target.value }),
									maxLength: 40,
									className: "h-11 rounded-full px-5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Stile (es. casual)",
									value: active.style,
									onChange: (e) => updateDraft(active.id, { style: e.target.value }),
									maxLength: 40,
									className: "h-11 rounded-full px-5"
								})]
							})
						]
					}),
					active?.saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-3 rounded-3xl bg-secondary p-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-10 w-10 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-foreground",
							children: "Capo salvato nel guardaroba"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: saveAll,
						disabled: savingAll || processing || unsavedCount === 0,
						className: "h-12 w-full rounded-full text-base font-bold",
						children: savingAll ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1 h-5 w-5 animate-spin" }), " Salvataggio…"] }) : processing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1 h-5 w-5 animate-spin" }), " Pulizia foto…"] }) : unsavedCount > 1 ? `Salva ${unsavedCount} capi` : unsavedCount === 1 ? "Salva capo" : "Chiudi"
					})
				]
			})]
		})
	});
}
var FALLBACK = {
	lat: 45.4642,
	lon: 9.19,
	label: "Milano"
};
var KEY = "armadio-coords";
function jacketAdvice(feels, min) {
	const t = Math.min(feels, min + 2);
	if (t >= 22) return "none";
	if (t >= 15) return "light";
	if (t >= 8) return "medium";
	return "heavy";
}
var pick = (arr, seed) => arr[seed % arr.length];
function phrases(name, advice, rain, seed) {
	const n = name || "campione";
	const byAdvice = {
		none: [
			`Oggi niente giubbotto, ${n}: lascia parlare la maglia.`,
			`Fa caldo, ${n}. Giubbotto a casa e stile in prima fila.`,
			`Giornata da maniche corte, ${n}. Il sole ti sta bene.`
		],
		light: [
			`Un giubbotto leggero e sei pronto a conquistare la giornata, ${n}.`,
			`Fresco quanto basta, ${n}: strato leggero e via.`,
			`${n}, porta un giubbottino leggero: elegante e mai sudato.`
		],
		medium: [
			`Oggi serve un giubbotto vero, ${n}: caldo ma non da montagna.`,
			`${n}, aria frizzante: giubbotto medio e sei imbattibile.`,
			`Strato in più consigliato, ${n}. Stile e comfort insieme.`
		],
		heavy: [
			`Fuori si gela, ${n}: giubbotto pesante, sciarpa e sguardo da copertina.`,
			`${n}, oggi vince il piumino. Caldo fuori, stile dentro.`,
			`Freddo serio, ${n}: copriti bene, il fascino resta.`
		]
	};
	const extra = rain ? ` Possibile pioggia: meglio qualcosa che non tema l'acqua.` : "";
	return pick(byAdvice[advice], seed) + extra;
}
function suggestJacket(items, advice, seed) {
	if (advice === "none") return null;
	const jackets = items.filter((i) => i.category === "giubbotti");
	if (!jackets.length) return null;
	const words = {
		light: [
			"legger",
			"jeans",
			"denim",
			"bomber",
			"giacca",
			"vento",
			"windbreaker",
			"overshirt"
		],
		medium: [
			"bomber",
			"giacca",
			"pelle",
			"parka",
			"trench",
			"imbottit"
		],
		heavy: [
			"piumino",
			"pesante",
			"parka",
			"cappotto",
			"montone",
			"imbottit",
			"puffer"
		]
	};
	const match = jackets.filter((j) => words[advice].some((w) => `${j.name} ${j.style ?? ""}`.toLowerCase().includes(w)));
	return pick(match.length ? match : jackets, seed);
}
function WeatherIcon({ code, className }) {
	if (code >= 71 && code <= 86) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, { className });
	if (code >= 51) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className });
	if (code >= 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className });
	if (code >= 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className });
}
var ADVICE_LABEL = {
	none: "Niente giubbotto",
	light: "Giubbotto leggero",
	medium: "Giubbotto medio",
	heavy: "Giubbotto pesante"
};
function WeatherCard({ name, items }) {
	const [coords, setCoords] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem(KEY);
		if (saved) try {
			setCoords(JSON.parse(saved));
		} catch {}
		if (!navigator.geolocation) {
			if (!saved) setCoords(FALLBACK);
			return;
		}
		navigator.geolocation.getCurrentPosition((p) => {
			const c = {
				lat: p.coords.latitude,
				lon: p.coords.longitude,
				label: "La tua zona"
			};
			localStorage.setItem(KEY, JSON.stringify(c));
			setCoords(c);
		}, () => {
			if (!saved) setCoords(FALLBACK);
		}, {
			timeout: 8e3,
			maximumAge: 18e5
		});
	}, []);
	const { data: place } = useQuery({
		queryKey: [
			"place",
			coords?.lat.toFixed(2),
			coords?.lon.toFixed(2)
		],
		enabled: !!coords && coords.label !== FALLBACK.label,
		staleTime: Infinity,
		queryFn: async () => {
			const r = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.lat}&longitude=${coords.lon}&localityLanguage=it`);
			if (!r.ok) return null;
			const j = await r.json();
			return j.city || j.locality || null;
		}
	});
	const { data: w, isError } = useQuery({
		queryKey: [
			"weather",
			coords?.lat.toFixed(2),
			coords?.lon.toFixed(2)
		],
		enabled: !!coords,
		staleTime: 12e5,
		queryFn: async () => {
			const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=1`;
			const r = await fetch(url);
			if (!r.ok) throw new Error("meteo");
			const j = await r.json();
			return {
				temp: Math.round(j.current.temperature_2m),
				feels: Math.round(j.current.apparent_temperature),
				code: j.current.weather_code,
				wind: Math.round(j.current.wind_speed_10m),
				max: Math.round(j.daily.temperature_2m_max[0]),
				min: Math.round(j.daily.temperature_2m_min[0]),
				rainProb: j.daily.precipitation_probability_max[0] ?? 0
			};
		}
	});
	if (isError) return null;
	if (!w) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-5 h-32 animate-pulse rounded-3xl bg-muted md:h-36" });
	const seed = (/* @__PURE__ */ new Date()).getDate() + (/* @__PURE__ */ new Date()).getMonth() * 31;
	const advice = jacketAdvice(w.feels, w.min);
	const rain = w.rainProb >= 50;
	const jacket = suggestJacket(items, advice, seed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-5 overflow-hidden rounded-3xl bg-primary p-4 text-primary-foreground md:mt-6 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-4 md:gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 md:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherIcon, {
							code: w.code,
							className: "h-10 w-10 shrink-0 md:h-14 md:w-14"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-4xl font-black leading-none md:text-5xl",
							children: [w.temp, "°"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1 text-xs font-bold opacity-80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
								" ",
								place ?? coords?.label
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5 text-xs font-bold md:gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-primary-foreground/15 px-2.5 py-1 md:px-3",
								children: [
									"Percepita ",
									w.feels,
									"°"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-primary-foreground/15 px-2.5 py-1 md:px-3",
								children: [
									"Min ",
									w.min,
									"° · Max ",
									w.max,
									"°"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-primary-foreground/15 px-2.5 py-1 md:px-3",
								children: [
									"Pioggia ",
									w.rainProb,
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2.5 py-1 md:px-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "h-3 w-3" }),
									" ",
									w.wind,
									" km/h"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto rounded-full bg-primary-foreground px-3.5 py-1.5 text-xs font-extrabold text-primary md:px-4 md:py-2 md:text-sm",
						children: ADVICE_LABEL[advice]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base font-bold leading-snug md:mt-4 md:text-lg",
				children: phrases(name, advice, rain, seed)
			}),
			jacket && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm font-semibold opacity-85",
				children: [
					"Dal tuo armadio: ",
					jacket.name,
					"."
				]
			})
		]
	});
}
function WardrobePage() {
	const qc = useQueryClient();
	const { data: items, isLoading } = useItems();
	const { data: urls } = useImageUrls(items);
	const [cat, setCat] = (0, import_react.useState)("tutti");
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const { data: profile } = useProfile();
	const filtered = (0, import_react.useMemo)(() => (items ?? []).filter((i) => (cat === "tutti" || (cat === "preferiti" ? i.favorite : i.category === cat)) && i.name.toLowerCase().includes(q.toLowerCase())), [
		items,
		cat,
		q
	]);
	async function toggleFav(id, favorite) {
		const { error } = await supabase.from("items").update({ favorite: !favorite }).eq("id", id);
		if (error) {
			toast.error("Errore");
			return;
		}
		qc.invalidateQueries({ queryKey: ["items"] });
	}
	async function remove(id, path) {
		const { error } = await supabase.from("items").delete().eq("id", id);
		if (error) {
			toast.error("Impossibile eliminare");
			return;
		}
		await supabase.storage.from("wardrobe").remove([path]);
		toast.success("Capo eliminato");
		qc.invalidateQueries({ queryKey: ["items"] });
		qc.invalidateQueries({ queryKey: ["outfits"] });
	}
	const pills = [
		{
			value: "tutti",
			label: "Tutti"
		},
		...CATEGORIES,
		{
			value: "preferiti",
			label: "♥ Preferiti"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-black tracking-tight text-foreground md:text-4xl",
					children: "Il mio guardaroba"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-sm font-semibold text-muted-foreground",
					children: [filtered.length, " articoli"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				className: "h-10 shrink-0 rounded-full px-4 text-sm font-bold md:h-11 md:px-6 md:text-base",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Aggiungi"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherCard, {
			name: profile?.display_name ?? "",
			items: items ?? []
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-col gap-3 md:flex-row md:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden",
				children: pills.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCat(p.value),
					className: cn("shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors md:px-4 md:py-2", cat === p.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/50"),
					children: p.label
				}, p.value))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative md:ml-auto md:w-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Cerca…",
					className: "h-10 rounded-full pl-10"
				})]
			})]
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4",
			children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square animate-pulse rounded-2xl bg-muted md:rounded-3xl" }, i))
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-3xl border border-dashed border-border p-8 text-center md:mt-10 md:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-bold text-foreground",
					children: "Nessun capo qui"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Aggiungi il tuo primo vestito con una foto."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setOpen(true),
					className: "mt-4 rounded-full font-bold",
					children: "Aggiungi vestiti"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4",
			children: filtered.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group overflow-hidden rounded-2xl border border-border bg-card md:rounded-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-square bg-surface p-3 md:p-4",
					children: [urls?.[i.image_path] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: urls[i.image_path],
						alt: i.name,
						loading: "lazy",
						className: "h-full w-full object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => toggleFav(i.id, i.favorite),
						"aria-label": "Preferito",
						className: "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm md:right-3 md:top-3 md:h-9 md:w-9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4", i.favorite ? "fill-primary text-primary" : "text-muted-foreground") })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2 p-3 md:p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-bold text-foreground md:text-base",
							children: i.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs font-semibold text-muted-foreground",
							children: [
								i.brand ? `${i.brand} · ` : "",
								categoryLabel(i.category),
								i.color ? ` · ${i.color}` : ""
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Elimina",
							className: "shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
						className: "rounded-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
							"Eliminare \"",
							i.name,
							"\"?"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Il capo verrà tolto anche dagli outfit che lo contengono." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
							className: "rounded-full",
							children: "Annulla"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							className: "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90",
							onClick: () => remove(i.id, i.image_path),
							children: "Elimina"
						})] })]
					})] })]
				})]
			}, i.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddItemDialog, {
			open,
			onOpenChange: setOpen,
			defaultCategory: cat !== "tutti" && cat !== "preferiti" ? cat : void 0
		})
	] });
}
//#endregion
export { WardrobePage as component };
