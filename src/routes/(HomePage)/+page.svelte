<script>
 import Listing from '$lib/components/listing.svelte';
 import SearchHero from '$lib/components/searchHero.svelte';
 import Navbar from '$lib/components/navbar.svelte';
 import { onMount } from 'svelte';
 import * as Carousel from "$lib/components/ui/carousel/index.js";
 import * as Card from "$lib/components/ui/card/index.js";
 
 import { fetchListings } from '$lib/api/listings.js';
 import { fetchCategories } from '$lib/api/categories.js';
 
 
 const navHeroClasses = ['bg-primary', 'text-white', 'rounded-b-3xl'];
 const navPageClasses = ['bg-background/70', 'text-black'];
 
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
       
       navSearch.classList.remove(...heroSearchClasses);
      } else {
       console.log('not intersecting');
       navElement.classList.remove(...navPageClasses);
       navElement.classList.add(...navHeroClasses);
       
       navSearch.classList.add(...heroSearchClasses);
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

<Navbar bind:navElement={navElement} bind:searchElement={navSearch} hideSearch={true} />

<div bind:this={searchHero}>
 <SearchHero searchSuggestions={fetchCategories} bind:searchElement={heroSearchBar} />
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5 gap-3 w-full p-1 sm:p-4 md:p-8 md:px-14 justify-left">
 {#await fetchListings()}
  {#each Array.from({ length: 20 }) as _, i}
   <Listing isLoading={true} />
  {/each}
  {:then data}
  {#each data.data as listing}
   <Listing listingName={listing.title} listingPrice={listing.basePrice} userName={listing.ownerUser.username} userRating={listing.ownerUser.rating} listingRating={listing.rating} userAvatarUrl={listing.ownerUser.profilePictureURL} listingDescription={listing.description} editMode={false} />
  {/each}
  {:catch error}
  <p>{error.message}</p>
  {/await}

</div>

<div class="lg:p-32 sm:p-6">
 <Carousel.Root class="w-full" opts={{
  'dragFree': false,
  'loop': true,
  'slidesToScroll': 3

 }}>
  <Carousel.Content class="-ml-1">
   {#await fetchListings()}
   {#each Array.from({ length: 10 }) as _, i}
    <Listing isLoading={true} />
   {/each}
   {:then data}
   {#each data.data as listing}
    <Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/3">
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