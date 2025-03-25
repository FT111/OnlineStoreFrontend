import { fetchListing } from '$lib/api/listings.js';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
  const { listingID } = params;
  const listingData = await fetchListing(listingID);
  if (!listingData.data) {
    error(404, 'Listing not found');
  }

  return {
    listing: {
      ...listingData.data
    }
  };
};