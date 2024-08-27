
<script>
 
	import { page } from '$app/stores';
	import Image from '$lib/components/image.svelte'
	import { fetchListing } from '$lib/api/listings.js';
	
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
<!--				Listing Heading-->
			<div class="flex flex-col gap-1">
				<h1 class="text-4xl font-bold">Listing Title</h1>
				<main>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, perferendis nostrum! Incidunt dolores nisi perspiciatis ex blanditiis magnam et culpa, commodi, voluptas, pariatur nesciunt asperiores iste rerum odio libero fugiat?</main>
			</div>
			
<!--				SKU Details -->
			{#if skus}
				<div class="flex flex-col bg-muted rounded-2xl overflow-x-scroll w-full">
					<div class="flex flex-row relative rounded-t-2xl bg-neutral-200 p-4 overflow-x-scroll gap-3 w-full">
						{#each skuData as sku}
							<div class="bg-accent text-white w-20 p-2 px-3 rounded-3xl flex-shrink-0">
								{sku.sku}
							</div>
						{/each}
					</div>
					<div class="p-4">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt ex exercitationem ad natus eligendi sunt iusto blanditiis accusamus dolores, quidem doloribus consequuntur harum earum illum vitae in sint repellendus explicabo.
					</div>
				</div>
			{/if}
			
		</div>
	</div>
	
	
</div>