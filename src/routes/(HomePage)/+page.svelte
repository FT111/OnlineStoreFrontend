<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import Listing from '$lib/components/listing.svelte';
	import SearchHero from '$lib/components/searchHero.svelte';
	import { onMount } from 'svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

let navBar;
let searchHero;

const navHeroClasses = ['bg-cyan-950', 'text-white'];
const navPageClasses = ['bg-background/50', 'text-black'];
onMount(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
				console.log('intersecting');
        navBar.classList.remove(...navHeroClasses)
				navBar.classList.add(...navPageClasses)
      } else {
				console.log('not intersecting');
				navBar.classList.remove(...navPageClasses)
				navBar.classList.add(...navHeroClasses)
      }
    },
    { threshold: 0 }
  );

  observer.observe(searchHero);
});
</script>

<nav>
	<div bind:this={navBar} class="fixed w-screen h-16 align-center justify-between
																	flex flex-row p-5 px-8 gap-5 bg-cyan-950 text-white
																	backdrop-blur-2xl z-50 top-0 transition-all">
		<h1 class="font-bold text-3xl">eBuy</h1>

		<div>test</div>
	</div>
</nav>


<div bind:this={searchHero} >
	<SearchHero />

</div>

<div class="flex flex-row flex-wrap gap-3 w-full p-1 sm:p-4 md:p-8 justify-left">
	{#each Array.from({ length: 10 }) as _, i}
		<Listing listingName="Test" listingPrice={23.1} editMode={true} />
	{/each}
</div>

<Carousel.Root>
	<Carousel.Content>
		{#each Array.from({ length: 10 }) as _, i}
			<Carousel.Item>
				<div class="flex flex-row flex-wrap gap-3 w-full p-1 sm:p-4 md:p-8 justify-center">
					<Listing listingName="Test" listingPrice={13.43} editMode={false} />
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous />
	<Carousel.Next class="bg-black" />
</Carousel.Root>