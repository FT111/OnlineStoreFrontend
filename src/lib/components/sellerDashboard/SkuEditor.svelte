
<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { baseURL } from '$lib/api/core.js';
		import { onMount } from 'svelte';
		import { newSKU, updateSKU } from '$lib/api/listings.js';
		import { Box, HelpCircle, ImagePlus, Save } from 'lucide-svelte';
		import { afterNavigate, beforeNavigate, invalidate, invalidateAll, onNavigate } from '$app/navigation';
		import VariantConfigurator from '$lib/components/sellerDashboard/VariantConfigurator.svelte';
		import * as Tooltip from "$lib/components/ui/tooltip";
		import HelpTooltip from '$lib/components/HelpTooltip.svelte';
		
 // Defaults for creating a new SKU
 	export let sku = {
		id: null,
		title: '',
		price: '',
	  discount: '',
		stock: '',
	  	images: [],
	  options: {},
	  
	};
	
	//  Types of options available for the listing
	export let listingVariantOptions = {};
	
	beforeNavigate((e) => {
		if (JSON.stringify(sku) !== JSON.stringify(initialSKU)) {
		 if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
		 } else {
			 e.cancel();
		 }}});
		 
	
	 // onMount(() => {
		//  // Prevents caching of edits when navigating back to the page
		//  invalidateAll();
	 // })
	
	
	sku.price = String(sku.price);
	sku.stock = String(sku.stock);
	let initialSKU = JSON.parse(JSON.stringify(sku));
	
	
	$: editing = !!sku.id; // if sku id exists, edit State is true. Not needed but enhances readability
	$: edited = JSON.stringify(sku) !== JSON.stringify(initialSKU); // if sku is edited, edited state is true
	let dropLabel;
	let saveBtn;
	
	const repSert = (listingID, sku) => async (e) => {
		e.preventDefault();
		console.log('Saving SKU');
		
		// If the sku is being edited, update it. Otherwise, create a new one
		if (editing) {
			await updateSKU(listingID, sku).then(() => {
				initialSKU = JSON.parse(JSON.stringify(sku));
			});
		} else {
			await newSKU(listingID, sku).then((res) => {
				sku.id = res.id;
				initialSKU = JSON.parse(JSON.stringify(sku));
			});
		}
	};
	
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
	
	$: console.log(sku);
	
	
	
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
				<input class="hidden w-full h-full" type="file" accept="image/*" on:change={(e)=>{selectImage(e)}} />
			</label>
			
			<p class="col-span-3 row-span-1 text-center text-sm justify-center items-center p-2 opacity-60 flex flex-row gap-1.5">Drag and drop images here <ImagePlus size={20} strokeWidth={1.25} />
			</p>
		</div>
	</div>
	
	<div class="basis-1/2 bg-slate-50 rounded-2xl h-full p-5 space-y-1.5 md:order-1 order-first">
		{#key sku.id}
		<form on:submit={repSert($page.params.listingID, sku)}>
			<div class="p-1 flex flex-row gap-2 items-center">Details
				<Button bind:this={saveBtn} class=" rounded-full transition-all gap-1.5 origin-left {edited ? 'scale-100': ' scale-0 '}" type="submit" size="sm">
					<Save size={20} strokeWidth={1.25} />Save</Button>
			</div>
			
			<div class="flex flex-col gap-3 items-end">
				<InputWithLabel label="Title" bind:value={sku.title} placeholder="Enter a short, descriptive title" >Title</InputWithLabel>
				<div class="flex flex-row gap-3 w-full grow">
					<InputWithLabel label="Price" bind:value={sku.price} type="number" placeholder="How much?">Price</InputWithLabel>
					<InputWithLabel label="Discount" bind:value={sku.discount} placeholder="How much off?" >Discount % (Optional)</InputWithLabel>
					<InputWithLabel label="Quantity" bind:value={sku.stock} type="number" placeholder="How many?" >Quantity</InputWithLabel>
				</div>
				
				<div class="p-1 flex flex-row gap-1 items-center self-start">Option Selection
					<HelpTooltip>Select the combination of options needed to pick this product variation</HelpTooltip>
				</div>
			</div>
			
		</form>
			<VariantConfigurator variantOptions={listingVariantOptions} bind:selectedOptions={sku.options} />
			{/key}
	</div>

</div>