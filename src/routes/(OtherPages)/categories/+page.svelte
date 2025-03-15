
<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import MenuCard from '$lib/components/menuCard.svelte';
	
	let { data } = $props();
	let { categories } = data;
</script>

<div class="w-full h-fit flex flex-row justify-center">
	<div class="grid mt-16 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full md:w-2/3 h-fit pt-12 gap-6 p-4">
		{#each Object.values(categories) as category}
			<!--{JSON.stringify(category)}-->
				<MenuCard  altArrow={false} href={`/listings?category=${category.title}&showCategoryHeader=true`}
				style = "background-color: #{category.colour}99;" class=" saturate-150 brightness-150 text-white  !border-none w-full">
					{category.title}
					
				</MenuCard>
				
	<!--			<Card.Root class="h-56 w-full p-3.5 border-none  text-white hover:border-black hover:border-2 transition-all rounded-xl " style="background-color: #{category.colour};">-->
	<!--				<Card.Title>{category.title}</Card.Title>-->
	<!--				<Card.Content class="p-2">-->
	<!--					<Card.Description class="text-white">{category.description}</Card.Description>-->
	<!--				</Card.Content>-->
	<!--			</Card.Root>-->
			{/each}
	</div>
</div>
