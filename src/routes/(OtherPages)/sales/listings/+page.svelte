
<script>
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { fetchUserListings } from '$lib/api/listings.js';
	import Price from '$lib/components/price.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
		import { Plus } from 'lucide-svelte';
		import NewListingDialog from '$lib/components/NewListingDialog.svelte';
		import { Badge } from '$lib/components/ui/badge/index.js';
	
	let { data } = $props();
</script>

<DashboardPageLayout>
	{#snippet title()}
		<h1 >Your listings</h1>
	{/snippet}
	
	{#snippet page()}
		<div  >
			<Table.Root>
				<Table.Caption>Your current listings.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">Title</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Variants</Table.Head>
						<Table.Head>Views</Table.Head>
						<Table.Head>Clicks</Table.Head>
						<Table.Head>Sales</Table.Head>
<!--						<Table.Head class="text-right">Revenue</Table.Head>-->
						<Table.Head class="w-[100px]">Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				
				<Table.Body>
					{#await fetchUserListings(data.user.id, true)}
						{#each Array.from({ length: 15 }) as _, i}
							<Table.Row class="h-16">
								
								<Table.Cell class="font-medium"><Skeleton class="w-[70px]" /></Table.Cell>
								<Table.Cell></Table.Cell>
								<Table.Cell></Table.Cell>
								<Table.Cell></Table.Cell>
								<Table.Cell></Table.Cell>
								<Table.Cell></Table.Cell>
								<Table.Cell class="text-right"><Skeleton class="w-8" /></Table.Cell>
								<Table.Cell class="flex flex-row gap-2 justify-end">
									<Button variant="ghost"><Skeleton class="w-[50px]" /></Button>
									<Button variant="destructive"><Skeleton class="w-[50px]" /></Button>
								</Table.Cell>
							</Table.Row>
						{/each}
						{:then listingsFromAPI}
							{#each listingsFromAPI.data as listing}
								<Table.Row class="h-16">
									<Table.Cell class="font-medium">{listing.title}</Table.Cell>
									<Table.Cell><Badge variant="{listing.public ? 'default' : 'outline'}">{listing.public ? 'Public' : 'Private'}</Badge></Table.Cell>
									<Table.Cell>{listing.skus?.length}</Table.Cell>
									<Table.Cell>{listing.views}</Table.Cell>
									<Table.Cell>{listing.clicks}</Table.Cell>
									<Table.Cell>{listing.sales}</Table.Cell>
<!--									<Table.Cell class="text-right"><Price price={listing.basePrice} /></Table.Cell>-->
									<Table.Cell class="flex flex-row gap-2 justify-end">
										<a href={`/sales/listings/${listing.id}`}>
											<Button variant="ghost">Edit</Button>
										</a>
<!--										<Button variant="destructive">Delete</Button>-->
									</Table.Cell>
								</Table.Row>
							{/each}
						{:catch error}
							<p>{error.message}</p>
					{/await}
				</Table.Body>
			</Table.Root>
			
			<div class="fixed bottom-4 right-4 z-50">
				
				<NewListingDialog>
					<Button size="lg" class="shadow-md outline outline-white">
						<Plus size="24" class="mr-2" />
						Create new listing
					</Button>
				</NewListingDialog>
			</div>
		</div>
	{/snippet}
	

</DashboardPageLayout>