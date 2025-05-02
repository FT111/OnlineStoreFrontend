<script>
	import { run } from 'svelte/legacy';

import { page } from '$app/state';

import { queryListings } from '$lib/api/listings.js';
	import Listing from '$lib/components/Listing.svelte';
	import ListingCarousel from '$lib/components/listingCarousel.svelte';
import CategoryHeader from '$lib/components/categoryHeader.svelte';
import { elasticIn } from 'svelte/easing';
import { getContext } from 'svelte';
import {afterNavigate} from '$app/navigation';
import { Separator } from '$lib/components/ui/separator/index.js';
import { Slider } from '$lib/components/ui/slider/index.js';

import Sidebar from '$lib/components/Sidebar.svelte'
import Dropdown from '$lib/components/dropdown.svelte';
import * as Resizable from "$lib/components/ui/resizable/index.js";

import { onMount, setContext } from 'svelte';
import { fetchCategories, fetchCategory } from '$lib/api/categories.js'
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { formQueryURL } from '$lib/utils.js';
import { Skeleton } from '$lib/components/ui/skeleton/index.js';
import { Badge } from '$lib/components/ui/badge/index.js';
	import ListingGrid from '$lib/components/ListingGrid.svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut} from 'svelte/easing';

	let { data } = $props();

let categories = [];
let subCategories = $state([]);
const sorts = ['None', 'Price', 'Rating', 'Views'];
const orders = ['Asc.', 'Desc.'];

// let paramsDict = $state({});
// $effect(() => {
// 	paramsDict = {};
// 	page.url.search.split('&').forEach((param) => {
// 		let [key, value] = param.split('=');
// 		paramsDict[key] = value;
// 	});
// })
//


let query = $state(page.url.searchParams.get('query') || '');
let selectedCategory = $state(page.url.searchParams.get('category') || undefined);
let selectedSubcategory = $state(page.url.searchParams.get('subCategory') || undefined);
let selectedSort = $state(page.url.searchParams.get('sort'));
let selectedOrder = $state(page.url.searchParams.get('order') || 'asc');
// let derivedOrder = $derived.by(()=>{
// 	switch (selectedOrder) {
// 		case 'asc': {
// 			return 'Asc.'
// 		}
// 		case 'desc': {
// 			return 'Desc.'
// 		}
// 	}
// })
let selectedPage = $state(1);

const filterTitles = ['Categories', 'Sub Categories', 'Sort', 'Order'];
let filters = $derived([query, selectedCategory, selectedSubcategory, selectedSort, selectedOrder]);
let selectedFilters = $derived(filters.filter((filter) => filter !== undefined));

let showCategoryHeader = $state(false);
let listings = $state({'meta': {'elapsed': 0, 'total': 0}, 'data': []});

