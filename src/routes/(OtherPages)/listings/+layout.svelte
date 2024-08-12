<script>
import ListingsSidebar from '$lib/components/listingsSidebar.svelte'
import Dropdown from '$lib/components/dropdown.svelte';
import { onMount } from 'svelte';
import { fetchCategories, fetchCategory } from '$lib/api/categories.js'

let categories = [];
let subCategories = [];
let selectedCategory;
let selectedSubcategory;

let subCategoryResponse;

onMount(() => {
	
	let response = fetchCategories().then((data) => {
		categories.push('All Categories')
		for (let i = 0; i < data.data.length; i++) {
			categories.push(data.data[i].title)}
	})
 
 
})

$: if (selectedCategory !== 'All Categories' && selectedCategory !== 'Categories' && selectedCategory !== undefined) {
	subCategories = []
	subCategoryResponse = fetchCategory(selectedCategory).then((data) => {
		subCategories.push('All Sub Categories')
		for (let i = 0; i < data.data['subCategories'].length; i++) {
			subCategories.push(data.data['subCategories'][i].title)}
	})
}
</script>

<div class="w-full h-full flex flex-row">
	<ListingsSidebar>
		<Dropdown title="Categories" subtitle="Select a category" options={ categories } bind:selectedValue={selectedCategory} />
		<Dropdown title="Sub Categories" subtitle="Select a sub category" options={ subCategories } bind:selectedValue={selectedSubcategory} />
		<Dropdown title="Sort" subtitle="Select a sort" />
	</ListingsSidebar>
	
	<slot class="grow" />
</div>
