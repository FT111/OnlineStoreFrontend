<script>
 import Listing from '$lib/components/listing.svelte';
 import SearchHero from '$lib/components/searchHero.svelte';
 import { onMount } from 'svelte';
 import * as Carousel from "$lib/components/ui/carousel/index.js";
 import * as Card from "$lib/components/ui/card/index.js";

 let navBar;
 let searchHero;


 const fetchData = async () => {
  let response = await fetch('http://127.0.0.1:8000/listings/?limit=24', {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
   }
  }).then((response) => response.json())
    .then((data) => {
     console.log(data);
     return data;
    }).catch((error) => {
     console.error('Error:', error);
    })
  return response;
 };


 const navHeroClasses = ['bg-cyan-950', 'text-white', 'rounded-b-3xl'];
 const navPageClasses = ['bg-background/50', 'text-black'];

 onMount(async () => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        console.log('intersecting');
        navBar.classList.remove(...navHeroClasses);
        navBar.classList.add(...navPageClasses);
      } else {
        console.log('not intersecting');
        navBar.classList.remove(...navPageClasses);
        navBar.classList.add(...navHeroClasses);
      }
    },
    { threshold: 0 }
  );

  observer.observe(searchHero);
  
 });

</script>

<nav>
 <div bind:this={navBar} class="fixed w-screen min-h-16 h-fit align-center items-center justify-between
                 flex flex-row p-5 px-8 gap-5 bg-cyan-950 text-white rounded-b-3xl
                 backdrop-blur-2xl z-50 top-0 transition-all">
  <h1 class="font-bold text-3xl">eBuy</h1>
  <div class="flex flex-row gap-7">
   <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
   </svg>
   </p>
   <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
   </svg>
   </p>

   <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
   </svg>
   </p>
  </div>
 </div>
</nav>

<div bind:this={searchHero}>
 <SearchHero />
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full p-1 sm:p-4 md:p-8 justify-left">
 {#await fetchData()}
  {#each Array.from({ length: 10 }) as _, i}
   <Listing />
  {/each}
  {:then data}
  {#each data.data as listing}
   <Listing listingName={listing.title} listingPrice={listing.basePrice} userName={listing.ownerUser.username} userRating={listing.ownerUser.rating} listingRating={listing.rating} userAvatarUrl={listing.ownerUser.profilePictureURL} listingDescription={listing.description} editMode={false} />
  {/each}
  {:catch error}
  <p>{error.message}</p>
  {/await}

</div>

<div class="p-32">
 <Carousel.Root class="w-full" opts={{
  'dragFree': false,
  'loop': true,
  'slidesToScroll': 3

 }}>
  <Carousel.Content class="-ml-1">
   {#await fetchData()}
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