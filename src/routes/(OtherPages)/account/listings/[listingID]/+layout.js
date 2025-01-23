import { fetchListing } from '$lib/api/listings.js';
import { selectedListing } from '$lib/account.svelte.js';

export const load = async ({ params }) => {
  const { listingID } = params;
  const listingData = await fetchListing(listingID, true).then((data) => {

    if (!data.data) {
      // Handles SSR not having access to the listing as it isn't authed
      selectedListing.listing = {
        id: '',
        title: '',
        description: '',
        public: false,
        category: '',
        subCategory: '',
        skuOptions: {},
        skus: [],
      }
      return {
        data: selectedListing.listing
      }
    }

    selectedListing.listing = data.data;
    return data;}).catch((error) => {
      return error;
    });

  return {
    listing: {
      ...listingData.data
    }
  };
};