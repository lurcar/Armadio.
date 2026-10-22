import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn } from "./button-CCQEfgNs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OutfitBoard-DeAfAa7Y.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Flat-lay of an outfit, top to bottom in dressing order:
* outer layer (giubbotto / felpa) → maglia → pantaloni → scarpe, accessories on the side.
* Each row has a fixed share of the height so shoes stay small next to clothes.
*/
var ROWS = [
	{
		key: "outer",
		cats: ["giubbotti", "felpe"],
		weight: 30,
		maxW: "max-w-[85%]"
	},
	{
		key: "top",
		cats: ["maglie"],
		weight: 27,
		maxW: "max-w-[75%]"
	},
	{
		key: "bottom",
		cats: ["pantaloni"],
		weight: 33,
		maxW: "max-w-[70%]"
	},
	{
		key: "shoes",
		cats: ["scarpe"],
		weight: 14,
		maxW: "max-w-[45%]"
	}
];
function OutfitBoard({ items, urls, onRemove, className, compact }) {
	const acc = items.filter((i) => i.category === "accessori");
	const rows = ROWS.map((r) => ({
		...r,
		items: items.filter((i) => r.cats.includes(i.category))
	})).filter((r) => r.items.length > 0);
	const Tile = ({ item, maxW }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden",
		children: [urls?.[item.image_path] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: urls[item.image_path],
			alt: item.name,
			className: cn("max-h-full max-w-full object-contain drop-shadow-md", maxW),
			loading: "lazy"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-2/3 rounded-xl bg-muted" }), onRemove && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onRemove(item.id),
			className: "absolute right-1 top-1 hidden h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs text-background group-hover:flex",
			"aria-label": `Rimuovi ${item.name}`,
			children: "✕"
		})]
	});
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center justify-center rounded-2xl bg-surface p-4 text-center text-sm font-semibold text-surface-foreground/60 md:rounded-3xl md:p-6", compact ? "aspect-square md:aspect-[4/5]" : "aspect-[4/5]", className),
		children: "Scegli i capi dal guardaroba per comporre l'outfit"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex w-full max-w-full min-w-0 overflow-hidden gap-1.5 rounded-2xl bg-surface md:gap-2 md:rounded-3xl", compact ? "aspect-square p-2 md:aspect-[4/5] md:p-3" : "aspect-[4/5] gap-2 p-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 min-w-0 flex-[4] flex-col gap-1.5",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-0 justify-center gap-2",
				style: { flex: `${r.weight} 1 0%` },
				children: r.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					item: i,
					maxW: r.items.length > 1 ? "max-w-full" : r.maxW
				}, i.id))
			}, r.key))
		}), acc.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-3",
			children: acc.slice(0, 4).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-[18%] min-h-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					item: i,
					maxW: "max-w-full"
				})
			}, i.id))
		})]
	});
}
//#endregion
export { OutfitBoard as t };
