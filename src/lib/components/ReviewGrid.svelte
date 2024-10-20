
<script>
	import * as Avatar from '$lib/components/ui/avatar/index.js';

		export const reviews = [
			{
				"rating": 5,
				"review": "This is a great product. I love it. It's so good. I would recommend it to anyone.",
				"author": "John Doe",
				"date": "2022-01-01"
			},
			{
				"rating": 4,
				"review": "This is a decent product.",
				"author": "Jane Doe",
				"date": "2022-01-01"
			},
			{
				"rating": 3,
				"review": "This is a great product. I love it. It's so good. I would recommend it to anyone.",
				"author": "John Doe",
				"date": "2022-01-01"
			},
			{
				"rating": 2,
				"review": "This is a great product. I love it. It's so good. I would recommend it to anyone.",
				"author": "Jane Doe",
				"date": "2022-01-01"
			},
			{
				"rating": 1,
				"review": "This is not a great product.",
				"author": "John Doe",
				"date": "2022-01-01"
			},
			{
							"rating": 3,
							"review": "This is ok.",
							"author": "John Doe",
							"date": "2022-01-01"
			},
			{
				"rating": 2,
				"review": "This is a great product. I love it. It's so good. I would recommend it to anyone.",
				"author": "Jane Doe",
				"date": "2022-01-01"
			}
	]
</script>



<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
	{#each reviews as review}
		<div class="flex flex-col gap-3 p-5 bg-slate-100 rounded-xl overflow-y-scroll">
			<div class="flex flex-row justify-between items-center">
				<div>

					<p class="text-md font-semibold">{review.author}</p>
				
				</div>
				<p class="text-md font-light">{new Date(review.date).toLocaleDateString("en-GB")}</p>
			</div>
			<p class="text-md font-normal">{review.review}</p>

		</div>
	{/each}
	
	<div class="flex flex-col gap-3 p-5 bg-teal-700 border-2 cursor-pointer hover:border-accent hover:bg-teal-600 transition-all border-slate-200 rounded-xl items-center text-slate-50 align-middle justify-center">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>

	</div>
</div>