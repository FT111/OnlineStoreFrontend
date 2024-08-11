
<script>
	import { tick } from 'svelte';

		let isCollapsed = false;

	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Command from "$lib/components/ui/command/index.js";
	import {Button} from "$lib/components/ui/button/index.js";
	
	let value = "React";
	let selectedValue = "React";
		const categories = [
					{ label: 'Electronics', value: 'ELECTRONICS' },
		  			{ label: 'Clothing', value: 'CLOTHING' },
					{ label: 'Books', value: 'BOOKS' },
					{ label: 'Furniture', value: 'FURNITURE' },
					{ label: 'Gaming', value: 'GAMING' },
					{ label: 'Mobile Accessories', value: 'MOBILE' },
					{ label: 'Services', value: 'SERVICES' },
					{ label: 'Miscellaneous', value: 'MISCELLANEOUS' },

		];

		let open = false;

		$: selectedValue =
			categories.find((f) => f.value === value)?.label ??
			"Categories";

		// We want to refocus the trigger button when the user selects
		// an item from the list so users can continue navigating the
		// rest of the form with the keyboard.
		function closeAndFocusTrigger(triggerId) {
			open = false;
			tick().then(() => {
				document.getElementById(triggerId)?.focus();
			});
		}
</script>

<div class="h-screen sticky top-0 p-4 w-56 flex-none bg-slate-100 border-r border-r-slate-200">
	<div class="flex flex-col h-full">
		
		
		<Popover.Root bind:open let:ids>
			<Popover.Trigger asChild let:builder>
				<Button
				  builders={[builder]}
				  variant="outline"
				  role="combobox"
				  aria-expanded={open}
				  class="w-[200px] justify-between"
				>
					{selectedValue}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
					</svg>
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input placeholder="Select a category..." />
					<Command.Empty>No category found.</Command.Empty>
					<Command.Group>
						{#each categories as category}
							<Command.Item
							  value={category.value}
							  onSelect={(currentValue) => {
              value = currentValue;
              closeAndFocusTrigger(ids.trigger);
            }}
							>
								{category.label}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</div>
</div>