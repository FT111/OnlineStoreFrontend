<script>
import { page } from '$app/stores';
export let data;

import { queryListings } from '$lib/api/listings.js';
import Listing from '$lib/components/listing.svelte';
import { elasticIn } from 'svelte/easing';
import { getContext } from 'svelte';


let query;
let category;
let subCategory;
let sort;

$: query = $page.url.searchParams.get('query') || '';
$: category = $page.url.searchParams.get('category') || undefined;
$: subCategory = $page.url.searchParams.get('subCategory') || undefined;
$: sort = $page.url.searchParams.get('sort') || undefined;
$: order = $page.url.searchParams.get('order') || undefined;
</script>


<div class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-3 w-full p-1 sm:p-4 md:p-8 md:px-7 justify-left">
	{#key [query, category, subCategory, sort, order]}
		{#await queryListings(query, category, subCategory, sort, order)}
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
					<Listing listingName={listing.title} listingPrice={listing.basePrice} userName={listing.ownerUser.username} userRating={listing.ownerUser.rating} listingRating={listing.rating} userAvatarUrl={listing.ownerUser.profilePictureURL} listingDescription={listing.description} multipleSKUs={listing.multipleSKUs} editMode={false} />
				{/each}
			{/if}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	{/key}
</div>