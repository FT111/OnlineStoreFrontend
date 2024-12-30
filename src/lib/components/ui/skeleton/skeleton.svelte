<script>
	import { cn } from "$lib/utils.js";
	let { class: className = undefined, ...rest } = $props();
	
</script>

<div class={cn("bg-orange-400/60 animate-pulse rounded-md", className)} {...rest}></div>
