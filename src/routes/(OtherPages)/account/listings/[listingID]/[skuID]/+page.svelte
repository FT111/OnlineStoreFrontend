
<script>
  	import { page } from '$app/stores';
	import SkuEditor from '$lib/components/dashboardCards/SkuEditor.svelte';
	export let data;
	
	$: selectedSKU = data.listing.skus.find(sku => sku.id ===  Number($page.params.skuID));
	
</script>

{#key selectedSKU.id}
	<SkuEditor sku={selectedSKU} />
{/key}