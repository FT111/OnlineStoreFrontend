<script>
import Image from '$lib/components/image.svelte';
import Price from '$lib/components/price.svelte';
import { Button } from '$lib/components/ui/button/index.js';
import * as Sheet from '$lib/components/ui/sheet/index.js';
import { basketStore } from '$lib/basket.svelte.js';
import { Skeleton } from '$lib/components/ui/skeleton/index.js';
import * as Popover from "$lib/components/ui/popover";
import { page  } from '$app/state';
import {flip} from 'svelte/animate';
import SkuRow from '$lib/components/sales/SKUrow.svelte';
import { backOut } from 'svelte/easing';


let basketOpen = $state(false);
$inspect(basketStore.basket);

</script>

<Sheet.Root bind:open={basketOpen} onOpenChange={()=>{basketStore.loadBasketContent()}}>
	<Sheet.Trigger>
				<div>
					{#if Object.keys(basketStore.basket)}
					<span class="absolute top-3 text-xs bg-secondary rounded-3xl text-primary w-5">{basketStore.basket.total}</span>
					{/if}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
					</svg>
				</div>
	</Sheet.Trigger>
	<Sheet.Content class="p-0 overflow-y-auto h-full flex flex-col w-full bg-slate-100" width="64">
		<Sheet.Header class="sticky top-0 bg-none backdrop-blur-2xl z-10 flex flex-row items-center pr-6 justify-between">
			<Sheet.Title class="p-8">Your Basket</Sheet.Title>
			<Button variant="ghost" onclick={()=>{basketOpen=false}}>
				<svg   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</Button>
		
		</Sheet.Header>
		
		<div class="grow flex flex-col gap-3 pt-1">
			{#if basketStore.basket}
				{#if Object.keys(basketStore.basket.items).length === 0}
					<p class="text-center">Your basket is empty</p>
				{:else}
				{#each Object.values(basketStore.basket.items) as product, index (product.sku?.id || index)}
					<div animate:flip={{duration: 225, easing: backOut}}>
						{#if product.sku && product.listing}
							<SkuRow product={product} increaseQuantityCallback={()=>{basketStore.addSKU(product.sku)}}
											decreaseQuantityCallback={()=>{basketStore.removeSKU(product.sku)}} />
						{:else}
							<div class="flex flex-col h-28 mx-3 rounded-2xl gap-2 p-2.5
										 transition-all duration-75  outline-1 outline
										outline-transparent bg-slate-50 hover:bg-slate-100">
								<Skeleton width="20" height="5" />
								<Skeleton width="16" height="3" />
							</div>
							{/if}
						</div>
				{/each}
					{/if}
				{/if}
		</div>
		{#if Object.keys(basketStore.basket.items).length > 0}
			<div class="h-fit bottom-0 sticky bg-muted/50 backdrop-blur-2xl w-full flex flex-row gap-8 p-5 mt-2 items-center justify-end">
				<Price price={basketStore.basket.value} />
				
				<a href='/checkout'><Button>Checkout</Button></a>
			</div>
			{/if}
	</Sheet.Content>
</Sheet.Root>