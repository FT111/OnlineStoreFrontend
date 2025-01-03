
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


<div class="flex flex-col bg-muted rounded-2xl overflow-x-scroll w-full border-4 border-slate-200">
	
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
			<div class="flex flex-row relative rounded-t-2xl p-2 px-1 overflow-x-scroll gap-3 w-full">
				{#each variantOptions[category] as option}
					<button onclick={()=>{selectedOptions[category] = option}} class="{selectedOptions[category]===option ? 'brightness-150' : '' }   bg-primary flex flex-row gap-1 items-center font-semibold text-xs text-primary-foreground  hover:bg-destructive justify-center min-w-16 w-fit p-2 px-3 rounded-3xl flex-shrink-0 transition-all duration-250 ease-in-out cursor-pointer">
						{option}
						{#if configuring}
							<X class="w-4 h-4 ml-1" />
						{/if}
					</button>
				{/each}
				{#if configuring}
					<form class="flex flex-row gap-1" onsubmit={(form)=>{addOption(form, category)}}>
						<Input name="optionValue" class="min-w-20 w-fit p-2 px-3 rounded-3xl border-emerald-200 bg-emerald-50 flex-shrink-0 transition-all duration-250 ease-in-out " placeholder="+ Add an option" />
						<Button class="px-2" variant={"ghost"} type="button" submit>
							<Plus size={20} strokeWidth={1.25} />
						</Button>
					</form>
				{/if}
			</div>
		</div>
	{/each}
</div>
{#if configuring}
	<Input class="min-w-20 w-fit p-2 px-3 rounded-3xl border-emerald-200 bg-emerald-50 flex-shrink-0 transition-all duration-250 ease-in-out" placeholder="+ Add a category" />
{/if}