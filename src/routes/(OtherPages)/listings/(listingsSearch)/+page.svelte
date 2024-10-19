<script>
import { page } from '$app/stores';
export let data;

import { queryListings } from '$lib/api/listings.js';
import Listing from '$lib/components/listing.svelte';
import ListingCarousel from '$lib/components/listingCarousel.svelte';
import CategoryHeader from '$lib/components/categoryHeader.svelte';
import { elasticIn } from 'svelte/easing';
import { getContext } from 'svelte';
import {afterNavigate} from '$app/navigation';
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
import { Badge } from '$lib/components/ui/badge/index.js';

let categories = [];
let subCategories = [];
const sorts = ['None', 'Price', 'Rating', 'Views'];
const orders = ['Asc.', 'Desc.'];


let query = $page.url.searchParams.get('query') || '';
let selectedCategory = $page.url.searchParams.get('category') || undefined;
let selectedSubcategory = $page.url.searchParams.get('subCategory') || undefined;
let selectedSort = $page.url.searchParams.get('sort');
let selectedOrder = $page.url.searchParams.get('order') || 'asc';

const filterTitles = ['Categories', 'Sub Categories', 'Sort', 'Order'];
$: filters = [query, selectedCategory, selectedSubcategory, selectedSort, selectedOrder];
$: selectedFilters = filters.filter((filter) => filter !== undefined);

let showCategoryHeader = false;
switch (selectedOrder) {
	case 'asc': {
		selectedOrder = 'Asc.'
		break
	}
	case 'desc': {selectedOrder = 'Desc.'}
}

afterNavigate(() => {
	showCategoryHeader = $page.url.searchParams.get('showCategoryHeader') === 'true';
})

onMount(() => {
	// Fetches categories for the 'Categories' dropdown
	fetchCategories().then((data) => {
		categories.push('All Categories')
		for (let i = 0; i < data.data.length; i++) {
			categories.push(data.data[i].title)}
	})


})
// Resets subcategories when category is changed
$: if (selectedCategory) {
	subCategories = []
  	selectedSubcategory = 'All Sub Categories'
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
	
<!--		Spacer -->
		<div class="h-20" />
	
<!--	Quick filters container	-->
		<div class="bg-slate-200 rounded-lg flex flex-col">
			<p class="text-sm font-medium p-1.5 px-2.5">Applied Filters</p>
			<div class="flex flex-row flex-wrap gap-2 border border-slate-200 rounded-b-lg w-full p-3 min-h-24 bg-white">
				{#each selectedFilters as filter, i}
					{#if filter !== 'All Categories' && filter !== 'Categories' && filter !== 'All Sub Categories' && filter !== undefined && filter !== '' && filter !== null}
						<Badge class="min-w-12 text-xs font-normal h-fit p-1.5 px-3 ">
							{filter}
						</Badge>
					{/if}
				{/each}
			</div>
		</div>
		<Separator />
		
		<div class="flex flex-row gap-2 w-full ">
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
	<div class="mt-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full p-1 sm:p-4 md:p-8 md:px-4 justify-left">
	
<!--	Category Header	-->
		{#key selectedCategory}
			{#if showCategoryHeader && selectedCategory !== 'All Categories' && selectedCategory !== 'Categories' && selectedCategory !== undefined}
				<!--Header Container-->
				{#await fetchCategory(selectedCategory)}
					<CategoryHeader isLoading={true} categoryColour='#0f172a'>

					</CategoryHeader>
				{:then categoryData}
					<CategoryHeader title={categoryData.data['title']} description={categoryData.data['description']} categoryColour={'#'+categoryData.data['colour']}>
						<div class="py-8">
							<ListingCarousel compactLayout={true} title="Top deals in {categoryData.data['title']}" />
							<ListingCarousel compactLayout={true} title="New arrivals in {categoryData.data['title']}" />
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
				{#each Array.from({ length: 40 }) as _, i}
					<Listing isLoading={true} />
				{/each}

			{:then data}
				{#if data.data.length === 0}
					<div class="col-span-full p-16 flex flex-row gap-4 justify-center">
						<p class="text-5xl text-center"> No listings found
						</p>
					
					</div>
				{:else}
					{#each data.data as listing}
						<Listing listingName={listing.title} listingPrice={listing.basePrice} userRating={listing.ownerUser.rating}
								 listingRating={listing.rating} userAvatarUrl={listing.ownerUser.profilePictureURL}
								 listingDescription={listing.description} multipleSKUs={listing.multipleSKUs}
								 editMode={false} hasDiscount={listing.hasDiscount} userID={listing.ownerUser.id} />
					{/each}
				{/if}
			{:catch error}
				<p>{error.message}</p>
			{/await}
		{/key}
	
	</div>
</div>