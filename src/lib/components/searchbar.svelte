<script>

	const searchListings = (query) => {
		window.location.replace(`/listings?query=${query}`);
	}
		
	export let searchQuery = '';

	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

</script>

<form class="flex flex-row gap-0 border-primary/30 rounded-3xl border" on:submit={() => {searchListings(searchQuery)}}>
<!--	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">-->
<!--		<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />-->
<!--	</svg>-->
	
	<Input bind:value={searchQuery} class="text-black  rounded-l-3xl rounded-r-none h-9/10
	 focus-visible:ring-accent/20 focus-visible:outline-accent focus-visible:ring-offset-0
	 focus-visible:ring-1 border-0 " placeholder="Search for anything..." />
	
	<Button class="rounded-r-3xl border-0 rounded-l-none grow flex flex-row gap-2" variant="secondary">
		<p>Go</p>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
		</svg>
	</Button>
</form>