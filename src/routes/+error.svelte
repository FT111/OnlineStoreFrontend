<script>
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import { PlugZap } from 'lucide-svelte';

	const headBack = () => {
		history.back();
	};
</script>

<div class="flex flex-col h-screen justify-center items-center gap-6">
	<h1 class="text-7xl font-medium flex flex-row gap-6">
		{#if page.status === 404}
			404 Not Found
		{:else}
			An error occurred
			<PlugZap size={44} strokeWidth={1} />
		{/if}
	</h1>

	<div class="flex flex-row gap-2.5 items-center">
		<Button onclick={headBack}>Head back</Button>
		<p>or</p>
		<Button variant="secondary" href="/">Go home</Button>
	</div>
</div>
