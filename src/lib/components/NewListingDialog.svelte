<script>
	import { Plus, SlidersHorizontal } from 'lucide-svelte';
import { Button } from '$lib/components/ui/button/index.js';
import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { goto } from '$app/navigation';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();

let openState = $state(false);
</script>


<!--<Dialog.Root bind:open={openState}>-->
<!--	<Dialog.Trigger>-->
<a href="/sales/listings/new" aria-label="Goes to listing creation page" class="flex flex-row gap-2">
		{@render children?.()}
</a>

<!--	</Dialog.Trigger>-->
<!--	<Dialog.Content class="p-0 w-11/12 sm:w-1/3 h-48">-->
<!--		<div class="flex flex-row h-full">-->
<!--			&lt;!&ndash;						&ndash;&gt;-->
<!--			<a onclick={()=>{openState=false}} href="/sales/listings/new" class="basis-1/2 gap-2 p-5 border-r border-r-1 flex flex-col items-center justify-center hover:bg-slate-50 transition-all">-->
<!--				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">-->
<!--					<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />-->
<!--				</svg>-->
<!--				-->
<!--				Single Product listing-->
<!--				-->
<!--				<p class="font-light text-sm text-slate-600 h-12">-->
<!--					Offer a single product-->
<!--				</p>-->
<!--			</a>-->
<!--			-->
<!--			&lt;!&ndash;						&ndash;&gt;-->
<!--			<a onclick={()=>{openState=false}} href="/sales/listings/new" class="basis-1/2 gap-2 p-5 flex flex-col items-center justify-center hover:bg-slate-50 transition-all">-->
<!--				<SlidersHorizontal size={28} strokeWidth={2} />-->
<!--				-->
<!--				Variation listing-->
<!--				-->
<!--				<p class="font-light text-sm text-center text-slate-600 h-12">-->
<!--					Offer multiple variations of a product-->
<!--				</p>-->
<!--			</a>-->
<!--		</div>-->
<!--	</Dialog.Content>-->
<!--</Dialog.Root>-->
