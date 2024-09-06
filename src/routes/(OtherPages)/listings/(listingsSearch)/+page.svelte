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


<div class="mt-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full p-1 sm:p-4 md:p-8 md:px-7 justify-left">
	{#key [query, category, subCategory, sort, order]}
		{#await queryListings(query, category, subCategory, sort, order)}
			{#each Array.from({ length: 20 }) as _, i}
				<Listing isLoading={true} />
			{/each}
		{:then data}
			{#if data.data.length === 0}
				<div class="col-span-full p-16 flex flex-row gap-4 justify-center">
					<p class="text-5xl text-center"> No listings found  <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
</svg>
</span>
					</p>
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