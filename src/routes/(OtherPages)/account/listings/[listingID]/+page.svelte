<script>
	import ListingEditor from '$lib/components/sellerDashboard/ListingEditor.svelte';
	
	let { data } = $props();
</script>

{#key data.listing.id}
	<ListingEditor listing={data.listing} />
{/key}
