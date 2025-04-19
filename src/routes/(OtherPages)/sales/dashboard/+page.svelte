<script>
	import DashboardPageLayout from "$lib/components/DashboardPageLayout.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import ListingCarousel from "$lib/components/listingCarousel.svelte";
	import * as Card from '$lib/components/ui/card/index.js';
	import LatestSalesCard from '$lib/components/sellerDashboard/latestSales.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { fetchListings } from '$lib/api/listings.js';
	import { fetchUserListings } from '$lib/api/listings.js';
	import LineChart from '$lib/charts/DashboardLineChart.svelte';
	import { updateStreamData } from '$lib/api/streams.svelte.js';
	import { CalendarDays, ChartSpline } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { getLocalTimeZone, today } from "@internationalized/date";
	import { fetchStatistics } from '$lib/api/user.js';
	import Heatmap from '$lib/components/sellerDashboard/charts/Heatmap.svelte';


	let { data } = $props();
	let saveBtn = $state();

	let currentTimestamp = $state(new Date().getTime());
	setInterval(() => {
		currentTimestamp = new Date().getTime();
	}, 1000);


	let dashboardUpdateDelta = $derived.by(() =>
		Math.abs(Math.floor((updateStreamData.lastUpdate - currentTimestamp) / 1000))
	)

	let current = today(getLocalTimeZone());
	const timePeriods = [
		{ value: '7d', label: 'Last 2 weeks', start: current.subtract({days: 14}),
			end: current, live: true },
		{ value: 'custom', label: 'Custom' },
	]
	let selectedTimePeriodValue = $state('7d');
	let customPeriod = $state({
		start: current,
		end: current
	})

	let selectedPeriod = $derived(
		timePeriods.find(period => period.value === selectedTimePeriodValue)
	)

	$inspect(selectedTimePeriodValue)
	$inspect(selectedPeriod)


	let dataSource = $state(updateStreamData);
	const updateDataSource = async () => {
		if (selectedPeriod.value !== 'custom') {
			dataSource = updateStreamData
		}
		else if (selectedPeriod.value === 'custom') {
			dataSource = await fetchStatistics(customPeriod.start.toString(), customPeriod.end.toString())
		}
	}

	$effect(()=>{
		if (customPeriod.start && customPeriod.end) {
			updateDataSource()
		}
	})

	let clickThroughRate = $derived(String((dataSource.data.click?.count / dataSource.data.impression?.count) || 0).slice(0, 3))

</script>

