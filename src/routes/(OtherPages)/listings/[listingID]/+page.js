import { fetchListing } from '$lib/api/listings.js';

export const load = async ({ params }) => {
	const { listingID } = params;
	return fetchListing(listingID).then((listingData) => {
		return {
			listing : {
				...listingData.data
			}
		}
	});
};