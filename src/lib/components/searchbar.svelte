<script>

	const searchListings = (query) => {
		window.location.replace(`/listings?query=${query}`);
	}

	
	let className = undefined;
	export { className as class };
		
	export let searchQuery = '';

	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

</script>

<form class={`flex flex-row gap-0 border-primary/30 sm:rounded-3xl rounded-xl border ${className}`} on:submit={() => {searchListings(searchQuery)}}>
<!--	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">-->
<!--		<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />-->
<!--	</svg>-->
	
	<Input bind:value={searchQuery} class="text-black  sm:rounded-l-3xl rounded-l-xl rounded-r-none h-9/10
	 focus-visible:ring-accent/20 focus-visible:outline-accent focus-visible:ring-offset-0
	 focus-visible:ring-1 border-0 " placeholder="Search for anything..." />
	
	<Button class="sm:rounded-r-3xl rounded-r-xl border-0 rounded-l-none grow flex flex-row gap-2 pr-6" variant="secondary">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
		</svg>
	</Button>
</form>