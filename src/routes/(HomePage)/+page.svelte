<script>
 import Listing from '$lib/components/listing.svelte';
 import ListingCarousel from '$lib/components/listingCarousel.svelte';
 import SearchHero from '$lib/components/searchHero.svelte';
 import Navbar from '$lib/components/navbar.svelte';
 import { onMount } from 'svelte';
 
 import { fetchListings, queryListings } from '$lib/api/listings.js';
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

<Navbar bind:navElement={navElement} bind:searchElement={navSearch} hideSearch={true} />

<div bind:this={searchHero}>
 <SearchHero searchSuggestions={fetchCategories} bind:searchElement={heroSearchBar} />
</div>


<ListingCarousel listingsFetcher={queryListings} title='Popular' />
<ListingCarousel listingsFetcher={queryListings} title='Computing' />

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

