
<script>
	import Image from '$lib/components/image.svelte'

</script>

<!--Page Container-->
<div class="mt-16 md:px-8 px-1">
	<!-- Listing Container	-->
	<div class="md:p-14 p-1 w-full flex flex-col h-[70vh]">
		<div class="flex flex-col gap-4 w-full">
			<h2 class="font-bold text-6xl">Listing Title</h2>
			
			<!-- Image and listing description container -->
			<div class="flex flex-row">
				<div class="flex flex-row basis-3/5 gap-2">
					<!-- Main Image -->
					<Image src="https://via.placeholder.com/1000" alt="Listing Image" class="h-full basis-3/5" />
						<!-- Image Gallery -->
						<div class="flex flex-col gap-2 basis-2/5">
							<Image src="https://via.placeholder.com/1000" alt="Listing Image" class="basis-1/3" />
							<Image src="https://via.placeholder.com/1000" alt="Listing Image" class="basis-1/3" />
							<Image src="https://via.placeholder.com/1000" alt="Listing Image" class="basis-1/3" />
						</div>
				</div>
				
				<div class="mx-4 p-4 bg-muted rounded-lg grow basis-2/5">
					<p class="text-2xl font-light">Listing Description</p>
				</div>
				
			</div>
			
		
		</div>
		
	</div>
</div>