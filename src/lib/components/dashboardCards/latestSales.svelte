<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { fetchListings } from '$lib/api/listings.js';
	import Price from '$lib/components/price.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	
	export let listings = fetchListings;
	
</script>

<Card.Root class="rounded-2xl border-0 bg-white lg:col-span-3 lg:row-span-1 flex-row flex items-center overflow-x-scroll">
				<Card.Header class="flex flex-row p-0 px-6 items-center sticky left-0 bg-white h-full
														bg-slate-50/90 backdrop-blur-2xl">
					<h1 class="text-2xl font-medium  text-center max-w-min">Latest Sales</h1>
				</Card.Header>
				<Card.Content class="p-2.5 flex flex-row gap-2 h-full rounded-2xl">
					{#await listings()}
						{#each  Array(10) as _}
							<Card.Root class="rounded-2xl h-full w-48 border-0
																	bg-primary text-primary-foreground shadow-sm">
								<Card.Header>
								</Card.Header>
							</Card.Root>
						{/each}
					{:then listings}
						{#each listings.data as listing}
								<Card.Root class="rounded-2xl h-full w-48 border-0 p-0 justify-between flex flex-col
																	bg-primary/90 text-primary-foreground shadow-sm ">
									<Card.Header class="p-4">
										<p class="text-lg font-semibold text-center">{listing.title}</p>
									</Card.Header>
									
									<Card.Footer class="self-end p-3.5 justify-between flex flex-row">
										<Avatar.Root class="h-8 w-8 text-foreground">
											<Avatar.Image src={listing.ownerUser.profilePictureURL} alt="Avatar" />
											<Avatar.Fallback>{listing.ownerUser.username}</Avatar.Fallback>
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