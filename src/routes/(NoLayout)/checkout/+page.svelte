
<script>
	import Logo from "$lib/branding/logo.svelte";
	import { basketStore } from '$lib/basket.svelte.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import SKUrow from '$lib/components/sales/SKUrow.svelte';
	import Price from '$lib/components/price.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeft } from 'lucide-svelte';
	
	const { data } = $props()
</script>

<div class="flex flex-col h-screen">
	<div class="relative h-[10vh] flex flex-row items-center justify-between w-full  border border-b-[1px]">
		<a href={`${page.url.searchParams.get('referrer')}`}  class="z-10 mx-4">
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
			<div class="md:max-w-full flex flex-col w-full gap-4">
				<h2 class="p-6 z-10 text-4xl font-semibold top-0 sticky bg-secondary/80 w-full text-left backdrop-blur-2xl">Summary</h2>
				<ul class="px-6 flex flex-col gap-2 py-0 rounded-lg text-black">
					{#each Object.values(basketStore.basket.items) as item}
						<SKUrow product={item}/>
					{/each}
				</ul>
				<ul class="p-6 z-10 sticky bottom-0 bg-secondary/80 backdrop-blur-2xl">
					<li>Total: {basketStore.basket.total} products</li>
					<li>Subtotal: <Price price={basketStore.basket.value} /></li>
					<li>Shipping: {basketStore.basket.shipping}</li>
				</ul>
			</div>
			
			</div>
	</div>
</div>
