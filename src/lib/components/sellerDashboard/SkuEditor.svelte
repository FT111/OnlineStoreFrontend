
<script>
	import { run } from 'svelte/legacy';

	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { baseURL } from '$lib/api/core.js';
		import { onMount } from 'svelte';
		import { newSKU, updateSKU } from '$lib/api/listings.js';
	import { Box, HelpCircle, ImagePlus, Save, TriangleAlert } from 'lucide-svelte';
		import { afterNavigate, beforeNavigate, invalidate, invalidateAll, onNavigate } from '$app/navigation';
		import VariantConfigurator from '$lib/components/sellerDashboard/VariantConfigurator.svelte';
		import * as Tooltip from "$lib/components/ui/tooltip";
		import HelpTooltip from '$lib/components/HelpTooltip.svelte';
	import { selectedListing } from '$lib/account.svelte.js';
	
	let { sku = $bindable({
		id: null,
		title: '',
		price: '',
	  discount: '',
		stock: '',
	  	images: [],
	  options: {},
	  
	}), listingVariantOptions = {}
	} = $props();

	let initialSKU = $state(JSON.parse(JSON.stringify(sku)));
	$inspect(sku);
	
	beforeNavigate((e) => {
		if (JSON.stringify(sku) !== JSON.stringify(initialSKU)) {
			if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
				// If the user confirms, reset the shared listing object to the initial state
				sku = initialSKU;
				selectedListing.listing.skus = selectedListing.listing.skus.map((s) => s.id === sku.id ? sku : s);
			} else {
				e.cancel();
			}}});

	let editing = $derived(!!sku.id); // if sku id exists, edit State is true. Not needed but enhances readability


	let edited = $derived(JSON.stringify(sku) !== JSON.stringify(initialSKU)); // if sku is edited, edited state is true
	let canSave = $state(true);
	let dropLabel = $state();
	let saveBtn = $state();


	const getPrice = () => {
		return sku.price / 100;
	};
	const updatePrice = (val) => {
		if (val === '' || isNaN(val)) {
			sku.price = 0;
			return;
		}

		sku.price = Math.round(Number(val) * 100);
	};

	const repSert = (listingID, sku) => async (e) => {
		e.preventDefault();
		verifySKUConflicts(sku.options);
		if (!canSave) {
			return;
		}

		// If the sku is being edited, update it. Otherwise, create a new one
		if (editing) {
			await updateSKU(listingID, sku).then(() => {
				initialSKU = sku
			});
		} else {
			await newSKU(listingID, sku).then((res) => {
				sku.id = res.id;
				initialSKU = sku
			});
		}

		if (editing) {
			// Replace the old sku with the new one
			selectedListing.listing.skus = selectedListing.listing.skus.map((s) => s.id === sku.id ? sku : s);
		} else {
			// Add the new sku to the listing
			selectedListing.listing.skus = [...selectedListing.listing.skus, sku];
		}
		initialSKU = JSON.parse(JSON.stringify(sku));
		
		dispatchEvent(new CustomEvent('skuSaved'));
	};

	const verifySKUConflicts = (options) => {
		let conflict = false;
		selectedListing.listing.skus.forEach((existingSKU) => {
			// If the checked SKU is the current SKU, skip it
			if (existingSKU.id === sku.id) {
				return;
			}

			if (existingSKU.title === sku.title) {
				conflict = true;
			}

			// If no options, don't check them
			if (Object.keys(options).length === 0) {
				return;
			}
			if ((JSON.stringify(existingSKU.options) === JSON.stringify(options))  && existingSKU.id !== sku.id ) {
				conflict = true;
			}

		})
		canSave = !conflict;
	}

	$effect(() => {
		if (sku.title) {
			verifySKUConflicts(sku.options);
		}
	})


	const selectImage = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			sku.images = [...sku.images, e.target.result];
		};
		reader.readAsDataURL(file);
		
	};
	
	const dragEffects = ['border-dashed', 'border-emerald-500/40', 'bg-emerald-100', 'border-2', 'p-2.5', 'gap-3.5'];
	
	onMount(() => {
			dropLabel.addEventListener('dragenter', (e) => {
				e.preventDefault();
				e.stopPropagation();

			  dropLabel.classList.add(...dragEffects);
						});
			dropLabel.addEventListener('dragover', (e) => {
				e.preventDefault();
				e.stopPropagation();
				
			});
			dropLabel.addEventListener('dragleave', (e) => {
				e.preventDefault();
				e.stopPropagation();

				dropLabel.classList.remove(...dragEffects);
			});
			
			
			dropLabel.addEventListener('drop', (e) => {
				e.preventDefault();
				e.stopPropagation();
				
				dropLabel.classList.remove(...dragEffects);
				
				const file = e.dataTransfer.files[0];
				const reader = new FileReader();
				reader.onload = (e) => {
					sku.images = [...sku.images, e.target.result];
				};
				reader.readAsDataURL(file);
			 
			})
	})
