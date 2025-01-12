<script>
	import { run } from 'svelte/legacy';


	import { ArrowDown, ArrowUp, Box, Info, Plus, TriangleAlert, Truck } from 'lucide-svelte';
	import { page } from '$app/state';

	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Price from '$lib/components/price.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
		import { onMount } from 'svelte';
		import * as Tooltip from "$lib/components/ui/tooltip";
		import HelpTooltip from '$lib/components/HelpTooltip.svelte';
	import { selectedListing, refreshSelectedListing } from '$lib/account.svelte.js';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { debounce } from '@melt-ui/svelte/internal/helpers';

	let { data = {
		listing: { skus: []}},
							children } = $props();
	
	
	let variantCardContainer = $state(null);
	let scrollDistance = $state(0); // For tracking scroll position of variant card container
	let selectedVariant = $state('not selected');
	let currentListing = $state(selectedListing.listing)
	
	afterNavigate(() => {
		currentListing = selectedListing.listing;
	});
	
	if (browser){
		addEventListener('skuSaved', () => {
			currentListing = selectedListing.listing;
		});
	}
	
	// Handles selecting the variant to display
	run(() => {
		if (page.url.pathname.includes('new')) {
			selectedVariant = 'new';
		} else if (page.params.skuID === undefined || !currentListing.skus) {
			selectedVariant = 'not selected';
		} else {
			currentListing.skus.forEach(sku => {
			  if (sku.id === page.params.skuID) {
					selectedVariant = sku;
				}
			})
		}
	});

	if (browser) {
		onMount(() => {
			variantCardContainer.addEventListener('scroll', debounce(() => {
				scrollDistance = variantCardContainer.scrollTop;
			}, 100));
		});
	}

</script>

