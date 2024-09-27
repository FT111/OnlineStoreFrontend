
<script>
 
	import { page } from '$app/stores';
	import Image from '$lib/components/image.svelte'
	import { fetchListing } from '$lib/api/listings.js';
		import { Separator } from '$lib/components/ui/separator/index.js';
	
	// const data = fetchListing($page.params['listingID']).then((data) => {
	// 	return data;
	// });
	// console.log(data);
	
	let skus = true;
	
	let skuData = [
		{
			"sku": "SKU-1",
			"price": 1.59,
			"stock": 10
		},
		{
			"sku": "SKU-2",
			"price": 1.59,
			"stock": 10
		},
		{
			"sku": "SKU-3",
			"price": 1.59,
			"stock": 10
		},
			{
			"sku": "SKU-4",
			"price": 1.59,
			"stock": 10
			},
	  			{
			"sku": "SKU-5",
			"price": 1.59,
			"stock": 10
								},
			{
			"sku": "SKU-6",
			"price": 1.59,
			"stock": 10
			},
	  			{
			"sku": "SKU-7",
			"price": 1.59,
			"stock": 10
								},
			{
				"sku": "SKU-3",
				"price": 1.59,
				"stock": 10
			},
			{
				"sku": "SKU-4",
				"price": 1.59,
				"stock": 10
			},
			{
				"sku": "SKU-5",
				"price": 1.59,
				"stock": 10
			},
			{
				"sku": "SKU-6",
				"price": 1.59,
				"stock": 10
			},
			{
				"sku": "SKU-7",
				"price": 1.59,
				"stock": 10
			}
	];

</script>

<!--Page Container-->
<div class="mt-20 md:px-14 px-1">
	<!-- Listing Container	-->
	<div class="h-[80vh] bg-muted/30 rounded-2xl flex flex-row gap-5 p-5">
	
<!--	Images Container	-->
		<div class="basis-1/2">
			<Image src="https://via.placeholder.com/1000" alt="Listing Image" class="w-full h-full" />
		</div>
		
<!--	Detail Container	-->
		<div class="basis-1/2 w-1/2 flex flex-col gap-4 flex-shrink-0">
		
<!--			Quick Info Row -->
			<div class="flex flex-row rounded-2xl bg-slate-100 border-4 border-slate-100 w-full h-20 ">
				<div class="basis-1/5 h-full flex flex-col gap-2 items-center flex-wrap align-middle justify-center">
					<p class="text-2xl font-bold">1024</p>
					<p class="text-lg">views</p>
				</div>
				<div class="basis-1/5 h-full bg-zinc-50 rounded-2xl flex flex-col items-center flex-wrap align-middle justify-center">
					<p class="text-2xl font-bold">10+</p>
					<p class="text-lg">sales</p>
				</div>
				<div class="basis-1/5 h-full flex flex-col  items-center flex-wrap align-middle justify-center">
					<p class="text-2xl font-bold">4.2</p>
					<p class="text-lg">rating</p>
				</div>
				<div class="basis-1/5 h-full bg-zinc-50 rounded-2xl  flex flex-col  items-center flex-wrap align-middle justify-center">
					<p class="text-2xl font-bold">10+</p>
					<p class="text-lg">sales</p>
				</div>
				<div class="basis-1/5 h-full flex flex-col items-center flex-wrap align-middle justify-center">
					<p class="text-2xl font-bold">4.2</p>
					<p class="text-lg">rating</p>
				</div>
			</div>
			
			<!--				Listing Heading-->
			<div class="flex flex-col gap-1 mt-4">
				<h1 class="text-4xl font-bold mb-1">Listing Title</h1>
				<main class="line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, perferendis nostrum! Incidunt dolores nisi perspiciatis ex blanditiis magnam et culpa, commodi, voluptas, pariatur nesciunt asperiores iste rerum odio libero fugiat?</main>
			</div>
			
<!--				SKU Details -->
			{#if skus}
				<div class="flex flex-col bg-muted rounded-2xl overflow-x-scroll w-full">
					<div class="flex flex-row relative rounded-t-2xl bg-neutral-200 p-3 overflow-x-scroll gap-3 w-full">
						{#each skuData as sku}
							<div class="bg-primary text-primary-foreground  hover:bg-accent w-20 p-2 px-3 rounded-3xl flex-shrink-0 transition-all duration-250 ease-in-out cursor-pointer">
								{sku.sku}
							</div>
						{/each}
					</div>
					<div class="p-4">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					</div>
					<div class="flex flex-row relative bg-neutral-200 p-3 overflow-x-scroll gap-3 w-full">
						{#each skuData as sku}
							<div class="bg-primary text-primary-foreground  hover:bg-accent w-20 p-2 px-3 rounded-3xl flex-shrink-0 transition-all duration-250 ease-in-out cursor-pointer">
								{sku.sku}
							</div>
						{/each}
					</div>
					<div class="p-4">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					</div>
				</div>
			{/if}
			
		</div>
	</div>
	
	
</div>