<script>
import ListingsSidebar from '$lib/components/listingsSidebar.svelte'
import Dropdown from '$lib/components/dropdown.svelte';
import { onMount, setContext } from 'svelte';
import { fetchCategories, fetchCategory } from '$lib/api/categories.js'
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { formQueryURL } from '$lib/utils.js';
import { page } from '$app/stores';

let categories = [];
let subCategories = [];
const sorts = ['None', 'Price', 'Rating', 'Views'];
const orders = ['Ascending', 'Descending'];

let query = $page.url.searchParams.get('query') || '';
let selectedCategory = $page.url.searchParams.get('category') || undefined;
let selectedSubcategory = $page.url.searchParams.get('subCategory') || undefined;
let selectedSort = 'None';
let selectedOrder = 'asc';

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


</script>

<div class="w-full h-full flex flex-row">
	<ListingsSidebar>
		<Dropdown title="Categories" subtitle="Select a category" options={ categories } bind:selectedValue={selectedCategory} />
		<Dropdown title="Sub Categories" subtitle="Select a sub category" options={ subCategories } bind:selectedValue={selectedSubcategory} />
		<Dropdown title="Sort" subtitle="Select a sort" options={ sorts } bind:selectedValue={selectedSort} />
		<Dropdown title="Order" subtitle="Select an order" options={ orders } bind:selectedValue={selectedOrder} />
	
	</ListingsSidebar>
	
	<slot class="grow" />
</div>
