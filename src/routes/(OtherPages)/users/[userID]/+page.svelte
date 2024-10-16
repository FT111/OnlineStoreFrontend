
<script>
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import ListingCarousel from '$lib/components/listingCarousel.svelte';
	import { fetchListings } from '$lib/api/listings.js';
	import Listing from '$lib/components/listing.svelte';
	
	export let data;
	
	const profileUser = {
		username: 'johndoe',
		profilePictureURL: 'https://via.placeholder.com/150',
	  	bannerURL: 'https://live.staticflickr.com/65535/51155108931_45026fc05d_h.jpg',
		rating: 4.5,
		description: 'I am a software engineer who sells things on this marketplace',

	}
</script>

<div class="sm:px-8 px-0">
	
	<div class="flex flex-col w-full p-4 h-96 mt-20 overflow-hidden">
		<div class="grow overflow-hidden h-80">
			<img src={profileUser.bannerURL} alt="User Profile" class="w-full h-96 object-cover rounded-t-2xl" />
		</div>
		
		<div class="grow bg-secondary h-full w-full p-6 flex flex-col sm:flex-row justify-between gap-4">
<!--		User Primary Detail Container	-->
			<div class="flex flex-col gap-3.5 basis-1/3">
<!--			Avatar and Name container	-->
				<div class="flex flex-row gap-3 items-center">
					<Avatar.Root class="h-12 w-12">
						<Avatar.Image src={data.profileUser.profilePictureURL} alt={data.profileUser.username} />
						<Avatar.Fallback class="bg-accent text-slate-50">{data.profileUser.username.slice(0,2).toUpperCase()}</Avatar.Fallback>
					</Avatar.Root>
					{#if data.profileUser}
						<p class="text-4xl font-bold text-primary">{data.profileUser.username}</p>
					{:else}
						<Skeleton class="w-24 h-8" />
					{/if}
				</div>
				
				<p class=" text-sm font-normal grow p-2.5 bg-white rounded-lg w-full ">
					{data.profileUser.description}
				</p>
			</div>

			<div class="grow items flex flex-row sm:justify-end">
				<div class="sm:basis-7/12 basis-1 w-full flex-1 sm:flex-initial h-fit gap-4 flex-col flex">
					<!--			Quick Info Row -->
					<div class="sm:flex sm:flex-row grid grid-cols-2 gap-0.5 sm:gap-0 rounded-lg bg-slate-100 w-full sm:h-20  justify-evenly overflow-hidden border border-slate-200">
						<div class="basis-1/4  h-full flex flex-col grow items-center flex-wrap align-middle justify-center">
							<p class="text-2xl font-bold">4.2</p>
							<p class="text-lg">rating</p>
						</div>
						<div class="basis-1/4  h-full bg-zinc-50 grow flex flex-col items-center flex-wrap align-middle justify-center">
							<p class="text-2xl font-bold">10+</p>
							<p class="text-lg">sales</p>
						</div>
						<div class="basis-1/4 h-full flex flex-col gap-2 items-center grow flex-wrap align-middle justify-center">
							<p class="text-xl font-bold">10/05/24</p>
							<p class="text-lg">joined</p>
						</div>
						<div class="basis-1/4 h-full bg-zinc-50 flex flex-col grow items-center flex-wrap align-middle justify-center">
							<p class="text-2xl font-bold">43</p>
							<p class="text-lg">listings</p>
						</div>
					</div>
					
<!--				Action Buttons	-->
					<div class="flex flex-row items-center justify-end h-full w-full align-middle flex-1 flex-grow gap-4">
						<Button class="basis-1/4" variant="default">Rate</Button>
						<Button class="basis-1/4" variant="destructive">Report</Button>
						
					</div>
				</div>
			</div>
		</div>
		
		<div class="h-52 bg-slate-100 border-t-[1px] border-t-slate-200 rounded-b-xl flex flex-row p-4 gap-3.5">
			<div class="rounded-3xl flex items-center p-2 px-4 min-w-24 text-center bg-slate-800 text-white font-semibold outline outline-accent">
				{data.profileUser.username}'s Categories
			</div>
			<div class="rounded-3xl flex items-center p-2 px-4 min-w-24 text-center bg-emerald-700 text-white">
				Gaming
			</div>
		</div>
	</div>

</div>

<ListingCarousel compactLayout={true} title="New arrivals" />

<div class="sm:px-8 px-1 mt-16 bg-slate-50">
	<h3 class="px-8 py-6 text-5xl font-bold">Listings</h3>
	<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full p-1 sm:p-4 md:p-8 md:px-6 !pt-0 justify-left">
		{#await fetchListings()}
			{#each Array.from({ length: 40 }) as _, i}
				<Listing isLoading={true} />
			{/each}
			{#each Array.from({ length: 40 }) as _, i}
				<Listing isLoading={true} />
			{/each}
		
		{:then data}
			{#if data.data.length === 0}
				<div class="col-span-full p-16 flex flex-row gap-4 justify-center">
					<p class="text-5xl text-center"> No listings found
					</p>
				
				</div>
			{:else}
				{#each data.data as listing}
					<Listing listingName={listing.title} listingPrice={listing.basePrice} userRating={listing.ownerUser.rating}
							 listingRating={listing.rating} userAvatarUrl={listing.ownerUser.profilePictureURL}
							 listingDescription={listing.description} multipleSKUs={listing.multipleSKUs}
							 editMode={false} hasDiscount={listing.hasDiscount} userID={listing.ownerUser.id} />
				{/each}
			{/if}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</div>