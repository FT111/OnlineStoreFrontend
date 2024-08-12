<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import { tick } from 'svelte';

	let value;
	export let title;
	export let subtitle;
	export let selectedValue;
	export let options = []

	let open = false;
	
	$: selectedValue =
		options.find((f) => f === value) ??
			`${title}`;


	function closeAndFocusTrigger(triggerId) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	
</script>

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
			<Command.Input placeholder="{subtitle}..." />
			<Command.Empty>No {title} found.</Command.Empty>
			<Command.Group>
				{#each options as option}
					<Command.Item
					  value={option}
					  onSelect={(currentValue) => {
              value = currentValue;
              closeAndFocusTrigger(ids.trigger);
            }}
					>
						{option}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>