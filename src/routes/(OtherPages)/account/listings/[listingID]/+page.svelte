<script>
	import ListingEditor from '$lib/components/sellerDashboard/ListingEditor.svelte';
	
	let { data } = $props();
	let listing = $derived(data.listing);
</script>

{#key listing.id}
	<ListingEditor listing={listing} />
{/key}
