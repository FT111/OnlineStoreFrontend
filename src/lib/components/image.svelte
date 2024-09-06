<script>
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { onMount } from "svelte";

	export let src = "https://via.placeholder.com/800";
	export let alt = "Image";
	
	let className = undefined;
	export { className as class };



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


{#if !loaded}
	<Skeleton class="absolute h-full rounded-md"  />
{/if}
<picture class="rounded-md border-b h-full border-none">
	<source type="image/webp" srcset={src} src={src} on:load={handleLoad} />
	<img src={src} alt={alt} class="rounded-md border-b object-cover w-fit h-full {className}" on:load={handleLoad} />
</picture>
<!--	<img alt={alt} width="100" height="100" class="rounded-md border-b object-cover {className}" {src} on:load={handleLoad}  />-->
