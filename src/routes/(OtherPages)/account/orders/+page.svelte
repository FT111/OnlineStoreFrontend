<script>
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import Price from '$lib/components/price.svelte';
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	
	const mockOrders = [
		{
			id: 1,
			status: 'Out for delivery',
			products: [
				{
					id: 1,
					title: 'Product 1',
					quantity: 1,
					price: 100
				},
				{
					id: 2,
					title: 'Product 2',
					quantity: 2,
					price: 200
				}
			],
			totalValue: 300,
			totalQuantity: 3,
			recipient: {
				name: 'John Doe',
				address: '123 Fake St, Fakeville, FV1 2FV'
			},
			addedAt: 12332543
		},
		{
			id: 2,
			status: 'Delivered',
			products: [
				{
					id: 3,
					title: 'Product 3',
					quantity: 1,
					price: 100
				},
				{
					id: 4,
					title: 'Product 4',
					quantity: 2,
					price: 200
				}
			],
			totalValue: 300,
			totalQuantity: 3,
			recipient: {
				name: 'Jane Doe',
				address: '123 Fake St, Fakeville, FV1 2FV'
			},
			addedAt: 12332543
		},
		{
			id: 3,
			status: 'Out for delivery',
			products: [
				{
					id: 5,
					title: 'Product 5',
					quantity: 1,
					price: 100
				},
				{
					id: 6,
					title: 'Product 6',
					quantity: 2,
					price: 200
				}
			],
			totalValue: 300,
			totalQuantity: 3,
			recipient: {
				name: 'John Doe',
				address: '123 Fake St, Fakeville, FV1 2FV'
			},
			addedAt: 12332543
		},
		{
			id: 4,
			status: 'Processing',
			products: [
				{
					id: 7,
					title: 'Product 7',
					quantity: 1,
					price: 100
				},
				{
					id: 8,
					title: 'Product 8',
					quantity: 2,
					price: 200
				}
			],
			totalValue: 300,
			totalQuantity: 3,
			recipient: {
				name: 'Jane Doe',
				address: '123 Fake St, Fakeville, FV1 2FV'
			},
			addedAt: 12332543
		},
		{
			id: 5,
			status: 'Delivered',
			products: [
				{
					id: 9,
					title: 'Product 9',
					quantity: 1,
					price: 100
				},
				{
					id: 10,
					title: 'Product 10',
					quantity: 2,
					price: 200
				}
			],
			totalValue: 300,
			totalQuantity: 3,
			recipient: {
				name: 'John Doe',
				address: '123 Fake St, Fakeville, FV1 2FV'
			},
			addedAt: 12332543
		},
		{
			id: 6,
			status: 'Processing',
			products: [
				{
					id: 11,
					title: 'Product 11',
					quantity: 1,
					price: 100
				},
				{
					id: 12,
					title: 'Product 12',
					quantity: 2,
					price: 200
				}
			],
			totalValue: 300,
			totalQuantity: 3,
			recipient: {
				name: 'Jane Doe',
				address: '123 Fake St, Fakeville, FV1 2FV'
			},
			addedAt: 12332543
		}
	]
</script>

<DashboardPageLayout>
	{#snippet title()}
		<h1 class="text-3xl font-semibold">Orders</h1>
	{/snippet}
	
	{#snippet page()}
		<Accordion.Root type="single" class="w-full" value="item-1">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Active Orders</Accordion.Trigger>
				<Accordion.Content>
					<div class="flex flex-col gap-2.5 size-full">
					
					{#each mockOrders.filter((order) => order.status !== 'Delivered') as order}
						<div class="flex flex-col gap-2 pb-2 bg-muted rounded-xl p-2.5">
							<div class="flex flex-row justify-between">
								<p class="font-semibold">Order #{order.id}</p>
								<p class="font-semibold">{order.status}</p>
							</div>
							<div class="flex flex-row gap-2">
								{#each order.products as product}
									<Badge class="flex flex-row gap-2.5">
										<p>{product.title}</p>
										<p>x{product.quantity}</p>
									</Badge>
								{/each}
							</div>
							<div class="flex flex-row justify-between">
								<p class="font-semibold">Total</p>
								<p class="font-semibold"><Price price={order.totalValue} /></p>
							</div>
							<div class="flex flex-col gap-1">
								<p class="font-semibold">{order.recipient.name}</p>
								<p>{order.recipient.address}</p>
							</div>
						</div>
					{/each}
					</div>
					
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Archived Orders</Accordion.Trigger>
				<Accordion.Content>
					{#each mockOrders.filter((order) => order.status === 'Delivered') as order}
						<div class="flex flex-col gap-2 border-b border-slate-200 pb-2">
							<div class="flex flex-row justify-between">
								<p class="font-semibold">Order #{order.id}</p>
								<p class="font-semibold">{order.status}</p>
							</div>
							<div class="flex flex-col gap-2">
								{#each order.products as product}
									<div class="flex flex-row justify-between">
										<p>{product.title}</p>
										<p>{product.quantity} x <Price price={product.price} /></p>
									</div>
								{/each}
							</div>
							<div class="flex flex-row justify-between">
								<p class="font-semibold">Total</p>
								<p class="font-semibold"><Price price={order.totalValue} /></p>
							</div>
							<div class="flex flex-col gap-1">
								<p class="font-semibold">{order.recipient.name}</p>
								<p>{order.recipient.address}</p>
							</div>
						</div>
						{/each}
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		{/snippet}
	
</DashboardPageLayout>
