<script>
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import Price from '$lib/components/price.svelte';
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import DataTable from './data-table.svelte'
	import { columns } from './columns.js';
	import { Archive, Truck } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	const [send, receive] = crossfade({});

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
	let userSearch = $state('')
	
// 	Filter order's date, id and name by search term
	let filteredOrders = $derived.by(()=>{
		return mockOrders.filter((order) => {
			return order.recipient.name.toLowerCase().includes(userSearch.toLowerCase()) || order.id.toString().includes(userSearch)
				|| order.recipient.address.toLowerCase().includes(userSearch.toLowerCase())
		})
	})
</script>

<DashboardPageLayout>
	{#snippet title()}
		Orders
	{/snippet}
	
	{#snippet page()}
		<Tabs.Root value="active" class="w-full">
		
<!--	Table controls		-->
			<div class="flex flex-row gap-4 items-center">
				<Tabs.List class="md:w-fit">
					<Tabs.Trigger value="active" class="group">
						<Truck size={18} strokeWidth={1.25} />
						<p class="group-data-[state=active]:scale-100 scale-0 group-data-[state=active]:w-14 w-0 transition-all duration-150">Active</p>
					</Tabs.Trigger>
					<Tabs.Trigger value="archive" class="group">
						<p class="group-data-[state=active]:scale-100 scale-0 group-data-[state=active]:w-14 w-0 transition-all duration-150">Archive</p>
						<Archive size={18} strokeWidth={1.25} />
					</Tabs.Trigger>
				</Tabs.List>
					<Input label="Search" placeholder="Search orders" class="w-48 rounded-full" bind:value={userSearch} />
			</div>
			<Tabs.Content value="active">
					<DataTable data={filteredOrders.filter((order) => order.status !== 'Delivered')} columns={columns} class="w-full" />
			</Tabs.Content>
			<Tabs.Content value="archive">
				<DataTable data={filteredOrders.filter((order) => order.status === 'Delivered')} columns={columns} class="w-full" />
			</Tabs.Content>
		</Tabs.Root>
		
	{/snippet}
	
</DashboardPageLayout>
