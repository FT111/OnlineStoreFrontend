<script>
	import { cn } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, children, ...restProps } = $props();
</script>

<div
	bind:this={ref}
	class={cn("bg-card text-card-foreground rounded-lg border border-muted", className)}
	{...restProps}
>
	{@render children?.()}
</div>
