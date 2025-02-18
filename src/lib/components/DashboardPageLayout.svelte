
<script>
import { useSidebar } from '$lib/components/ui/sidebar/index.js';
import { Separator } from '$lib/components/ui/separator/index.js';
import { Button } from '$lib/components/ui/button/index.js';
import { Sidebar } from 'lucide-svelte';
	let { header, title, page } = $props();
	
	let sidebar = useSidebar();
</script>

<div class="pt-14 flex flex-col grow h-full">
	<div class="w-full p-4 flex flex-col gap-0.5 justify-center basis-1/12">
		<p class="text-sm font-medium">{@render header?.()}</p>
		{#if title}
			<div class="{sidebar.open && '-translate-x-14'} z-0 duration-200 ease-in-out transition-all flex flex-row gap-2.5">
				<Button variant="outline" onclick={() => sidebar.toggle()}
								class="transition-all origin-left w-10 !p-2.5 hover:bg-secondary hover:text-secondary-foreground">
					<Sidebar/>
				</Button>
				<h1 class="font-semibold text-4xl text-primary">{@render title?.()}</h1>
			</div>
		{/if}
	</div>
	
	<div class="p-3.5 pt-0  w-full basis-11/12">
		{@render page?.()}
	</div>
</div>