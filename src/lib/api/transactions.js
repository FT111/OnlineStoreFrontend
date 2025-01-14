import { POST } from '$lib/api/core.js';

export const enrichBasket = async (basket) => {
	return POST('transactions/basket/enrich', JSON.stringify(basket))
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
		});
}