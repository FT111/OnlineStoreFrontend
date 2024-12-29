
import { fetchUserListings } from '$lib/api/listings.js';


export const load = async ({ parent }) => {
	const data = await parent()

	const userListingData = await fetchUserListings(data.user.id, true)

	return {
		userListings: userListingData.data
	}

}