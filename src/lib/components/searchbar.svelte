<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { browser } from '$app/environment';
	import { fetchCategories } from '$lib/api/categories.js';
	import Dropdown from './dropdown.svelte';
	import { goto, invalidate, invalidateAll } from '$app/navigation';

	const searchListings = async (event,query) => {
		event.preventDefault();
		console.log('searchListings', query);
		await goto(`/listings?query=${query}` + (category !== 'All Categories' ? `&category=${category}` : ''), {invalidateAll: false}).catch((error) => {
			console.error('Error navigating to listings:', error);
		}).then( async () => {
			// await invalidateAll();
			console.log('Navigation to listings successful');
		});
	}
	

	let { class: className = undefined} = $props();

	let category = $state('All Categories');
	let searchQuery = $state('');
	$effect(
		() => {
			sessionStorage.setItem('searchQuery', searchQuery);
		}
	)
	if (browser) {
		searchQuery = sessionStorage.getItem('searchQuery') || '';
	}

</script>

<form class={`flex flex-row gap-0 border-primary/30 bg-background sm:rounded-3xl rounded-xl border ${className}`} onsubmit={(e) => {searchListings(e,searchQuery)}}>
<!--	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">-->
<!--		<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />-->
<!--	</svg>-->
	{#await fetchCategories()}
		<Dropdown class="rounded-l-full w-64 rounded-r-none border-y-0" />
		{:then data}
	<Dropdown class="rounded-l-full border-y-0 w-64 rounded-r-none" options={['All Categories',...data.data.map(category => {return category.title})]} bind:value={category} />
	{:catch error}
		<p class="text-red-500">Error: {error.message}</p>
	{/await}

	<Input bind:value={searchQuery} class="text-black rounded-none h-9/10
	 focus-visible:ring-accent/20 focus-visible:outline-accent focus-visible:ring-offset-0
	 focus-visible:ring-1 border-0 " placeholder="Search for anything..." />
	
	<Button type="submit" class="sm:rounded-r-3xl rounded-r-xl border-0 rounded-l-none grow flex flex-row gap-2 pr-6" variant="secondary">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
		</svg>
	</Button>
</form>