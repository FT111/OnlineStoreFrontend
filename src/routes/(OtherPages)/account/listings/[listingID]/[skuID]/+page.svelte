
<script>
  	import { page } from '$app/stores';
	import SkuEditor from '$lib/components/dashboardCards/SkuEditor.svelte';
	export let data;
	
</script>

{#key data.selectedSKU.id}
	<SkuEditor bind:sku={data.selectedSKU}  />
{/key}
