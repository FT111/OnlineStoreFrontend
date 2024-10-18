
import { getUserByID } from '$lib/api/user.js';
import { fetchListings } from '$lib/api/listings.js';

export const load = async ({ params }) => {
	const user = await getUserByID(params['userID']);
	return {
		profileUser: {
			...user.data
		}
	}
}