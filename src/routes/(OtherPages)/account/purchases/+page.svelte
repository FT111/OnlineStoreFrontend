
<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import { orderStatusesCancellable } from '$lib/constants.svelte.js';
	import * as Card from '$lib/components/ui/card/index.js';
	
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
				<div class="flex flex-col gap-2 border border-1 border-muted rounded-xl p-4">
					<h2 class="text-xl font-bold">Purchase #{purchaseID}</h2>
				{#each orders as purchase}
				{@const statusData = orderStatusesCancellable.find((status) => status.title === purchase.status)}
				<Card.Root class="rounded-2xl border-0 bg-muted/50">
					<Card.Header>
						<div class="flex flex-row justify-between">
							<Card.Title>Order <span class="text-muted-foreground">#{purchase.id}</span></Card.Title>
							
							<div class="flex flex-row gap-1.5">
								<div class='flex flex-row items-center p-1.5 px-2.5 text-sm rounded-full bg-{statusData.colour}'>
									<span class={`${statusData.text ? `text-${statusData.text}` : ``}`}>{purchase.status}</span>
								</div>
							</div>
						</div>
					</Card.Header>
					<Card.Content>
						<p>Order Date: {purchase.date}</p>
						<p>Products: {purchase.skus.length}</p>
						<p>Total: £{purchase.value /100}</p>
					</Card.Content>
				</Card.Root>
				{/each}
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