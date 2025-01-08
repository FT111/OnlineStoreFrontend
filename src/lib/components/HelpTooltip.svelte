<script>
	import * as Tooltip from '$lib/components/ui/tooltip';
		import { HelpCircle } from 'lucide-svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children, ...restProps } = $props();
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<HelpCircle size={18} strokeWidth={1.25} opacity="0.5" class={restProps.class} />
	</Tooltip.Trigger>
	<Tooltip.Content class="max-w-56">
		<p>{@render children?.()}</p>
	</Tooltip.Content>
</Tooltip.Root>