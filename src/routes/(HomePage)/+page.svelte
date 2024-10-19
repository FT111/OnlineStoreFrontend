<script>
  	export let data;
  
	import Listing from '$lib/components/listing.svelte';
	import ListingCarousel from '$lib/components/listingCarousel.svelte';
	import MenuCard from '$lib/components/menuCard.svelte';
	import SearchHero from '$lib/components/searchHero.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import { onMount } from 'svelte';

	import { fetchListings, queryListings } from '$lib/api/listings.js';
	import { fetchCategories } from '$lib/api/categories.js';


	const navHeroClasses = ['bg-primary', 'text-white', 'rounded-b-3xl'];
	const navPageClasses = ['bg-slate-200/70', 'text-black'];

	const heroSearchClasses = ['-translate-y-32']

	let navElement;
	let navSearch;
	let searchHero;
	let heroSearchBar;

	onMount(async () => {
		const navObserver = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) {
					console.log('intersecting');
					navElement.classList.remove(...navHeroClasses);
					navElement.classList.add(...navPageClasses);

				} else {
					console.log('not intersecting');
					navElement.classList.remove(...navPageClasses);
					navElement.classList.add(...navHeroClasses);

				}
			},
			{ threshold: 0 }
		);

		navObserver.observe(searchHero);

		const searchObserver = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) {


					navSearch.classList.remove(...heroSearchClasses);
				} else {


					navSearch.classList.add(...heroSearchClasses);
				}
			},
			{ threshold: 0 }
		);

		searchObserver.observe(heroSearchBar);
	});
	
</script>

<Navbar bind:navElement={navElement} bind:searchElement={navSearch} hideSearch={true} user={data.user} />

<main>
	<div class="flex flex-col -gap-5 bg-muted rounded-b-3xl">
		<div class="w-full z-10 basis-4/5" bind:this={searchHero}>
			<SearchHero searchSuggestions={fetchCategories} bind:searchElement={heroSearchBar} />
		</div>
		
		<div class="z-0 w-full h-[40vh] bg-muted p-6 text-primary-foreground text-3xl font-semibold">
			<div class="flex md:flex-row flex-col h-full w-full content-stretch items-stretch gap-6 flex-grow flex-1 transition-all">
				<MenuCard href="/listings" class="bg-emerald-600">
					Recently Viewed
				</MenuCard>
				<MenuCard class="bg-yellow-600">
					Trending Offers
				</MenuCard>
				<div class="flex flex-col h-full flex-1 grow gap-6 basis-1/4 hover:basis-4/12 transition-all">
					<MenuCard class="bg-cyan-700">
						Categories
					</MenuCard>
					<MenuCard class="bg-sky-600">
						Top Categories
					</MenuCard>
				</div>
				<MenuCard class="bg-primary basis-2/12" altArrow={true}>
					Your Basket
				</MenuCard>

			
			
			</div>
		</div>
		
		
	</div>
	
	<ListingCarousel listingsFetcher={queryListings} title='Popular' />
	<ListingCarousel listingsFetcher={queryListings} title='Computing' />
	
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full p-2 sm:p-4 md:p-8 md:px-14 justify-left">
		{#await fetchListings()}
			{#each Array.from({ length: 20 }) as _, i}
				<Listing isLoading={true} />
			{/each}
		{:then data}
			{#each data.data as listing}
				<Listing listingName={listing.title} listingPrice={listing.basePrice} userRating={listing.ownerUser.rating}
						 listingRating={listing.rating} userAvatarUrl={listing.ownerUser.profilePictureURL}
						 listingDescription={listing.description} multipleSKUs={listing.multipleSKUs}
						 editMode={false} hasDiscount={listing.hasDiscount} userID={listing.ownerUser.id} />			{/each}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>


</main>
