import { r as __toESM } from "../_runtime.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { a as useItems, i as useImageUrls, r as saveOutfit } from "./wardrobe-BndUKBIx.mjs";
import { r as cn, t as Button } from "./button-CCQEfgNs.mjs";
import { D as Bookmark, O as ArrowUp, i as WandSparkles } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as OutfitBoard } from "./OutfitBoard-DeAfAa7Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-CicPERNx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var SUGGESTIONS = [
	"Pranzo informale",
	"Qualcosa di più elegante",
	"Serata con amici",
	"Outfit sportivo per il weekend"
];
function ChatPage() {
	const qc = useQueryClient();
	const { data: items } = useItems();
	const { data: urls } = useImageUrls(items);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, loading]);
	async function send(text) {
		const content = text.trim();
		if (!content || loading) return;
		const next = [...messages, {
			role: "user",
			content
		}];
		setMessages(next);
		setInput("");
		setLoading(true);
		try {
			const history = next.slice(-10).map((m) => ({
				role: m.role,
				content: m.content + (m.outfits?.length ? `\n[Outfit proposti: ${m.outfits.map((o) => `${o.name} (${o.item_ids.join(",")})`).join("; ")}]` : "") || "…"
			}));
			const { data: sessionData } = await (await import("./client-DPL8uosI.mjs").then((n) => n.t).then((n) => n.t)).supabase.auth.getSession();
			const response = await fetch("/api/stylist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionData.session?.access_token ?? ""}`
				},
				body: JSON.stringify({ messages: history })
			});
			const res = await response.json();
			if (!response.ok || res.error) setMessages((m) => [...m, {
				role: "assistant",
				content: res.error ?? "La Chat AI non è disponibile al momento.",
				error: true
			}]);
			else setMessages((m) => [...m, {
				role: "assistant",
				content: res.message,
				outfits: res.outfits
			}]);
		} catch (error) {
			console.error("Chat request error", error);
			const message = error instanceof Error ? error.message : String(error);
			setMessages((m) => [...m, {
				role: "assistant",
				content: `Errore Chat: ${message}`,
				error: true
			}]);
		} finally {
			setLoading(false);
		}
	}
	async function save(o, key) {
		try {
			await saveOutfit({
				name: o.name.slice(0, 80),
				occasion: o.occasion.slice(0, 60) || null,
				notes: o.reason,
				item_ids: o.item_ids
			});
			setSaved((s) => new Set(s).add(key));
			qc.invalidateQueries({ queryKey: ["outfits"] });
			toast.success("Outfit salvato");
		} catch {
			toast.error("Impossibile salvare");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-4xl flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-black text-foreground",
					children: "Stylist AI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Usa solo i capi del tuo guardaroba"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex-1 space-y-6 pb-40",
				children: [
					messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-secondary p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-foreground",
							children: "Che outfit ti serve oggi?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => send(s),
								className: "rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground hover:border-primary",
								children: s
							}, s))
						})]
					}),
					messages.map((m, idx) => m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-[80%] rounded-3xl rounded-br-lg bg-primary px-5 py-3 font-semibold text-primary-foreground",
							children: m.content
						})
					}, idx) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [m.content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: m.error ? "font-semibold text-destructive" : "text-foreground",
							children: m.content
						}), m.outfits && m.outfits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: m.outfits.map((o, oi) => {
								const key = `${idx}-${oi}`;
								const its = (items ?? []).filter((i) => o.item_ids.includes(i.id));
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "flex flex-col rounded-3xl border border-border bg-card p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutfitBoard, {
										items: its,
										urls,
										compact: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-1 flex-col px-2 pt-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-lg font-extrabold text-foreground",
												children: o.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 w-fit rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground",
												children: o.occasion
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 flex-1 text-sm text-muted-foreground",
												children: o.reason
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												onClick: () => save(o, key),
												disabled: saved.has(key),
												variant: saved.has(key) ? "secondary" : "default",
												className: "mt-3 rounded-full font-bold",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mr-1 h-4 w-4" }),
													" ",
													saved.has(key) ? "Salvato" : "Salva outfit"
												]
											})
										]
									})]
								}, key);
							})
						})]
					}, idx)),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-semibold text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-bounce rounded-full bg-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" }),
							"Sto abbinando i tuoi capi…"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					send(input);
				},
				className: "fixed inset-x-3 bottom-24 z-20 mx-auto flex max-w-4xl items-end gap-2 rounded-3xl border border-border bg-card p-2 shadow-lg md:bottom-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: input,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							send(input);
						}
					},
					placeholder: "Es. un outfit più elegante per una cena",
					rows: 1,
					maxLength: 2e3,
					className: "min-h-11 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					disabled: loading || !input.trim(),
					className: "h-11 w-11 shrink-0 rounded-full",
					"aria-label": "Invia",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-5 w-5" })
				})]
			})
		]
	});
}
//#endregion
export { ChatPage as component };