<DashboardPageLayout>
	{#snippet title(sidebarOpen)}
		<div class="flex flex-row justify-between w-full">
			<h1>Dashboard</h1>

			<div class="flex flex-row gap-2 transition-transform items-center {sidebarOpen && 'translate-x-14'}">

				{#if selectedPeriod.value === 'custom'}
					<Popover.Root>
						<Popover.Trigger>
							<Button class="items-center rounded-full h-10 w-64 text-sm">
								<CalendarDays size={20} strokeWidth={1.5} />

								{#if customPeriod.start && customPeriod.end}
									<span class="text-xs rounded-full bg-secondary/20 text-primary-foreground font-normal h-6 w-32 justify-center flex flex-row items-center">
									{customPeriod.start.toDate(getLocalTimeZone()).toLocaleString('en-gb', { month: 'short', day: 'numeric', year: 'numeric' })}
									</span>
									to
									<span class="text-xs rounded-full bg-secondary/20 text-primary-foreground font-normal h-6 w-32 justify-center flex flex-row items-center">
									{customPeriod.end.toDate(getLocalTimeZone()).toLocaleString('en-gb', { month: 'short', day: 'numeric', year: 'numeric' })}
									</span>
								{:else}
									Select a range
								{/if}
							</Button>
						</Popover.Trigger>
						<Popover.Content>
							<p class="text-muted-foreground text-xs">Current date is highlighted</p>
							<RangeCalendar bind:value={customPeriod} />
						</Popover.Content>
					</Popover.Root>
				{/if}

				<Select.Root type="single" name="period" bind:value={selectedTimePeriodValue} onValueChange>
					<Select.Trigger class="bg-muted text-muted-foreground font-normal rounded-full h-10 w-[200px]">
						{selectedPeriod.label}
					</Select.Trigger>
					<Select.Content class="w-[200px]">
						<Select.Group>
							{#each timePeriods as period (period.value)}
								<Select.Item value={period.value} label={period.label}
								class="flex group flex-row justify-between gap-1">
									{period.label}
									{#if period.live}
										<div class="group-data-[highlighted]:text-accent-foreground text-accent text-xs font-semibold">Live</div>
									{/if}
								</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
	{/snippet}

	{#snippet page()}
		<div class="text-muted-foreground text-xs flex flex-row gap-1 items-center">
			<ChartSpline class="animate-pulse" size={16} strokeWidth={1.5} />
			Last updated { dashboardUpdateDelta } seconds ago</div>
		<div  class="grid grid-cols-4 grid-rows-3  rounded-2xl
		 												grow h-[42rem] gap-2.5 p-1.5">



			{#key dataSource.data}
			<Card.Root class="rounded-2xl border-0 p-0 bg-slate-100 lg:col-span-1 lg:row-span-1">
				<Card.Header class="flex flex-row justify-between">
					<h1 class="text-xl">Impressions</h1>
					<p class="text-lg text-muted-foreground">{dataSource.data.impression?.count}</p>
				</Card.Header>
				<Card.Content class="p-0 h-32">
					<LineChart chartData={dataSource.data.impression?.events} class="flex flex-row justify-center w-full " />
				</Card.Content>
			</Card.Root>

			<Card.Root class="rounded-2xl border-0 p-0 bg-slate-100 lg:col-span-1 lg:row-span-1">
				<Card.Header class="flex flex-row justify-between">
					<h1 class="text-xl">Clicks</h1>
					<p class="text-lg font-medium text-muted-foreground">{dataSource.data.click?.count}</p>
				</Card.Header>
				<Card.Content class="p-0 h-32">
					<LineChart chartData={dataSource.data.click?.events} class="flex flex-row justify-center w-full " />
				</Card.Content>
			</Card.Root>

			<Card.Root class="rounded-2xl border-0 p-0 bg-slate-100 lg:col-span-1 lg:row-span-1">
				<Card.Header class="flex flex-row justify-between">
					<h1 class="text-xl">Views</h1>
					<p class="text-lg font-medium text-muted-foreground">{dataSource.data.view?.count}</p>
				</Card.Header>
				<Card.Content class="p-0 h-32">
					<LineChart chartData={dataSource.data.view?.events} class="flex flex-row justify-center w-full " />
				</Card.Content>
			</Card.Root>

			<Card.Root class="rounded-2xl border-0 p-0 bg-slate-100 lg:col-span-1 lg:row-span-1">
				<Card.Header class="flex flex-row justify-between">
					<h1 class="text-xl">Sales</h1>
					<p class="text-lg font-medium text-muted-foreground">{dataSource.data.sale?.count}</p>
				</Card.Header>
				<Card.Content class="p-0 h-32">
					<LineChart chartData={dataSource.data.sale?.events} class="flex flex-row justify-center w-full " />
				</Card.Content>
			</Card.Root>

			<Card.Root class="rounded-2xl border-0 p-0 bg-slate-100 lg:col-span-1 lg:row-span-1">
				<Card.Header class="flex flex-row justify-between items-center">
					<h1 class="text-xl">Click through rate</h1>
					<p class="text-lg font-medium text-muted-foreground">{clickThroughRate}</p>
				</Card.Header>
				<Card.Content class="p-0 h-32">
<!--					<LineChart chartData={updateStreamData.data.sale?.events} class="flex flex-row justify-center w-full " />-->
				</Card.Content>
			</Card.Root>
<!--			<LatestSalesCard listings={ async () => {return await fetchUserListings(data.user?.id)}} />-->

<!--			<Heatmap mapData={dataSource.data.sale?.events} />-->


			{/key}

		</div>
	{/snippet}
</DashboardPageLayout>