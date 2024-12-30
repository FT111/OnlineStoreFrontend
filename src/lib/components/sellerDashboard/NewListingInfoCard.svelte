<script>
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [current]
	 * @property {boolean} [optional]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props & { [key: string]: any }} */
	let { current = false, optional = false, children, ...rest } = $props();
</script>

<div class="flex flex-col justify-between gap-1 p-4 w-48 h-44 rounded-2xl
bg-green-100 {optional ? '!bg-slate-100' : ''}
border {current ? 'border-2 border-slate-800' : 'border-1 border-emerald-100'}" {...rest}>
	{@render children?.()}

</div>