<script>
import ListingsSidebar from '$lib/components/listingsSidebar.svelte'
</script>

<div class="w-full h-full flex flex-row">
	<ListingsSidebar />
	
	<slot class="grow" />
</div>
