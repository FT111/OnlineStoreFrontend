
<script>
import Dropdown from '$lib/components/dropdown.svelte'

let isCollapsed = false;


</script>

<div class="h-screen sticky top-0 p-4 w-56 flex-none bg-slate-100 border-r border-r-slate-200">
	<div class="flex flex-col h-full gap-2">
		
		<slot />
	</div>
</div>