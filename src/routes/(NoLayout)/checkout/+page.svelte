
<script>
	import Logo from "$lib/branding/logo.svelte";
	import { basketStore } from '$lib/basket.svelte.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import SKUrow from '$lib/components/sales/SKUrow.svelte';
	import Price from '$lib/components/price.svelte';
</script>

<div class="flex flex-col h-screen">
	<div class="h-[10vh] flex flex-row items-center justify-center w-full  bg-slate-100 border border-b-[1px]">
		<Logo class="!text-4xl" />
	</div>
	
	<div class="flex flex-row w-full h-[90vh]">
		<div class="basis-1/2 flex-col flex items-end p-6">
			<div class="md:max-w-3/4 flex flex-col w-fit">
			</div>
		
		</div>
		<div class="basis-1/2 bg-accent text-accent-foreground flex flex-col items-start overflow-y-scroll ">
			<div class="md:max-w-full flex flex-col w-full gap-4">
				<h2 class="p-6 z-10 text-4xl font-semibold top-0 sticky bg-accent/70 w-full text-left backdrop-blur-2xl">Summary</h2>
				<ul class="p-6 flex flex-col gap-1.5 py-2.5 rounded-lg text-black">
					{#await basketStore.loadBasketContent()}
						{#each Array(basketStore.basket.items.length) as _}
								<Skeleton class="w-1/2 h-2.5" />
						{/each}
					{:then basket}
					{#each Object.values(basketStore.basket.items) as item}
						<SKUrow product={item}/>
					{/each}
					
					{/await}
				</ul>
				<ul class="p-6 z-10 sticky bottom-0 bg-accent/70 backdrop-blur-2xl">
					<li>Total: {basketStore.basket.total} products</li>
					<li>Subtotal: <Price price={basketStore.basket.value} /></li>
					<li>Shipping: {basketStore.basket.shipping}</li>
				</ul>
			</div>
			
			</div>
	</div>
</div>
