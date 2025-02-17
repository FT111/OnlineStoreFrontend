
<script>

	let isCollapsed = false;
	
	let { class: className, children } = $props();
	

</script>

<div class="h-screen sticky top-0 p-3 max-w-56 min-w-56 flex-none bg-slate-100 border-r-0 border-r-slate-200 {className}">
	<div class="sticky flex flex-col h-full w-full gap-2 pt-20">
		{@render children?.()}
	</div>
</div>