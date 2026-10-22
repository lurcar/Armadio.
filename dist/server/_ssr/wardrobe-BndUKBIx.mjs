import { n as supabase } from "./client-DPL8uosI.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wardrobe-BndUKBIx.js
var CATEGORIES = [
	{
		value: "giubbotti",
		label: "Giubbotti"
	},
	{
		value: "felpe",
		label: "Felpe"
	},
	{
		value: "maglie",
		label: "Maglie"
	},
	{
		value: "pantaloni",
		label: "Pantaloni"
	},
	{
		value: "scarpe",
		label: "Scarpe"
	},
	{
		value: "accessori",
		label: "Accessori"
	}
];
var categoryLabel = (c) => CATEGORIES.find((x) => x.value === c)?.label ?? c;
var itemsQuery = {
	queryKey: ["items"],
	queryFn: async () => {
		const { data, error } = await supabase.from("items").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data;
	}
};
var outfitsQuery = {
	queryKey: ["outfits"],
	queryFn: async () => {
		const { data, error } = await supabase.from("outfits").select("*, outfit_items(item_id)").order("created_at", { ascending: false });
		if (error) throw error;
		return data.map(({ outfit_items, ...o }) => ({
			...o,
			item_ids: outfit_items.map((x) => x.item_id)
		}));
	}
};
function useItems() {
	return useQuery(itemsQuery);
}
function useOutfits() {
	return useQuery(outfitsQuery);
}
/** Signed URLs for all item photos, keyed by image_path. */
function useImageUrls(items) {
	const paths = (items ?? []).map((i) => i.image_path).sort();
	return useQuery({
		queryKey: ["signed", paths],
		enabled: paths.length > 0,
		staleTime: 3e6,
		queryFn: async () => {
			const { data, error } = await supabase.storage.from("wardrobe").createSignedUrls(paths, 3600);
			if (error) throw error;
			const map = {};
			data.forEach((d) => {
				if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
			});
			return map;
		}
	});
}
async function saveOutfit(input) {
	let id = input.id;
	if (id) {
		const { error } = await supabase.from("outfits").update({
			name: input.name,
			occasion: input.occasion,
			notes: input.notes ?? null
		}).eq("id", id);
		if (error) throw error;
		const { error: delErr } = await supabase.from("outfit_items").delete().eq("outfit_id", id);
		if (delErr) throw delErr;
	} else {
		const { data, error } = await supabase.from("outfits").insert({
			name: input.name,
			occasion: input.occasion,
			notes: input.notes ?? null
		}).select("id").single();
		if (error) throw error;
		id = data.id;
	}
	const { error } = await supabase.from("outfit_items").insert(input.item_ids.map((item_id) => ({
		outfit_id: id,
		item_id
	})));
	if (error) throw error;
	return id;
}
//#endregion
export { useItems as a, useImageUrls as i, categoryLabel as n, useOutfits as o, saveOutfit as r, CATEGORIES as t };
