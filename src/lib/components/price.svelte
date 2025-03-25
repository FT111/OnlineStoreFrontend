
<script>
	

	let { class: className = undefined, price, discounted, small=false } = $props();
	
	let priceInteger = $derived(Math.floor(price/100));
	let priceDecimal = $derived((price/100 - priceInteger).toFixed(2).slice(2));
	let smallClass = $derived(small ? "!text-base" : "");
	let smallDecimalClass = $derived(small ? "!text-xs" : "!text-base");
</script>


	{#if discounted}
		<p class={`text-4xl font-semibold  text-amber-800 ${smallClass}`}>£{priceInteger}<sup class="{smallDecimalClass} font-medium">{priceDecimal}</sup></p>
	{:else}
		<p class={`text-4xl font-semibold ${smallClass}`}>£{priceInteger}<sup class="{smallDecimalClass} font-medium">{priceDecimal}</sup> </p>
	{/if}