import { r as __toESM } from "../_runtime.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as supabase } from "./client-DPL8uosI.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { a as useItems, o as useOutfits } from "./wardrobe-BndUKBIx.mjs";
import { r as cn, t as Button } from "./button-CCQEfgNs.mjs";
import { t as Input } from "./input-DoD5W07l.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useProfile } from "./AppShell-Cu-94L5r.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as setTheme, t as getTheme } from "./theme-D7qhl2id.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profilo-CF99Svfd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const { data: profile } = useProfile();
	const { data: items } = useItems();
	const { data: outfits } = useOutfits();
	const [name, setName] = (0, import_react.useState)("");
	const [theme, setThemeState] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		setThemeState(getTheme());
	}, []);
	(0, import_react.useEffect)(() => {
		if (profile) setName(profile.display_name);
	}, [profile]);
	async function saveName() {
		if (!profile) return;
		const { error } = await supabase.from("profiles").upsert({
			id: profile.id,
			display_name: name.trim().slice(0, 60)
		});
		if (error) {
			toast.error("Errore");
			return;
		}
		toast.success("Nome aggiornato");
		qc.invalidateQueries({ queryKey: ["profile"] });
	}
	function chooseTheme(t) {
		setTheme(t);
		setThemeState(t);
	}
	async function signOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-black text-primary-foreground",
						children: (profile?.display_name || "?").charAt(0).toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-2xl font-black text-foreground",
						children: profile?.display_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: profile?.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid w-full grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-secondary p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-black text-primary",
								children: items?.length ?? 0
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Capi"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-secondary p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-black text-primary",
								children: outfits?.length ?? 0
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-muted-foreground",
								children: "Outfit"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-extrabold text-foreground",
					children: "Nome"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						maxLength: 60,
						className: "h-11 rounded-full px-5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: saveName,
						className: "h-11 rounded-full px-6 font-bold",
						children: "Salva"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-extrabold text-foreground",
					children: "Sfondo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: ["light", "dark"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => chooseTheme(t),
						className: cn("flex items-center gap-3 rounded-2xl border-2 p-4 text-left font-bold text-foreground", theme === t ? "border-primary" : "border-border"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-8 w-8 rounded-full border border-border", t === "light" ? "bg-[oklch(1_0_0)]" : "bg-[oklch(0_0_0)]") }), t === "light" ? "Bianco" : "Nero"]
					}, t))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: signOut,
				className: "h-12 w-full rounded-full font-bold",
				children: "Esci"
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
