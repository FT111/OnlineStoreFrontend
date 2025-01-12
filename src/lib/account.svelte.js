import { fetchListing } from '$lib/api/listings.js';
//
// const createListing = () => {
// 	 let value = $state({
// 		 id: null,
// 		 title: '',
// 		 description: '',
// 		 public: false,
// 		 category: '',
// 		 subCategory: '',
// 		 skuOptions: {},
// 		 skus: [],
// 	 })
//
// 	 const refresh = async () => {
// 		 if (value.id) {
// 			 value = await fetchListing(value.id, true);
// 		 }
// 	 }
//
// 	 return {
// 		 get() {
// 			 return value;
// 		 },
// 		 set(v) {
// 			 value = v;
// 		 }
// 	 }
//  }
//
// export let selectedListing = createListing();
export let selectedListing = $state({listing: {
		id: null,
		title: '',
		description: '',
		public: false,
		category: '',
		subCategory: '',
		skuOptions: {},
		skus: [],
	}
});

export const refreshSelectedListing = async () => {
	if (selectedListing.listing.id) {
		selectedListing.listing = await fetchListing(selectedListing.listing.id, true);
	}
}