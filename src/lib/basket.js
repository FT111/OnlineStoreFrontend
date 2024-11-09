import { writable } from 'svelte/store';

const createBasket = () => {
	// Creates a reactive svelte writable store - {items: {sku.id: {sku, quantity}, total: 0}}
	const { subscribe, set, update } = writable({'items': {}, 'total': 0});

	// Load basket from local storage
	set(basket => {
		if (localStorage.getItem('basket')) {
			return JSON.parse(localStorage.getItem('basket'));
		}
		return basket;
	});

	// Save basket to local storage on every change
	subscribe(basket => {
		localStorage.setItem('basket', JSON.stringify(basket));
	})

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

export const basket = createBasket();