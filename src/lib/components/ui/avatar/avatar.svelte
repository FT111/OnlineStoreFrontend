<script>
	import { Avatar as AvatarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	let className = undefined;
	export let delayMs = undefined;
	export { className as class };
</script>

<AvatarPrimitive.Root
	{delayMs}
	class={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full " +
	 "outline outline-0 hover:outline-2 outline-accent transition-all duration-100 ", className)}
	{...$$restProps}
>
	<slot />
</AvatarPrimitive.Root>
