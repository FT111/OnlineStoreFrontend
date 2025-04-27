
<script>
	

	let { class: className = undefined, price, discounted, small=false , strike=false} = $props();
	
	let priceInteger = $derived(Math.floor(price/100));
	let priceDecimal = $derived((price/100 - priceInteger).toFixed(2).slice(2));
	let smallClass = $derived(small ? "!text-base" : "");
	let smallDecimalClass = $derived(small ? "!text-xs" : "!text-base");
	let strikeClass = $derived(strike ? "line-through" : "");
</script>


	{#if discounted}
		<p class={`text-4xl font-semibold  text-amber-800 ${strikeClass} ${smallClass}`}>£{priceInteger}<sup class="{smallDecimalClass} !no-underline font-medium">{priceDecimal}</sup></p>
	{:else}
		<p class={`text-4xl font-semibold ${strikeClass} ${smallClass}`}>£{priceInteger}<sup class="{smallDecimalClass}  !no-underline font-medium">{priceDecimal}</sup> </p>
	{/if}