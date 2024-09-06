<script>
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { onMount } from "svelte";

	export let src = "https://via.placeholder.com/800";
	export let alt = "Image";
	
	let className = undefined;
	export { className as class };



	let loaded = false;
	let imageElement;

	let handleLoad = () => {
		loaded = true;
		imageElement.classList.remove('opacity-0');
	};
	
</script>

<div class="w-full h-full max-h-full grid grid-cols-1 grid-rows-1">
	{#if !loaded}
		<Skeleton class="aspect-square h-full w-auto rounded-md col" style="grid-column: 1;grid-row: 1" />
	{/if}
	<img bind:this={imageElement} src={src} alt={alt} class="rounded-md border-b object-cover w-fit h-full opacity-0 {className}" style="grid-column: 1;grid-row: 1" on:load={handleLoad} />
	
</div>
