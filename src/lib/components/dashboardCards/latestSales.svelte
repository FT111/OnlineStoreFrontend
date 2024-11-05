<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { fetchListings } from '$lib/api/listings.js';
	import Price from '$lib/components/price.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	
	export let listings = fetchListings;
	
</script>

<Card.Root class="rounded-2xl border-0 bg-white lg:col-span-3 lg:row-span-1 flex-row flex items-center overflow-x-scroll">
				<Card.Header class="flex flex-row p-0 px-6 items-center sticky left-0 bg-white h-full z-10
														bg-slate-50/90 backdrop-blur-2xl shadow-lg">
					<h1 class="text-2xl font-medium  text-center max-w-min">Latest Sales</h1>
				</Card.Header>
				<Card.Content class="p-2.5 flex flex-row gap-2 h-full rounded-2xl">
					{#await listings()}
						{#each  Array(10) as _}
							<Card.Root class="rounded-2xl h-full aspect-square border-0 p-1 rounded-2xl justify-between flex flex-col
																	bg-primary/10 text-primary shadow-sm">
								<Skeleton class="h-full w-full" />
							</Card.Root>
						{/each}
					{:then listingsFromAPI}
						{#each listingsFromAPI.data as listing}
								<Card.Root class="rounded-2xl h-full aspect-square border-0 p-0 justify-between flex flex-col
																	bg-primary/10 text-primary shadow-sm ">
									<Card.Header class="p-4">
										<p class="text-lg font-semibold text-center">{listing.title}</p>
									</Card.Header>
									
									<Card.Footer class="w-full p-3.5 justify-between flex flex-row">
										<Avatar.Root class="h-10 w-10 text-foreground">
											<Avatar.Image src={listing.ownerUser.profilePictureURL} alt={listing.ownerUser.username} />
											<Avatar.Fallback class="bg-accent text-slate-50 z-0">{listing.ownerUser.username.slice(0,2).toUpperCase()}</Avatar.Fallback>
										</Avatar.Root>
										<Price price={listing.basePrice} />
									</Card.Footer>
								</Card.Root>
							{/each}
						{:catch error}
							<p>{error.message}</p>
						{/await}
				</Card.Content>
			</Card.Root>