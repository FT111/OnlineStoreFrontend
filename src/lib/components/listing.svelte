<script>
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Skeleton } from "$lib/components/ui/skeleton";
	import Image from "$lib/components/image.svelte";
	import Price from "$lib/components/price.svelte";
	import * as Avatar from "$lib/components/ui/avatar";
	import { basketStore } from "$lib/basket.svelte.js";
		import { baseURL } from '$lib/api/core.js';
		import ListingImpressionHandler from '$lib/components/analytics/listingImpressionHandler.svelte';
	import { registerListingClick, registerListingImpression } from '$lib/analytics/listings.js';
	
	let listingRef= $state(null);
	let {
		class: className = '',
		listing = {ownerUser: {
			                      id: 1,
	                      username: 'JD',
	                      profilePictureURL: 'https://via.placeholder.com/150',
	                      bannerURL: ''
	  },
	                      title: 'Title',
	                      description: 'Description',
	                      rating: 4.5,
	                      basePrice: 100,
	                      hasDiscount: true,
	                      multipleSKUs: true,
	                      id: 1
	},
		editMode = false,
		isLoading = false,
		addToBasket = (event) => {
		event.preventDefault();
		basketStore.addItem({id: listing.id});
	}
	} = $props();
	
	function clickHandler(e) {
		registerListingImpression(listing);
		registerListingClick(listing);
	}
	
</script>


<a  href="/listings/{listing.id}" class="w-full h-min {className}" onclick={clickHandler}>
	<Card.Root class="flex flex-col justify-start h-full w-full shadow-sm group rounded-xl bg-muted/60 p-0
					transition-all duration-150 ease-in-out hover:bg-slate-200/50 hover:border-accent/50
					border-slate-200 gap-0" href="/listings/{listing.id}">
		
		<Card.Header class="pb-4">
			{#if isLoading === true}
				<Skeleton class="w-2/3 h-5 rounded-md my-2" />
				<Skeleton class="w-full h-4 rounded-md" />
			
			
			{:else}
				<Card.Title class="line-clamp-2 first-line:text-xl text-md">{ listing.title }</Card.Title>
				<Card.Description class="truncate hover:text-wrap mt-0">{ listing.description }</Card.Description>
			{/if}
		
			<div class="flex flex-row justify-between pt-2 items-center">
				<div class="flex flex-row gap-2 align-middle items-center bg-slate-200 w-fit rounded-3xl p-1 pr-3">
					<a  href={`/users/${listing.ownerUser.id}`}>
						<Avatar.Root>
							<Avatar.Image src={listing.ownerUser.profilePictureURL} alt='Avatar' />
							<Avatar.Fallback>{listing.ownerUser?.username?.slice(0,2)}</Avatar.Fallback>
						</Avatar.Root>
					</a>

					<div class="flex flex-col">
						<div class="text-xs font-light flex flex-row align-middle items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 stroke-accent">
							<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
						</svg>
							{#if isLoading === true}
								<p></p>
							{:else}
								4.3
							{/if}</div>
					</div>
				</div>
				<p class="text-md font-light flex flex-row pr-2 align-middle items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="size-6 stroke-accent">
					<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
				</svg>
					{listing.rating}
				</p>
				
			</div>
			
		</Card.Header>
		<div class="flex flex-col justify-end">
			<Card.Content class="py-1 " bind:ref={listingRef}>
				<Image class="h-full rounded-md border-b aspect-square  " src={listing.images ? `${baseURL}static/listingImages/${listing.images[0]}` : 'https://placehold.co/1000'} alt="{listing.description}" />
			</Card.Content>
			<Card.Footer class="gap-2 justify-end pb-3">
				<div></div>
	
				<div class="flex w-full justify-end">
					{#if isLoading === true}
						<div class="flex flex-col gap-2 w-full justify-end items-end pt-2">
							<Skeleton class="w-1/2 h-3 rounded-md" />
							<Skeleton class="w-7/12 h-8 rounded-md" />
						</div>
					{:else}
						<div class="flex flex-col gap-0 w-full justify-end text-right">
							{#if listing.multipleSKUs === true}
								<p class="text-sm font-bold">{listing.hasDiscount ? 'Discounted •' : ''} Starting at</p>
							{:else}
								<br>
							{/if}
							<div class="flex-row flex gap-2 items-center justify-end">
								{#if listing.hasDiscount === true}
									<div class="items-center justify-center align-middle">
										<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="absolute w-4 h-4 fill-red-500 animate-ping opacity-60">
											<circle cx="50" cy="50" r="50" />
										</svg>
										<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-accent animate-pulse">
											<circle cx="50" cy="50" r="50" />
										</svg>
									</div>
									<Price price={listing.basePrice} discounted={true} />
								{:else}
									<Price price={listing.basePrice} />
								{/if}
							</div>
						</div>
					{/if}
				</div>
			</Card.Footer>
		</div>
	</Card.Root>
</a>
<ListingImpressionHandler listing={listing} listingRef={listingRef} />
