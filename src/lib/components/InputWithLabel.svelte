
<script>

	import { Input } from '$lib/components/ui/input/index.js';
	let { label, value = $bindable(), children, ...rest } = $props();
	
	let readonly = false;
</script>


<div class="flex flex-col gap-0.5 w-auto h-full">
	<label class="text-xs px-2 font-normal text-slate-600" for={label}>
		{@render children?.()}
	</label>
	
	<Input
		id={label}
		{...rest}
		
		bind:value
		{readonly}
		on:blur
		on:change
		onclick
		on:focus
		on:focusin
		on:focusout
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:mousemove
		on:paste
		on:input
	/>

</div>
