
<script>
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
		import { Input } from '$lib/components/ui/input/index.js';
		import Dropdown from '$lib/components/dropdown.svelte';
		import { fetchCategories, fetchCategory } from '$lib/api/categories.js';
		import { Button } from '$lib/components/ui/button/index.js';
		import { newListing } from '$lib/api/listings.js';
		import { ArrowBigRight, ArrowRight, LucidePanelRight } from 'lucide-svelte';


		let selectedCategory;
		let selectedSubcategory;
		let selectedTitle;
		let selectedDesc;
		
		$: formData = {
			title: selectedTitle,
			description: selectedDesc,
			category: selectedCategory,
			subCategory: selectedSubcategory
		}
</script>

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
					<form on:submit={()=>{newListing(formData)}}>
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
									{#key selectedCategory}
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
							
							<button type="submit">
								<Button class="text-md gap-0.5 hover:gap-2 transition-all origin-left w-32 ease-[cubic-bezier(0.64, 0.57, 0.67, 1.53)]" variant="default" size="lg">Next <ArrowRight /></Button>
							
							</button>
						</div>
						
					</form>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</DashboardPageLayout>