import { browser } from '$app/environment';
import { GET, POST } from '$lib/api/core.js';
import { enrichBasket } from '$lib/api/transactions.js';

const createBasket = () => {
	let basket = $state({items: {}, total:0, value:0});
	// Init state
	if (browser) {
		try {
			const localBasket = localStorage?.getItem('basket');
			if (localBasket) {
				basket = JSON.parse(localBasket);
			}
		} catch (error) {
			basket = {items: {}, total:0, value:0};
		}
	}


	// Save basket to local storage on change
	function saveBasketLocally() {
		localStorage?.setItem('basket', JSON.stringify(basket));
	}


	// Add and remove items from basket
	function addSKU(sku, parentListingID) {
		if (basket.items[sku.id]) {
			basket.items[sku.id].quantity++
		} else {
			basket.items[sku.id] = { quantity: 1 };
		}
		basket.total++;

		saveBasketLocally();
	}

	function removeSKU(sku) {
		const item = basket.items[sku.id];
		if (item.quantity > 1) {
			item.quantity--
		} else {
			delete basket.items[sku.id];
		}
		basket.total--;
		saveBasketLocally();
	}

	function loadBasketContent() {
		// Fetch basket content from server

		if (basket.total === 0) {
			return;
		}

		enrichBasket(JSON.parse(localStorage.getItem('basket')))
			.then((response) => {
				basket = response.data;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return {
		get basket() {
			return basket;
		},
		addSKU,
		removeSKU,
		loadBasketContent,
	}

}

export const basketStore = createBasket();