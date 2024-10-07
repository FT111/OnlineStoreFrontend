
<script>
	import Image from '$lib/components/image.svelte'
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

	let skus = true;

	const skuList = [{
		'type': 'Colour',
	  'skus': [
				{
					'title': 'Red',
					'price': 1099,
					'stock': 6,
					'rgb': 'rgb(255, 182, 193)' // Light Pink
				},
				{
					'title': 'Blue',
					'price': 1200,
					'stock': 9,
					'rgb': 'rgb(173, 216, 230)' // Light Blue
				},
				{
					'title': 'Green',
					'price': 1300,
					'stock': 3,
					'rgb': 'rgb(144, 238, 144)' // Light Green
				},
				{
					'title': 'Yellow',
					'price': 1400,
					'stock': 6,
					'rgb': 'rgb(255, 255, 224)' // Light Yellow
				},
				{
					'title': 'Black',
					'price': 1500,
					'stock': 6,
					'rgb': 'rgb(211, 211, 211)' // Light Gray
				}
	  ]
	},
	{
		'type': 'Size',
		'skus': [
			{'title': 'Small',
				'price': 1099,
				'stock': 6
			},
			{'title': 'Medium',
				'price': 1200,
				'stock': 9
			},
			{'title': 'Large',
				'price': 1300,
				'stock': 3
			},
			{'title': 'XL',
				'price': 1400,
				'stock': 6
			},
			{'title': 'XXL',
				'price': 1500,
				'stock': 6
			}
		]
	}]
	
		const colours = [
			{
				'title': 'Red',
				'price': 1099,
				'stock': 6,
				'rgb': 'rgb(255, 182, 193)' // Light Pink
			},
			{
				'title': 'Blue',
				'price': 1200,
				'stock': 9,
				'rgb': 'rgb(173, 216, 230)' // Light Blue
			},
			{
				'title': 'Green',
				'price': 1300,
				'stock': 3,
				'rgb': 'rgb(144, 238, 144)' // Light Green
			},
			{
				'title': 'Yellow',
				'price': 1400,
				'stock': 6,
				'rgb': 'rgb(255, 255, 224)' // Light Yellow
			},
			{
				'title': 'Black',
				'price': 1500,
				'stock': 6,
				'rgb': 'rgb(211, 211, 211)' // Light Gray
			}
		]

		const sizes = [
			{'title': 'Small',
				'price': 1099,
				'stock': 6
			},
			{'title': 'Medium',
				'price': 1200,
				'stock': 9
			},
			{'title': 'Large',
				'price': 1300,
				'stock': 3
			},
			{'title': 'XL',
				'price': 1400,
				'stock': 6
			},
			{'title': 'XXL',
				'price': 1500,
				'stock': 6
			}
		]

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
		<div class="basis-1/2 w-1/2 flex flex-col gap-4 flex-shrink-0 justify-between">
		
<!--		Top info	-->
			<div class="flex flex-col gap-4 flex-shrink-0 ">
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
						<p class="text-2xl font-bold">25+</p>
						<p class="text-lg">in stock</p>
					</div>
					<div class="basis-1/5 h-full flex flex-col items-center flex-wrap align-middle justify-center">
						<p class="text-2xl font-bold">New</p>
						<p class="text-lg">condition</p>
					</div>
				</div>
				
				<!--				Listing Heading-->
				<div class="flex flex-col gap-1 mt-4">
					<h1 class="text-4xl font-bold mb-1">Listing Title</h1>
					<main class="line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, perferendis nostrum! Incidunt dolores nisi perspiciatis ex blanditiis magnam et culpa, commodi, voluptas, pariatur nesciunt asperiores iste rerum odio libero fugiat?</main>
				</div>
				
	<!--				SKU Details -->
				{#if skus}
					<div class="flex flex-col bg-muted rounded-2xl overflow-x-scroll w-full border-4 border-muted">
						<div class="flex flex-col p-2 px-4">
							<p class="font-semibold text-lg">Colour</p>
							<div class="flex flex-row relative rounded-t-2xl p-2 px-1 overflow-x-scroll gap-3 w-full">
								{#each colours as sku}
									<Badge style={`background-color: ${sku.rgb}`} class={`text-primary  hover:bg-accent w-20 p-2 px-3 rounded-3xl flex-shrink-0 transition-all duration-250 ease-in-out cursor-pointer`}>
										{sku.title}
									</Badge>
								{/each}
							</div>
						</div>
						
						<div class="flex flex-col rounded-2xl bg-slate-50 p-2 px-4">
							<p class="font-semibold text-lg">Size</p>
							<div class="flex flex-row relative rounded-t-2xl p-2 px-1 overflow-x-scroll gap-3 w-full">
								{#each sizes as sku}
									<Badge class="bg-primary text-primary-foreground  hover:bg-accent w-20 p-2 px-3 rounded-3xl flex-shrink-0 transition-all duration-250 ease-in-out cursor-pointer">
										{sku.title}
									</Badge>
								{/each}
							</div>
						</div>
						
						<div class="flex flex-col rounded-2xl p-2 px-4">
							<p class="font-semibold text-lg">Size</p>
							<div class="flex flex-row relative rounded-t-2xl p-2 px-1 overflow-x-scroll gap-3 w-full">
								{#each sizes as sku}
									<Badge class="bg-primary text-primary-foreground  hover:bg-accent w-20 p-2 px-3 rounded-3xl flex-shrink-0 transition-all duration-250 ease-in-out cursor-pointer">
										{sku.title}
									</Badge>
								{/each}
							</div>
						</div>
	
					</div>
				{/if}
			</div>
			
			<!--		Basket options	-->
			<div class="w-full bottom-16 min-h-24 p-3 bg-slate-100 rounded-3xl flex flex-row justify-between shadow-sm z-20">
				<div />
				<Button class="w-full h-full text-2xl rounded-3xl basis-1/2 font-bold border-4 border-amber-500 bg-primary shadow-md " variant="default">Add to Basket</Button>
			</div>
			
		</div>
	</div>
	
	
</div>