
<script>
	import Logo from "$lib/branding/logo.svelte";
	import { basketStore } from '$lib/basket.svelte.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import SkuRow from '$lib/components/sales/SKUrow.svelte';
	import Price from '$lib/components/price.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeft } from 'lucide-svelte';
	import { afterNavigate } from '$app/navigation';
	
	const { data } = $props()
	let previousPage = $state('/')
	
	afterNavigate(({from}) => {
		previousPage = from?.url.pathname || previousPage
	})
</script>

<div class="flex flex-col h-screen">
	<div class="relative h-[10vh] flex flex-row items-center justify-between w-full  border border-b-[1px]">
		<a href={previousPage}  class="z-10 mx-4">
			<Button variant="ghost"><ArrowLeft stroke-width="1.25" /> Back</Button>
		</a>
		<div class="absolute items-center flex justify-center flex-row size-full">
			<Logo class="!text-4xl" />
		</div>
	</div>
	
	<div class="flex flex-row w-full h-[90vh]">
		<div class="basis-1/2 flex-col flex items-end p-6">
			<div class="md:max-w-3/4 flex flex-col w-fit">
			</div>
		
		</div>
		<div class="basis-1/2 bg-secondary text-secondary-foreground flex flex-col items-start overflow-y-scroll ">
			<div class="md:max-w-full flex flex-col w-full h-full gap-4">
				<h2 class="p-6 z-10 text-4xl font-semibold top-0 sticky bg-secondary/80 w-full text-left backdrop-blur-2xl">Summary</h2>
				<ul class="px-6 flex flex-col gap-2 py-0 rounded-lg text-black w-5/6">
					{#if Object.keys(basketStore.basket.items).length === 0}
						{#each Array(3) as _}
							<Skeleton height="h-28 w-full" />
						{/each}
					{:else}
						{#each Object.values(basketStore.basket.items) as item}
							<SkuRow product={item} increaseQuantityCallback={()=>{basketStore.addSKU(item.sku)}} decreaseQuantityCallback={()=>{basketStore.removeSKU(item.sku)}}  />
						{/each}
					{/if}
				</ul>
				<ul class="p-6 justify-self-end z-10 sticky top-full bg-slate-200/60 text-muted-foreground backdrop-blur-2xl">
					<li>{basketStore.basket.total} products</li>
					<li>Total includes VAT</li>
					<li class="flex flex-row gap-2.5 items-center text-black">Total: <Price price={basketStore.basket.value} /></li>
				</ul>
			</div>
			
			</div>
	</div>
</div>
