
<script>
	import { onMount } from 'svelte';
	import { createUpdateStream } from '$lib/api/streams.svelte.js';
	
	let { user } = $props();

	onMount(() => {
		if (user) {
			createUpdateStream(user.id);
		}
	});
</script>