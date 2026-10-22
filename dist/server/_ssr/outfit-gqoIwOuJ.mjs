import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as supabase } from "./client-DPL8uosI.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { a as useItems, i as useImageUrls, o as useOutfits } from "./wardrobe-BndUKBIx.mjs";
import { t as Button } from "./button-CCQEfgNs.mjs";
import { m as Pencil, o as Trash2, u as Shirt } from "../_libs/lucide-react.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as AlertDialogTitle, i as AlertDialogContent, l as AlertDialogTrigger, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-BxSmFKrL.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as OutfitBoard } from "./OutfitBoard-DeAfAa7Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/outfit-gqoIwOuJ.js
var import_jsx_runtime = require_jsx_runtime();
function OutfitsPage() {
	const qc = useQueryClient();
	const { data: outfits, isLoading } = useOutfits();
	const { data: items } = useItems();
	const { data: urls } = useImageUrls(items);
	async function wear(id, count) {
		const { error } = await supabase.from("outfits").update({
			worn_count: count + 1,
			last_worn: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id);
		if (error) {
			toast.error("Errore");
			return;
		}
		toast.success("Segnato come indossato oggi");
		qc.invalidateQueries({ queryKey: ["outfits"] });
	}
	async function remove(id) {
		const { error } = await supabase.from("outfits").delete().eq("id", id);
		if (error) {
			toast.error("Errore");
			return;
		}
		qc.invalidateQueries({ queryKey: ["outfits"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-black tracking-tight text-foreground md:text-4xl",
			children: "I miei outfit"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-0.5 text-sm font-semibold text-muted-foreground",
			children: [outfits?.length ?? 0, " outfit salvati"]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "h-10 shrink-0 rounded-full px-4 text-sm font-bold md:h-11 md:px-6 md:text-base",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/crea-outfit",
				children: "Crea outfit"
			})
		})]
	}), isLoading ? null : !outfits?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 rounded-3xl border border-dashed border-border p-8 text-center md:mt-10 md:p-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-bold text-foreground",
			children: "Ancora nessun outfit"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Creane uno a mano o chiedi alla Chat AI."
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 grid grid-cols-2 gap-3 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 md:mt-6 md:gap-5",
		children: outfits.map((o) => {
			const its = (items ?? []).filter((i) => o.item_ids.includes(i.id));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-2 md:rounded-3xl md:p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutfitBoard, {
					items: its,
					urls,
					compact: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-1 pb-1 pt-2 md:px-2 md:pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-1.5 md:gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "truncate text-sm font-extrabold text-foreground md:text-lg",
								children: o.name
							}), o.occasion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground md:px-3 md:text-xs",
								children: o.occasion
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 gap-0.5 md:gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/crea-outfit",
								search: { id: o.id },
								"aria-label": "Modifica",
								className: "rounded-full p-1.5 text-muted-foreground hover:bg-secondary md:p-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5 md:h-4 md:w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "Elimina",
									className: "rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive md:p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 md:h-4 md:w-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
								className: "rounded-3xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
									"Eliminare \"",
									o.name,
									"\"?"
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
									className: "rounded-full",
									children: "Annulla"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
									className: "rounded-full bg-destructive text-destructive-foreground",
									onClick: () => remove(o.id),
									children: "Elimina"
								})] })]
							})] })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between gap-2 text-[10px] font-semibold text-muted-foreground md:mt-3 md:text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [
								o.worn_count,
								" ",
								o.worn_count === 1 ? "volta" : "volte",
								o.last_worn ? ` · ${new Date(o.last_worn).toLocaleDateString("it-IT")}` : ""
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => wear(o.id, o.worn_count),
							className: "flex shrink-0 items-center gap-1 rounded-full border border-border px-2 py-0.5 font-bold text-foreground hover:border-primary md:px-3 md:py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shirt, { className: "h-3 w-3 md:h-3.5 md:w-3.5" }), " Oggi"]
						})]
					})]
				})]
			}, o.id);
		})
	})] });
}
//#endregion
export { OutfitsPage as component };
