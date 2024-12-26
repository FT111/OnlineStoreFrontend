<script>
	import ListingEditor from '$lib/components/sellerDashboard/ListingEditor.svelte';
	
	export let data;
</script>

{#key data.listing.id}
	<ListingEditor listing={data.listing} />
{/key}
