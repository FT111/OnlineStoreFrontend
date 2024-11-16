
<script>
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { fetchUserListings } from '$lib/api/listings.js';
	import Price from '$lib/components/price.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	
	export let data;
</script>

<DashboardPageLayout>
	<h1 slot="title">Your listings</h1>
	
	<div slot="page" class="">
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
									<a href={`/account/listings/${listing.id}/edit`}>
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
		</Table.Root>	</div>
	
	<div class="fixed bottom-20 right-20">
		<a href="/account/listings/new">
			<Button>Create new listing</Button>
		</a>
	</div>
</DashboardPageLayout>