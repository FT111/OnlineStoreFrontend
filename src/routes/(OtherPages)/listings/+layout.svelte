<script>
import ListingsSidebar from '$lib/components/listingsSidebar.svelte'
import Dropdown from '$lib/components/dropdown.svelte';
import { Separator } from "$lib/components/ui/separator";
import { onMount, setContext } from 'svelte';
import { fetchCategories, fetchCategory } from '$lib/api/categories.js'
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { formQueryURL } from '$lib/utils.js';
import { page } from '$app/stores';

let categories = [];
let subCategories = [];
const sorts = ['None', 'Price', 'Rating', 'Views'];
const orders = ['Asc.', 'Desc.'];

let query = $page.url.searchParams.get('query') || '';
let selectedCategory = $page.url.searchParams.get('category') || undefined;
let selectedSubcategory = $page.url.searchParams.get('subCategory') || undefined;
let selectedSort = $page.url.searchParams.get('sort');
let selectedOrder = $page.url.searchParams.get('order') || 'asc';

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
$: if ([selectedCategory, selectedSubcategory, selectedSort, selectedOrder]) {
	if (browser) {

			goto(formQueryURL(query, selectedCategory, selectedSubcategory, selectedSort, selectedOrder));

		}
}

console.log([selectedOrder, selectedSubcategory, selectedCategory, selectedSort])

</script>

<div class="w-full h-full flex flex-row">
	<ListingsSidebar>
		<div class="flex flex-row gap-2 w-full pt-20">
			<Dropdown title="Sort" subtitle="Select a sort" options={ sorts } bind:selectedValue={selectedSort} />
			<Dropdown title="Order" subtitle="Select an order" options={ orders } bind:selectedValue={selectedOrder} />
		</div>
		<Separator />
		
		<Dropdown title="Categories" subtitle="Select a category" options={ categories } bind:selectedValue={selectedCategory} />
		{#key selectedCategory}
			<Dropdown title="Sub Categories" subtitle="Select a sub category" options={ subCategories } bind:selectedValue={selectedSubcategory} />
		{/key}

	
	</ListingsSidebar>
	
	<slot class="grow" />
</div>
