import { fetchListing } from '$lib/api/listings.js';

export const load = async ({ params }) => {
  const { listingID } = params;
  const listingData = await fetchListing(listingID, true);
  return {
    listing: {
      ...listingData.data
    }
  };
};