
<script>
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
		import { Input } from '$lib/components/ui/input/index.js';
		import Dropdown from '$lib/components/dropdown.svelte';
		import DropdownWithLabel from '$lib/components/DropdownWithLabel.svelte';
		import { fetchCategories, fetchCategory } from '$lib/api/categories.js';
		import { Button } from '$lib/components/ui/button/index.js';
		import { newListing, fetchConditions } from '$lib/api/listings.js';
		import {
					ArrowBigRight,
					ArrowRight,
					Cross,
					LoaderIcon,
					Check,
					Loader,
					Info,
					ArrowDown,
					ArrowLeft
				} from 'lucide-svelte';
		import { goto } from '$app/navigation';
		import {fly, fade} from 'svelte/transition';
		import { backInOut } from 'svelte/easing';
		import StateButton from '$lib/components/StateButton.svelte';
		import NewListingInfoCard from '$lib/components/sellerDashboard/NewListingInfoCard.svelte';
		import { Textarea } from '$lib/components/ui/textarea/index.js';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { toast } from 'svelte-sonner';

		let formState = 'default';

		let selectedCategory = $state();
		let selectedSubcategory = $state();
		let selectedTitle = $state();
		let selectedDesc = $state();
	let selectedCondition = $state();
		
		let submitFunc = $state();
		
		let formData = $derived({
			title: selectedTitle,
			description: selectedDesc,
			category: selectedCategory,
			subCategory: selectedSubcategory,
			condition: selectedCondition
		})

	const handleGetCategories = async () => {
		const data = await fetchCategories();
		selectedCategory = data.data[0].title;

		return data;
	}

	const handleChangeCategory = async () => {
			const data = await fetchCategory(selectedCategory)
		console.log(data);
			selectedSubcategory = data.data.subCategories[0].title;

			return data;
	}
		
		const newListingSubmission = async () => {
			if (!selectedTitle || !selectedCategory || !selectedSubcategory || !selectedCondition) {
				toast.error('Please fill in all fields');

				throw new Error('Please fill in all fields');
			}

		  	formState = 'loading';
			await newListing(formData).then((data) => {
				console.log(data);
				if (data.data) {
					formState = 'success';

					setTimeout(() => {
						goto(`/sales/listings/${data.data.id}`);
					}, 1000);
				}
			}).catch((error) => {
				console.log(error);
				formState = 'error';
			})
		}
		
</script>


<DashboardPageLayout>
	{#snippet title()}
		<h1 >New Listing</h1>
	{/snippet}
	
	{#snippet page()}
		<div  class="h-full grow" >
			<div class="flex lg:flex-row flex-col px-10 flex-1 p-1 gap-4 h-full w-full items-center justify-evenly">
				<Card.Root class="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 basis-2/3 border-0 shadow-none">
					<Card.Header>
						<h2 class="text-2xl font-semibold">Create a new listing</h2>
						<p class="font-light text-slate-600">Add some basic information about your product. Pricing and images will be added at a later stage.</p>
					</Card.Header>
					<Card.Content>
	<!--					-->
						<form onsubmit={(event) => {submitFunc(event)}}>
							<div class="flex flex-col gap-3.5 items-end">
								<div class="flex flex-row gap-3.5 w-full items-end">
									<InputWithLabel required bind:value={selectedTitle} maxlength="40" minlength="1" label="Title" placeholder="What are you selling?">Title</InputWithLabel>
									
									<div class="w-52">
										{#await fetchConditions()}
										<DropdownWithLabel class="w-52 text-ellipsis" required title="What condition is it in?">Condition</DropdownWithLabel>
										{:then conditions}
										<DropdownWithLabel class="w-52 text-ellipsis" required options={conditions.data} title="What condition is it in?"
										bind:value={selectedCondition}>Condition</DropdownWithLabel>
										{:catch error}
										<p>{error.message}</p>
										{/await}
									</div>
									
								</div>
								<Textarea bind:value={selectedDesc} maxlength="100" class="h-48 text-wrap"  label="Description" placeholder="Describe your listing — Make sure to include keywords to appear in search results" />
								
								<div class="flex flex-row gap-3.5 w-full">
									<div class="basis-1/2">
										{#await handleGetCategories()}
										<Dropdown required title="Category" />
									{:then categories}
										<Dropdown required options={categories.data.map(category => {return category.title})} title="Category" bind:value={selectedCategory}
										subtitle="Find a category"/>
									{:catch error}
										<p>{error.message}</p>
									{/await}
									</div>
									
									<div class="basis-1/2">
										{#if selectedCategory}
										{#key formData.category}
											{#await handleChangeCategory()}
												<Dropdown required title="Subcategory" />
											{:then categoryData}
												<Dropdown required options={categoryData.data.subCategories.map(subcategory => {return subcategory.title})} title="Subcategory"
												subtitle="Search for a subcategory" bind:value={selectedSubcategory}/>
											{:catch error}
												<p>{error.message}</p>
											{/await}
										{/key}
									{/if}
									</div>
								</div>
								
								<div class="w-28 text-md">
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
				
				<div class="basis-1/3 min-w-60 flex flex-row justify-end items-center">
					<div class="flex flex-wrap flex-col gap-1.5 items-center justify-end bg-neutral-50 rounded-2xl w-fit p-3.5">
<!--						<div class="flex flex-row gap-1.5 items-center">-->
							<NewListingInfoCard current={true}>
								Create a base listing
								
								<p class="text-sm text-slate-600 font-light text-pretty">This should summarise its product(s), giving a quick overview</p>
							</NewListingInfoCard>
							<ArrowDown />
							
							<NewListingInfoCard>
								Add a product
								
								<p class="text-sm text-slate-600 font-light text-pretty">This is where you decide on a price and upload images of your product.</p>
							</NewListingInfoCard>
<!--						</div>-->
						
<!--						<div class="flex flex-row justify-evenly w-full gap-6">-->
							<ArrowDown />

						<NewListingInfoCard optional={true}>
							<div class="-mt-1.5">
								<p class="text-xs text-emerald-600 flex flex-row gap-1 items-center"> <Info class="size-3.5" /> Optional</p>
								Add product variation(s)
							</div>

							<p class="text-sm text-slate-600 font-light text-pretty">You can add multiple products to a single listing, and let the user pick from a set of options</p>
						</NewListingInfoCard>
						<ArrowDown />
						<NewListingInfoCard >
									Review and publish
							<p class="text-sm text-slate-600 font-light text-pretty">Check your listing and publish it to the marketplace by setting it public</p>
						</NewListingInfoCard>

					</div>
				</div>
			</div>
		</div>
	{/snippet}
</DashboardPageLayout>