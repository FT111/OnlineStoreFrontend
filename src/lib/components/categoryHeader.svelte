
<script>
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	
	/**
	 * @typedef {Object} Props
	 * @property {any} [title]
	 * @property {any} [description]
	 * @property {any} categoryColour
	 * @property {boolean} [isLoading]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		title = undefined,
		description = undefined,
		categoryColour,
		isLoading = false,
		children
	} = $props();
</script>

<div class="w-full flex flex-col gap-2 min-h-32 h-fit bg-slate-50 mb-10 p-2 col-span-full rounded-2xl">
	<!--				Main info -->
	<div class="flex flex-col gap-2 min-h-32 h-fit text-white p-8 rounded-xl" style="background-color: {categoryColour};">
		{#if isLoading}
			<Skeleton class="w-1/5 h-8" />
			<Skeleton class="w-full h-4" />
			<Skeleton class="w-full h-4" />
			<Skeleton class="w-1/5 h-4" />
		{:else}
			<h3 class="text-5xl font-black">{title}</h3>
			<p class="text-slate-300">{description}</p>
		{/if}
	</div>
	<!--				Content	-->
	<div class="rounded-b-xl bg-neutral-50">
		{@render children?.()}
	</div>
</div>