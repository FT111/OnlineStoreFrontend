<script>
	import DashboardPageLayout from "$lib/components/DashboardPageLayout.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import ListingCarousel from "$lib/components/listingCarousel.svelte";
	import * as Card from '$lib/components/ui/card/index.js';
	import LatestSalesCard from '$lib/components/sellerDashboard/latestSales.svelte';
	
	import { fetchListings } from '$lib/api/listings.js';
	import { fetchUserListings } from '$lib/api/listings.js';
	let { data } = $props();
	

</script>

<DashboardPageLayout>
	{#snippet title()}
		<h1 >Dashboard</h1>
	{/snippet}
	
	{#snippet page()}
		<div  class="grid grid-cols-4 grid-rows-3 bg-slate-100 rounded-2xl
		 												grow h-[42rem] gap-2.5 p-1.5">
			
			

			
			<Card.Root class="rounded-2xl border-0 bg-white lg:col-span-2 lg:row-span-2">
				<Card.Header>
					<h1 class="text-2xl font-bold text-center">Card</h1>
				</Card.Header>
			</Card.Root>
			<Card.Root class="rounded-2xl border-0 bg-white lg:col-span-2 lg:row-span-1">
				<Card.Header>
					<h1 class="text-2xl font-bold text-center">Card</h1>
				</Card.Header>
			</Card.Root>

			
			<Card.Root class="rounded-2xl border-0 bg-white lg:col-span-2 lg:row-span-1">
				<Card.Header>
					<h1 class="text-2xl font-bold text-center">Card</h1>
				</Card.Header>
			</Card.Root>
			
			<LatestSalesCard listings={ async () => {return await fetchUserListings(data.user.id)}} />
			
			

			
			<Card.Root class="rounded-2xl border-0 bg-white lg:col-span-1 lg:row-span-1">
				<Card.Header>
					<h1 class="text-2xl font-bold text-center">Card</h1>
				</Card.Header>
			</Card.Root>
			
		</div>
	{/snippet}
</DashboardPageLayout>