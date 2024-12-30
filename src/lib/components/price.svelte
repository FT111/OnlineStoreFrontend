
<script>
	

	let { class: className = undefined, price = $bindable(), discounted } = $props();
	price = price / 100;
	
	let priceInteger = Math.floor(price);
	let priceDecimal = (price - priceInteger).toFixed(2).slice(2);
</script>


{#key price}
	{#if discounted}
		<p class={"text-4xl font-bold text-amber-800 "}>£{priceInteger}<sup class="text-xl font-medium">{priceDecimal}</sup></p>
	{:else}
		<p class={"text-4xl font-bold"}>£{priceInteger}<sup class="text-xl font-medium">{priceDecimal}</sup> </p>
	{/if}
{/key}