
<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { baseURL } from '$lib/api/core.js';
	import { onMount } from 'svelte';
	import { newListing, updateListing } from '$lib/api/listings.js';
	import { ImagePlus, Save, Text, X } from 'lucide-svelte';
	import { afterNavigate, beforeNavigate, invalidate, invalidateAll, onNavigate } from '$app/navigation';
		import { Textarea } from '$lib/components/ui/textarea/index.js';
		import VariantConfigurator from '$lib/components/sellerDashboard/VariantConfigurator.svelte';
		import HelpTooltip from '$lib/components/HelpTooltip.svelte';
	import { selectedListing } from '$lib/account.svelte.js';
	import { browser } from '$app/environment';
	import { Check } from 'lucide-svelte';
	
	let initiallisting = $state(JSON.parse(JSON.stringify(selectedListing.listing)));
	let listing = $state(selectedListing.listing);
	$inspect(listing, initiallisting);
	
	if (browser){
		addEventListener('skuSaved', () => {
			listing = selectedListing;
		});
	}

	beforeNavigate((e) => {
		if (JSON.stringify(listing) !== JSON.stringify(initiallisting)) {
			if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
				// If the user confirms, reset the shared listing object to the initial state
				listing = initiallisting;
				selectedListing.listing = initiallisting;
			} else {
				e.cancel();
			}}});
	
	afterNavigate(() => {
		listing = selectedListing.listing;
		initiallisting = JSON.parse(JSON.stringify(listing));
	});


	// onMount(() => {
	//  // Prevents caching of edits when navigating back to the page
	//  invalidateAll();
	// })
	
	// let initiallisting = $state(JSON.parse(JSON.stringify(listing)));


	let editing = $derived(!!listing.id); // if listing id exists, edit State is true. Not needed but enhances readability
	let edited = $derived(JSON.stringify(listing) !== JSON.stringify(initiallisting)); // if listing is edited, edited state is true
	let saveBtn = $state();
	let saveBtnState = $state();

	// Replaces or inserts the listing into the database
	const repSert = async (form, listingID, listing) => {
		form.preventDefault();
		try {
			if (editing) {
				 await updateListing(listingID, listing).then((res) => {
					if (res.data) {
						initiallisting = JSON.parse(JSON.stringify(res.data));
						saveBtnState = 'success';
						setInterval(() => {
							saveBtnState = '';
						}, 500);
					} else {
						saveBtnState = 'failed';
						setInterval(() => {
							saveBtnState = '';
						}, 2000);
					}
				});
			} else {
				const res = await newListing(listingID, listing);
				if (res.data) {
					saveBtnState = 'success';
					listing.id = res.data.id;
					setInterval(() => {
						saveBtnState = '';
					}, 500);
				} else {
					saveBtnState = 'failed';
					setInterval(() => {
						saveBtnState = '';
					}, 2000);
				}
			}
			initiallisting = JSON.parse(JSON.stringify(listing));
		} catch (error) {
			console.error('Error saving listing:', error);
		}
	};
	
</script>


<div class="flex md:flex-row flex-col p-2 flex-grow min-h-screen gap-1 w-full">
	
	<!--  Attribute Config Section	-->
	{#key listing.id}
	<div class="basis-1/2 max-w-1/2 rounded-2xl h-full  p-5 gap-4 flex flex-col order-1">
		<p class="items-center flex flex-row gap-1">Variant Configuration
			<HelpTooltip>
				This lets you configure the different options available to users. For example, if you are selling a T-shirt, you can configure the colour, size, and material option types. <br /> <br />
				You can then define the choices available for each of these types. For example, for the colour option, you can define the choices as red, blue, and green.
			</HelpTooltip>
		</p>
		
		<VariantConfigurator bind:variantOptions={listing.skuOptions} configuring={true} />
	</div>
	
	<div class="basis-1/2 bg-neutral-50 rounded-2xl h-full p-5 space-y-1.5 order-first">
			<form onsubmit={(self) => {repSert(self, page.params.listingID, listing)}}>
				<div class="p-1 flex flex-row gap-2 items-center">Details
					<Button bind:this={saveBtn} class=" rounded-full transition-all gap-1.5 origin-left {edited ? 'scale-100': ' scale-0 '}" type="submit" size="sm">
						{#if saveBtnState === 'success'}
							<Check size={20} strokeWidth={1.25} />
						{:else if saveBtnState === 'failed'}
							<X size={20} strokeWidth={1.25} />
						{:else}
							<Save size={20} strokeWidth={1.25} />Save
						{/if}
					</Button>
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
	</div>
		{/key}

</div>