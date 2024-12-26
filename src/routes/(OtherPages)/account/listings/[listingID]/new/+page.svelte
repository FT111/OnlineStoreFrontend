
<script>
	import SkuEditor from '$lib/components/sellerDashboard/SkuEditor.svelte';
	export let data;
	
</script>

<SkuEditor listingVariantOptions={data.listing.skuOptions} />