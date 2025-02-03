<script>
	import * as Tooltip from '$lib/components/ui/tooltip';
		import { HelpCircle } from 'lucide-svelte';

	let { children, ...restProps } = $props();
</script>

	<Tooltip.Provider>
<Tooltip.Root>
		<Tooltip.Trigger>
			<HelpCircle size={18} strokeWidth={1.25} opacity="0.5" class={restProps.class} />
		</Tooltip.Trigger>
		<Tooltip.Content class="max-w-56">
			<p>{@render children?.()}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>