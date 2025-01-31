
<script>
	

	let { class: className = undefined, price, discounted } = $props();
	
	let priceInteger = $derived(Math.floor(price/100));
	let priceDecimal = $derived((price/100 - priceInteger).toFixed(2).slice(2));
</script>


	{#if discounted}
		<p class={"text-4xl font-semibold text-amber-800 "}>£{priceInteger}<sup class="text-xl font-medium">{priceDecimal}</sup></p>
	{:else}
		<p class={"text-4xl font-semibold"}>£{priceInteger}<sup class="text-xl font-medium">{priceDecimal}</sup> </p>
	{/if}