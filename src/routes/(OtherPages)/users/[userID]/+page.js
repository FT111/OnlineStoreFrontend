
import { getUserByID } from '$lib/api/user.js';
import { fetchListings } from '$lib/api/listings.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const user = await getUserByID(params['userID']);

	if (!user.data) {
		error(404, 'User not found');
	}
	return {
		profileUser: {
			...user.data
		}
	}
}