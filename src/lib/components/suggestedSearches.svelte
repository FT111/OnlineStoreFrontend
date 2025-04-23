
<script>
	import { get } from 'svelte/store';
	//
	// const colours = ['bg-slate-300', 'bg-neutral-300', 'bg-stone-200', 'bg-orange-200', 'bg-lime-200', 'bg-emerald-300', 'bg-sky-300', 'bg-rose-100', 'bg-purple-200', 'bg-fuchsia-200','bg-indigo-100','bg-blue-200']
	//
	
	
	/**
	 * @typedef {Object} Props
	 * @property {any} suggestions - const getRandomColour = () => colours[Math.floor(Math.random() * colours.length)]
	 */

	/** @type {Props} */
	let { suggestions } = $props();
</script>

<div class="flex flex-row flex-wrap justify-center w-full sm:w-4/5 md:w-2/3  gap-4">
	<div class="rounded-3xl flex items-center p-2 px-4 min-w-24 text-center bg-cyan-900 text-white">
		Suggested
	</div>
	{#await suggestions()}
		{#each [...Array(6).keys()] as i}
			<div class="bg-slate-700/50 text-white rounded-3xl flex items-center p-2 px-4 h-10 min-w-32 cursor-pointer text-center">
			</div>
		{/each}
		{:then suggestions}
		{#each [...Array(6).keys()] as i}
			<a href="/listings?category={suggestions.data[i].title}&showCategoryHeader=true" style="background-color: #{suggestions.data[i]['colour']};}" class="text-white
			border border-sky-950 rounded-3xl hover:brightness-200 brightness-125 h-10 flex justify-center items-center p-2 px-4
			min-w-24 cursor-pointer text-center hover:bg-amber-800 hover:scale-[1.01] transition-all">
				{suggestions.data[i].title}
			</a>
		{/each}
		{:catch error}
		<div>{error.message}</div>
	{/await}
</div>