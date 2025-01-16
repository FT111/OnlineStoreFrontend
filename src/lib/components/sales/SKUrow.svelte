<script>
	import Image from '$lib/components/image.svelte';
	import Price from '$lib/components/price.svelte';
	let { product, ...restProps } = $props();
</script>
<a href="/listings/{product.listing.id}">
						<div class="flex flex-row justify-between h-28 mx-3 rounded-2xl gap-4 p-2.5 align-middle
									items-center transition-all duration-75 hover:outline-slate-300 outline-1 outline
									outline-transparent bg-white hover:bg-slate-100" {...restProps}>
							<div class="flex flex-row gap-1 h-full w-auto">
								<div class="w-24 aspect-square">
									<Image src={product?.id} alt="Product " class="w-10 h-10" />
								</div>
								<div class="flex flex-col p-2 w-full">
									<p class="font-normal text-sm">{product.listing?.title}</p>
									<p class="font-semibold text-md line-clamp-2 text-ellipsis">{product.sku?.title}</p>
								
								</div>
							</div>
							
							<div class="flex flex-row gap-3 items-center min-w-24 justify-between">
								<p>{product.quantity}</p>
								<Price price={product.sku?.price} />
							</div>
						</div>
					
					</a>
