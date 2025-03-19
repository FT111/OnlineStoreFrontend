<script>
	import Line from '$lib/components/sellerDashboard/charts/Line.svelte';
	import { onMount } from 'svelte';
	import { updateStreamData } from '$lib/api/streams.svelte.js';
	
	let viewData = $derived(updateStreamData.data.click?.events)
	
	$inspect(viewData)
	$inspect(updateStreamData)
	
	const options = {
		parsing: {
			xAxisKey: 'date',
			yAxisKey: 'count'
		}
	}
	
</script>

<!--{JSON.stringify(updateStreamData)}-->
<Line data={viewData} {options}
/>