<script>
import { page } from '$app/stores';
export let data;

import { queryListings } from '$lib/api/listings.js';
import Listing from '$lib/components/listing.svelte';
import ListingCarousel from '$lib/components/listingCarousel.svelte';
import CategoryHeader from '$lib/components/categoryHeader.svelte';
import { elasticIn } from 'svelte/easing';
import { getContext } from 'svelte';
import { Separator } from '$lib/components/ui/separator/index.js';
import { Slider } from '$lib/components/ui/slider/index.js';

import ListingsSidebar from '$lib/components/listingsSidebar.svelte'
import Dropdown from '$lib/components/dropdown.svelte';
import * as Resizable from "$lib/components/ui/resizable/index.js";

import { onMount, setContext } from 'svelte';
import { fetchCategories, fetchCategory } from '$lib/api/categories.js'
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { formQueryURL } from '$lib/utils.js';
import { Skeleton } from '$lib/components/ui/skeleton/index.js';

let categories = [];
let subCategories = [];
const sorts = ['None', 'Price', 'Rating', 'Views'];
const orders = ['Asc.', 'Desc.'];

let query = $page.url.searchParams.get('query') || '';
let selectedCategory = $page.url.searchParams.get('category') || undefined;
let selectedSubcategory = $page.url.searchParams.get('subCategory') || undefined;
let selectedSort = $page.url.searchParams.get('sort');
let selectedOrder = $page.url.searchParams.get('order') || 'asc';

let showCategoryHeader = $page.url.searchParams.get('showCategoryHeader') === 'true';

switch (selectedOrder) {
	case 'asc': {
		selectedOrder = 'Asc.'
		break
	}
	case 'desc': {selectedOrder = 'Desc.'}
}

// Fetches categories for the dropdown
onMount(() => {
	fetchCategories().then((data) => {
		categories.push('All Categories')
		for (let i = 0; i < data.data.length; i++) {
			categories.push(data.data[i].title)}
	})


})
// Resets subcategories when category is changed
$: if (selectedCategory) {
	subCategories = []
}

// Fetches subcategories based on selected category
$: if (selectedCategory !== 'All Categories' && selectedCategory !== 'Categories' && selectedCategory !== undefined) {
	fetchCategory(selectedCategory).then((data) => {
		subCategories.push('All Sub Categories')
		for (let i = 0; i < data.data['subCategories'].length; i++) {
			subCategories.push(data.data['subCategories'][i].title)}
	})
}

// Navigates to the listings page with the selected category, subcategory, and sort whenever the params are changed

const refineListings = () => {
		goto(formQueryURL(query, selectedCategory, selectedSubcategory, selectedSort, selectedOrder));
}



// TESTING
let slider1Value = [10];
let slider2Value = 10;


$: console.log(selectedCategory, selectedSubcategory, selectedSort, selectedOrder)
</script>

<div class="w-full h-full flex flex-row">
	<ListingsSidebar>
		<div class="flex flex-row gap-2 w-full pt-20">
			<Dropdown clickAction={refineListings} title="Sort" subtitle="Select a sort" options={ sorts } bind:value={selectedSort} />
			<Dropdown clickAction={refineListings} title="Order" subtitle="Select an order" options={ orders } bind:value={selectedOrder} />
		</div>
		<Separator />
		
		<Dropdown clickAction={refineListings}  title="Categories" subtitle="Select a category" options={ categories } bind:value={selectedCategory} />
		{#key selectedCategory}
			<Dropdown on:click={refineListings}  title="Sub Categories" subtitle="Select a sub category" options={ subCategories } bind:value={selectedSubcategory} />
		{/key}
		
		<Separator class="opacity-0" />
		
		<div class="flex flex-col p-2 gap-1 rounded-md bg-muted-foreground/5">
			<Dropdown title="Relevant filter 1" subtitle="Select a sub category" options={ subCategories }  />
			<Dropdown title="Relevant filter 2" subtitle="Select a sub category" options={ subCategories }  />
			<Dropdown title="Relevant filter 3" subtitle="Select a sub category" options={ subCategories }  />
			
			<div class="py-2 px-4 rounded-md flex flex-col gap-0 outline outline-1 outline-muted-foreground/10 bg-white">
				<p class="text-xs font-medium">Relevant filter 4</p>
				<div class="flex flex-row gap-4">
					<Slider class="basis-10/12" bind:value={slider1Value} />
					<p class="basis-2/12 text-center">{slider1Value}</p>
				</div>
			</div>
			
			<Dropdown title="Relevant filter 5" subtitle="Select a sub category" options={ subCategories }  />
		</div>
	
	</ListingsSidebar>
	

<!--	Listings   -->
	<div class="mt-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full p-1 sm:p-4 md:p-8 md:px-7 justify-left">
	
<!--	Category Header	-->
		{#key selectedCategory}
			{#if showCategoryHeader}
				<!--Header Container-->
				{#await fetchCategory(selectedCategory)}
					<CategoryHeader isLoading={true} />
				{:then data}
					<CategoryHeader title={data.data['title']} description={data.data['description']}>
						<div class="py-8">
							<ListingCarousel compactLayout={true} title="Top deals in {data.data['title']}" />
							<ListingCarousel compactLayout={true} title="New arrivals in {data.data['title']}" />
						</div>
					</CategoryHeader>
				{:catch error}
					<p>{error.message}</p>
				{/await}
			{/if}
		{/key}
		
		<!-- Listings -->
		{#key [query, selectedCategory, selectedSubcategory, selectedSort, selectedOrder]}
			{#await queryListings(query, selectedCategory, selectedSubcategory, selectedSort, selectedOrder)}
				{#each Array.from({ length: 20 }) as _, i}
					<Listing isLoading={true} />
				{/each}

			{:then data}
				{#if data.data.length === 0}
					<div class="col-span-full p-16 flex flex-row gap-4 justify-center">
						<p class="text-5xl text-center"> No listings found
						</p>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
						</svg>
					
					</div>
				{:else}
					{#each data.data as listing}
						<Listing listingName={listing.title} listingPrice={listing.basePrice} userRating={listing.ownerUser.rating} listingRating={listing.rating} userAvatarUrl={listing.ownerUser.profilePictureURL} listingDescription={listing.description} multipleSKUs={listing.multipleSKUs} editMode={false} />
					{/each}
				{/if}
			{:catch error}
				<p>{error.message}</p>
			{/await}
		{/key}
	
	</div>
</div>