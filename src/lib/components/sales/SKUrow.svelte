<script>
	import Image from '$lib/components/image.svelte';
	import Price from '$lib/components/price.svelte';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { fly } from 'svelte/transition';
	import { backOut, expoOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { Minus, Plus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	let { product, increaseQuantityCallback, decreaseQuantityCallback, mutableQuantity=true, ...restProps } = $props();
	let desiredProductQuantity = $state(product.quantity);
	
	const handleQuantityChange = () => {
		setTimeout(()=>{
			if (desiredProductQuantity > product.quantity) {
				increaseQuantityCallback()
			} else if (desiredProductQuantity < product.quantity) {
				decreaseQuantityCallback()
			}
			
		}, 0)
	}
	
	$effect(() => {
		desiredProductQuantity = product.quantity;
	})
</script>
<div in:fly={{y:50, duration: 200, easing:expoOut}} out:fly={{ y:-50, duration: 200, easing: expoOut, z: -10 }}>
						<div class="flex flex-row justify-between h-28 mx-3 rounded-2xl gap-4 p-2 align-middle
									items-center transition-all duration-75 hover:outline-slate-300 outline-1 outline
									outline-transparent bg-white hover:bg-slate-100" {...restProps} in:fly={{y:50, duration: 200, easing:expoOut}} out:fly={{ y:-50, duration: 200, easing: expoOut, z: -10 }}>
							<a href="/listings/{product.listing.id}?selected={product.sku?.id}" class="flex flex-row gap-1 h-full w-72" >
								<div class="w-24 aspect-square">
									<Image src={product?.id} alt="Product " class="w-10 h-10" />
								</div>
								<div class="flex flex-col p-1.5 w-44">
									<p class="font-normal text-xs">{product.listing?.title}</p>
									<p class="font-semibold text-sm line-clamp-2 text-ellipsis">{product.sku?.title}</p>
								
								</div>
							</a>
							
							<div class="flex flex-row gap-1 items-center w-full justify-end">
								{#key product.sku.id}
								<Price price={product.sku?.price} />
									<div class="flex flex-col w-16 justify-center items-center">
										<Button variant="ghost" size="sm" class="{mutableQuantity || 'hidden'} hover:bg-accent/20 hover:text-secondary-foreground" onclick={increaseQuantityCallback}><Plus size={20} strokeWidth={1.25}  /></Button>
										{product.quantity}
										<Button variant="ghost" size="sm" class="{mutableQuantity || 'hidden'} hover:bg-accent/20 hover:text-secondary-foreground" onclick={decreaseQuantityCallback}><Minus size={20} strokeWidth={1.25}  /></Button>
									</div>
									{/key}
							</div>
						</div>
					
					</div>
