<script>
	import { Dialog as SheetPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	let { class: className = undefined, children, ...rest } = $props();
	
</script>

<SheetPrimitive.Title
	class={cn("text-foreground text-lg font-semibold", className)}
	{...rest}
>
	{@render children?.()}
</SheetPrimitive.Title>
