<script>
	import * as Tooltip from '$lib/components/ui/tooltip';
		import { HelpCircle } from 'lucide-svelte';
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<HelpCircle size={18} strokeWidth={1.25} opacity="0.5" />
	</Tooltip.Trigger>
	<Tooltip.Content class="max-w-56">
		<p><slot /></p>
	</Tooltip.Content>
</Tooltip.Root>