import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as supabase } from "./client-DPL8uosI.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as User, h as MessageCircle, p as Plus, u as Shirt, v as Layers } from "../_libs/lucide-react.mjs";
import { h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-Cu-94L5r.js
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "Guardaroba",
		icon: Shirt
	},
	{
		to: "/crea-outfit",
		label: "Outfit",
		icon: Plus
	},
	{
		to: "/outfit",
		label: "Salvati",
		icon: Layers
	},
	{
		to: "/chat",
		label: "Chat AI",
		icon: MessageCircle
	}
];
function useProfile() {
	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) return null;
			const { data } = await supabase.from("profiles").select("*").eq("id", u.user.id).maybeSingle();
			return {
				id: u.user.id,
				email: u.user.email ?? "",
				display_name: data?.display_name ?? u.user.email?.split("@")[0] ?? ""
			};
		}
	});
}
function AppShell() {
	const { data: profile } = useProfile();
	const initial = (profile?.display_name || "?").charAt(0).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-28 md:pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "text-lg font-extrabold tracking-tight text-foreground md:text-xl",
							children: ["Armadio", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 rounded-full bg-secondary p-1 md:flex",
							children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: n.to,
								activeOptions: { exact: true },
								className: "rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground",
								activeProps: { className: "bg-primary !text-primary-foreground shadow-sm" },
								children: n.label
							}, n.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/profilo",
							"aria-label": "Profilo e impostazioni",
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground md:h-10 md:w-10 md:text-base",
							children: initial
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto min-w-0 max-w-6xl overflow-x-hidden px-4 py-4 md:py-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-lg md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-md items-center justify-around px-2 py-1.5",
					children: [...NAV, {
						to: "/profilo",
						label: "Profilo",
						icon: User
					}].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: n.to,
						activeOptions: { exact: true },
						className: "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-bold text-muted-foreground",
						activeProps: { className: "!text-primary" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-5 w-5" }), n.label]
					}, n.to))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[env(safe-area-inset-bottom)]" })]
			})
		]
	});
}
//#endregion
export { useProfile as n, AppShell as t };
