
<script>

	import { Input } from '$lib/components/ui/input/index.js';
	import Textarea from './ui/textarea/textarea.svelte';


	let { label, value = $bindable(), children, class: className='', description='', optional=false, area=false, ...rest } = $props();

	let readonly = false;
</script>


<div class="flex flex-col gap-1 w-full h-full {className}" {...rest}>
	<label class="flex flex-row  justify-between text-xs px-1.5 font-medium text-slate-600">
		{@render children?.()}
		{#if optional}
			<span class="text-slate-400 font-normal">Optional</span>
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

	<p class="text-muted-foreground font-light text-xs px-1.5">{description}</p>

</div>
