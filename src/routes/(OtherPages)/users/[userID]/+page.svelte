
<script>
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import ListingCarousel from '$lib/components/listingCarousel.svelte';
	import { fetchListings, queryListings, fetchUserListings } from '$lib/api/listings.js';
	import Listing from '$lib/components/listing.svelte';
	
	export let data;
	const userID = data.profileUser.id;
	
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
						{#if data.user}
							{#if data.profileUser.id === data.user.id}
								<Button class="basis-1/4 justify-evenly" variant="default">Edit
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
										<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
									</svg>
								</Button>
							{/if}
						{/if}
						<Button class="basis-1/4 justify-evenly" variant="default">Rate
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
							</svg>
						</Button>
						<Button class="basis-1/4 justify-evenly" variant="destructive">Report
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
							</svg>
						</Button>
						
					</div>
				</div>
			</div>
		</div>
		
		<div class="h-52 bg-slate-100 border-t-[1px] border-t-slate-200 rounded-b-xl flex flex-row p-4 gap-3.5">
			<div class="rounded-3xl flex items-center p-2 px-4 min-w-24 text-center bg-slate-200 text-secondary-foreground font-semibold outline-2 outline outline-accent">
				{data.profileUser.username}'s Categories
			</div>
			{#await fetchUserListings(data.profileUser.id)}
				<div class="rounded-3xl flex items-center p-2 px-4 min-w-24 text-center bg-primary text-white animate-pulse" />
			{:then data}
					{#each data.meta.topCategories as category}
						<a href="/listings?category={category}&showCategoryHeader=true" class="h-full">
							<div class="rounded-3xl flex items-center p-2 px-4 min-w-24 text-center h-full bg-primary text-white justify-center font-medium outline outline-primary hover:brightness-150 hover:outline-accent transition-all">
								{category}
							</div>
						</a>
						{/each}
			{/await}
		</div>
	</div>

</div>

<ListingCarousel compactLayout={true} title="New arrivals" />

<div class="sm:px-8 px-1 mt-16 bg-slate-50">
	<h3 class="px-8 py-6 text-5xl font-bold">Listings</h3>
	<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 w-full p-1 sm:p-4 md:p-8 md:px-6 !pt-0 justify-left">
		{#await fetchUserListings(data.profileUser.id)}
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
							 listingDescription={listing.description} multipleSKUs={listing.multipleSKUs} listingID={listing.id}
							 editMode={false} hasDiscount={listing.hasDiscount} userID={listing.ownerUser.id} />
				{/each}
			{/if}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</div>