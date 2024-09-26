
<script>
	let className = undefined;
	export {className as class};

	export let price;
	export let discounted;
	price = price / 100;
	
	let priceInteger = Math.floor(price);
	let priceDecimal = (price - priceInteger).toFixed(2).slice(2);
</script>

{#if discounted}
	<p class={"text-4xl font-bold text-amber-800 "}>£{priceInteger}<sup class="text-xl font-medium">{priceDecimal}</sup></p>
{:else}
	<p class={"text-4xl font-bold"}>£{priceInteger}<sup class="text-xl font-medium">{priceDecimal}</sup> </p>
{/if}
