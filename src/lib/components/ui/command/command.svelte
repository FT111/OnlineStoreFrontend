<script>
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";
	let { value = $bindable(undefined), class: className = undefined, children, ...rest } = $props();
	
</script>

<CommandPrimitive.Root
	class={cn(
		"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
		className
	)}
	bind:value
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Root>
