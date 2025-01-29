import { browser } from '$app/environment';
import { basketStore } from '$lib/basket.svelte.js';


export const load = async ({url}) => {
	if (browser) {
		await basketStore.loadBasketContent()
	}

	return {
		'params': url
	}
}