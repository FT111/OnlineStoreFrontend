
<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import MenuCard from '$lib/components/menuCard.svelte';
	
	let { data } = $props();
	let { categories } = data;
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 mt-16 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 w-full h-fit gap-6 p-4">
	{#each Object.values(categories) as category}
		<!--{JSON.stringify(category)}-->
			<MenuCard altArrow={false} href={`/listings?category=${category.title}&showCategoryHeader=true`}
			style = "border-color: #{category.colour};" class="border-opacity-10">
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