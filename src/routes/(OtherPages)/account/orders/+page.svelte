<script>
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import Price from '$lib/components/price.svelte';
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import DataTable from './data-table.svelte'
	import { columnsSvelte } from './columns.svelte.js';
	import { Archive, Check, Truck } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import Dropdown from '$lib/components/dropdownBase.svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	const [send, receive] = crossfade({});
	import { CircleDashed, Circle, CircleArrowRight, CircleCheck, X} from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import SKUrow from '$lib/components/sales/SKUrow.svelte';
	import { page } from '$app/state';
	import { pushState } from '$app/navigation';
	import { onMount } from 'svelte';

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
			totalValue: 1199,
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
			totalValue: 13000,
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
			totalValue: 15000,
			totalQuantity: 3,
			recipient: {
				name: 'Jane Doe',
				address: '123 Fake St, Fakeville, FV1 2FV'
			},
			addedAt: 1533254300
		}
	]
	
	const statuses = [
		{
			title: 'None',
			icon: X
		},
		{
			title: 'Processing',
			icon: CircleDashed
		},
		{
			title: 'Dispatched',
			icon: Circle
		},
		{
			title: 'Out for delivery',
			icon: CircleArrowRight
		},
		{
			title: 'Delivered',
			icon: CircleCheck
		}
	];
	
	let selectedOrderID = $derived(page.state.selectedOrder)
	let selectedOrder = $derived.by(()=>{
		return mockOrders.find((order) => order.id === selectedOrderID)
	})
	let detailViewOpen = $derived(page.state.detailViewOpen)
	const updatePageState = () => {
		pushState('', {
			selectedOrder: selectedOrderID,
			detailViewOpen: !detailViewOpen
		})
	}
	
	let userSearch = $state('')
	let userStatusFilter = $state('None')
	let statusComboboxState = $state(false)
	
// 	Filter order's date, id and name by search term
	let filteredOrders = $derived.by(()=>{
		return mockOrders.filter((order) => {
			return (order.recipient.name.toLowerCase().includes(userSearch.toLowerCase()) || order.id.toString().includes(userSearch)
				|| order.recipient.address.toLowerCase().includes(userSearch.toLowerCase())) && (userStatusFilter === 'None' || order.status === userStatusFilter)
		})
	})
</script>

<Dialog.Root open={detailViewOpen} onOpenChange={updatePageState}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Order #{selectedOrder.id}</Dialog.Title>
			<Dialog.Description>
				View order details
			</Dialog.Description>
		</Dialog.Header>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2.5">
				<!--{#each selectedOrder.products as product}-->
				<!--	<SKUrow product={product} quantityChange={false} />-->
				<!--{/each}-->
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Input id="username" value="@peduarte" class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>


<DashboardPageLayout>
	{#snippet title()}
		Orders
	{/snippet}
	
	{#snippet page()}
		<Tabs.Root value="active" class="w-full">
		
<!--	Table controls		-->
			<div class="flex flex-row gap-4 items-center">
				<Tabs.List class="md:w-fit gap-0.5">
					<Tabs.Trigger value="active" class="group ease-[cubic-bezier(0.680, -0.550, 0.265, 1.550)] data-[state=inactive]:hover:bg-slate-50">
						<Truck size={18} strokeWidth={1.25} />
						<p class="group-data-[state=active]:scale-100 scale-0 group-data-[state=active]:w-14 w-0 transition-all duration-150 ease-[cubic-bezier(0.680, -0.550, 0.265, 1.550)]">Active</p>
					</Tabs.Trigger>
					<Tabs.Trigger value="archive" class="group ease-[cubic-bezier(0.680, -0.550, 0.265, 1.550)] data-[state=inactive]:hover:bg-slate-50">
						<p class="group-data-[state=active]:scale-100 scale-0 group-data-[state=active]:w-14 w-0 transition-all duration-150 ease-[cubic-bezier(0.680, -0.550, 0.265, 1.550)]">Archive</p>
						<Archive size={18} strokeWidth={1.25} />
					</Tabs.Trigger>
				</Tabs.List>
				<Input label="Search" placeholder="Search orders" class="w-48 rounded-full bg-secondary text-secondary-foreground placeholder:text-opacity-60" bind:value={userSearch} />
				<Dropdown title="Filter by status" value={userStatusFilter} bind:open={statusComboboxState} class="max-w-48 rounded-full bg-secondary text-secondary-foreground">
					{#each statuses as status}
						{@const Icon = status.icon}
						<Command.Item
							value={status.title}
							onSelect={() => {statusComboboxState=false;userStatusFilter=status.title}}
							class="{status.title===userStatusFilter && 'bg-secondary'} flex flex-row justify-between"
						>
							<div class="flex flex-row gap-2 items-center">
								<Icon size={18} strokeWidth={1.25} />
								<p>{status.title}</p>
							</div>
							
							{#if status.title === userStatusFilter}
								<Check size={18} strokeWidth={1.25} />
							{/if}
						</Command.Item>
					{/each}
				</Dropdown>
			</div>
			<Tabs.Content value="active">
					<DataTable data={filteredOrders.filter((order) => order.status !== 'Delivered')} columns={columnsSvelte} class="w-full"  />
			</Tabs.Content>
			<Tabs.Content value="archive">
				<DataTable data={filteredOrders.filter((order) => order.status === 'Delivered')} columns={columnsSvelte} class="w-full" />
			</Tabs.Content>
		</Tabs.Root>
		
	{/snippet}
	
</DashboardPageLayout>
