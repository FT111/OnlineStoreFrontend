
<script>

import { Separator } from '$lib/components/ui/separator/index.js';
	let { header, title, page } = $props();
</script>

<div class="pt-16 flex flex-col grow h-full">
	<div class="w-full p-4 flex flex-col gap-0 justify-center basis-1/12">
		<p class="text-sm font-semibold">{@render header?.()}</p>
		{#if title}
			<h1 class="font-bold text-5xl text-primary">{@render title?.()}</h1>
		{/if}
	</div>
	
	<div class="p-3.5 pt-0  w-full basis-11/12">
		{@render page?.()}
	</div>
</div>