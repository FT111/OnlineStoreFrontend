
<script>
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import ListingCarousel from '$lib/components/listingCarousel.svelte';
	import { fetchListings, queryListings, fetchUserListings } from '$lib/api/listings.js';
	import { Badge } from "$lib/components/ui/badge/index.js";
	import Listing from '$lib/components/listing.svelte';
	import { onMount } from 'svelte';
	import { baseURL } from '$lib/api/core.js';
	
	let { data } = $props();
	const userID = $derived(data.profileUser.id);
	let userListings = $state({});
	let listingsLoaded = $state(false);

	const profileUser = {
		username: 'johndoe',
		profilePictureURL: 'https://via.placeholder.com/150',
	  	bannerURL: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6667b379b716e7212d986a57/1718072191450/Seq3x2.png?format=1500w',
		rating: 4.5,
		description: 'I am a software engineer who sells things on this marketplace',

	}

	onMount(async () => {
		await fetchUserListings(userID).then(data => {
			console.log(data);
			userListings = data;
			listingsLoaded = true;
		});
	});
</script>

<div class="sm:px-8 px-0">
	
	<div class="flex flex-col w-full p-4 min-h-96 mt-20">
		<div class=" max-h-[300px] overflow-hidden">
			{#if data.profileUser.bannerURL}
				<img src={`${baseURL}static/user-profiles/${data.profileUser.bannerURL}`} alt="User Profile" height="300" width="1000" class="w-full object-cover rounded-t-3xl" />
			{/if}
		</div>
		
		<div class="grow bg-secondary/60 h-full rounded-b-3xl w-full p-6 flex sm:flex-col justify-center gap-4">
<!--		User Primary Detail Container	-->
			<div class="flex flex-col gap-3.5 justify-center items-center">
<!--			Avatar and Name container	-->
				<div class="flex flex-row gap-3 items-center justify-center">
					<Avatar.Root class="h-12 w-12">
						<Avatar.Image src={data.profileUser.profilePictureURL} alt={data.profileUser.username} />
						<Avatar.Fallback>{data.profileUser?.username?.slice(0,2)}</Avatar.Fallback>
					</Avatar.Root>
					{#if data.profileUser}
						<p class="text-4xl font-medium text-primary">{data.profileUser.username}</p>
					{:else}
						<Skeleton class="w-24 h-8" />
					{/if}
				</div>
				
				<p class=" text-sm font-normal p-2.5">
					{data.profileUser.description}
				</p>
			</div>

			<div class="items flex flex-row !h-8">
				<div class="w-full h-8 gap-1.5 items-center !font-normal justify-center flex-row flex">
					<!--			Quick Info Row -->

					<Badge class=" h-8">Joined {new Date(data.profileUser.joinedAt*1000).toDateString()}</Badge>
					<Badge class=" h-8">Rated {profileUser.rating} stars</Badge>
					<Badge class="min-w-20 h-8 justify-center">{data.profileUser.listingIDs?.length} Listings</Badge>
					<Badge class=" h-8">{data.profileUser.sales} Sale</Badge>
				</div>

<!--				Action Buttons	-->
<!--					<div class="flex flex-row items-center justify-end h-full w-full align-middle flex-1 flex-grow gap-4">-->
<!--						{#if data.user}-->
<!--							{#if data.profileUser.id === data.user.id}-->
<!--								<Button class="basis-1/4 justify-evenly" variant="default">Edit-->
<!--									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">-->
<!--										<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />-->
<!--									</svg>-->
<!--								</Button>-->
<!--							{/if}-->
<!--						{/if}-->
<!--						<Button class="basis-1/4 justify-evenly" variant="default">Rate-->
<!--							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">-->
<!--								<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />-->
<!--							</svg>-->
<!--						</Button>-->
<!--					</div>-->
				</div>
			</div>

		<div class="h-10 rounded-xl flex flex-row p-4 gap-3.5">
			<div class="rounded-3xl flex items-center p-2 h-10 px-4 min-w-24 text-center bg-accent/20 text-secondary-foreground font-medium">
				{data.profileUser.username}'s Categories
			</div>
			{#if !listingsLoaded}
				<Skeleton class="w-32 rounded-full h-10" />
				<Skeleton class="w-32 rounded-full h-10" />

			{:else}
				{#if 'meta' in userListings}
					{#each userListings.meta.topCategories as category}
						<a href="/listings?category={category}&showCategoryHeader=true" class="h-10">
							<div class="rounded-3xl flex items-center p-0.5 px-3 min-w-24 text-center h-full bg-secondary text-secondary-foreground justify-center font-normal hover:brightness-105 ">
								{category}
							</div>
						</a>
						{/each}
				{/if}
			{/if}
		</div>
	</div>

</div>

{#if !listingsLoaded}
	<ListingCarousel compactLayout={true} isLoading={true} title="New arrivals" />
{:else}
	{#if 'meta' in userListings}
		<ListingCarousel compactLayout={true} listings={userListings.data} title="New arrivals" />
	{/if}
{/if}

<div class="sm:px-8 px-1 mt-16 bg-slate-50">
	{#key data.user}
	<h3 class="px-8 py-6 text-4xl font-medium">{data.profileUser.username}'s listings</h3>
		{/key}
	<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full p-1 sm:p-4 md:p-8 md:px-6 !pt-0 justify-left">
		{#if !listingsLoaded}
			{#each Array.from({ length: 40 }) as _, i}
				<Listing isLoading={true} />
			{/each}
			{#each Array.from({ length: 40 }) as _, i}
				<Listing isLoading={true} />
			{/each}
			{#each Array.from({ length: 40 }) as _, i}
				<Listing isLoading={true} />
			{/each}
			{#each Array.from({ length: 40 }) as _, i}
				<Listing isLoading={true} />
			{/each}
		
		{:else}
			{#if 'data' in userListings}
				{#each userListings.data as listing}
					<Listing listing={listing} />
				{/each}

			{:else}
				<div class="col-span-full p-16 flex flex-row gap-4 justify-center">
					<p class="text-5xl text-center font-medium"> No listings found
					</p>
				
				</div>
			{/if}
		{/if}
	</div>
</div>