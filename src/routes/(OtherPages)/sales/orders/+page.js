import { getUserOrders } from '$lib/api/transactions.js';
import { browser } from '$app/environment';

export const load = async ({parent}) => {
	// Handles SSR not being authenticated
	if (!browser) {
		return {
			orders: []
		}
	}

	const {user} = await parent()

	let orders = await getUserOrders(user.id);
	return {
		user: user,
		orders: orders.data,
	};
}