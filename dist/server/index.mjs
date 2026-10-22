globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/_redirects": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"17-XhAJEZACACf1E4TpyZvGieSw1AY\"",
		"mtime": "2026-10-22T12:44:17.094Z",
		"size": 23,
		"path": "../public/_redirects"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-10-22T12:44:17.094Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-22T12:44:17.095Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppShell-B4QhyHCC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3a-5zGm6YQHKSq0tNDaqDXsbFXDuPQ\"",
		"mtime": "2026-10-22T12:44:13.991Z",
		"size": 3130,
		"path": "../public/assets/AppShell-B4QhyHCC.js"
	},
	"/assets/Match-nHffroHm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119c-d3B/2jLzxbwZp6LyBHYIOBF1g/4\"",
		"mtime": "2026-10-22T12:44:13.991Z",
		"size": 4508,
		"path": "../public/assets/Match-nHffroHm.js"
	},
	"/assets/OutfitBoard-DxPoy924.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c7-KinflkXpnK5GceuqZG2o9V8Y69A\"",
		"mtime": "2026-10-22T12:44:13.992Z",
		"size": 2247,
		"path": "../public/assets/OutfitBoard-DxPoy924.js"
	},
	"/assets/_authenticated-AOFXmyOQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7501-efNZ0oxcsCsPC4mUfADijg5wXmA\"",
		"mtime": "2026-10-22T12:44:13.992Z",
		"size": 29953,
		"path": "../public/assets/_authenticated-AOFXmyOQ.js"
	},
	"/assets/alert-dialog-E61qCBp_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f37-1MN/DZu0WS1bRZ8M+Gfz6vQUKdk\"",
		"mtime": "2026-10-22T12:44:13.993Z",
		"size": 3895,
		"path": "../public/assets/alert-dialog-E61qCBp_.js"
	},
	"/assets/auth-CNy22VgA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85f-9MmB0UK1UKfs2lCFc6HCzYJmf8M\"",
		"mtime": "2026-10-22T12:44:13.994Z",
		"size": 2143,
		"path": "../public/assets/auth-CNy22VgA.js"
	},
	"/assets/button-D5prPTp5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f68-AWzESfytLjL0wzalnKl3CKOXBxw\"",
		"mtime": "2026-10-22T12:44:13.994Z",
		"size": 32616,
		"path": "../public/assets/button-D5prPTp5.js"
	},
	"/assets/chat-CZ1vvQM4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1916-5D33oFnfa3OMVZKF83GI6ar7t90\"",
		"mtime": "2026-10-22T12:44:13.994Z",
		"size": 6422,
		"path": "../public/assets/chat-CZ1vvQM4.js"
	},
	"/assets/client-BEsXiCJo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35ffd-bjpAJeKDiBKhv2W6hNVIUb0Rjqc\"",
		"mtime": "2026-10-22T12:44:13.995Z",
		"size": 221181,
		"path": "../public/assets/client-BEsXiCJo.js"
	},
	"/assets/crea-outfit-4nD9gZo_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c9a-4IgwGTlHeTF50dEgkarkXUTi4y0\"",
		"mtime": "2026-10-22T12:44:13.996Z",
		"size": 7322,
		"path": "../public/assets/crea-outfit-4nD9gZo_.js"
	},
	"/assets/crea-outfit-DuqF9bPD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1e4-2izJ/wJMxsNLi4a6J6i+yIrP3E4\"",
		"mtime": "2026-10-22T12:44:13.999Z",
		"size": 61924,
		"path": "../public/assets/crea-outfit-DuqF9bPD.js"
	},
	"/assets/createLucideIcon-vZpdmNuE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"238a-0LZs7oErssbc862AVrG/Rxd76Wk\"",
		"mtime": "2026-10-22T12:44:14.002Z",
		"size": 9098,
		"path": "../public/assets/createLucideIcon-vZpdmNuE.js"
	},
	"/assets/dialog-BO6p_lSP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"84b-ZiX+iRkcfMompB5zUskIABNt+tE\"",
		"mtime": "2026-10-22T12:44:14.003Z",
		"size": 2123,
		"path": "../public/assets/dialog-BO6p_lSP.js"
	},
	"/assets/dist-DGDE26iu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a4d-JEDfW08SbmU1wm+DZh6gXkgT+OE\"",
		"mtime": "2026-10-22T12:44:14.006Z",
		"size": 35405,
		"path": "../public/assets/dist-DGDE26iu.js"
	},
	"/assets/index-DYRI5tc6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c7d8-ZwOah5LaGXtmUTg2kDd8eh7w0pA\"",
		"mtime": "2026-10-22T12:44:13.990Z",
		"size": 378840,
		"path": "../public/assets/index-DYRI5tc6.js"
	},
	"/assets/input-CTv5EE07.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-eMwm3QoUKDV2t6dVgV93nsZabj8\"",
		"mtime": "2026-10-22T12:44:14.007Z",
		"size": 622,
		"path": "../public/assets/input-CTv5EE07.js"
	},
	"/assets/jsx-runtime-CXCudH8Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c5-fGora6XZT3AEeoV3pg8TOqypOPo\"",
		"mtime": "2026-10-22T12:44:14.007Z",
		"size": 8901,
		"path": "../public/assets/jsx-runtime-CXCudH8Z.js"
	},
	"/assets/layers-DnSOjnAN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-K+JF9VmDWBzSqgeCnMNNlRodJqE\"",
		"mtime": "2026-10-22T12:44:14.008Z",
		"size": 421,
		"path": "../public/assets/layers-DnSOjnAN.js"
	},
	"/assets/link-BBG3-75W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c05-1oYWMA2eEFpYzqQDXyCId7VYip4\"",
		"mtime": "2026-10-22T12:44:14.008Z",
		"size": 11269,
		"path": "../public/assets/link-BBG3-75W.js"
	},
	"/assets/matchContext-CdskoklW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-Xij9AfCDWQJzrLnd+48cu1Elq4o\"",
		"mtime": "2026-10-22T12:44:14.009Z",
		"size": 162,
		"path": "../public/assets/matchContext-CdskoklW.js"
	},
	"/assets/outfit-CJWHIwdT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11cc-2K39IrNzXJF9rmihWfGzrcK6yO0\"",
		"mtime": "2026-10-22T12:44:14.009Z",
		"size": 4556,
		"path": "../public/assets/outfit-CJWHIwdT.js"
	},
	"/assets/preload-helper-Czpn1I53.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ac-sE+5KsaRXTMfwOfrOATQajMSGV4\"",
		"mtime": "2026-10-22T12:44:14.010Z",
		"size": 1196,
		"path": "../public/assets/preload-helper-Czpn1I53.js"
	},
	"/assets/profilo-D5LGR06a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cbb-YQ02zsn5kXR9YQT61VBU4Ubxnkk\"",
		"mtime": "2026-10-22T12:44:14.010Z",
		"size": 3259,
		"path": "../public/assets/profilo-D5LGR06a.js"
	},
	"/assets/route-CPupRu_R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a-jp2DQqnBsMqh427PPpB5sQtkn/Q\"",
		"mtime": "2026-10-22T12:44:14.011Z",
		"size": 74,
		"path": "../public/assets/route-CPupRu_R.js"
	},
	"/assets/shirt-Ca5Wx8m7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-+M+/lT9zz2OAntIm6wMxL+Xy1lo\"",
		"mtime": "2026-10-22T12:44:14.011Z",
		"size": 286,
		"path": "../public/assets/shirt-Ca5Wx8m7.js"
	},
	"/assets/styles-CSCU0Irh.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14c02-i2No/Zh9E0bsZplS3z5yvRIODXk\"",
		"mtime": "2026-10-22T12:44:14.014Z",
		"size": 84994,
		"path": "../public/assets/styles-CSCU0Irh.css"
	},
	"/assets/useNavigate-DnsEP00n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-fIibOa7X1iCknW9p61HM2klcDcs\"",
		"mtime": "2026-10-22T12:44:14.012Z",
		"size": 228,
		"path": "../public/assets/useNavigate-DnsEP00n.js"
	},
	"/assets/useRouter-BU35VTbH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-Ah2gBGlVpuVWmcP2ZSp96Q2Rrr0\"",
		"mtime": "2026-10-22T12:44:14.012Z",
		"size": 151,
		"path": "../public/assets/useRouter-BU35VTbH.js"
	},
	"/assets/wand-sparkles-CO90cZj2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"201-3W/JAPHHpSdRFp0pDkrdcpeSQXU\"",
		"mtime": "2026-10-22T12:44:14.013Z",
		"size": 513,
		"path": "../public/assets/wand-sparkles-CO90cZj2.js"
	},
	"/assets/wardrobe-BwB1115n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"687-4GIrYtAA7H+bFNREKwqV4hQBPu8\"",
		"mtime": "2026-10-22T12:44:14.013Z",
		"size": 1671,
		"path": "../public/assets/wardrobe-BwB1115n.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_hBn8Kl = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_hBn8Kl
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
