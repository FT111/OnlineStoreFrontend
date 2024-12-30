<script>
	import { cn } from "$lib/utils.js";
	let { class: className = undefined, children, ...rest } = $props();
	
</script>

<tfoot class={cn("bg-muted/50 text-primary-foreground font-medium", className)} {...rest}>
	{@render children?.()}
</tfoot>
