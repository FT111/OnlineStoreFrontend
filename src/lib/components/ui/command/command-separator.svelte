<script>
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";
	let { class: className = undefined, ...rest } = $props();
	
</script>

<CommandPrimitive.Separator class={cn("bg-border -mx-1 h-px", className)} {...rest} />
