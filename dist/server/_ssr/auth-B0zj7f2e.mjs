import { r as __toESM } from "../_runtime.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as supabase } from "./client-DPL8uosI.mjs";
import { t as Button } from "./button-CCQEfgNs.mjs";
import { t as Input } from "./input-DoD5W07l.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-B0zj7f2e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			if (mode === "in") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				navigate({
					to: "/",
					replace: true
				});
			} else {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: window.location.origin }
				});
				if (error) throw error;
				if (data.session) navigate({
					to: "/",
					replace: true
				});
				else toast.success("Controlla la tua email per confermare l'account.");
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Errore di accesso");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "w-full max-w-sm space-y-5 rounded-3xl border border-border bg-card p-8 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-3xl font-extrabold text-foreground",
						children: ["Armadio", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: mode === "in" ? "Entra nel tuo guardaroba" : "Crea il tuo account"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "email",
					required: true,
					placeholder: "Email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					className: "h-12 rounded-full px-5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "password",
					required: true,
					minLength: 6,
					placeholder: "Password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					className: "h-12 rounded-full px-5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: loading,
					className: "h-12 w-full rounded-full text-base font-bold",
					children: loading ? "Attendi…" : mode === "in" ? "Accedi" : "Registrati"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode(mode === "in" ? "up" : "in"),
					className: "w-full text-center text-sm font-semibold text-primary",
					children: mode === "in" ? "Non hai un account? Registrati" : "Hai già un account? Accedi"
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
