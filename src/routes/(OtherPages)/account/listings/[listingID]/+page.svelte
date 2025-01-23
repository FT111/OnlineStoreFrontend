<script>
	import ListingEditor from '$lib/components/sellerDashboard/ListingEditor.svelte';
	import {selectedListing} from '$lib/account.svelte.js';
	import { onMount } from 'svelte';
	
	let { data } = $props();
	let listing = selectedListing.listing
	selectedListing.listing = data.listing;

	
</script>

{#key listing.id}
	<ListingEditor />
{/key}
