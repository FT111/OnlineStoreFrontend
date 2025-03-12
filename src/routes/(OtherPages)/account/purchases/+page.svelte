
<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import { orderStatusesCancellable } from '$lib/constants.svelte.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Price from '$lib/components/price.svelte';
	import Image from '$lib/components/image.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { goto } from '$app/navigation';
	
	const { data } = $props();
	let purchases = {};
	
	// // Purchases aggregate multiple orders using purchaseID
	if (!data.orders || Object.keys(data.orders).length > 0) {
		purchases = data.orders.purchases.reduce((acc, order) => {
			if (acc[order.purchaseID]) {
				acc[order.purchaseID].push(order);
			} else {
				acc[order.purchaseID] = [order];
			}
			return acc;
		}, {});
	}
</script>

<DashboardPageLayout>
	{#snippet title()}
		Purchases
	{/snippet}
	
	{#snippet page()}
		
		<div class="flex flex-col gap-3.5 w-full">
			
			{#each Object.entries(purchases) as [purchaseID, orders]}
				{@const purchaseDateFromTimeStamp = new Date(orders[0].addedAt * 1000)}
				{@const purchaseDate = purchaseDateFromTimeStamp.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
				{@const purchaseTotalValue = orders.reduce((acc, order) => acc + order.value, 0)}
				<div class="flex flex-col rounded-xl p-4 gap-1">
					<div class="flex flex-row justify-between px-2.5 items-center">
						<h2 class="text-md">Purchase made on {purchaseDate} <span class="text-muted-foreground">• Arriving in {orders.length} shipment{orders.length!==1 ? 's': ''}</span></h2>
						<Price price={purchaseTotalValue} />
					</div>
					
					<div class="flex flex-col gap-0 border border-1 border-muted-foreground/20 rounded-2xl">
					{#each orders as purchase, index}
						{@const statusData = orderStatusesCancellable.find((status) => status.title === purchase.status)}
						<Card.Root class="rounded-none border-1  {index===0 && 'rounded-t-2xl'} {index===orders.length-1 ? 'rounded-b-2xl pb-4' : ''} ">
							<Card.Header>
								<div class="flex flex-row justify-end">
									<div class="flex flex-row gap-1.5">
										<div class='flex flex-row items-center p-1.5 px-2.5 text-sm rounded-full bg-{statusData.colour}'>
											<span class={`${statusData.text ? `text-${statusData.text}` : ``}`}>{purchase.status}</span>
										</div>
									</div>
								</div>
							</Card.Header>
							<Card.Content class="py-1">
								<ul class="flex flex-col gap-1 w-full">
									{#each purchase.skus as sku}
										<li class="flex flex-row gap-2 w-full">
											<a href={`/listings/${sku.listing.id}?selected=${sku.sku.id}`}>
											<Image src={sku.sku.images[0]} alt={sku.name} class="h-15 w-15 object-cover rounded-lg" />
											</a>
											
											<div class="flex flex-row justify-between gap-0.5 items-center w-full">
												<a href={`/listings/${sku.listing.id}?selected=${sku.sku.id}`}>
													<p class="text-sm font-bold">{sku.listing.title}</p>
													<p class="text-xs">{sku.sku.title}</p>
													<p class="text-xs">Quantity: {sku.quantity}</p>
												</a>
												
												<Price price={sku.value} />
											</div>
										</li>
									{/each}
									
								</ul>
							</Card.Content>
						</Card.Root>
						{/each}
					</div>
				</div>
			{/each}
			
		</div>

	{/snippet}
</DashboardPageLayout>

<!--this is to get tailwind to work, ignore-->
<div class="hidden">
	<div class="bg-sky-700"></div>
	<div class="bg-green-600"></div>
	<div class="bg-emerald-800"></div>
	<div class="bg-rose-800"></div>
</div>