<script>
	import { Dialog as SheetPrimitive } from "bits-ui";
	import X from "lucide-svelte/icons/x";
	import { fly } from "svelte/transition";
	import { SheetOverlay, SheetPortal, sheetTransitions, sheetVariants } from "./index.js";
	import { cn } from "$lib/utils.js";
	
	/**
	 * @typedef {Object} Props
	 * @property {any} [class]
	 * @property {string} [side]
	 * @property {any} [inTransition]
	 * @property {any} [inTransitionConfig]
	 * @property {any} [outTransition]
	 * @property {any} [outTransitionConfig]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props & { [key: string]: any }} */
	let {
		class: className = undefined,
		side = "right",
		inTransition = fly,
		inTransitionConfig = sheetTransitions[side ?? "right"].in,
		outTransition = fly,
		outTransitionConfig = sheetTransitions[side ?? "right"].out,
		children,
		...rest
	} = $props();
</script>

<SheetPortal>
	<SheetOverlay />
	<SheetPrimitive.Content
		{inTransition}
		{inTransitionConfig}
		{outTransition}
		{outTransitionConfig}
		class={cn(sheetVariants({ side }), className)}
		{...rest}
	>
		{@render children?.()}
		<SheetPrimitive.Close
			class="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</SheetPrimitive.Close>
	</SheetPrimitive.Content>
</SheetPortal>
