
<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	
	let { data, ctx=$bindable(), chart= $bindable(), options={}, ...restProps } = $props();
	
	let chartObject;

	chart = (ctx, data) => {
		function setupChart(_data) {
			chartObject = new Chart(ctx, {
				type: 'line',
				data: {
					datasets: [{
						label: 'Value',
						data: data || [12, 19, 3, 5, 2, 3],
						fill: '#aaaafa',
						cubicInterpolationMode: 'default',
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(200, 132, 1)',
						],
						borderWidth: 1.5,
					}]
				},
				options: {
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							enabled: true
						},
						title: {
							display: false
						}
					},
					scales: {
						x: {
							display: false,
							grid: {
								display: false
							}
						},
						y: {
							display: false,
							grid: {
								display: false
							}
						}
					},
					elements: {
						point: {
							radius: 0.5
						},
						line: {
							tension: 0.4,
							width: 2,
						}
					},
					layout: {
						padding: 0
					},
					devicePixelRatio: window.devicePixelRatio,
					animation: false,
					responsive: true,
					maintainAspectRatio: true,
					backgroundColor: 'transparent',
					...options
				}
			});
		}
		
		setupChart(data)
		return {
			update(data) {
				chartObject.destroy();
				setupChart(data);
			},
			destroy() {
				chartObject.destroy();
			}
		}
	}
	
	
</script>

<div {...restProps}>
	<canvas bind:this={ctx}
	width="800" height="400"
					use:chart={$state.snapshot(data)}
	></canvas>
</div>