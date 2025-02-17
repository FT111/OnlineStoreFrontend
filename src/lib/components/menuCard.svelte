
<script>
	
	let {
		class: className,
		href,
		altArrow,
		children,
		...restProps
	} = $props();
	
</script>



<a class="rounded-xl hover:basis-4/12 basis-1/4 p-5 justify-end align-bottom grow border-2 border-slate-300 !hover:border-accent/60
	
 			hover:bg-opacity-90 transition-all duration-200 grid grid-cols-1 grid-rows-1 {className}" {...restProps} href={href}>
	
	<div class="w-full h-full" style="grid-column: 1;grid-row: 1">
		<div class="flex w-full h-full p-2 justify-end align-bottom justify-items-end items-end">
		{#if altArrow}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
			</svg>
		
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
			</svg>
			{/if}
		</div>
	</div>

		
		<div class="w-min flex justify-end align-bottom flex-col h-full text-lg " style="grid-column: 1;grid-row: 1">
			<p class="text-xl">{@render children?.()}</p>
		</div>
</a>