afterNavigate(() => {
	showCategoryHeader = page.url.searchParams.get('showCategoryHeader') === 'true';
	query = page.url.searchParams.get('query') || '';
	selectedCategory = page.url.searchParams.get('category') || undefined;
	selectedSubcategory = page.url.searchParams.get('subCategory') in subCategories ? page.url.searchParams.get('subCategory') : undefined;
	selectedSort = page.url.searchParams.get('sort');
	selectedOrder = page.url.searchParams.get('order') || 'asc';
	selectedPage = 1;
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
$effect(() => {
		if (selectedCategory) {
			subCategories = []
	  	selectedSubcategory = 'All Sub Categories'
	}
	});

// Navigates to the listings page with the selected category, subcategory, and sort whenever the params are changed

const refineListings = () => {
	if (browser && selectedCategory !== 'All Categories' && selectedCategory !== 'Categories' && selectedCategory !== undefined) {
		fetchCategory(selectedCategory).then((data) => {
			subCategories.push('All Sub Categories')
			subCategories = data.data.subCategories.map(subcategory => {
				return subcategory.title
			})})
		if (!selectedSubcategory in subCategories) {
			selectedSubcategory = 'All Sub Categories'
		}
	}
	goto(formQueryURL(query, selectedCategory, selectedSubcategory, selectedSort, selectedOrder));
}


const fetchListings = async () => {
	listings =  await queryListings(query, selectedCategory, selectedSubcategory, selectedSort, selectedOrder, null, selectedPage);
	return listings;
}

$inspect(listings);

</script>

<div class="w-full h-full flex flex-row">
	<Sidebar class="basis-1/12">
	
<!--		Spacer -->
		<div class=""></div>
	
		<div class="h-4 w-full">
			{#if listings.data.length>0}
		<p class="text-xs -z-10 text-muted-foreground h-full" transition:fly={{y:25, z: -10, duration: 100, easing: cubicInOut}}>
				{listings.meta.total}
				result{listings.meta.total!==1 ? 's' : ''} in
				{listings.meta.elapsedSeconds}
				seconds
		</p>
			{/if}

		</div>
<!--	Quick filters container	-->
		<div class="bg-slate-200 rounded-lg z-10 flex flex-col">
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
		
		<div class="flex flex-row gap-2 w-full">
			<Dropdown class="basis-full" clickAction={refineListings} title="Sort" subtitle="Select a sort" options={ sorts } bind:value={selectedSort} />
			<Dropdown class="basis-full" clickAction={refineListings} title="Order" subtitle="Select an order" options={ orders } bind:value={selectedOrder} />
		</div>
		<Separator />
		
		<Dropdown clickAction={refineListings} title="Categories" subtitle="Select a category" options={ categories } bind:value={selectedCategory} />
		{#key selectedCategory}
			<Dropdown onclick={refineListings}  title="Sub Categories" subtitle="Select a sub category" options={ subCategories } bind:value={selectedSubcategory} />
		{/key}
		
<!--		<Separator class="opacity-0" />-->
		
<!--		<div class="flex flex-col p-2 gap-1 rounded-md bg-muted-foreground/5">-->
<!--			<Dropdown title="Relevant filter 1" subtitle="Select a sub category" options={ subCategories }  />-->
<!--			<Dropdown title="Relevant filter 2" subtitle="Select a sub category" options={ subCategories }  />-->
<!--			<Dropdown title="Relevant filter 3" subtitle="Select a sub category" options={ subCategories }  />-->
<!--			-->
<!--			<div class="py-2 px-4 rounded-md flex flex-col gap-0 outline outline-1 outline-muted-foreground/10 bg-white">-->
<!--				<p class="text-xs font-medium">Relevant filter 4</p>-->
<!--				<div class="flex flex-row gap-4">-->
<!--					<Slider class="basis-10/12" bind:value={slider1Value} />-->
<!--					<p class="basis-2/12 text-center">{slider1Value}</p>-->
<!--				</div>-->
<!--			</div>-->
<!--			-->
<!--		</div>-->
	
	</Sidebar>
	
<div class="flex flex-col w-full mt-16">
	{#if listings.meta.suggestedQuery && listings.data.length > 0}
			<div class="w-full flex flex-row p-4 pb-0 max-w-72">
				<p class="text-sm font-medium text-muted-foreground">Did you mean <a onclick={()=>{sessionStorage.setItem('searchQuery', listings.meta.suggestedQuery); dispatchEvent(new Event('QueryUpdate'))}} href="
	/listings?query={listings.meta.suggestedQuery}&category={selectedCategory}&subCategory={selectedSubcategory}&sort={selectedSort}&order={selectedOrder}
" class="font-semibold">{listings.meta.suggestedQuery}</a>?</p>
			</div>
			{/if}
<!--	Listings   -->
	<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full p-1 sm:p-4 md:p-8 md:px-4 justify-left">

<!--	Category Header	-->
		{#key selectedCategory}
			{#if showCategoryHeader && selectedCategory !== 'All Categories' && selectedCategory !== 'Categories' && selectedCategory !== undefined}
				<!--Header Container-->
				{#if (browser)}
				{#await fetchCategory(selectedCategory)}
					<CategoryHeader isLoading={true} categoryColour='#0f172a'>

					</CategoryHeader>
				{:then categoryData}
					<CategoryHeader title={categoryData.data['title']} description={categoryData.data['description']} categoryColour={'#'+categoryData.data['colour']}>
						<div class="py-8">
							{#await queryListings(null, selectedCategory, selectedSubcategory, null, null)}
								<ListingCarousel isLoading={true} compactLayout={true} title={`Top deals in ${categoryData.data['title']}`} />
							{:then data}
								<ListingCarousel listings={data.data} compactLayout={true} title={`Top deals in ${categoryData.data['title']}`} />
							{:catch error}
								<p>{error.message}</p>
							{/await}
							
							{#await queryListings(null, selectedCategory, selectedSubcategory, 'Views', null)}
								<ListingCarousel isLoading={true} compactLayout={true} title={`New arrivals in ${categoryData.data['title']}`} />
							{:then data}
								<ListingCarousel listings={data.data} compactLayout={true} title={`New arrivals in ${categoryData.data['title']}`} />
							{:catch error}
								<p>{error.message}</p>
							{/await}
						
						</div>
					</CategoryHeader>
				{:catch error}
					<p>{error.message}</p>
				{/await}
				{/if}
			{/if}
		{/key}
		
		<!-- Listings -->
		{#key [query, selectedCategory, selectedSubcategory, selectedSort, selectedOrder]}
			<ListingGrid listingSource={fetchListings} bind:page={selectedPage} />
		{/key}
	
	</div>
</div>
</div>