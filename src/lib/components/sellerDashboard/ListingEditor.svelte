
<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { baseURL } from '$lib/api/core.js';
	import { onMount } from 'svelte';
	import { newListing, updateListing } from '$lib/api/listings.js';
		import { ImagePlus, Save, Text } from 'lucide-svelte';
	import { afterNavigate, beforeNavigate, invalidate, invalidateAll, onNavigate } from '$app/navigation';
		import { Textarea } from '$lib/components/ui/textarea/index.js';
	// Defaults for creating a new listing
	export let listing = {
		id: null,
		title: '',
		description: '',
		public: false,
		category: '',
		subCategory: '',
	};

	beforeNavigate((e) => {
		if (JSON.stringify(listing) !== JSON.stringify(initiallisting)) {
			if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
			} else {
				e.cancel();
			}}});


	// onMount(() => {
	//  // Prevents caching of edits when navigating back to the page
	//  invalidateAll();
	// })


	listing.price = String(listing.price);
	listing.stock = String(listing.stock);
	let initiallisting = JSON.parse(JSON.stringify(listing));


	$: editing = !!listing.id; // if listing id exists, edit State is true. Not needed but enhances readability
	$: edited = JSON.stringify(listing) !== JSON.stringify(initiallisting); // if listing is edited, edited state is true
	let saveBtn;

	// Replaces or inserts the listing into the database
	const repSert = (listingID, listing) => async (e) => {
		e.preventDefault();


		if (editing) {
			await updateListing(listingID, listing).then(() => {
				initiallisting = JSON.parse(JSON.stringify(listing));
			});
		} else {
			await newListing(listingID, listing).then((res) => {
				listing.id = res.data.id;
				initiallisting = JSON.parse(JSON.stringify(listing));
			});
		}
	};
	
</script>

<div class="flex md:flex-row flex-col p-2 flex-grow min-h-screen gap-1 w-full">
	
	<!--  Attribute Config Section	-->
	<div class="basis-1/2 rounded-2xl h-full  p-5 gap-4 flex flex-col order-1">
		<p>Variant Configuration</p>
	</div>
	
	<div class="basis-1/2 bg-neutral-50 rounded-2xl h-full p-5 space-y-1.5 order-first">
		{#key listing.id}
			<form on:submit={repSert($page.params.listingID, listing)}>
				<div class="p-1 flex flex-row gap-2 items-center">Details
					<Button bind:this={saveBtn} class=" rounded-full transition-all gap-1.5 origin-left {edited ? 'scale-100': ' scale-0 '}" type="submit" size="sm">
						<Save size={20} strokeWidth={1.25} />Save</Button>
				</div>
				
				<div class="flex flex-col gap-3 items-end">
					<InputWithLabel label="Title" bind:value={listing.title} placeholder="Enter a short, descriptive title" >Title</InputWithLabel>
					<Textarea label="Description" bind:value={listing.description} placeholder="Enter a detailed description" >Description</Textarea>
					<div class="flex flex-row gap-3 w-full grow">
						<InputWithLabel label="Category" bind:value={listing.category}  placeholder="How much?">Category</InputWithLabel>
						<InputWithLabel label="Subcategory" bind:value={listing.subCategory} placeholder="How much off?" >Subcategory</InputWithLabel>
						<InputWithLabel label="Visibility" bind:value={listing.public} placeholder="How many?" >Visibility</InputWithLabel>
					</div>
				</div>
			</form>
		{/key}
	</div>

</div>