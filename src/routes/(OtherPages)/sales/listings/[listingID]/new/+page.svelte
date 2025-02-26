
<script>
	import SkuEditor from '$lib/components/sellerDashboard/SkuEditor.svelte';
	let { data } = $props();
	
</script>

<SkuEditor listingVariantOptions={data.listing.skuOptions} />