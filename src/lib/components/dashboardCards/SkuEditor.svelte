
<script>
	export let sku;
</script>

<div class="flex flex-row p-2 flex-grow">
	<div class="basis-1/2 bg-slate-50">
		{sku}
		{#if sku}
			<div>
				<p>{sku.title}</p>
				<p>{sku.price}</p>

			</div>
		{/if}
	</div>
	
	<div class="basis-1/2">
	
	</div>

</div>