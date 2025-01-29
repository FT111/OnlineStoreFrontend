import { browser } from '$app/environment';
import { basketStore } from '$lib/basket.svelte.js';


export const load = async () => {
	if (browser) {
		await basketStore.loadBasketContent()
	}
}