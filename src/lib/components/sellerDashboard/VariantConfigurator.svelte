
<script>
	import { run } from 'svelte/legacy';
	import { goto, pushState, replaceState } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { page } from '$app/state';
		import { Input } from '$lib/components/ui/input/index.js';
		import { Cross, Plus, Trash2, X } from 'lucide-svelte';
		import { Button } from '$lib/components/ui/button/index.js';
	import {fly} from 'svelte/transition';
	import {backOut} from 'svelte/easing';
	import { browser } from '$app/environment';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';


	let { variantOptions = $bindable({}), selectedOptions = $bindable({}),
		skus = {},
		selectedProduct = $bindable({}),
		validation = true,
		defaultOptions = false,
		onSelectCallback = () => {},
		configuring = false } = $props();

	let lastSelectedCategory = $state(Object.keys(variantOptions)[0]);
	let currentAvailableOptions = $state(variantOptions);
	// Select the first option in each category by default
	if (!configuring && validation) {
		if (variantOptions) {
			for (let category in variantOptions) {
				selectedOptions[category] = variantOptions[category][0];
			}
		}
	}
	
	const determineSelectableOptions = () => {
		currentAvailableOptions = {};
		for (let category in variantOptions) {
			if (category === lastSelectedCategory) {
				currentAvailableOptions[category] = variantOptions[category];
				continue;
			}
			currentAvailableOptions[category] = variantOptions[category].filter((opt) => {
				let newOptions = {...selectedOptions};
				newOptions[category] = opt;
				return selectSKUFromSelectedOptions(newOptions).title !== 'None';
			});
			
		}}
	
	const selectSKUFromSelectedOptions = (selectedOptions) => {
		let matchedProduct = {title: 'None'};
		skus.forEach((sku) => {
			let match = true;
			
			// Check for default options, where custom options have not been set. it matches by SKU title
			if (defaultOptions) {
				if (sku.title !== selectedOptions['Styles']) {
					match = false;
				}
			} else {
				// Check for selected options, matching by category and value
				for (let category in selectedOptions) {
					if (sku.options[category] !== selectedOptions[category] ) {
						match = false;
					}
				}
			}
			if (match) {
				matchedProduct = sku;
			}
		});
		
		return matchedProduct;
	};
	
	const findSelectableOptionsWithSpecificOption = (category, option) => {
		"Return the first options that return a valid SKU, containing this category option"
		let sku = Array.from(skus).reduce((acc, sku) => {
			if (sku.options[category] === option) {
				acc.push(sku);
			}
			return acc;
		}, []);
		
		if (sku[0]) {
			selectedOptions = sku[0].options;
		}
	};
	
	
	const onSelect = (category, option) => {
		"Selects the option for the category and updates the available options" +
		"Runs as a handler when the user selects an option"
		selectedOptions[category] = option;
		onSelectCallback(selectedOptions);
		
		if (!configuring && validation) {
			lastSelectedCategory = category;
			selectedProduct = selectSKUFromSelectedOptions(selectedOptions);
			determineSelectableOptions();
			if (selectedProduct.title === 'None') {
				findSelectableOptionsWithSpecificOption(category, option);
				onSelect(category, option);
			}
		}
		
		if (validation) {
			goto(page.url.pathname+'?selected='+selectedProduct.id, {replaceState: true});
		}
	}

	if (!configuring && validation) {
		selectedProduct = selectSKUFromSelectedOptions(selectedOptions);
		determineSelectableOptions();
	}
	
	
	const addOption = (form, category) => {
		form.preventDefault();
		const formData = new FormData(form.target);
		variantOptions[category].push(formData.get('optionValue'));
		form.target.reset();
	};
	
	const removeOption = (category, option) => {
		variantOptions[category] = variantOptions[category].filter((opt) => opt !== option);
	};
	
	const addCategory = (form) => {
		form.preventDefault();
		const formData = new FormData(form.target);
		variantOptions[formData.get('categoryValue')] = [];
		form.target.reset();
		
	};
	
	const removeCategory = (category) => {
		delete variantOptions[category];
	};
	
	$inspect(selectedProduct);
	
	onMount(() => {
		// If editing, return
		if (!validation) {
			return;
		}

		// Check if the page has a selected SKU in the URL
		// Lets the user share a link to a specific product configuration, or navigate back to a previous configuration
		if (page.url.searchParams.has('selected')) {
			if (defaultOptions) {
				// If the product has default options, it sets the options manually
				selectedProduct = Array.from(skus).find((sku) => sku.id === page.url.searchParams.get('selected'));
				selectedOptions = { 'Styles': selectedProduct.title };

			} else {
				// If the product has selectable options, it sets the options based on the selected SKU's options
				selectedOptions = (Array.from(skus).find((sku) => sku.id === page.url.searchParams.get('selected')))?.options;
				selectedProduct = selectSKUFromSelectedOptions(selectedOptions);
				determineSelectableOptions();
			}
		} else {
// If no SKU is selected, set the cheapest SKU as the selected product
			const cheapestSKU = Array.from(skus).reduce((cheapest, sku) => {
				return !cheapest || sku.price < cheapest.price ? sku : cheapest;
			}, null);

			if (cheapestSKU) {
				selectedProduct = cheapestSKU;
				if (defaultOptions) {
					selectedOptions = { 'Styles': selectedProduct.title };
				} else {
					selectedOptions = cheapestSKU.options;
				}
				determineSelectableOptions();
			}
		}
	}
	);

	
	
