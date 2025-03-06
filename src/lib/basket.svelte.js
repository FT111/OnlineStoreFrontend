import { browser } from '$app/environment';
import { GET, POST } from '$lib/api/core.js';
import { enrichBasket } from '$lib/api/transactions.js';

const createBasket = () => {
	let basket = $state({ items: {}, total: 0, value: 0, enriched: false });
	// Init state
	if (browser) {
		try {
			const localBasket = localStorage?.getItem('basket');
			if (localBasket) {
				basket = JSON.parse(localBasket);
			}
		} catch (error) {
			basket = { items: {}, total: 0, value: 0 };
		}
	}


	// Save basket to local storage on change
	function saveBasketLocally() {
		localStorage?.setItem('basket', JSON.stringify(basket));
	}


	// Add and remove items from basket
	async function addSKU(sku) {
		// Return a promise to orchestrate the UI
		return new Promise((resolve, reject) => {
			// Guard clauses - check if SKU exists
			if (!sku) {
				reject('SKU not found');
				return;
			}
			// Guard clause - Check if SKU in stock
			if (sku.stock <= 0) {
				reject('SKU out of stock');
				return;
			}

			if (basket.items[sku.id]) {
				// Guard clause - check if SKU has sufficient stock
				if (basket.items[sku.id].quantity >= sku.stock) {
					reject('SKU out of stock');
					return;
				}

				basket.items[sku.id].quantity++
			} else {
				basket.items[sku.id] = { quantity: 1 };
			}
			basket.total++;
			basket.value += sku.price;
			basket.enriched = false;
			saveBasketLocally();
			resolve();
		});
	}

	function removeSKU(sku) {
		const item = basket.items[sku.id];
		if (item.quantity > 1) {
			item.quantity--
		} else {
			delete basket.items[sku.id];
		}
		basket.total--;
		basket.value -= sku.price;
		saveBasketLocally();
	}

	async function loadBasketContent() {
		if (basket.total === 0 || basket.items.length === 0) {
			console.log('Basket is empty');
			return;
		}

		// Fetch basket content from server
		return new Promise((resolve, reject) => {
			enrichBasket(JSON.parse(localStorage.getItem('basket')))
				.then((response) => {
					basket = { ...response.data, ...response.meta, enriched: true };
					resolve(basket);
				})
				.catch((error) => {
					console.error(error);
					reject(error);
				});
		});
	}

	return {
		get basket() {
			return basket;
		},
		addSKU,
		removeSKU,
		loadBasketContent,
		clearBasket() {
			basket = { items: {}, total: 0, value: 0 };
			saveBasketLocally();
		}
	}

}

export const basketStore = createBasket();