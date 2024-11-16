<script>

	export let data;

	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
		import * as Card from '$lib/components/ui/card/index.js';
	import Price from '$lib/components/price.svelte';

</script>

<DashboardPageLayout>
	
	<h1 slot="title">{data.listing.title}</h1>
	
	<div slot="page" class="h-full">
		<div class="h-full flex flex-col justify-between">
			<!--			Selected options -->
			<div>
			<slot />
			</div>
		
<!--			Variant cards-->
			<div class="flex flex-row gap-3 sticky bottom-0 w-full h-fit bg-slate-100 self-end rounded-2xl">
			
<!--				Main listing card -->
				<div class="flex-col flex gap-2.5 w-fit h-fit p-4 rounded-l-2xl bg-amber-50">
					<p>Listing</p>
					<Card.Root class="w-56 border-slate-700 h-36 border-[1.5px]">
						<Card.Header class="p-3.5">
							<p>{data.listing.title}</p>
						</Card.Header>
						<Card.Description class="px-3.5">
							<p>{data.listing.description}</p>
						</Card.Description>
					</Card.Root>
				</div>

				<div class="flex-col flex gap-2.5 w-fit h-fit p-4 rounded-2xl">
					<p>Variants</p>
					<div class="flex flex-row gap-3 h-full">
						{#each data.listing.skus as sku}
							<Card.Root class="w-56 h-36 justify-between flex flex-col">
								<Card.Header class="p-3.5">
									<p>{sku.title}</p>
								</Card.Header>
								<Card.Description class="px-3.5 p-4 self-end text-black">
									<Price price={sku.price} />
								</Card.Description>
							</Card.Root>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</DashboardPageLayout>