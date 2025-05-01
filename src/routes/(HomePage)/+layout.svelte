
<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	import Footer from '$lib/components/Footer.svelte';

	/** @type {Props} */
	let { children } = $props();

</script>



{@render children?.()}
