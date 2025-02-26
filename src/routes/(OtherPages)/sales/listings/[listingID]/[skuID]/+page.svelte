
<script>
  	import { page } from '$app/state';
	import SkuEditor from '$lib/components/sellerDashboard/SkuEditor.svelte';
		import { selectedListing } from '$lib/account.svelte.js';
	let { data } = $props();
	
	let selectedSKU = $state();
	selectedListing.listing.skus.forEach(sku => {
		if (sku.id === page.params.skuID) {
			selectedSKU = sku;
		}
	})
	
	

</script>

{#key selectedSKU.id}
	<SkuEditor sku={selectedSKU} listingVariantOptions={data.listing.skuOptions}  />
{/key}
