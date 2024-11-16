
<script>

	let isCollapsed = false;
	
	let className;
	export { className as class };

</script>

<div class="h-screen sticky top-0 p-4 max-w-64 min-w-64 flex-none bg-slate-100 border-r-0 border-r-slate-200 {className}">
	<div class="sticky flex flex-col h-full w-full gap-2 pt-20">
		<slot />
	</div>
</div>