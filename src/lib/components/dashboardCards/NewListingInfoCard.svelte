<script>
	export let current = false;
	export let optional = false;
</script>

<div class="flex flex-col justify-between gap-1 p-4 w-48 h-44 rounded-2xl
bg-green-100 {optional ? '!bg-slate-50' : ''}
border {current ? 'border-2 border-slate-800' : 'border-1 border-emerald-100'}" {...$$restProps}>
	<slot />

</div>