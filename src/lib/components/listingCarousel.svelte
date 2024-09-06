<script>
import Listing from '$lib/components/listing.svelte';
import * as Carousel from "$lib/components/ui/carousel/index.js";
import { fetchListings } from '$lib/api/listings.js';

export let fetcher = fetchListings; // Function to fetch listings from the API
export let title = 'Listings';

</script>



<div class="lg:p-20 lg:py-10 sm:p-6 flex flex-col gap-3">
	<p class="text-4xl font-semibold">{title}</p>
	<Carousel.Root class="w-full" opts={{
  'dragFree': false,
  'loop': true,
  'slidesToScroll': 4

 }}>
		<Carousel.Content class="-ml-1">
			{#await fetcher()}
				{#each Array.from({ length: 10 }) as _, i}
					<Listing class="pl-1 md:basis-1/3 lg:basis-1/4" isLoading={true} />
				{/each}
			{:then data}
				{#each data.data as listing}
					<Carousel.Item class="pl-1 md:basis-1/3 lg:basis-1/4">
						<div class="p-1">
							<Listing listingName={listing.title} listingDescription={listing.description} isLoading={false} listingPrice={listing.basePrice} />
						</div>
					</Carousel.Item>   {/each}
			{:catch error}
				<p>{error.message}</p>
			{/await}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>

