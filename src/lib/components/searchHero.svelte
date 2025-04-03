
<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index.js';
	import Searchbar from '$lib/components/searchbar.svelte';
	import SuggestedSearches from '$lib/components/suggestedSearches.svelte';
	
	let { searchSuggestions, searchElement = $bindable() } = $props();

</script>
<div class="flex flex-col items-center justify-between w-full min-h-[50vh] h-fit bg-primary rounded-b-3xl">
	<div class="flex flex-col items-center w-full md:p-32 md:pb-10 p-8 py-32 gap-3">
		<h1 class="text-6xl text-white font-medium">What are you looking for?</h1>

		<div bind:this={searchElement} class="flex flex-row sm:w-11/12 md:w-4/5 lg:w-3/5 w-full p-5 gap-5">
			<Searchbar class="w-full" />
		</div>

		<SuggestedSearches suggestions={searchSuggestions} />
	</div>

	<div class="flex hidden flex-col gap-8 sm:gap-0 sm:flex-row justify-between w-full p-8 px-24 font-bold text-xl text-slate-300">
		<Button variant="ghost" class="text-muted p-6 text-xl font-bold">Recently viewed</Button>
		<Button variant="ghost" class="text-muted p-6 text-xl font-bold">Recent categories</Button>
		<Button variant="ghost" class="text-muted p-6 text-xl font-bold">Top offers</Button>
		<Button variant="ghost" class="text-muted p-6 text-xl font-bold">Top categories</Button>
	</div>
</div>
