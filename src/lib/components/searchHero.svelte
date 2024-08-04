
<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index.js';
	import SuggestedSearches from '$lib/components/suggestedSearches.svelte';
	import SearchGradient from '$lib/assets/searchGradient1.png';
//bg-gradient-to-br from-indigo-500 to-fuchsia-800
</script>
<!--bg-[url('/src/lib/assets/searchGradient1.png')]-->
<div class="flex flex-col items-center md:p-32 sm:p-8 gap-5 w-full min-h-[75vh] h-fit bg-cyan-950 rounded-b-3xl">
	<h1 class="text-7xl text-white font-bold">What are you looking for?</h1>

	<div class="flex flex-row md:w-1/2 sm:w-11/12 p-5 gap-5">
		<Input placeholder="Search for anything..." class="rounded-3xl" />
		<Button variant="secondary" class="gap-2 text-lg rounded-3xl">Go
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
		</svg>
		</Button>
	</div>

	<SuggestedSearches />
</div>
