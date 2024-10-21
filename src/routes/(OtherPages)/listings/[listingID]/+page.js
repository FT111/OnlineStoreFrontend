import { fetchListing } from '$lib/api/listings.js';

export const load = async ({ params }) => {
  const { listingID } = params;
  const listingData = await fetchListing(listingID);
  return {
    listing: {
      ...listingData.data
    }
  };
};