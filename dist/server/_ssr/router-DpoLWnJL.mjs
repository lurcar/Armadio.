import { r as __toESM } from "../_runtime.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as supabase } from "./client-DPL8uosI.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { G as redirect, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { t as Route$9 } from "./crea-outfit-BGwT5D5p.mjs";
import { r as themeScript } from "./theme-D7qhl2id.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DpoLWnJL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-CSCU0Irh.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Pagina non trovata"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "La pagina che cerchi non esiste."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Torna al guardaroba"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Torna al guardaroba"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "it",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: themeScript } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => data.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })]
	});
}
var $$splitComponentImporter$5 = () => import("./route-BzAQfn50.mjs");
var Route$7 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getUser();
		if (!data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./auth-B0zj7f2e.mjs");
var Route$6 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Accedi — Armadio" },
		{
			name: "description",
			content: "Accedi al tuo guardaroba personale."
		},
		{
			property: "og:title",
			content: "Accedi — Armadio"
		},
		{
			property: "og:description",
			content: "Accedi al tuo guardaroba personale."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_authenticated-66faSbPD.mjs");
var Route$5 = createFileRoute("/_authenticated/")({
	head: () => ({ meta: [
		{ title: "Guardaroba — Armadio" },
		{
			name: "description",
			content: "Tutti i tuoi capi divisi per categoria."
		},
		{
			property: "og:title",
			content: "Guardaroba — Armadio"
		},
		{
			property: "og:description",
			content: "Tutti i tuoi capi divisi per categoria."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./chat-CicPERNx.mjs");
var Route$4 = createFileRoute("/_authenticated/chat")({
	head: () => ({ meta: [
		{ title: "Chat AI — Armadio" },
		{
			name: "description",
			content: "Chiedi all'AI un outfit con i tuoi capi."
		},
		{
			property: "og:title",
			content: "Chat AI — Armadio"
		},
		{
			property: "og:description",
			content: "Chiedi all'AI un outfit con i tuoi capi."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./outfit-gqoIwOuJ.mjs");
var Route$3 = createFileRoute("/_authenticated/outfit")({
	head: () => ({ meta: [
		{ title: "I miei outfit — Armadio" },
		{
			name: "description",
			content: "Gli outfit che hai salvato."
		},
		{
			property: "og:title",
			content: "I miei outfit — Armadio"
		},
		{
			property: "og:description",
			content: "Gli outfit che hai salvato."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./profilo-CF99Svfd.mjs");
var Route$2 = createFileRoute("/_authenticated/profilo")({
	head: () => ({ meta: [
		{ title: "Profilo e impostazioni — Armadio" },
		{
			name: "description",
			content: "Il tuo profilo e le preferenze dell'app."
		},
		{
			property: "og:title",
			content: "Profilo e impostazioni — Armadio"
		},
		{
			property: "og:description",
			content: "Il tuo profilo e le preferenze dell'app."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var imageSettings = {
	baseURL: "https://ai.gateway.lovable.dev",
	model: "openai/gpt-image-2.5-sunburst"
};
/** OpenAI-format image edit through the Lovable AI Gateway (multipart). */
function editImage(config, form, signal) {
	const streaming = form.get("stream") !== "false";
	form.set("model", config.model);
	if (streaming) {
		form.set("stream", "true");
		if (!form.has("partial_images")) form.set("partial_images", "1");
	} else {
		form.delete("stream");
		form.delete("partial_images");
	}
	return fetch(`${config.baseURL}/v1/images/edits`, {
		method: "POST",
		headers: { Authorization: `Bearer ${config.apiKey}` },
		body: form,
		signal: signal ?? null
	});
}
async function isSignedIn(request) {
	const auth = request.headers.get("authorization") ?? "";
	const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
	if (token.split(".").length !== 3) return false;
	const key = processModule.env["SUPABASE_PUBLISHABLE_KEY"];
	const { data, error } = await createClient(processModule.env["SUPABASE_URL"], key, {
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const h = new Headers(init?.headers);
			if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
			h.set("apikey", key);
			return fetch(input, {
				...init,
				headers: h
			});
		} }
	}).auth.getUser(token);
	return !error && !!data.user;
}
function buildPrompt(name, brand, category) {
	return `Turn this photo into a professional e-commerce product photo of the garment "${[brand, name].filter(Boolean).join(" ") || category}" (${category}), as it would appear on the official ${brand || "brand"} online store.
- Keep the EXACT same item: same color, fabric, pattern, logos, prints, text, stitching and details. Do not invent or change design elements.
- Show only the item, front view, perfectly centered and straight, symmetrical, neatly shaped like a ghost-mannequin or a perfectly laid-flat catalog shot. For shoes: a clean side profile of the pair. For accessories: clean front view.
- Completely smooth and pressed: no wrinkles, no creases, no folds, no lint.
- Remove everything else: no hands, no people, no hanger, no bed, no floor, no shadows from the room.
- Transparent background with no rectangle, no black pixels around the item, soft even studio lighting, sharp focus, the item fills most of the frame with a small margin.
- The result should look identical to a product photo from a high-end online fashion retailer: crisp, clean, professional.`;
}
var Route$1 = createFileRoute("/api/clean-image")({ server: { handlers: { POST: async ({ request }) => {
	if (!await isSignedIn(request)) return new Response("Unauthorized", { status: 401 });
	const apiKey = processModule.env["LOVABLE_API_KEY"];
	if (!apiKey) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
	const incoming = await request.formData();
	const image = incoming.get("image");
	if (!(image instanceof File) || image.size > 15728640) return new Response("Foto mancante o troppo grande", { status: 400 });
	const str = (k) => String(incoming.get(k) ?? "").slice(0, 80);
	const form = new FormData();
	form.set("image", image);
	form.set("prompt", buildPrompt(str("name"), str("brand"), str("category")));
	form.set("background", "transparent");
	form.set("output_format", "png");
	form.set("quality", "high");
	form.set("size", "1024x1024");
	form.set("stream", incoming.get("stream") === "false" ? "false" : "true");
	const upstream = await editImage({
		...imageSettings,
		apiKey
	}, form);
	return new Response(upstream.body, {
		status: upstream.status,
		headers: {
			"Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
			"Cache-Control": "no-cache"
		}
	});
} } } });
var inputSchema = objectType({ messages: arrayType(objectType({
	role: enumType(["user", "assistant"]),
	content: stringType().trim().min(1).max(2e3)
})).min(1).max(20) });
function createAuthenticatedClient(token) {
	const url = processModule.env["SUPABASE_URL"];
	const key = processModule.env["SUPABASE_PUBLISHABLE_KEY"] ?? processModule.env["SUPABASE_ANON_KEY"];
	if (!url || !key) return null;
	return createClient(url, key, {
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		},
		global: {
			headers: { Authorization: `Bearer ${token}` },
			fetch: (input, init) => {
				const headers = new Headers(init?.headers);
				headers.set("apikey", key);
				headers.set("Authorization", `Bearer ${token}`);
				return fetch(input, {
					...init,
					headers
				});
			}
		}
	});
}
var Route = createFileRoute("/api/stylist")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const authorization = request.headers.get("authorization") ?? "";
		const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
		const supabase = token ? createAuthenticatedClient(token) : null;
		if (!supabase) return Response.json({
			message: "",
			outfits: [],
			error: "Sessione non valida."
		}, { status: 401 });
		const { data: userData, error: authError } = await supabase.auth.getUser(token);
		if (authError || !userData.user) return Response.json({
			message: "",
			outfits: [],
			error: "Sessione non valida."
		}, { status: 401 });
		const parsed = inputSchema.safeParse(await request.json());
		if (!parsed.success) return Response.json({
			message: "",
			outfits: [],
			error: "Richiesta non valida."
		}, { status: 400 });
		const { data: items, error } = await supabase.from("items").select("id, name, category, color, style, favorite");
		if (error) return Response.json({
			message: "",
			outfits: [],
			error: "Non riesco a leggere il tuo guardaroba."
		}, { status: 500 });
		if (!items || items.length < 2) return Response.json({
			message: "",
			outfits: [],
			error: "Aggiungi almeno qualche capo al guardaroba prima di chiedere un outfit."
		});
		const apiKey = processModule.env["GEMINI_API_KEY"];
		if (!apiKey) return Response.json({
			message: "",
			outfits: [],
			error: "Chat AI non configurata."
		}, { status: 500 });
		const schema = objectType({
			message: stringType(),
			outfits: arrayType(objectType({
				name: stringType(),
				occasion: stringType(),
				reason: stringType(),
				item_ids: arrayType(stringType())
			}))
		});
		const wardrobe = items.map((i) => ({
			id: i.id,
			nome: i.name,
			categoria: i.category,
			colore: i.color,
			stile: i.style,
			preferito: i.favorite
		}));
		const system = `Sei uno stylist personale italiano. Crea outfit usando SOLO gli id del guardaroba.
Regole: proponi 2 o 3 outfit; massimo un capo per categoria tra giubbotti, felpe, maglie, pantaloni e scarpe; fino a 2 accessori; includi maglia o felpa, pantaloni e scarpe quando disponibili; non inventare capi; rispondi in italiano.
Guardaroba: ${JSON.stringify(wardrobe)}`;
		const body = JSON.stringify({
			systemInstruction: { parts: [{ text: system }] },
			contents: parsed.data.messages.map((message) => ({
				role: message.role === "assistant" ? "model" : "user",
				parts: [{ text: message.content }]
			})),
			generationConfig: {
				responseMimeType: "application/json",
				responseSchema: {
					type: "OBJECT",
					properties: {
						message: { type: "STRING" },
						outfits: {
							type: "ARRAY",
							items: {
								type: "OBJECT",
								properties: {
									name: { type: "STRING" },
									occasion: { type: "STRING" },
									reason: { type: "STRING" },
									item_ids: {
										type: "ARRAY",
										items: { type: "STRING" }
									}
								},
								required: [
									"name",
									"occasion",
									"reason",
									"item_ids"
								]
							}
						}
					},
					required: ["message", "outfits"]
				}
			}
		});
		const models = ["gemini-3.5-flash-lite", "gemini-3.8-flash"];
		let result = null;
		let lastError = null;
		for (const model of models) try {
			const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body
			});
			const responseBody = await response.text();
			if (!response.ok) {
				console.error(`Gemini API error (${model})`, {
					status: response.status,
					statusText: response.statusText,
					body: responseBody
				});
				let apiMessage = responseBody || response.statusText || "Risposta vuota";
				try {
					apiMessage = JSON.parse(responseBody).error?.message ?? apiMessage;
				} catch {}
				const err = Object.assign(/* @__PURE__ */ new Error(`Gemini API ${response.status}: ${apiMessage}`), { statusCode: response.status });
				if ((response.status === 503 || response.status === 429) && model !== models[models.length - 1]) {
					lastError = err;
					console.warn(`Modello ${model} non disponibile (${response.status}), provo il fallback…`);
					continue;
				}
				throw err;
			}
			const text = JSON.parse(responseBody).candidates?.[0]?.content?.parts?.[0]?.text;
			if (!text) throw new Error(`Gemini (${model}) returned no content`);
			result = schema.parse(JSON.parse(text));
			break;
		} catch (err) {
			if (err instanceof Error && "statusCode" in err && (err.statusCode === 503 || err.statusCode === 429) && model !== models[models.length - 1]) {
				lastError = err instanceof Error ? err : new Error(String(err));
				continue;
			}
			throw err;
		}
		if (!result) throw lastError ?? /* @__PURE__ */ new Error("Nessuna risposta dai modelli Gemini.");
		const valid = new Set(items.map((i) => i.id));
		const outfits = result.outfits.map((outfit) => ({
			...outfit,
			item_ids: [...new Set(outfit.item_ids)].filter((id) => valid.has(id))
		})).filter((outfit) => outfit.item_ids.length >= 2).slice(0, 3);
		return Response.json({
			message: result.message,
			outfits,
			error: null
		});
	} catch (error) {
		console.error("stylist request failed", error);
		const status = typeof error === "object" && error !== null && "statusCode" in error ? Number(error.statusCode) : 500;
		const errorMessage = error instanceof Error ? error.message : String(error);
		const message = status > 0 && status < 600 ? errorMessage : `Server error: ${errorMessage}`;
		return Response.json({
			message: "",
			outfits: [],
			error: message
		}, { status: status > 0 && status < 600 ? status : 500 });
	}
} } } });
var AuthenticatedRouteRoute = Route$7.update({
	id: "/_authenticated",
	getParentRoute: () => Route$8
});
var AuthRoute = Route$6.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$8
});
var AuthenticatedIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedChatRoute = Route$4.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCreaOutfitRoute = Route$9.update({
	id: "/crea-outfit",
	path: "/crea-outfit",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOutfitRoute = Route$3.update({
	id: "/outfit",
	path: "/outfit",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfiloRoute = Route$2.update({
	id: "/profilo",
	path: "/profilo",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ApiCleanImageRoute = Route$1.update({
	id: "/api/clean-image",
	path: "/api/clean-image",
	getParentRoute: () => Route$8
});
var ApiStylistRoute = Route.update({
	id: "/api/stylist",
	path: "/api/stylist",
	getParentRoute: () => Route$8
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedChatRoute,
	AuthenticatedCreaOutfitRoute,
	AuthenticatedOutfitRoute,
	AuthenticatedProfiloRoute,
	AuthenticatedIndexRoute
};
var rootRouteChildren = {
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ApiCleanImageRoute,
	ApiStylistRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
