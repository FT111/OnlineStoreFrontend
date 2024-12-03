
<script>
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
		import { Input } from '$lib/components/ui/input/index.js';
		import Dropdown from '$lib/components/dropdown.svelte';
		import { fetchCategories, fetchCategory } from '$lib/api/categories.js';
		import { Button } from '$lib/components/ui/button/index.js';
		import { newListing } from '$lib/api/listings.js';
		import { ArrowBigRight, ArrowRight, Cross, LoaderIcon, Check, Loader } from 'lucide-svelte';
		import { goto } from '$app/navigation';
		import {fly, fade} from 'svelte/transition';
		import { backInOut } from 'svelte/easing';
		import StateButton from '$lib/components/StateButton.svelte';
	
		let formState = 'default';

		let selectedCategory;
		let selectedSubcategory;
		let selectedTitle;
		let selectedDesc;
		
		let submitFunc;
		
		$: formData = {
			title: selectedTitle,
			description: selectedDesc,
			category: selectedCategory,
			subCategory: selectedSubcategory
		}
		
		
		const newListingSubmission = async () => {
		  	formState = 'loading';
			await newListing(formData).then((data) => {
				console.log(data);
				if (data.data) {
					formState = 'success';

					setTimeout(() => {
						goto(`/account/listings/${data.data.id}`);
					}, 1000);
				}
			}).catch((error) => {
				console.log(error);
				formState = 'error';
			})
		}
		
</script>

<style>
    .buttonState {
        grid-column: 1;
        grid-row: 1;
    }
</style>


<DashboardPageLayout>
	<h1 slot="title">New Listing</h1>
	
	<div slot="page" class="h-full grow" >
		<div class="flex flex-col flex-1 p-1 h-full w-full items-center justify-center">
			<Card.Root class="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 ">
				<Card.Header>
					<h2 class="text-2xl font-semibold">Create a new listing</h2>
					<p class="font-light text-slate-600">Add some basic information about your product. Pricing and images will be added at a later stage.</p>
				</Card.Header>
				<Card.Content>
<!--					-->
					<form on:submit={(event) => {submitFunc(event)}}>
						<div class="flex flex-col gap-3.5 items-end">
							<Input bind:value={selectedTitle} label="Title" placeholder="Enter a title for your listing" />
							<Input bind:value={selectedDesc}  label="Description" placeholder="Enter a description for your listing" />
							
							<div class="flex flex-row gap-3.5 w-full">
								<div class="basis-1/2">
									{#await fetchCategories()}
									<Dropdown title="Category" />
								{:then categories}
									<Dropdown options={categories.data.map(category => {return category.title})} title="Category" bind:value={selectedCategory}
									subtitle="Find a category"/>
								{:catch error}
									<p>{error.message}</p>
								{/await}
								</div>
								
								<div class="basis-1/2">
								{#if selectedCategory}
									{#key formData.subCategory}
										{#await fetchCategory(selectedCategory)}
											<Dropdown title="Subcategory" />
										{:then categoryData}
											<Dropdown options={categoryData.data.subCategories.map(subcategory => {return subcategory.title})} title="Subcategory"
											subtitle="Search for a subcategory" bind:value={selectedSubcategory}/>
										{:catch error}
											<p>{error.message}</p>
										{/await}
									{/key}
								{/if}
								</div>
							</div>
							
<!--							<button type="submit">-->
<!--								<Button class="grid grid-cols-1 grid-rows-1 text-md gap-0.5 hover:gap-2 transition-all origin-left w-32 ease-[cubic-bezier(0.64, 0.57, 0.67, 1.53)]-->
<!--												${formState==='success'? ' bg-emerald-700 ': formState==='loading' ? 'bg-slate-600':''}" variant="default" size="lg">-->
<!--									{#if formState === 'default'}-->
<!--										<div in:fly={{y:-20, easing: backInOut, duration: 700}} class="buttonState flex flex-row gap-0.5 hover:gap-2 transition-all origin-left w-32 ease-[cubic-bezier(0.64, 0.57, 0.67, 1.53)]">-->
<!--											Next <ArrowRight />-->
<!--										</div>-->
<!--									{:else if formState === 'loading'}-->
<!--										<div class="buttonState flex flex-row gap-0.5" in:fade={{duration: 700}} out:fly={{y:-20, easing: backInOut, duration: 700}}>-->
<!--											Submitting <Loader class="animate-spin" />-->
<!--										</div>-->
<!--									{:else if formState === 'success'}-->
<!--										<div in:fly={{ y: 20, easing: backInOut, duration: 700 }} out:fly={{ y: 20, easing: backInOut, duration: 700 }} class="buttonState flex flex-row gap-0.5" >-->
<!--											Success <Check />-->
<!--										</div>-->
<!--									{:else if formState === 'error'}-->
<!--										<div in:fly={{ y: 20, easing: backInOut, duration: 700 }} out:fly={{ y: 20, easing: backInOut, duration: 700 }} class="buttonState flex flex-row gap-0.5">-->
<!--											Error <Cross />-->
<!--										</div>-->
<!--									{/if}-->
<!--								</Button>-->
							
							<div class="w-24 text-md">
								<StateButton text={false} authFunction={newListingSubmission} bind:onPress={submitFunc}>
									<div class="flex flex-row gap-0.5 hover:gap-2 transition-all origin-left ease-[cubic-bezier(0.64, 0.57, 0.67, 1.53)] flex flex-row gap-0.5 hover:gap-3 transition-all justify-between w-full">
										<p out:fly={{y:-20, easing: backInOut, duration: 700}}>Next</p>
										<svg out:fly={{y:-20, easing: backInOut, duration: 700}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
											<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
										</svg>
									
									</div>
								</StateButton>
							</div>
							
						</div>
						
					</form>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</DashboardPageLayout>