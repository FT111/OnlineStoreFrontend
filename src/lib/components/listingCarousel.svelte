<script>
import Listing from '$lib/components/listing.svelte';
import * as Carousel from "$lib/components/ui/carousel/index.js";



	/**
	 * @typedef {Object} Props
	 * @property {any} listings - Function to fetch listings from the API
	 * @property {string} [title]
	 * @property {boolean} [isLoading]
	 * @property {boolean} [compactLayout]
	 * @property {string} [class]
	 */

	/** @type {Props} */
	let {
		listings,
		title = 'Listings',
		isLoading = false,
		compactLayout = false,
		class: className = ''
	} = $props();


let paddingClasses = compactLayout ? 'lg:px-14 lg:py-4 sm:p-4 ' : 'lg:p-20 lg:py-10 sm:p-6'
</script>



<div class="flex flex-col gap-3 {paddingClasses} {className}">
	<p class="text-4xl font-medium">{title}</p>
	<Carousel.Root class="w-full" opts={{
  'dragFree': false,
  'loop': true,
  'slidesToScroll': 4

 }}>
		<Carousel.Content class="-ml-1 flex-1 grow">
			{#if isLoading}
				{#each Array.from({ length: 10 }) as _, i}
					<Carousel.Item class="pl-1 md:basis-1/3 lg:basis-1/4">
						<div class="p-1">
							<Listing isLoading={true} />
						</div>
					</Carousel.Item>
				{/each}
			{:else}
				{#each listings as listing}
					<Carousel.Item class="pl-1 md:basis-1/3 lg:basis-1/4">
						<div class="p-1">
							<Listing listing={listing} />
						</div>
					</Carousel.Item>   {/each}
			{/if}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>

