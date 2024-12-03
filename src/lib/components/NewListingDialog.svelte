<script>
import { Plus } from 'lucide-svelte';
import { Button } from '$lib/components/ui/button/index.js';
import * as Dialog from '$lib/components/ui/dialog/index.js';
</script>


<Dialog.Root>
	<Dialog.Trigger>
		<slot />

	</Dialog.Trigger>
	<Dialog.Content class="p-0 w-11/12 sm:w-1/3 h-48">
		<div class="flex flex-row h-full">
			<!--						-->
			<a href="/account/listings/new" class="basis-1/2 gap-2 p-5 border-r border-r-1 flex flex-col items-center justify-center hover:bg-slate-50 transition-all">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
				</svg>
				
				Single Product listing
				
				<p class="font-light text-sm text-slate-600 h-12">
					Offer a single product
				</p>
			</a>
			
			<!--						-->
			<a href="/account/listings/new" class="basis-1/2 gap-2 p-5 flex flex-col items-center justify-center hover:bg-slate-50 transition-all">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
				</svg>
				
				Multi-Product listing
				
				<p class="font-light text-sm text-center text-slate-600 h-12">
					Let users pick variants of your product
				</p>
			</a>
		</div>
	</Dialog.Content>
</Dialog.Root>