</script>

<div class="flex md:flex-row flex-col p-2 flex-grow min-h-screen gap-1 w-full">

<!--  Image section	-->
	<div class="basis-1/2 rounded-2xl h-full  p-5 gap-4 flex flex-col md:order-first order-1">
		<div class="flex flex-row justify-between w-full p-1">Images
			
			<p class="flex flex-row gap-1.5">{sku.images.length}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
			</svg>
			</p>
		</div>
		
		<div bind:this={dropLabel} class="h-full grid grid-cols-3 auto-rows-min gap-2.5 rounded-xl transition-all ">

			{#each sku.images as image}
				<div class="grid h-24 grid-cols-1 grid-rows-1">
					<img style="grid-column: 0; grid-row: 0" class=" rounded-xl w-full size-full object-cover" src={image.startsWith('data') ? image : `${baseURL}static/listingImages/${image}`} alt="sku" />
				</div>
			{/each}
			<label class="  rounded-xl h-24 w-full">
				<Card.Root class="size-full flex flex-col border-2 border-dashed bg-emerald-50/40 items-center justify-center
											  hover:border-solid hover:bg-emerald-100 hover:border-emerald-500 transition-all group">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 opacity-30 hover:opacity-70 group-hover:opacity-70 text-emerald-700 transition-all">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</Card.Root>
				<input class="hidden w-full h-full" type="file" accept="image/*" onchange={(e)=>{selectImage(e)}} />
			</label>
			
			<p class="col-span-3 row-span-1 text-center text-sm justify-center items-center p-2 opacity-60 flex flex-row gap-1.5">Drag and drop images here <ImagePlus size={20} strokeWidth={1.25} />
			</p>
		</div>
	</div>
	
	<div class="basis-1/2 bg-slate-50 rounded-2xl h-full p-5 space-y-1.5 md:order-1 order-first">
		{#key sku.id}
		<form onsubmit={repSert(page.params.listingID, sku)}>
			<div class="p-1 flex flex-row gap-2 h-10 items-center">Details
				{#if canSave}
				<Button bind:this={saveBtn} class=" rounded-full transition-all gap-1.5 origin-left {edited ? 'scale-100': ' scale-0 '}" type="submit" size="sm">
					<Save size={20} strokeWidth={1.25} />Save
				</Button>
					{:else}
					<div class="flex flex-row gap-1.5 items-center bg-destructive/10 text-foreground px-3.5 rounded-full h-10 text-sm">
						<TriangleAlert strokeWidth={1.5} size={18} />
						Conflicts with existing variation
					</div>
				{/if}
			</div>
			
			<div class="flex flex-col gap-3 items-end">
				<InputWithLabel maxlength="30" min="1" label="Title" bind:value={sku.title} placeholder="Enter a short, descriptive title" >Title</InputWithLabel>
				<div class="flex flex-row gap-3 w-full grow">
					<InputWithLabel minlength="1" maxlength="10" bind:value={()=> getPrice(), updatePrice}
													required label="Price" type="text" placeholder="How much?">Price</InputWithLabel>
					<InputWithLabel maxlength="99" minlength="0" label="Discount" bind:value={sku.discount} type="number" placeholder="How much off?" >Discount % (Optional)</InputWithLabel>
					<InputWithLabel minlength="0" required label="Quantity" bind:value={sku.stock} type="number" placeholder="How many?" >Quantity</InputWithLabel>
				</div>
				
				<div class="p-1 flex flex-row gap-1 items-center self-start">Option Selection
					<HelpTooltip>Select the combination of options needed to pick this product variation</HelpTooltip>
				</div>
			</div>
			
		</form>
			<VariantConfigurator variantOptions={listingVariantOptions} bind:selectedOptions={sku.options} onSelectCallback={verifySKUConflicts}  validation={false}/>
			{/key}
	</div>

</div>