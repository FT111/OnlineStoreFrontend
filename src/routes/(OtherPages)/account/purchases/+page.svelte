
<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import { orderStatusesCancellable } from '$lib/constants.svelte.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Price from '$lib/components/price.svelte';
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import Image from '$lib/components/image.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import { updateOrder } from '$lib/api/transactions.js';
	
	const { data } = $props();
	let purchases = {};

	let selectedOrder = $state({
		id: null,
		seller: null,
		title: null,
	});
	let DeletionDialogOpenState = $state(false);

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


<AlertDialog.Root bind:open={DeletionDialogOpenState}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This order will be cancelled and you will be refunded.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Back</AlertDialog.Cancel>
			<AlertDialog.Action onclick={
			async()=>{selectedOrder.status = 'Cancelled';selectedOrder.seller.joinedAt=Math.round(selectedOrder.seller.joinedAt); await updateOrder(selectedOrder.id,selectedOrder).then(()=>{DeletionDialogOpenState=false}).catch((error) => {toast.error(error);});}
			}
			>Cancel order</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>



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
				<div class="flex flex-col rounded-xl p-2 gap-1">
					<div class="flex flex-row justify-between px-2.5 items-center">
						<h2 class="text-md">Purchase made on {purchaseDate} <span class="text-muted-foreground"> {orders.length!==1 ? `• Arriving in ${orders.length} shipments` : ''}</span></h2>
						<Price price={purchaseTotalValue} />
					</div>
					
					<div class="{orders.length>1 && 'p-2.5'} flex flex-col gap-3 border border-1 border-muted-foreground/20 rounded-2xl">
					{#each orders as purchase, index}
						{@const statusData = orderStatusesCancellable.find((status) => status.title === purchase.status)}
						<Card.Root class=" border-1 bg-slate-50  rounded-2xl pb-1.5">
								<div class="flex flex-row justify-between px-6 pt-3.5 items-center">
									<h3 class="text-xs font-medium">Shipment from
										<Button class="px-1 text-sm" href="/users/{purchase.seller.id}" variant="link">{purchase.seller.username}</Button></h3>
									<div class="flex flex-row gap-2.5 h-9">
										{#if purchase.status !== 'Cancelled'}
										<Button class="rounded-3xl h-full bg-opacity-60" onclick={()=>{selectedOrder=purchase;DeletionDialogOpenState=true}} variant="destructive">Cancel</Button>
											{/if}

										<div class='flex flex-row items-center p-1.5 px-2.5 text-sm rounded-full bg-{statusData.colour}'>
											<span class={`${statusData.text ? `text-${statusData.text}` : ``}`}>{purchase.status}</span>
										</div>
									</div>
								</div>
							<Card.Content class="py-2.5">
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