<DashboardPageLayout>
<!-- Title section - Changes to SKU title if one is selected	-->
	{#snippet header()}
		<p >Editing {selectedVariant!== 'not selected' ? currentListing.title : ''}</p>
	{/snippet}
	{#snippet title()}
		<h1 >
			{selectedVariant==='new' ? 'New Product' :
			(selectedVariant=== 'not selected') ? currentListing.title :
			selectedVariant ? selectedVariant.title : currentListing.title}
		</h1>
	{/snippet}
	
	{#snippet page()}
		<div  class="h-full">
			<div class="h-full flex flex-col justify-between">
				{#key selectedVariant}
					{@render children?.(currentListing)}
				{/key}
			
	<!--			Variant cards-->
				<div class="flex flex-row gap-3 z-10 sticky bottom-3.5 w-full h-fit bg-slate-100 self-end rounded-2xl shadow-md outline outline-1 outline-muted/40">
				
	<!--				Main listing card -->
					<div class="flex-col flex gap-2.5 w-fit h-fit p-4 rounded-l-2xl bg-amber-50">
						<p>Listing</p>
						<a href="/account/listings/{currentListing.id}">
							<Card.Root  class="w-56 border-slate-700 h-36 border-[1.5px] hover:border-accent/60 scale-105 transition-all justify-between flex flex-col">
								<div>
									<Card.Header class="p-3.5 pb-0.5 w-full">
										<p class="overflow-hidden text-wrap">{currentListing.title}</p>
									</Card.Header>
									<Card.Description class="px-3.5 text-sm line-clamp-2">
										<p>{currentListing.description}</p>
									</Card.Description>
								</div>
								
								<Card.Footer class="p-3.5 flex flex-row gap-1 w-full">
									<Badge class="py-1.5 px-2.5 gap-1" variant={currentListing.public ? 'default' : 'secondary'}>
										<Info class="size-4" />
										<p>{currentListing.public ? 'Public' : 'Private'}</p>
									</Badge>
								</Card.Footer>
							</Card.Root>
						</a>
					</div>

					<div class="flex-col flex gap-2.5 h-fit p-4 rounded-2xl">
						<p class="flex flex-row items-center gap-1">Product Variations
							<HelpTooltip>
								Variations are what users pick from and purchase.<br />
								You may need to scroll to see all variations.
							</HelpTooltip></p>
						<div class="flex flex-row justify-between gap-1 items-center w-full">
						<div bind:this={variantCardContainer} class="flex flex-row gap-3 gap-y-2 h-36 flex-wrap overflow-y-scroll">
							{#if !currentListing.skus}
								<div></div>
							{:else}
								{#each currentListing.skus as sku}
									<a href={`/account/listings/${currentListing.id}/${sku.id}`}>
										<Card.Root class="w-48 h-32 justify-between flex flex-col hover:border-accent transition-all hover:brightness-125
															{typeof(selectedVariant)==='object' ? selectedVariant.id===sku.id ? ' border-slate-800 border-2 ' : '' : ''}">
											<Card.Header class="p-3.5 line-clamp-2">
												<p>{sku.title}</p>
											</Card.Header>
											<Card.Description class="px-3.5 p-4 self-end text-black bg-none pt-0 pb-2">
												<div class="flex flex-col items-end justify-end">
													{#key sku.price}
														<Price price={sku.price} />
													{/key}
													
													<div class="flex flex-row gap-2">
														{#if Object.keys(sku.options).length !== Object.keys(currentListing.skuOptions).length }
															<Tooltip.Provider>
																<Tooltip.Root>
																	<Tooltip.Trigger>
																		<div class="flex flex-row gap-1 items-center bg-red-700 text-white rounded-3xl px-2 ">
																			<TriangleAlert size={18} strokeWidth={1.25} color="white" class="text-white stroke-white" />
																		</div>
																	</Tooltip.Trigger>
																	<Tooltip.Content class="max-w-60">
																		<p><strong>Invalid</strong> variant options selected<br/><br/>Variant may not be able to be selected</p>
																	</Tooltip.Content>
																</Tooltip.Root>
															</Tooltip.Provider>
														{/if}
														
														<Tooltip.Provider>
															<Tooltip.Root>
															<Tooltip.Trigger>
																<div class="flex flex-row gap-1 items-center">
																	{Number(Math.random() * 6).toFixed(0)}
																	<Truck size={18} strokeWidth={1.25} />
																</div>
															</Tooltip.Trigger>
															<Tooltip.Content>
																<p>Current Orders</p>
															</Tooltip.Content>
														</Tooltip.Root>
														</Tooltip.Provider>
														
														<Tooltip.Provider>
<Tooltip.Root>
															<Tooltip.Trigger>
																{#key sku.stock}
																	<div class="flex flex-row gap-1 items-center rounded-full
																		{Number(sku.stock) === 0 ? 'bg-red-700 text-white px-2 ': 'bg-none'}">
																		{sku.stock}
																		<Box size={18} strokeWidth={1.25} /></div>
																{/key}
															</Tooltip.Trigger>
															<Tooltip.Content>
																<p>In Stock</p>
															</Tooltip.Content>
														</Tooltip.Root>
														</Tooltip.Provider>
													</div>
												</div>
											</Card.Description>
										</Card.Root>
									</a>
								{/each}
							{/if}
							
						<!--	Add new variant card -->
							<a href={`/account/listings/${currentListing.id}/new`}>
								<Card.Root class="w-48 h-32 flex flex-col border-2 border-dashed bg-emerald-50/40 items-center justify-center
												  hover:border-solid hover:bg-emerald-100 hover:border-emerald-500 transition-all group
												{selectedVariant==='new' ? 'border-emerald-500 border-solid' : ''}">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
										 stroke-width="1.5" stroke="currentColor" class="size-12 opacity-30 hover:opacity-70
										  group-hover:opacity-70 text-emerald-700 transition-all
											{selectedVariant==='new' ? ' opacity-70' : ''}">
										<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
									</svg>
								</Card.Root>
							</a>
						</div>
							
							{#if currentListing.skus.length > 1}
							
						<ArrowDown strokeWidth="1.25" class="size-8 text-slate-700 opacity-70 transition-all
																{scrollDistance !== (variantCardContainer?.scrollHeight - variantCardContainer?.clientHeight) ? 'rotate-0' : 'rotate-180'}" />
								
								{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</DashboardPageLayout>