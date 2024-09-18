
<script>
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';

  export let title = undefined;
  export let description = undefined;
  export let categoryColour;
	
  export let isLoading = false;
</script>

<div class="w-full flex flex-col gap-2 min-h-32 h-fit bg-slate-50 mb-10 p-2 col-span-full rounded-2xl">
	<!--				Main info -->
	<div class="flex flex-col gap-2 min-h-32 h-fit text-white p-8 rounded-2xl" style="background-color: {categoryColour};">
		{#if isLoading}
			<Skeleton class="w-1/5 h-8" />
			<Skeleton class="w-full h-4" />
			<Skeleton class="w-full h-4" />
			<Skeleton class="w-1/5 h-4" />
		{:else}
			<h3 class="text-4xl font-bold">{title}</h3>
			<p>{description}</p>
		{/if}
	</div>
	<!--				Content	-->
	<div class="rounded-b-xl bg-slate-50">
		<slot />
	</div>
</div>