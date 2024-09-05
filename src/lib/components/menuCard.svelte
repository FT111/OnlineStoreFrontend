
<script>
	let className;
	export let href;
	export { className as class };
	
</script>

<a class="rounded-xl hover:basis-1/3 basis-1/4 p-5 flex flex-col justify-end align-bottom grow
 			hover:bg-opacity-90 transition-all duration-200	 {className}" href={href}>
	<div class="w-min">
		<slot />
	</div>
</a>
