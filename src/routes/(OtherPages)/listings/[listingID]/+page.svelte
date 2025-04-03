
<script>
	import Image from '$lib/components/image.svelte'
	import Price from '$lib/components/price.svelte'
	import ReviewGrid from '$lib/components/ReviewGrid.svelte'
	import ListingCarousel from '$lib/components/listingCarousel.svelte'
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { queryListings } from '$lib/api/listings.js';
	import VariantConfigurator from '$lib/components/sellerDashboard/VariantConfigurator.svelte';
	import { redirect } from '@sveltejs/kit';
	import { basketStore } from '$lib/basket.svelte.js';
	import { BadgeX, Check, Grid2x2X, ShoppingBasket, ShoppingCart } from 'lucide-svelte';
	import { scale, fly } from 'svelte/transition';
	import { onNavigate } from '$app/navigation';
	import { registerListingView } from '$lib/analytics/listings.js';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	let listing = $derived(data.listing)

	let selectedSKU = $state({
		price: 0,
		id: 0
	});
	
	let variantOptions = $derived(
		listing && listing.skuOptions && Object.keys(listing.skuOptions).length !== 0
			? listing.skuOptions
			: { 'Styles': listing?.skus?.map(sku => sku.title) }
	);
	let defaultOptions = $derived(
		listing && listing.skuOptions && Object.keys(listing.skuOptions).length === 0
	);
	
	let addProductButtonState = $state('default');
	let addProductButtonStateClasses = $derived.by(()=>{
		switch(addProductButtonState) {
			case 'default':
				return 'bg-accent hover:bg-accent hover:brightness-125 hover:border-amber-900 border-amber-900';
			case 'added':
				return 'bg-emerald-700 hover:bg-green-500 pointer-events-none pointer-none border-emerald-600';
			case 'outOfStock':
				return 'bg-slate-200 hover:bg-slate-200 text-primary disabled pointer-events-none pointer-none';
		}
	})
	
	let skus = true;
	
	onMount(() => {
		registerListingView(listing);
		
		if (listing.skus?.length > 0) {
			selectedSKU = listing.skus[0];
		}
	});
	
	$effect(() => {
		'Handles detecting if the product is out of stock when switching between variants'
		
		if (basketStore.basket.items[selectedSKU.id]?.quantity >= selectedSKU.stock
		|| selectedSKU.stock === 0) {
			addProductButtonState = 'outOfStock';
		} else {
			addProductButtonState = 'default';
		}
	});
	
	function handleAddToBasket() {
		if (listing.ownerUser.id === data.user?.id) {
			// Prevent adding the product to the basket if the user is the owner
			toast.error('You cannot add your own listing to the basket.');
			return;
		}

		'Handles adding the selected SKU to the basket'
		basketStore.addSKU(selectedSKU).then(() => {
			addProductButtonState = 'added';
			setTimeout(() => {
				// Reset the button state after 2 seconds
				// Checks if the product is now out of stock
				if (basketStore.basket.items[selectedSKU.id]?.quantity >= selectedSKU.stock) {
					addProductButtonState = 'outOfStock';
				} else {
					addProductButtonState = 'default';
				}
			}, 2000);
		}).catch(() => {
			addProductButtonState = 'outOfStock';
		});
	}
</script>


<!--Page Container-->
<div class="mt-20 md:px-14 px-1">
	<!-- Listing Container	-->
	<div class="h-fit sm:h-[80vh] bg-muted/30 rounded-2xl flex flex-col sm:flex-row gap-5 p-5">
	
<!--	Images Container	-->
			<Image src="https://via.placeholder.com/1000" alt="Listing Image" class="w-1/2 h-auto" />
		
<!--	Detail Container	-->
		<div class="sm:basis-1/2 basis-1 sm:w-1/2 flex flex-col gap-4 flex-shrink-0 justify-between">
<!--		Top info	-->
			<div class="flex flex-col gap-4 flex-shrink-0 ">
	<!--			Quick Info Row -->
				<div class="flex flex-row rounded-2xl bg-slate-100 border-4 border-slate-100 w-full h-20 ">
					<div class="basis-1/5 h-full flex flex-col items-center flex-wrap align-middle justify-center">
						<p class="text-2xl font-bold">{listing.views}</p>
						<p class="text-lg">views</p>
					</div>
					<div class="basis-1/5 h-full bg-zinc-50 rounded-2xl flex flex-col items-center flex-wrap align-middle justify-center">
						<p class="text-2xl font-bold">10+</p>
						<p class="text-lg">sales</p>
					</div>
					<div class="basis-1/5 h-full flex flex-col  items-center flex-wrap align-middle justify-center">
						<p class="text-2xl font-bold">{listing.rating}</p>
						<p class="text-lg">rating</p>
					</div>
					<div class="basis-1/5 h-full bg-zinc-50 rounded-2xl  flex flex-col  items-center flex-wrap align-middle justify-center">
						<p class="text-2xl font-bold">{selectedSKU.stock}</p>
						<p class="text-lg">in stock</p>
					</div>
					<div class="basis-1/5 h-full flex flex-col items-center flex-wrap align-middle justify-center">
						<p class="text-2xl font-bold">New</p>
						<p class="text-lg">condition</p>
					</div>
				</div>
				
				<!--				Listing Heading-->
				<div class="flex flex-col gap-1 relative">
					<!-- Title and description section -->
					<p class="text-xs text-muted-foreground">{listing.category} • <span class="text-muted-foreground/60">{listing.subCategory}</span></p>
					<h1 class="text-4xl font-bold mb-1">{listing.title}</h1>
					<main class="line-clamp-3">{listing.description}</main>
					
					<!-- User section -->
					<aside class="inline-flex flex-row gap-2 align-middle items-center bg-slate-200 w-fit  rounded-3xl p-1 pr-3 absolute right-0 top-0">
						<a href={`/users/${listing.ownerUser.id}`}>
							<Avatar.Root>
								<Avatar.Image src={listing.ownerUser.profilePictureURL} alt="Avatar" />
