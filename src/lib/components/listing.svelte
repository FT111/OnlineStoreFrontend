<script>
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Skeleton } from "$lib/components/ui/skeleton";
	import Image from "$lib/components/image.svelte";
	import * as Avatar from "$lib/components/ui/avatar";

	export let listingName = "Product Name";
	export let listingDescription = "Product Description";
	export let listingPrice = 1.59;
	export let listingImage = "https://via.placeholder.com/1000";
	export let listingRating = 5;
	
	export let userAvatarUrl = "https://via.placeholder.com/800";
	export let userName = "John Doe";
	export let userRating = 5;
	
	
	export let listingID= 1;
	export let editMode = false;
	export let isLoading;
	console.log(isLoading)
</script>

<a href="/listings/{listingID}" class="w-full">
	<Card.Root class="flex flex-col justify-between h-full w-full	 overflow-x-scroll rounded-3xl group transition-all duration-100 ease-in-out hover:scale-[1.01]" href="/listings/{listingID}">
		
		<Card.Header class="pb-4">
			{#if isLoading === true}
				<Skeleton class="w-full h-5 rounded-md" />
				<Skeleton class="w-full h-3 rounded-md" />
				<Skeleton class="w-1/3 h-3 rounded-md" />
			
			
			{:else}
				<Card.Title>{ listingName }</Card.Title>
				<Card.Description>{ listingDescription }</Card.Description>
			{/if}
		
			<div class="flex flex-row justify-between pt-2 items-center">
				<div class="flex flex-row gap-2 h-3 align-middle items-center p-0">
					<Avatar.Root>
						<Avatar.Image src={userAvatarUrl} alt='Avatar' />
						<Avatar.Fallback>EB</Avatar.Fallback>
					</Avatar.Root>
					<div class="flex flex-col">
						<p class="text-xs font-light flex flex-row align-middle items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
							<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
						</svg>
							{#if isLoading === true}
								<p></p>
							{:else}
								{userRating}
							{/if}</p>
					</div>
				</div>
				<p class="text-md font-light flex flex-row pr-2 align-middle items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
				</svg>
					{listingRating}
				</p>
				
			</div>
			
		</Card.Header>
		<div class="flex flex-col justify-end">
			<Card.Content>
				<Image class="h-max rounded-md border-b" src="{listingImage}" alt="{listingDescription}" />
			</Card.Content>
			<Card.Footer class="gap-2 justify-end">
				<div in:slide={{duration:300}} class="flex flex-row gap-1">
				{#if editMode === true}
						<Button variant="ghost" class="hover:bg-red-600/60 hover:text-white md:w-md opacity-0 group-hover:opacity-100 transition-all duration-200" on:click={() => console.log("Delete")}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
							</svg>
						</Button>
						<Button variant="ghost" class="w-min opacity-0 group-hover:opacity-100 transition-all duration-200" on:click={() => console.log("Edit")}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
							</svg>
						</Button>
					{:else}
					<Button variant="ghost" class="w-min opacity-0 group-hover:opacity-100 transition-all duration-200" on:click={() => console.log("Added")}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</Button>
	
	<!--				<Button variant="ghost" class="w-min opacity-0 group-hover:opacity-100 transition-all duration-200" on:click={() => console.log("Edit")}>-->
	<!--					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">-->
	<!--						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />-->
	<!--					</svg>-->
	<!--				</Button>-->
				{/if}
				</div>
	
				<div class="flex w-full justify-end">
					{#if isLoading === true}
						<Skeleton class="w-28 h-10 rounded-md" />
					{:else}
						<p class="text-4xl font-bold">{listingPrice.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</p>
					{/if}
				</div>
			</Card.Footer>
		</div>
	</Card.Root>
</a>