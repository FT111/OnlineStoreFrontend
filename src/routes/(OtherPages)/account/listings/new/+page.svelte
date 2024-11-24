
<script>
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
		import { Input } from '$lib/components/ui/input/index.js';
</script>

<DashboardPageLayout>
	<h1 slot="title">New Listing</h1>
	
	<div slot="page" class="h-full grow" >
		<div class="flex flex-col flex-1 p-1 h-full w-full items-center justify-center">
			<Card.Root class="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 ">
				<Card.Header>
					<h2 class="text-2xl font-semibold">Create a new listing</h2>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="flex flex-col gap-2">
							<Input label="Title" placeholder="Enter a title for your listing" />
							<Input label="Description" placeholder="Enter a description for your listing" />
						</div>
						
						
					</form>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</DashboardPageLayout>