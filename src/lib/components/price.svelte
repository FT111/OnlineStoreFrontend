
<script>
	export let price;
	price = price / 100;
	
	let priceInteger = Math.floor(price);
	let priceDecimal = (price - priceInteger).toFixed(2).slice(2);
</script>

<p class="text-4xl font-bold">£{priceInteger}<sup class="text-xl font-medium">{priceDecimal}</sup> </p>