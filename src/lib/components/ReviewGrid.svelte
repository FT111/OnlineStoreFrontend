
<script>
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { fetchListingReviews } from '$lib/api/listings';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import Button from './ui/button/button.svelte';
	import { ChevronsDown, ChevronsUp } from 'lucide-svelte';

	let { listing } = $props();
	let reviews = $state([]);
	let isReviewsOpen = $state(false);
	$inspect(reviews);
	$inspect(listing);

	onMount(()=>{
		if (listing) {
			fetchListingReviews(listing.id)
				.then((response) => {
					console.log(response);
					reviews = response.data;
				})
				.catch((error) => {
					toast.error("Error fetching reviews: " + error.message);
				});
		}
	})
</script>


<Collapsible.Root class="flex flex-col gap-4" bind:open={isReviewsOpen}>
	<div class="flex flex-row justify-between">
		<h3 class="text-3xl font-medium flex flex-row gap-2.5 items-center">Reviews •
			{#if reviews.length > 0}
				<span class="font-light text-slate-500">{reviews.length}</span>
			{:else}
				<span class="font-light text-slate-500">None yet.</span>
			{/if}
		</h3>

		{#if reviews.length > 4}
		<Collapsible.Trigger>
			<Button
				variant="secondary"
				class="rounded-full w-40 justify-between flex flex-row {isReviewsOpen && 'bg-slate-200'}"
				aria-label="Toggle reviews"
			>

			{#if !isReviewsOpen}
			Expand section
			<ChevronsDown />
			{:else}
			Close section
			<ChevronsUp />
			{/if}
		</Button>

		</Collapsible.Trigger>
		{/if}
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:p-0 p-2">
		{#each reviews.slice(0, 4) as review}
			<div class="flex flex-col gap-3 p-5 h-32 bg-emerald-600/15 rounded-xl overflow-y-scroll">
				<div class="flex flex-row justify-between items-center">
					<div class="flex flex-row gap-2 items-center">
						<a  href={`/users/${review.user.id}`}>
							<Avatar.Root>
								<Avatar.Image src={review.user.profilePictureURL} alt='Avatar' />
								<Avatar.Fallback>{review.user.username.slice(0,2).toUpperCase()}</Avatar.Fallback>
							</Avatar.Root>
						</a>
						<p class="text-md font-semibold">{review.user?.username}</p>
					</div>
					<div class="flex flex-col justify-end gap-0.5 items-end">
						<div class="flex flex-row gap-[0.25] items-center">
							{#each [...Array(review.rating)] as _}
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="size-6 stroke-accent text-medium">
									<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
								</svg>
							{/each}
						</div>
						<p class="text-xs font-light">{new Date(review.addedAt*1000).toLocaleDateString("en-GB")}</p>
					</div>
				</div>
				<p class="text-sm font-normal">{review.description}</p>
	
			</div>
		{/each}
		</div>


	<Collapsible.Content>
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:p-0 p-2">
			{#each reviews.slice(4) as review}
				<div class="flex flex-col gap-3 p-5 h-32 bg-emerald-600/15 rounded-xl overflow-y-scroll">
					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-row gap-2 items-center">
							<a  href={`/users/${review.user.id}`}>
								<Avatar.Root>
									<Avatar.Image src={review.user.profilePictureURL} alt='Avatar' />
									<Avatar.Fallback>{review.user.username.slice(0,2).toUpperCase()}</Avatar.Fallback>
								</Avatar.Root>
							</a>
							<p class="text-md font-semibold">{review.user?.username}</p>
						</div>
						<div class="flex flex-col justify-end gap-0.5 items-end">
							<div class="flex flex-row gap-[0.25] items-center">
								{#each [...Array(review.rating)] as _}
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="size-6 stroke-accent text-medium">
										<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
									</svg>
								{/each}
							</div>
							<p class="text-xs font-light">{new Date(review.addedAt*1000).toLocaleDateString("en-GB")}</p>
						</div>
					</div>
					<p class="text-sm font-normal">{review.description}</p>
		
				</div>
			{/each}
			
			<!-- <div class="flex flex-col gap-3 p-5 bg-emerald-100 border-dashed border-2 cursor-pointer hover:border-accent
			 hover:bg-emerald-200 transition-all border-slate-200 rounded-xl items-center text-slate-600
			  align-middle justify-center">
				
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
		
			</div> -->
		</div>
	</Collapsible.Content>
</Collapsible.Root>