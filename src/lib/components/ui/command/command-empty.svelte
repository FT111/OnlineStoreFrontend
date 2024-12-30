<script>
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";
	let { class: className = undefined, children, ...rest } = $props();
	
</script>

<CommandPrimitive.Empty class={cn("py-6 text-center text-sm", className)} {...rest}>
	{@render children?.()}
</CommandPrimitive.Empty>
