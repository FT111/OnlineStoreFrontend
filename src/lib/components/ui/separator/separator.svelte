<script>
	import { Separator as SeparatorPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	/**
	 * @typedef {Object} Props
	 * @property {any} [class]
	 * @property {string} [orientation]
	 * @property {any} [decorative]
	 */

	/** @type {Props & { [key: string]: any }} */
	let { class: className = undefined, orientation = "horizontal", decorative = undefined, ...rest } = $props();
	
</script>

<SeparatorPrimitive.Root
	class={cn(
		"bg-border shrink-0",
		orientation === "horizontal" ? "h-[1px] w-full" : "min-h-full w-[1px]",
		className
	)}
	{orientation}
	{decorative}
	{...rest}
/>
