<script>
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { tick } from 'svelte';

	
	let {
		value = $bindable(undefined),
		title,
		subtitle,
		options = [],
		clickAction = () => {},
		class: className = '',
	} = $props();


	let open = $state(false);
	let triggerRef = $state(null)

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}

	
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				{...props}
				role="combobox"
				aria-expanded={open}
				class={`w-full justify-between text-ellipsis hover:bg-secondary hover:text-secondary-foreground basis-full ${className}`}
				>
					{#if value !== undefined && value !== null}
						{value}
					{:else}
						{title}
					{/if}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
					</svg>
				</Button>
						{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-[210px] p-0">
			<Command.Root>
				<Command.Input placeholder="{subtitle}..." />
				<Command.Empty>No {title} found.</Command.Empty>
				<Command.Group>
					{#each options as option}
						<Command.Item
						  class="aria-selected:text-white transition-all duration-100"
						  value={option}
						  onSelect={(currentValue) => {
								  value = currentValue;
									clickAction();
								  closeAndFocusTrigger();
	            }}
						>
							{option}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
</Popover.Root>