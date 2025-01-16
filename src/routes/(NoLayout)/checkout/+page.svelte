
<script>
	import Logo from "$lib/branding/logo.svelte";
	import { basketStore } from '$lib/basket.svelte.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import SKUrow from '$lib/components/sales/SKUrow.svelte';
	import Price from '$lib/components/price.svelte';
	onMount(() => {
			// Refresh the basket item's detail from the API.
			// Avoids stale data.
			basketStore.loadBasketContent();
	});
	$inspect(basketStore.basket);

</script>

<div class="flex flex-col">
	<div class="flex flex-row items-center justify-center w-full h-24 bg-slate-100 border border-b-[1px]">
		<Logo class="!text-4xl" />
	</div>
	
	<div class="flex flex-row w-full h-screen flex-grow">
		<div class="basis-1/2 flex-col flex items-end p-6">
			<div class="md:max-w-3/4 flex flex-col w-fit">
			</div>
		
		</div>
		<div class="basis-1/2 bg-accent text-accent-foreground flex flex-col items-start p-6">
			<div class="md:max-w-3/4 flex flex-col w-fit gap-4">
				<h2 class="text-4xl font-semibold">Summary</h2>
				<ul class="flex flex-col gap-1.5 py-2.5 rounded-lg text-black">
					{#if basketStore.basket.enriched}
					{#each Object.values(basketStore.basket.items) as item}
						<SKUrow product={item}/>
					{/each}
						{:else}
						{#each Array(basketStore.basket.items.length) as _}
								<Skeleton class="w-1/2 h-2.5" />
						{/each}
					
					{/if}
				</ul>
				<ul>
					<li>Total: {basketStore.basket.total} products</li>
					<li>Subtotal: <Price price={basketStore.basket.value} /></li>
					<li>Shipping: {basketStore.basket.shipping}</li>
				</ul>
			</div>
			
			</div>
	</div>
</div>
