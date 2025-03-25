
<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { baseURL } from '$lib/api/core.js';
	import { onMount } from 'svelte';
	import { newListing, updateListing } from '$lib/api/listings.js';
	import {
		EyeOff,
		FileWarning,
		Globe,
		ImagePlus,
		Info,
		MailWarning,
		Save,
		Text,
		TriangleAlert,
		X
	} from 'lucide-svelte';
	import { afterNavigate, beforeNavigate, invalidate, invalidateAll, onNavigate } from '$app/navigation';
		import { Textarea } from '$lib/components/ui/textarea/index.js';
		import VariantConfigurator from '$lib/components/sellerDashboard/VariantConfigurator.svelte';
		import HelpTooltip from '$lib/components/HelpTooltip.svelte';
	import { selectedListing } from '$lib/account.svelte.js';
	import { browser } from '$app/environment';
	import { Check } from 'lucide-svelte';
	import { fetchCategories, fetchCategory } from '$lib/api/categories.js';
	import Dropdown from '$lib/components/dropdown.svelte';
	import DropdownWithLabel from '$lib/components/DropdownWithLabel.svelte';
	import { Toggle } from '$lib/components/ui/toggle/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	
	
	let initiallisting = $state(JSON.parse(JSON.stringify(selectedListing.listing)));
	let listing = $state(selectedListing.listing);
	$inspect(listing, initiallisting);
	
	if (browser){
		addEventListener('skuSaved', () => {
			listing = selectedListing.listing;
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

	let editing = $derived(!!listing.id); // if listing id exists, edit State is true. Not needed but enhances readability
	let edited = $derived(JSON.stringify(listing) !== JSON.stringify(initiallisting)); // if listing is edited, edited state is true
	let saveBtn = $state();
	let saveBtnState = $state();

	// Replaces or inserts the listing into the database
	const repSert = async (form, listingID, listing) => {
		form.preventDefault();
		try {
			if (editing) {
				 await updateListing(listingID, listing).then((res, req) => {
					 console.log(res)
						initiallisting = JSON.parse(JSON.stringify(res.data));
						saveBtnState = 'success';
						setInterval(() => {
							saveBtnState = '';
						}, 500);
				}).catch((error) => {
					console.error('Error saving listing:', error);
					saveBtnState = 'failed';
					setInterval(() => {
						saveBtnState = '';
					}, 2000);
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
	
	const fetchSubcategoriesAndDefaultToFirst = async (category) => {
		try {
			const res = await fetchCategory(category);
			const titleArray = res.data.subCategories.map(subcategory => {return subcategory.title});
			console.log(titleArray);
			console.log(listing.subCategory);
			
			let flag = false;
			for (let i = 0; i < titleArray.length; i++) {
				if (titleArray[i] === listing.subCategory) {
					flag = true;
					break;
				}
			}
			if (!flag) {
				listing.subCategory = titleArray[0];
			}
			
			return titleArray;
		} catch (error) {
			console.error('Error fetching subcategories:', error);
		}
	};
</script>


<div class="flex md:flex-row flex-col p-2 flex-grow min-h-screen gap-1 w-full">
	
	<!--  Attribute Config Section	-->
	{#key listing.id}
	<div class="basis-1/2 max-w-1/2 rounded-2xl h-full  p-5 gap-4 flex flex-col order-1">
		<div class="items-center flex flex-row gap-1 text-black">Variant Configuration
			<HelpTooltip>
				This lets you configure the different options available to users. For example, if you are selling a T-shirt, you can configure the colour, size, and material option types. <br /> <br />
				You can then define the choices available for each of these types. For example, for the colour option, you can define the choices as red, blue, and green.
			</HelpTooltip>
		</div>
		{#if Object.keys(listing.skuOptions).length === 0 && listing.skus.length > 1}
			<Alert.Root class="bg-neutral-50">
				<Info size={20} strokeWidth={1.5} />
				<Alert.Title>No variation options configured</Alert.Title>
				<Alert.Description
				>Users will be shown a list of variant titles instead</Alert.Description
				>
			</Alert.Root>
		{/if}
		<VariantConfigurator bind:variantOptions={listing.skuOptions} configuring={true} validation={false} />
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
					<InputWithLabel maxlength="40" min="1" label="Title" bind:value={listing.title} placeholder="Enter a short, descriptive title" required >Title</InputWithLabel>
					<Textarea maxlength="100" label="Description" bind:value={listing.description} placeholder="Enter a detailed description">Description</Textarea>
					<div class="flex flex-row gap-3 w-full grow">
						<div class="flex flex-row gap-3.5 w-full items-center">
							<div class="basis-1/2">
								{#await fetchCategories()}
									<Dropdown required title="Category" />
								{:then categories}
									<DropdownWithLabel required options={categories.data.map(category => {return category.title})} title="Category" bind:value={listing.category}
																		 subtitle="Find a category">Category</DropdownWithLabel>
								{:catch error}
									<p>{error.message}</p>
								{/await}
							</div>
							
							<div class="basis-1/2">
									{#key listing.category}
										{#await fetchSubcategoriesAndDefaultToFirst(listing.category)}
											<Dropdown required title="Subcategory" />
										{:then subCategoryList}
											<DropdownWithLabel required options={subCategoryList} title="Subcategory"
																				 subtitle="Search for a subcategory" bind:value={listing.subCategory}>Subcategory</DropdownWithLabel>
										{:catch error}
											<p>{error.message}</p>
										{/await}
									{/key}
							</div>
							<div class="basis-3/12 max-w-32 flex flex-col gap-1">
								<label class="text-xs px-2 font-normal text-slate-600 flex flex-row items-center gap-1" for='visibility'>
									Visibility
									<HelpTooltip class="size-4">
										<span class="font-semibold">Public listings</span> are visible to everyone and can be purchased.
										<br /> <span class="font-semibold">Private listings</span> are only visible to you and can't be purchased.
										<br /><br />
										Existing orders are not affected.
									</HelpTooltip>
								</label>
							<Toggle name="visibility" variant="outline" bind:pressed={listing.public} class="h-10 justify-center px-2.5 gap-1.5 hover:bg-secondary hover:text-secondary-foreground">
								{#if listing.public}
								<Globe size={20} strokeWidth={1.25} />
								Public
									{:else}
									<EyeOff size={20} strokeWidth={1.25} />
									Private
								{/if}
							</Toggle>
						</div>
					</div>
				</div>
					<p class="text-sm font-light text-muted-foreground self-start">If multiple product variants are added, the listing's least expensive variation will be shown as the base price and image</p>
				</div>
			</form>
	</div>
		{/key}

</div>