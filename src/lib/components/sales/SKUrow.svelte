<script>
	import Image from '$lib/components/image.svelte';
	import Price from '$lib/components/price.svelte';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { fly } from 'svelte/transition';
	import { backOut, expoOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let { product, increaseQuantityCallback, decreaseQuantityCallback, ...restProps } = $props();
	let desiredProductQuantity = $state(product.quantity);
	
	const handleQuantityChange = () => {
		setTimeout(()=>{
			if (desiredProductQuantity > product.quantity) {
				increaseQuantityCallback()
			} else if (desiredProductQuantity < product.quantity) {
				decreaseQuantityCallback()
			}
			
		}, 100)
	}
	
	$effect(() => {
		desiredProductQuantity = product.quantity;
	})
</script>
<a href="/listings/{product.listing.id}" in:fly={{y:50, duration: 200, easing:expoOut}} out:fly={{ y:-50, duration: 200, easing: expoOut, z: -10 }}>
						<div class="flex flex-row justify-between h-28 mx-3 rounded-2xl gap-4 p-2 align-middle
									items-center transition-all duration-75 hover:outline-slate-300 outline-1 outline
									outline-transparent bg-white hover:bg-slate-100" {...restProps}>
							<div class="flex flex-row gap-1 h-full w-72" >
								<div class="w-24 aspect-square">
									<Image src={product?.id} alt="Product " class="w-10 h-10" />
								</div>
								<div class="flex flex-col p-2 w-44">
									<p class="font-normal text-sm">{product.listing?.title}</p>
									<p class="font-semibold text-md line-clamp-2 text-ellipsis">{product.sku?.title}</p>
								
								</div>
							</div>
							
							<button class="flex flex-row gap-3 items-center w-full justify-between" onclick={(e)=>{e.stopPropagation();e.preventDefault()}}>
								{#key product.sku.id}
								<InputWithLabel mv="0" type="number" class="w-16" bind:value={desiredProductQuantity} onchange={handleQuantityChange}>Quantity</InputWithLabel>
								<Price price={product.sku?.price} />
									{/key}
							</button>
						</div>
					
					</a>
