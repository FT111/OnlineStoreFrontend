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
	import { browser } from '$app/environment';
	import { orderStatuesNullable, orderStatuses } from '$lib/constants.svelte.js';
	import OrderDetailDialog from '$lib/components/sellerDashboard/orderDetailDialog.svelte';
	import { getUserOrders } from '$lib/api/transactions.js';
	
	
	let { data = {orders: []} } = $props();
	let orders = $state(data.orders)
	
	let selectedOrderID = $derived(page.state.selectedOrder)
	let selectedOrder = $derived.by(()=>{
		if (!orders || !Object.keys(orders).length) {
			return
		}
		return orders.sales.find((order) => order.id === selectedOrderID)
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
	let currentTimestamp = $state(Math.floor(Date.now() / 1000))
	
// 	Filter order's date, id and name by search term
	let filteredOrders = $derived.by(()=>{
		return orders.sales?.filter((order) => {
			return (order.id.toString().includes(userSearch) || order.name.toLowerCase().includes(userSearch.toLowerCase())) && (userStatusFilter === 'None' || order.status === userStatusFilter)
		})
	})
	
	const refreshOrders = () => {
		// Fetch purchases
		
		getUserOrders(data.user.id).then((response) => {
			orders = response.data
		}).catch((error) => {
			console.error(error)
		})
	}
	
</script>

<OrderDetailDialog detailViewOpen={detailViewOpen} selectedOrder={selectedOrder} selectedPage="Details"
									 updatePageState={updatePageState} refreshOrdersCallback={refreshOrders} />

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
					{#each orderStatuesNullable as status}
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
			{#if browser}
			<Tabs.Content value="active">
					<DataTable data={filteredOrders.filter((order) => (order.status !== 'Delivered' || order.status !== 'Cancelled')
					&& order.updatedAt >= (currentTimestamp-(30*24*60*60)))} columns={columnsSvelte} class="w-full"  />
			</Tabs.Content>
			<Tabs.Content value="archive">
				<DataTable data={filteredOrders.filter((order) => (order.status === 'Delivered' || order.status === 'Cancelled') &&
				order.updatedAt < (currentTimestamp-(24*30*60*60)))} columns={columnsSvelte} class="w-full" />
			</Tabs.Content>
				{/if}
		</Tabs.Root>
		
	{/snippet}
	
</DashboardPageLayout>

<!--this is to get tailwind to work, ignore-->
<div class="hidden">
	<div class="bg-sky-700"></div>
	<div class="bg-green-600"></div>
	<div class="bg-emerald-800"></div>
	<div class="bg-rose-800"></div>
</div>