<script>
	import Line from '$lib/components/sellerDashboard/charts/Line.svelte';
	import { onMount } from 'svelte';
	import { updateStreamData } from '$lib/api/streams.svelte.js';

	let { chartData } = $props();

	// let chartData = $derived(updateStreamData.data[property]?.events)

	$inspect(chartData)
	$inspect(updateStreamData)

	const options = {
		parsing: {
			xAxisKey: 'date',
			yAxisKey: 'count'
		}
	}

</script>

<!--{JSON.stringify(updateStreamData)}-->
{#if chartData?.length > 2}
	<Line data={chartData} {options} />
{:else}
	<div class="flex flex-row size-full h-full items-center justify-center">
		<p class="text-xs text-muted-foreground">Not enough data yet</p>
	</div>
{/if}
