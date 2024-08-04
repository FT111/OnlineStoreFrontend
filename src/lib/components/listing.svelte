<script>
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Image from "$lib/components/image.svelte";

	export let listingName = "Product Name";
	export let listingDescription = "Product Description";
	export let listingPrice = 1.59;
	export let listingImage = "https://via.placeholder.com/800";
	export let listingID= 1;
	export let editMode = false;
</script>

<a href="/listings/{listingID}" class="w-min">
	<Card.Root class="sm:w-full h-full w-[96vw] sm:min-w-min rounded-3xl group transition-all duration-250 ease-in-out hover:scale-[1.01]" href="/listings/{listingID}">
		<Card.Header>
			<Card.Title>{ listingName }</Card.Title>
			<Card.Description>{ listingDescription }</Card.Description>
		</Card.Header>
		<Card.Content>
			<Image class="h-max rounded-md border-b" src="{listingImage}" alt="{listingDescription}" />
		</Card.Content>
		<Card.Footer class="gap-2">
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
				<Button variant="ghost" class="w-min opacity-0 group-hover:opacity-100 transition-all duration-200" on:click={() => console.log("Edit")}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
					</svg>
				</Button>

				<Button variant="ghost" class="w-min opacity-0 group-hover:opacity-100 transition-all duration-200" on:click={() => console.log("Edit")}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
					</svg>
				</Button>
			{/if}
			</div>

			<div class="flex w-full justify-end">
				<p class="text-4xl font-bold">{listingPrice.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</p>
			</div>
		</Card.Footer>
	</Card.Root>
</a>