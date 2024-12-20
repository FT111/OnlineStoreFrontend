
<script>
  	import { page } from '$app/stores';
	import SkuEditor from '$lib/components/dashboardCards/SkuEditor.svelte';
	export let data;
	
	let selectedSKU;
	data.listing.skus.forEach(sku => {
		if (sku.id === $page.params.skuID) {
			selectedSKU = sku;
		}
	})
	
	

</script>

{#key selectedSKU.id}
	<SkuEditor sku={selectedSKU}  />
{/key}
