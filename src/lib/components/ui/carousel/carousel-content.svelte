<script>
	import emblaCarouselSvelte from "embla-carousel-svelte";
	import { getEmblaContext } from "./context.js";
	import { cn } from "$lib/utils.js";
	let { class: className = undefined, children, ...rest } = $props();
	
	const { orientation, options, plugins, onInit } = getEmblaContext("<Carousel.Content/>");
</script>

<div
	class="overflow-hidden"
	use:emblaCarouselSvelte={{
		options: {
			container: "[data-embla-container]",
			slides: "[data-embla-slide]",
			...$options,
			axis: $orientation === "horizontal" ? "x" : "y",
		},
		plugins: $plugins,
	}}
	onemblaInit={onInit}
>
	<div
		class={cn("flex", $orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
		data-embla-container=""
		{...rest}
	>
		{@render children?.()}
	</div>
</div>
