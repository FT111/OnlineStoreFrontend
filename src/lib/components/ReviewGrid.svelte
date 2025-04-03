
<script>
  import Review from './Review.svelte';

	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { fetchListingReviews } from '$lib/api/listings';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import Button from './ui/button/button.svelte';
	import { ChevronsDown, ChevronsUp, Plus } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { backIn, backInOut, backOut, cubicInOut } from 'svelte/easing';

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
		<h3 class="text-3xl font-medium flex flex-row gap-2.5 items-center">
			{#if reviews.length > 0}
				<span class=" text-slate-800">{reviews.length} </span>
			{:else}
				<span class=" text-slate-800">No </span>
			{/if}
			Reviews {reviews.length===0 ? 'yet' : ''} •
			<p class="text-muted-foreground flex flex-row gap-1.5 items-center">
			Rated <span class="text-muted-foreground flex flex-row gap-[0.25] items-center">{listing.rating}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="size-7 text-medium">
				<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
			</svg></span>  overall
			</p>
		</h3>

		{#if reviews.length > 4}
			<div class="flex flex-row gap-2 items-center">
				{#if !isReviewsOpen}
				<p class="!z-10" transition:fly={{x: 50, duration: 50, delay:0, easing: cubicInOut}}>{reviews.length-4} more</p>
				{/if}
				
				<Collapsible.Trigger>
					<Button
					variant="secondary"
					class=" !z-20 rounded-full w-40 justify-between flex flex-row {isReviewsOpen && 'bg-slate-200'}"
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
		</div>
		{/if}
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:p-0 p-2">
		<!-- Show top 4 reviews -->
		{#each reviews.slice(0, 4) as review}
			<Review {review}></Review>
		{/each}
		</div>

		{#if reviews.length > 4 && !isReviewsOpen}
		<Button aria-label="Expand reviews" variant="link" onclick={()=>{isReviewsOpen=true}} class="flex flex-row w-full p-4 gap-1 text-lg text-muted-foreground items-center justify-center">
			<Plus size={20} />
			{reviews.length-4}
		</Button>
		{/if}

	<Collapsible.Content>
		<div  transition:fly={{y:50, duration:100}} class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 sm:p-0 p-2">
			<!-- Show rest when expanded -->
			{#each reviews.slice(4) as review}
				<Review {review}></Review>
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