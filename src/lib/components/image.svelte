<script>
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { onMount } from "svelte";

	export let src = "https://via.placeholder.com/800";
	export let alt = "Image";


	let loaded = false;

	let handleLoad = () => {
		loaded = true;
	};

	onMount(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => {
			loaded = true;
		};
	});
</script>

<div class="relative w-full h-full">
	{#if !loaded}
		<div class="absolute aspect-square w-max h-auto" />
		<Skeleton class="absolute w-full h-full rounded-md"  />
	{/if}
	<img alt={alt} class="rounded-md border-b" {src} on:load={handleLoad}  />

</div>