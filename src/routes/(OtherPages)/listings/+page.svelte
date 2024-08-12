<script>
  import { page } from '$app/stores';
  
import { queryListings } from '$lib/api/listings.js';
import Listing from '$lib/components/listing.svelte';
	import { elasticIn } from 'svelte/easing';


const query = $page.url.searchParams.get('query') || '';
</script>


<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-3 w-full p-1 sm:p-4 md:p-8 md:px-7 justify-left">
	{#await queryListings(query)}
		{#each Array.from({ length: 20 }) as _, i}
			<Listing isLoading={true} />
		{/each}
	{:then data}
		{#if data.data.length === 0}
			<div class="col-span-full p-16">
				<p class="text-5xl text-center">No listings found</p>
			</div>
		{:else}
			{#each data.data as listing}
				<Listing listingName={listing.title} listingPrice={listing.basePrice} userName={listing.ownerUser.username} userRating={listing.ownerUser.rating} listingRating={listing.rating} userAvatarUrl={listing.ownerUser.profilePictureURL} listingDescription={listing.description} editMode={false} />
			{/each}
		{/if}
	{:catch error}
		<p>{error.message}</p>
	{/await}

</div>