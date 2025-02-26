<script>
	import Ellipsis from "lucide-svelte/icons/ellipsis";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Clipboard, ClipboardPlus } from 'lucide-svelte';
	import { goto, pushState } from '$app/navigation';

	let { id, recipient } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="w-min">
		{#snippet child({ props })}
			<Button
				{...props}
				variant="ghost"
				size="icon"
				class="relative size-8 p-0"
			>
				<span class="sr-only">Open actions</span>
				<Ellipsis />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
			<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
				<Clipboard size={16} class="mr-2" />
				Copy order ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={()=>{goto(`/users/${recipient.id}`)}}>View customer profile</DropdownMenu.Item>
		<DropdownMenu.Item onclick={()=>{pushState('', {
			selectedOrder: id,
			detailViewOpen: true,
			detailViewPage: 'Details'
		})}}>View order details</DropdownMenu.Item>
		<DropdownMenu.Item
		onclick={()=>{pushState('', {
			selectedOrder: id,
			detailViewOpen: true,
			detailViewPage: 'Products'
		})}}
		>View order products</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>