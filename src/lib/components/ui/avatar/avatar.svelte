<script>
	import { Avatar as AvatarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	let { class: className = undefined, delayMs = undefined, children, ...rest } = $props();
	
</script>

<AvatarPrimitive.Root
	{delayMs}
	class={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full " +
	 "outline outline-0 hover:outline-[1.5px] outline-accent transition-all duration-75 ", className)}
	{...rest}
>
	{@render children?.()}
</AvatarPrimitive.Root>
