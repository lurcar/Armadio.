//#region node_modules/.nitro/vite/services/ssr/assets/theme-D7qhl2id.js
var KEY = "armadio-theme";
function getTheme() {
	if (typeof window === "undefined") return "light";
	return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
}
function setTheme(t) {
	localStorage.setItem(KEY, t);
	document.documentElement.classList.toggle("dark", t === "dark");
}
/** Inline script run before paint so the saved background doesn't flash. */
var themeScript = `try{if(localStorage.getItem('${KEY}')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;
//#endregion
export { setTheme as n, themeScript as r, getTheme as t };
