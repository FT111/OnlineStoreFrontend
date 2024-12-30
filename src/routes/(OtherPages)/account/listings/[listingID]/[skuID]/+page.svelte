
<script>
  	import { page } from '$app/stores';
	import SkuEditor from '$lib/components/sellerDashboard/SkuEditor.svelte';
	let { data } = $props();
	
	let selectedSKU = $state();
	data.listing.skus.forEach(sku => {
		if (sku.id === $page.params.skuID) {
			selectedSKU = sku;
		}
	})
	
	

</script>

{#key selectedSKU.id}
	<SkuEditor sku={selectedSKU} listingVariantOptions={data.listing.skuOptions}  />
{/key}