<!--								<Avatar.Fallback>{listing.ownerUser.username.slice(0, 2)}</Avatar.Fallback>-->
							</Avatar.Root>
						</a>
						
						<div class="flex flex-col">
							<p class="text-xs font-light flex flex-row align-middle items-center gap-1">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 stroke-accent">
									<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
								</svg>
								4.3
							</p>
						</div>
					</aside>
				</div>
				
	<!--				SKU Details -->
				{#if listing.skus?.length > 1}
					{#key listing.id}
						<VariantConfigurator
							variantOptions={variantOptions}
							skus={listing.skus}
							validation={true}
							defaultOptions={defaultOptions}
							bind:selectedProduct={selectedSKU}
						/>
						{/key}
					{/if}
			</div>
		</div>
	</div>
	
	<div class="h-20"></div>
	<!-- Reviews	-->
	 {#key listing}
	<ReviewGrid {listing} />
	{/key}
</div>

<!--		Basket options	-->
<div class="fixed w-full sm:w-1/2 justify-self-end bottom-4 min-h-24 p-3 z-20 right-3 min-w-fit">
	<div class=" bg-slate-100 rounded-xl p-3 flex flex-col md:flex-row gap-1 items-end align-middle md:items-center md:justify-between border-2 border-slate-200 shadow-md">
		
		<div>
			{#if selectedSKU.id in basketStore.basket.items}
				<div class="text-lg flex flex-row gap-2 items-center px-2">
					<p class="font-bold">{basketStore.basket.items[selectedSKU.id].quantity}</p>
					<div class="flex flex-row gap-1.5">in
					<ShoppingCart stroke-width={1.25} /></div>
				</div>
			{/if}
		</div>
		
		<div class="flex flex-row items-center h-full gap-4">
			{#key selectedSKU.price}
			<Price price={selectedSKU.price ? selectedSKU.price : listing.skus[0].price} />
				{/key}
			<Button onclick={()=> {handleAddToBasket()}} type={addProductButtonState==='outOfStock' && 'disabled'} class="{addProductButtonStateClasses} w-56 h-full text-2xl font-bold border-[1.5px] p-3 px-5 transition-all rounded-xl" variant="default">
				<div class="grid grid-cols-1 grid-rows-1 items-center size-full">
				
				{#if addProductButtonState === 'default'}
					<div in:fly={{y: 20, direction: 'top', absolute:true}} out:fly={{y: -20, direction: 'bottom', absolute:true}} style="grid-column: 1; grid-row: 1;">
						<p>Add to Basket</p>
					</div>
					{:else if addProductButtonState === 'outOfStock'}
					<div class="flex flex-row gap-1.5 items-center justify-center" in:fly={{y:20, direction: 'bottom', absolute:true}} out:fly={{y: -20, direction: 'top', absolute:true}} style="grid-column: 1; grid-row: 1;">
						<p>Out of Stock</p>
						<div transition:scale={{direction: 'left'}}>
							<BadgeX class="size-10" size={40} />
						</div>
					</div>
				{:else}
					<div class="flex flex-row gap-1.5 items-center" in:fly={{y:20, direction: 'top', absolute:true}} out:fly={{y: -20, direction: 'bottom', absolute:true}} style="grid-column: 1; grid-row: 1;">
						<p>Added</p>
						<span transition:scale={{direction: 'left'}}>
							<Check class="size-10" />
						</span>
					</div>
				{/if}
				</div>
			</Button>
		</div>
	</div>
</div>
<div class="h-20"></div>
<div class="bg-slate-50 ">
	<div class="h-10"></div>
	{#await queryListings(null, listing.category, null, null)}
		<ListingCarousel isLoading={true} compactLayout={true} title={`More from ${listing.category}`} />
	{:then data}
		<ListingCarousel listings={data.data} compactLayout={true} title={`More from ${listing.category}`} />
	{:catch error}
		<p>{error.message}</p>
	{/await}
	<div class="h-32"></div>

</div>