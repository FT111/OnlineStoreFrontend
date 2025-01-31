import { browser } from '$app/environment';
import { basketStore } from '$lib/basket.svelte.js';


export const load = async ({url, locals, parent}) => {
	if (browser) {
		await basketStore.loadBasketContent()
	}

	const { user } = await parent()

	return {
		'params': url,
		'user': user,
	}
}