<script>
	import { Avatar as AvatarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	let { class: className = undefined, children, ...rest } = $props();
	
</script>

<AvatarPrimitive.Fallback
	class={cn("bg-background text-foreground flex h-full w-full items-center justify-center rounded-full", className)}
	{...rest}
>
	{@render children?.()}
</AvatarPrimitive.Fallback>
