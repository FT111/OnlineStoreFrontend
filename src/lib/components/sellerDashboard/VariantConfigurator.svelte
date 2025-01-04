
<script>
	import { run } from 'svelte/legacy';

	
	import { Badge } from '$lib/components/ui/badge/index.js';
		import { Input } from '$lib/components/ui/input/index.js';
		import { Cross, Plus, Trash2, X } from 'lucide-svelte';
		import { Button } from '$lib/components/ui/button/index.js';

	
	let { variantOptions = $bindable({
		"Color": ["Red", "Blue", "Green"],
		"Size": ["Small", "Medium", "Large"],
		"Material": ["Cotton", "Polyester", "Wool"]
	}), selectedOptions = $bindable({}),
		configuring = false } = $props();
	
	const addOption = (form, category) => {
		form.preventDefault();
		const formData = new FormData(form.target);
		variantOptions[category].push(formData.get('optionValue'));
		form.target.reset();
	};
	
	const removeOption = (category, option) => {
		variantOptions[category] = variantOptions[category].filter((opt) => opt !== option);
	};
	
	const addCategory = (category) => {
		variantOptions[category] = [];
	};
	
	const removeCategory = (category) => {
		delete variantOptions[category];
	};
	
</script>


<div class="flex flex-col bg-muted rounded-2xl  w-full border-4 border-slate-200 overflow-clip">
	
	{#each Object.keys(variantOptions) as category}
		<div class="flex flex-col bg-slate-50 p-2 px-4 border-b-2 border-slate-200">
			<div class="flex flex-row gap-1 items-center">
				{#if configuring}
					<Button class="px-2" variant={"ghost"}>
						<Trash2 size={20} strokeWidth={1.25} />
					</Button>
					<Input  class="font-semibold text-lg bg-none border-none w-fit" placeholder={category} value={category} />
				{:else}
					<p class="font-semibold text-lg">{category}</p>
				{/if}
				
			</div>
			<div class="flex flex-row flex-wrap relative rounded-t-2xl p-2 px-1 gap-3 w-full">
				{#each variantOptions[category] as option}
					<button onclick={()=>{selectedOptions[category] = option}} class="{selectedOptions[category]===option ? 'brightness-150' : '' }   bg-primary flex flex-row gap-1 h-8 items-center font-semibold text-xs text-primary-foreground  hover:bg-destructive justify-center min-w-16 w-fit p-2 px-3 rounded-3xl flex-shrink-0 transition-all duration-250 ease-in-out cursor-pointer">
						{option}
						{#if configuring}
							<X class="w-4 h-4 ml-1" />
						{/if}
					</button>
				{/each}
				{#if configuring}
					<form class="flex flex-row gap-1 bg-emerald-100/60 rounded-3xl" onsubmit={(form)=>{addOption(form, category)}}>
						<Input name="optionValue" class="min-w-20 w-fit h-8 p-2 px-3 rounded-3xl border-emerald-200 bg-emerald-50 flex-shrink-0 transition-all duration-250 ease-in-out " placeholder="Add an option" />
						<button class="px-2 rounded-3xl bg-emerald-200 text-black hover:brightness-75 transition-all" type="submit">
							<Plus size={20} strokeWidth={1.25} />
						</button>
					</form>
				{/if}
			</div>
		</div>
	{/each}
</div>
{#if configuring}
	<Input class="min-w-20 w-fit p-2 px-3 rounded-3xl border-emerald-200 bg-emerald-50 flex-shrink-0 transition-all duration-250 ease-in-out" placeholder="+ Add a category" />
{/if}