</script>

{#if (!configuring || Object.keys(variantOptions).length > 0)}
<div class="flex flex-col bg-muted rounded-2xl  w-full border-4 border-slate-200 overflow-clip">
	
	{#each Object.keys(variantOptions) as category}
		<div in:fly={{y:50}} class="flex flex-col bg-slate-50 p-2 px-4 border-b-2 border-slate-200">
			<div class="flex flex-row gap-1 items-center">
				{#if configuring}
					<Button class="px-2" variant={"ghost"} onclick={()=>{removeCategory(category)}}>
						<Trash2 size={20} strokeWidth={1.25} />
					</Button>
					<Input  class="font-semibold text-lg bg-none border-none w-fit" placeholder={category} value={category} />
				{:else}
					<p class="font-semibold text-lg">{category}</p>
				{/if}
				
			</div>
			<div class="flex flex-row flex-wrap relative rounded-t-2xl p-2 px-1 gap-2 w-full">
				{#each variantOptions[category] as option (option)}
					<button animate:flip={{duration: 150}} in:fly={{x:-100, duration: 150, z:0}} out:fly={{x:-100, duration: 150, z: 0}} onclick={()=>{configuring ? removeOption(category, option) : onSelect(category, option)}} class="{selectedOptions[category]===option ? ' !bg-accent border-amber-900 ' : '' }
					{currentAvailableOptions[category].includes(option)||!validation ? '' : ' disabled !hover:bg-primary/60 !bg-primary/60 !cursor-default  '}
					 bg-primary flex flex-row z-10 gap-1 h-8 items-center font-semibold text-xs text-primary-foreground border-2 border-transparent outline-none hover:bg-destructive justify-center min-w-16 w-fit p-2 px-3 rounded-3xl flex-shrink-0 transition-all duration-250 ease-in-out cursor-pointer">
						{option}
						{#if configuring}
							<X class="w-4 h-4 ml-1" />
						{/if}
					</button>
				{/each}
				{#if configuring}
					<form class="flex flex-row gap-1 bg-emerald-100/60 rounded-3xl" onsubmit={(form)=>{addOption(form, category)}}>
						<Input minlength="1" name="optionValue" class="min-w-20 w-fit h-8 p-2 px-3 rounded-3xl border-emerald-200 bg-emerald-50 flex-shrink-0 transition-all duration-250 ease-in-out " placeholder="Add an option" />
						<button class="px-2 rounded-3xl bg-emerald-200 text-black hover:brightness-75 transition-all" type="submit">
							<Plus size={20} strokeWidth={1.25} />
						</button>
					</form>
				{/if}
			</div>
		</div>
	{/each}
	{#if !configuring && validation}
		<p class="py-1 px-3.5"><span class="font-medium">Selected style</span>: {selectedProduct.title}</p>
		{/if}
</div>
	{/if}
{#if configuring}
	<form class="flex flex-row gap-1 w-fit bg-emerald-50 border-emerald-200 border border-1 rounded-3xl" onsubmit={(form)=>{addCategory(form)}}>
		<label class="sr-only" for="categoryValue">Add an option category</label>
		<input type="text" min="1" minlength="1" required name="categoryValue" class="min-w-32 text-sm rounded-r-none w-48 h-10 p-2 px-3 rounded-3xl bg-emerald-50  border-none flex-shrink-0 transition-all duration-250 ease-in-out " placeholder="Add an option category" />
		<button class="flex flex-row px-2 rounded-r-3xl bg-emerald-200 text-black items-center justify-center hover:brightness-75 transition-all size-10" type="submit">
			<Plus size={20} strokeWidth={1.25} />
		</button>
	</form>
{/if}