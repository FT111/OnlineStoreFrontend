import { fetchListing } from '$lib/api/listings.js';
import { selectedListing } from '$lib/account.svelte.js';

export const load = async ({ params }) => {
  const { listingID } = params;
  const listingData = await fetchListing(listingID, true);

  selectedListing.listing = listingData.data;

  return {
    listing: {
      ...listingData.data
    }
  };
};