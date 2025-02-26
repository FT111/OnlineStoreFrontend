<script>
	import { cn } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, level = 3, children, ...restProps } = $props();
</script>

<div
	role="heading"
	aria-level={level}
	bind:this={ref}
	class={cn("text-xl font-medium leading-none", className)}
	{...restProps}
>
	{@render children?.()}
</div>
