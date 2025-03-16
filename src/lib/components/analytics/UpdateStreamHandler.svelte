
<script>
	import { onMount } from 'svelte';
	import { createUpdateStream, UpdateSteam, updateStreamFactory } from '$lib/api/streams.svelte.js';
	
	let { user } = $props();

	onMount(() => {
		if (user) {
			updateStreamFactory(user.id);
		}
	});
</script>