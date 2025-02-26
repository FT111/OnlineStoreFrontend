
<script>
	import { onMount } from 'svelte';
	import Chart from 'svelte-frappe-charts';

	import { Card } from '$lib/components/ui/card/index.js';

	let data = $state({
		labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
		datasets: [
			{
				values: [10, 12, 3, 9, 8, 13, 9]
			}
		]
	});

	let date = new Date();
	date.setFullYear(date.getFullYear() - 1);
	let heatData = {
		labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
		discreteDomains:0,
		dataPoints: {
			1426744959: 20,
			1720203082: 113,
			1710203082: 57,
		},
		start: date,
		end: new Date(),

	};

	let chart = $state();

	onMount(() => {
		const dashEvents = new EventSource('http://127.0.0.1:8000/count');

		dashEvents.addEventListener('count', function(event) {
			data.datasets[0].values = [5].concat(JSON.parse(event.data));
		});
	});


</script>

<div class="w-full flex flex-row flex-wrap gap-6 p-6 ">
	<Card class="w-1/2 p-3 bg">
			<Chart animate=True data={data} type="line" bind:this={chart} lineOptions={{regionFill: 0, hideDots: 1, heatline: 1, spline: 0}} />
	</Card>

	<Card class="p-3">
			<h1 class="text-7xl font-bold text-center">{data.datasets[0].values}</h1>
	</Card>

	<Card class="w-1/2 p-3 bg">
		<Chart animate=True data={data} type="bar" bind:this={chart} lineOptions={{regionFill: 0, hideDots: 1, heatline: 1, spline: 0}} />
	</Card>

	<Card class="w-fit p-3 bg">
		<Chart animate=True data={heatData} type="heatmap" bind:this={chart} lineOptions={{discreteDomains: 0}} />
	</Card>

</div>



