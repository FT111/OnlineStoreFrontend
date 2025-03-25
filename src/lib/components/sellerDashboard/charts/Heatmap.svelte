<script>
	import SvelteHeatmap from 'svelte-heatmap';

	let { mapData } = $props();

	console.log(mapData);

	const mapDataTransformed = mapData.map((item) => {
		return {
			date: new Date(Date.parse(item.date)),
			value: item.count,
		};
	});

	console.log(JSON.stringify(mapDataTransformed));

	const heatmapRef = $state(null);

	const heatmap = new SvelteHeatmap({
		props: {
			data: mapDataTransformed,
		},
		target: heatmapRef,

	});


</script>

<div class="flex flex-row rounded-2xl col-span-3 row-span-1">
	<div let:this={heatmapRef} id="heatmap" class="w-full h-full"></div>
</div>

