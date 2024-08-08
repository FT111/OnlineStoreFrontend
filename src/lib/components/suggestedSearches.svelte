
<script>
	import { get } from 'svelte/store';
	//
	// const colours = ['bg-slate-300', 'bg-neutral-300', 'bg-stone-200', 'bg-orange-200', 'bg-lime-200', 'bg-emerald-300', 'bg-sky-300', 'bg-rose-100', 'bg-purple-200', 'bg-fuchsia-200','bg-indigo-100','bg-blue-200']
	//
	// const getRandomColour = () => colours[Math.floor(Math.random() * colours.length)]
	
	export let suggestions;
</script>

<div class="flex flex-row flex-wrap justify-center w-full sm:w-4/5 md:w-1/2  gap-4">
	<div class="rounded-3xl flex items-center p-2 px-4 min-w-24 text-center bg-white/20 text-white">
		Suggested
	</div>
	{#await suggestions()}
		<div />
		{:then suggestions}
		{#each suggestions.data as i}
			<div class="bg-amber-700 text-white rounded-3xl flex items-center p-2 px-4 min-w-24 cursor-pointer text-center hover:bg-amber-800 hover:scale-[1.01] transition-all">
				{i.title}
			</div>
		{/each}
		{:catch error}
		<div>{error.message}</div>
	{/await}
</div>