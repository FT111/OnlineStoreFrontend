
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
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	
	const { data } = $props()
	let previousPage = $state('/')
	
	afterNavigate(({from}) => {
		previousPage = from?.url.pathname || previousPage
	})
</script>

<div class="flex flex-col h-screen">
	<div class="relative h-[10vh] flex  items-center justify-between w-full  border border-b-[1px]">
		<a href={previousPage}  class="z-10 mx-4">
			<Button variant="ghost"><ArrowLeft stroke-width="1.25" /> Back</Button>
		</a>
		<div class="absolute items-center flex justify-center flex-row size-full">
			<Logo class="!text-4xl" />
		</div>
	</div>
	
	<div class="flex md:flex-row flex-col w-full h-[90vh]">
		<div class="basis-1/2 flex-col flex md:items-end items-center p-6">
			<form class="md:w-3/4 flex flex-col w-fit">
				<div class="flex flex-col gap-2.5">
					<h3 class="text-2xl">Delivery</h3>
					<p class="text-sm text-muted-foreground">Please enter your delivery details</p>
					<div class="flex flex-col gap-2.5">
						<div class="flex flex-row flex-grow flex-1 gap-2.5">
							<InputWithLabel value={data.user.firstName} label="First name" placeholder="Recipient's first name" name="firstName" required>First name</InputWithLabel>
							<InputWithLabel value={data.user.surname} label="Surname" placeholder="Recipient's surname" name="surname" required>Surname</InputWithLabel>
						</div>
						
						<InputWithLabel value={data.user.addressLine1 && data.user.addressLine1} name="addressLine1" label="Address line 1" placeholder="Address line 1" required>Address line 1</InputWithLabel>
						<InputWithLabel value={data.user.addressLine2 && data.user.addressLine2} name="addressLine2" label="Address line 2" placeholder="Address line 2">Address line 2 (optional)</InputWithLabel>
						
							<InputWithLabel name="city" label="City" placeholder="City" required>Town/City</InputWithLabel>
						<div class="flex flex-row gap-2.5">
							<InputWithLabel name="county" label="County" placeholder="County" required>County</InputWithLabel>
							<InputWithLabel name="postcode" label="Postcode" placeholder="Postcode" required>Postcode</InputWithLabel>
						</div>
					</div>
				</div>
			</form>
		
		</div>
		<div class="basis-1/2 bg-secondary text-secondary-foreground flex flex-col items-start overflow-y-scroll ">
			<div class="md:max-w-full flex flex-col w-full h-full">
				<h2 class="p-6 pb-2 z-10 text-2xl top-0 sticky bg-secondary/80 w-full text-left backdrop-blur-2xl">Summary</h2>
				<ul class="px-6 flex flex-col gap-2 py-2 rounded-lg text-black max-w-5/6 w-fit">
					{#if Object.keys(basketStore.basket.items).length === 0}
						{#each Array(3) as _}
							<Skeleton height="h-28 w-full" />
						{/each}
					{:else}
						{#each Object.values(basketStore.basket.items) as item}
							<SkuRow class="bg-none flex flex-row" product={item} increaseQuantityCallback={()=>{basketStore.addSKU(item.sku)}} decreaseQuantityCallback={()=>{basketStore.removeSKU(item.sku)}}  />
						{/each}
					{/if}
				</ul>
				<ul class="p-4 justify-self-end z-10 sticky bottom-0 bg-secondary/60 text-muted-foreground backdrop-blur-2xl">
					<li>{basketStore.basket.total} products</li>
					<li>Total includes VAT</li>
					<li class="flex flex-row gap-2.5 items-center text-black">Total: <Price price={basketStore.basket.value} /></li>
				</ul>
			</div>
			
			</div>
	</div>
</div>
