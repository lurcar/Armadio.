import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crea-outfit-BGwT5D5p.js
var $$splitComponentImporter = () => import("./crea-outfit-B26sDeo9.mjs");
var Route = createFileRoute("/_authenticated/crea-outfit")({
	validateSearch: objectType({ id: stringType().optional() }),
	head: () => ({ meta: [{ title: "Crea Outfit — Armadio" }, {
		name: "description",
		content: "Combina i tuoi capi e salva un nuovo outfit."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
