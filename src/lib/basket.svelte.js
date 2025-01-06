import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const createBasket = () => {
	// Creates a reactive svelte writable store - {items: {sku.id: {sku, quantity}, total: 0}}
	const { subscribe, set, update } = writable({items: {}, total: 0});

	if (browser) {
		// Load basketSvelte from local storage
		const basket = localStorage.getItem('basketSvelte');
		try {
			// set(JSON.parse(basketSvelte));
		}
		catch (e) {
			localStorage.removeItem('basketSvelte');
			set({items: {}, total: 0});
		}


		// Save basketSvelte to local storage
		subscribe(value => {
			localStorage.setItem('basketSvelte', JSON.stringify(value));
		});
	}

	return {
		subscribe,
		addItem: (sku) => {
			update(basket => {
				if (basket.items[sku.id]) {
					basket.items[sku.id].quantity++
				} else {
					basket.items[sku.id] = { ...sku, quantity: 1 };
				}
				basket.total += sku.price;

				return basket;
			});
		},
		removeItem: (sku) => {
			update(basket => {
				const item = basket.items[sku];
				if (item.quantity > 1) {
					item.quantity--
				} else {
					delete basket.items[sku];
				}
				basket.total -= item.price;

				return basket;
			});
		},
	}

}

export const basketSvelte = createBasket();