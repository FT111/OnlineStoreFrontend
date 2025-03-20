<script>
	import DashboardPageLayout from "$lib/components/DashboardPageLayout.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import ListingCarousel from "$lib/components/listingCarousel.svelte";
	import * as Card from '$lib/components/ui/card/index.js';
	import LatestSalesCard from '$lib/components/sellerDashboard/latestSales.svelte';

	import { fetchListings } from '$lib/api/listings.js';
	import { fetchUserListings } from '$lib/api/listings.js';
	import LineChart from '$lib/charts/DashboardLineChart.svelte';
	import { updateStreamData } from '$lib/api/streams.svelte.js';
	import { ChartSpline } from 'lucide-svelte';

	let { data } = $props();

	let currentTimestamp = $state(new Date().getTime());
	setInterval(() => {
		currentTimestamp = new Date().getTime();
	}, 1000);


	let dashboardUpdateDelta = $derived.by(() =>
		Math.abs(Math.floor((updateStreamData.lastUpdate - currentTimestamp) / 1000))
	)


</script>

<DashboardPageLayout>
	{#snippet title()}
		<div class="flex flex-row gap-2">
			<h1>Dashboard</h1>
		</div>
	{/snippet}

	{#snippet page()}
		<div class="text-muted-foreground text-xs flex flex-row gap-1 items-center">
			<ChartSpline class="animate-pulse" size={16} strokeWidth={1.5} />
			Last updated { dashboardUpdateDelta } seconds ago</div>
		<div  class="grid grid-cols-4 grid-rows-3  rounded-2xl
		 												grow h-[42rem] gap-2.5 p-1.5">




			<Card.Root class="rounded-2xl border-0 p-0 bg-slate-100 lg:col-span-1 lg:row-span-1">
				<Card.Header class="flex flex-row justify-between">
					<h1 class="text-xl">Impressions</h1>
					<p class="text-lg text-muted-foreground">{updateStreamData.data.impression?.count}</p>
				</Card.Header>
				<Card.Content class="p-0 h-32">
					<LineChart chartData={updateStreamData.data.impression?.events} class="flex flex-row justify-center w-full " />
				</Card.Content>
			</Card.Root>

			<Card.Root class="rounded-2xl border-0 p-0 bg-slate-100 lg:col-span-1 lg:row-span-1">
				<Card.Header class="flex flex-row justify-between">
					<h1 class="text-xl">Clicks</h1>
					<p class="text-lg font-medium text-muted-foreground">{updateStreamData.data.click?.count}</p>
				</Card.Header>
				<Card.Content class="p-0 h-32">
					<LineChart chartData={updateStreamData.data.click?.events} class="flex flex-row justify-center w-full " />
				</Card.Content>
			</Card.Root>

			<Card.Root class="rounded-2xl border-0 p-0 bg-slate-100 lg:col-span-1 lg:row-span-1">
				<Card.Header class="flex flex-row justify-between">
					<h1 class="text-xl">Views</h1>
					<p class="text-lg font-medium text-muted-foreground">{updateStreamData.data.view?.count}</p>
				</Card.Header>
				<Card.Content class="p-0 h-32">
					<LineChart chartData={updateStreamData.data.view?.events} class="flex flex-row justify-center w-full " />
				</Card.Content>
			</Card.Root>

			<Card.Root class="rounded-2xl border-0 p-0 bg-slate-100 lg:col-span-1 lg:row-span-1">
				<Card.Header class="flex flex-row justify-between">
					<h1 class="text-xl">Sales</h1>
					<p class="text-lg font-medium text-muted-foreground">{updateStreamData.data.sale?.count}</p>
				</Card.Header>
				<Card.Content class="p-0 h-32">
					<LineChart chartData={updateStreamData.data.sale?.events} class="flex flex-row justify-center w-full " />
				</Card.Content>
			</Card.Root>

			<Card.Root class="rounded-2xl border-0 bg-slate-100 lg:col-span-2 lg:row-span-1">
				<Card.Header>
					<h1 class="text-2xl font-bold text-center">Card</h1>
				</Card.Header>
			</Card.Root>
			<LatestSalesCard listings={ async () => {return await fetchUserListings(data.user?.id)}} />





		</div>
	{/snippet}
</DashboardPageLayout>