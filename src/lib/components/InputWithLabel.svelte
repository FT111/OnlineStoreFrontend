
<script>

	import { Input } from '$lib/components/ui/input/index.js';
	import Textarea from './ui/textarea/textarea.svelte';


	let { label, value = $bindable(), children, class: className='', optional=false, area=false, ...rest } = $props();
	
	let readonly = false;
</script>


<div class="flex flex-col gap-1.5 w-full h-full {className}" {...rest}>
	<label class="flex flex-row justify-between text-xs px-2 font-normal text-slate-600">
		{@render children?.()}
		{#if optional}
			<span class="text-slate-400">Optional</span>
		{/if}
	</label>
	
	{#if !area}
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
	/>{:else}
	<Textarea
		id={label}
		class="w-full h-full p-2 border rounded-md"
		bind:value
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
	{/if}

</div>
