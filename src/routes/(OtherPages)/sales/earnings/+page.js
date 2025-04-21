import { getUserOrders } from '$lib/api/transactions.js';
import { browser } from '$app/environment';


export const load = async ({parent}) => {
	const {user} = await parent()

	if (!browser) {
		return {
			orders: []
		}
	}

	let orders = await getUserOrders(user.id);
	return {
		user: user,
		orders: orders.data,
	};
}