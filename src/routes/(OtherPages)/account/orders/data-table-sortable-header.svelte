<script>
	import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
	import { Button } from "$lib/components/ui/button/index.js";
	import { ArrowUp } from 'lucide-svelte';

	let { title, variant = "ghost", className, ...restProps }  = $props();
</script>

<div class={className}>
	<Button  {variant} {...restProps} class="hover:bg-primary hover:text-primary-foreground rounded-full">
		{#snippet children()}
			{title}
			<ArrowUpDown class="ml-0.5" />
		{/snippet}
	</Button>
</div>
