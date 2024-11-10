
<script>
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
</script>

<DashboardPageLayout>
	<h1 slot="title">Your listings</h1>
	
	<div slot="page" class="">
		<Table.Root>
			<Table.Caption>A list of your current listings.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Title</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Condition</Table.Head>
					<Table.Head># of Variants</Table.Head>
					<Table.Head>Views</Table.Head>
					<Table.Head>Sales</Table.Head>
					<Table.Head class="text-right">Revenue</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell class="font-medium">iPhone 15 Pro Max</Table.Cell>
					<Table.Cell>Public</Table.Cell>
					<Table.Cell>Like New</Table.Cell>
					<Table.Cell>3</Table.Cell>
					<Table.Cell>2437</Table.Cell>
					<Table.Cell>32</Table.Cell>
					<Table.Cell class="text-right">$760.00</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>	</div>
</DashboardPageLayout>