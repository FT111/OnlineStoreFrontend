
<script>
  	import { page } from '$app/stores';
	import SkuEditor from '$lib/components/dashboardCards/SkuEditor.svelte';
	export let data;
	
	const selectedSKU = data.listing.skus.find((sku) => sku.id === $page.params.skuID);
	
</script>

{selectedSKU}
<SkuEditor sku={selectedSKU} />