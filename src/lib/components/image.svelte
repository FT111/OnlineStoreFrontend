<script>
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { onMount } from "svelte";

	
	/**
	 * @typedef {Object} Props
	 * @property {string} [src]
	 * @property {string} [alt]
	 * @property {any} [class]
	 */

	/** @type {Props} */
	let { src = "https://via.placeholder.com/800", alt = "Image", class: className = undefined } = $props();


	let loaded = $state(false);
	let imageElement = $state();

	let handleLoad = () => {
		loaded = true;
		imageElement.classList.remove('opacity-0');
	};
	
</script>

<div class="w-full h-auto max-h-full grid grid-cols-1 grid-rows-1">
	{#if !loaded}
		<Skeleton class="aspect-square h-auto w-full rounded-md col" style="grid-column: 1;grid-row: 1" />
	{/if}
	<img loading="lazy" bind:this={imageElement} src={src} alt={alt} class="rounded-md border-b object-cover w-full h-auto opacity-0 {className}" style="grid-column: 1;grid-row: 1" onload={handleLoad} />
	
</div>
