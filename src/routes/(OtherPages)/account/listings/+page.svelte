
<script>
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { fetchUserListings } from '$lib/api/listings.js';
	import Price from '$lib/components/price.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
		import { Plus } from 'lucide-svelte';
	
	export let data;
</script>

<DashboardPageLayout>
	<h1 slot="title">Your listings</h1>
	
	<div slot="page" >
		<Table.Root>
			<Table.Caption>A list of your current listings.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Title</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Variants</Table.Head>
					<Table.Head>Views</Table.Head>
					<Table.Head>Sales</Table.Head>
					<Table.Head class="text-right">Revenue</Table.Head>
					<Table.Head class="w-[100px]">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			
			<Table.Body>
				{#await fetchUserListings(data.user.id)}
				
					<Table.Row>
						<Table.Cell class="font-medium"><Skeleton class="w-[70px]" /></Table.Cell>
						<Table.Cell>Public</Table.Cell>
						<Table.Cell>3</Table.Cell>
						<Table.Cell>2437</Table.Cell>
						<Table.Cell>32</Table.Cell>
						<Table.Cell class="text-right">$760.00</Table.Cell>
					</Table.Row>
					{:then listingsFromAPI}
						{#each listingsFromAPI.data as listing}
							<Table.Row>
								<Table.Cell class="font-medium">{listing.title}</Table.Cell>
								<Table.Cell>{listing.public ? 'Public' : 'Private'}</Table.Cell>
								<Table.Cell>4</Table.Cell>
								<Table.Cell>{listing.views}</Table.Cell>
								<Table.Cell>{listing.sales}</Table.Cell>
								<Table.Cell class="text-right"><Price price={listing.basePrice} /></Table.Cell>
								<Table.Cell class="flex flex-row gap-2 justify-end">
									<a href={`/account/listings/${listing.id}`}>
										<Button variant="ghost">Edit</Button>
									</a>
									<Button variant="destructive">Delete</Button>
								</Table.Cell>
							</Table.Row>
						{/each}
					{:catch error}
						<p>{error.message}</p>
				{/await}
			</Table.Body>
		</Table.Root>
		
		<div class="fixed bottom-4 right-4 z-50">
			
			<Dialog.Root>
				<Dialog.Trigger>
<!--				Bottom right trigger button -->
					<Button size="lg" class="shadow-md outline outline-white">
						<Plus size="24" class="mr-2" />
						Create new listing
					</Button>
				</Dialog.Trigger>
				<Dialog.Content class="p-0 w-11/12 sm:w-1/3 2xl:w-1/5 h-48">
					<div class="flex flex-row h-full">
<!--						-->
						<a href="/account/listings/new" class="basis-1/2 gap-2 p-5 border-r border-r-1 flex flex-col items-center justify-center hover:bg-slate-50 transition-all">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
								<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
							</svg>
							
							Single Product listing
							
							<p class="font-light text-sm text-slate-600 h-12">
								Offer a single product
							</p>
						</a>
						
<!--						-->
						<a href="/account/listings/new" class="basis-1/2 gap-2 p-5 flex flex-col items-center justify-center hover:bg-slate-50 transition-all">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
							</svg>
							
							Multi-Product listing
							
							<p class="font-light text-sm text-center text-slate-600 h-12">
								Let users pick variants of your product
							</p>
						</a>
					</div>
				</Dialog.Content>
			</Dialog.Root>

		</div>
	</div>
	

</DashboardPageLayout>