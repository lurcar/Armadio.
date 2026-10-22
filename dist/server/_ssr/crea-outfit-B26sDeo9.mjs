import { r as __toESM } from "../_runtime.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { a as useItems, i as useImageUrls, o as useOutfits, r as saveOutfit } from "./wardrobe-BndUKBIx.mjs";
import { r as cn, t as Button } from "./button-CCQEfgNs.mjs";
import { E as BriefcaseBusiness, T as Check, c as Sparkles, k as ArrowLeft, r as Watch, u as Shirt, v as Layers, x as Footprints } from "../_libs/lucide-react.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-aeX1A5Qu.mjs";
import { t as Input } from "./input-DoD5W07l.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as OutfitBoard } from "./OutfitBoard-DeAfAa7Y.mjs";
import { t as Route } from "./crea-outfit-BGwT5D5p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crea-outfit-B26sDeo9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PICKER_OPTIONS = [
	{
		key: "top",
		label: "Maglie",
		categories: ["maglie"],
		icon: Shirt
	},
	{
		key: "outer",
		label: "Felpe e giubbotti",
		categories: ["felpe", "giubbotti"],
		icon: BriefcaseBusiness
	},
	{
		key: "pantaloni",
		label: "Pantaloni",
		categories: ["pantaloni"],
		icon: Layers
	},
	{
		key: "scarpe",
		label: "Scarpe",
		categories: ["scarpe"],
		icon: Footprints
	},
	{
		key: "accessori",
		label: "Accessori",
		categories: ["accessori"],
		icon: Watch
	}
];
function CreateOutfit() {
	const { id } = Route.useSearch();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { data: items } = useItems();
	const { data: outfits } = useOutfits();
	const { data: urls } = useImageUrls(items);
	const [picker, setPicker] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [name, setName] = (0, import_react.useState)("");
	const [occasion, setOccasion] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const editing = outfits?.find((o) => o.id === id);
	(0, import_react.useEffect)(() => {
		if (editing) {
			setSelected(editing.item_ids);
			setName(editing.name);
			setOccasion(editing.occasion ?? "");
		}
	}, [editing]);
	const chosen = (0, import_react.useMemo)(() => (items ?? []).filter((item) => selected.includes(item.id)), [items, selected]);
	const activeOption = PICKER_OPTIONS.find((option) => option.key === picker);
	const pickerItems = (0, import_react.useMemo)(() => (items ?? []).filter((item) => activeOption?.categories.includes(item.category)), [items, activeOption]);
	const toggle = (itemId) => setSelected((current) => current.includes(itemId) ? current.filter((value) => value !== itemId) : [...current, itemId]);
	async function save() {
		if (!name.trim()) {
			toast.error("Dai un nome all'outfit");
			return;
		}
		if (selected.length < 2) {
			toast.error("Scegli almeno 2 capi");
			return;
		}
		setSaving(true);
		try {
			await saveOutfit({
				id,
				name: name.trim().slice(0, 80),
				occasion: occasion.trim().slice(0, 60) || null,
				item_ids: selected
			});
			toast.success("Outfit salvato");
			qc.invalidateQueries({ queryKey: ["outfits"] });
			navigate({ to: "/outfit" });
		} catch {
			toast.error("Non è stato possibile salvare l'outfit");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-w-0 max-w-2xl pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "icon",
					className: "h-10 w-10 shrink-0 rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/outfit",
						"aria-label": "Torna agli outfit",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "truncate text-2xl font-black tracking-tight text-foreground md:text-4xl",
						children: editing ? "Modifica outfit" : "Crea outfit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-muted-foreground",
						children: "Scegli i capi per comporre il tuo look"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 rounded-[2rem] bg-card p-2 shadow-sm md:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutfitBoard, {
					items: chosen,
					urls,
					onRemove: toggle,
					className: "aspect-[4/5] md:aspect-[4/5]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3",
					children: PICKER_OPTIONS.map((option) => {
						const Icon = option.icon;
						const count = chosen.filter((item) => option.categories.includes(item.category)).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setPicker(option.key),
							className: "flex min-h-16 items-center gap-3 rounded-2xl border border-border bg-background px-3 py-3 text-left transition-colors hover:border-primary hover:bg-primary/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-extrabold text-foreground",
									children: option.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-muted-foreground",
									children: count ? `${count} selezionati` : "Aggiungi capo"
								})]
							})]
						}, option.key);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Nome outfit",
					value: name,
					onChange: (event) => setName(event.target.value),
					maxLength: 80,
					className: "h-12 rounded-2xl px-4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Occasione (es. pranzo informale)",
					value: occasion,
					onChange: (event) => setOccasion(event.target.value),
					maxLength: 60,
					className: "h-12 rounded-2xl px-4"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				disabled: saving,
				className: "mt-3 h-12 w-full rounded-2xl text-base font-bold",
				children: saving ? "Salvataggio…" : `Salva outfit${selected.length ? ` (${selected.length} capi)` : ""}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: picker !== null,
				onOpenChange: (open) => !open && setPicker(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-h-[88vh] w-[calc(100%-1rem)] max-w-2xl overflow-y-auto rounded-[2rem] p-4 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							className: "pr-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-2xl font-black",
								children: "Seleziona elemento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [activeOption?.label, " · tocca un capo per aggiungerlo o rimuoverlo"] })]
						}),
						pickerItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl bg-surface p-10 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-bold text-foreground",
									children: "Nessun capo disponibile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Aggiungi prima un articolo al guardaroba."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
							children: pickerItems.map((item) => {
								const isSelected = selected.includes(item.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggle(item.id),
									className: cn("relative overflow-hidden rounded-2xl border-2 bg-surface p-2 text-left transition", isSelected ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-border"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "aspect-square overflow-hidden rounded-xl",
											children: urls?.[item.image_path] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: urls[item.image_path],
												alt: item.name,
												className: "h-full w-full object-contain"
											}) : null
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 truncate text-sm font-bold text-surface-foreground",
											children: item.name
										}),
										isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
										})
									]
								}, item.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: () => setPicker(null),
							className: "h-12 w-full rounded-2xl font-bold",
							children: "Conferma selezione"
						})
					]
				})
			})
		]
	});
}
//#endregion
export { CreateOutfit as component };
