
<script>
	let className;
	export let href;
	export { className as class };
	
</script>



<a class="rounded-xl hover:basis-1/3 basis-1/4 p-5 justify-end align-bottom grow
 			hover:bg-opacity-90 transition-all duration-200 grid grid-cols-1 grid-rows-1 {className}" href={href}>
	
	<div style="grid-column: 1;grid-row: 1" class="w-full h-full">
		<div class="flex w-full h-full p-2 justify-end align-bottom justify-items-end items-end">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
				 stroke="currentColor"
				 class="size-6 items-end opacity-50 bg-blend-lighten group-hover:opacity-100 transition-all duration-100">
				<path stroke-linecap="round" class="mix-blend-screen bg-blend-color-burn" stroke-linejoin="round"
					  d="m11.99 7.5 3.75-3.75m0 0 3.75 3.75m-3.75-3.75v16.499H4.49"/>
			</svg>
		</div>

		
		<div style="grid-column: 1;grid-row: 1" class="w-min">
			<slot />
		</div>
	</div>
</a>
