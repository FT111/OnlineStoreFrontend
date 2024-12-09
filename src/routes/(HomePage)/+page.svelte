<script>
  	import Footer from '$lib/components/Footer.svelte';

		export let data;
  
	import Listing from '$lib/components/listing.svelte';
	import ListingCarousel from '$lib/components/listingCarousel.svelte';
	import MenuCard from '$lib/components/menuCard.svelte';
	import SearchHero from '$lib/components/searchHero.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import { onMount } from 'svelte';

	import { fetchListings, queryListings } from '$lib/api/listings.js';
	import { fetchCategories } from '$lib/api/categories.js';
		import { Button } from '$lib/components/ui/button/index.js';
		import { ArrowRight } from 'lucide-svelte';


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
	
	{#await queryListings()}
		<ListingCarousel isLoading={true} title='Popular' />
		<ListingCarousel isLoading={true} title='Computing' />
		{:then data}
			<ListingCarousel listings={data.data} title='Popular' />
			<ListingCarousel listings={data.data} title='Computing' />
		{:catch error}
			<p>{error.message}</p>
	{/await}
	
	<div class="p-7">
		<div class="w-full  h-96 rounded-3xl flex flex-row justify-between bg-indigo-50 p-4">
<!--			<div class="flex flex-col basis-1/2 justify-between p-4">-->
<!--				-->
<!--			</div>-->
			
			<div style="background-image:
    linear-gradient(to bottom, rgba(37,83,151,0.82), rgba(41,91,113,0.89)),
    url('https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');"
				class=" grow rounded-3xl flex flex-col justify-between bg-cover bg-center">
				<p class="text-4xl font-semibold p-6 bg-slate-800 text-slate-50 rounded-tl-3xl rounded-br-3xl w-fit">Performance Starts Here</p>
				<div class="flex flex-row w-full justify-between items-center text-slate-50 font-normal p-9">From sleek laptops to high-performance desktops, discover what suits you best.
					<Button href="/listings?category=Computing&showCategoryHeader=true" variant="secondary" class="min-w-32 rounded-full group transition-all gap-2 px-4">Visit our computing range <ArrowRight class="group group-hover:translate-x-2 transition-all" /></Button></div>
			</div>
		</div>
	</div>
	
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full p-2 sm:p-4 md:p-8 md:px-14 justify-left">
		{#await fetchListings()}
			{#each Array.from({ length: 20 }) as _, i}
				<Listing isLoading={true} />
			{/each}
		{:then data}
			{#each data.data as listing}
				<Listing listing={listing} />			{/each}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>


</main>

<Footer />