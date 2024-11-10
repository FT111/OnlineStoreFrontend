
<script>

import { Separator } from '$lib/components/ui/separator/index.js';
</script>

<div class="pt-16 grow h-full">
	<div class="w-full p-4 flex flex-col gap-2 justify-center">
		<h1 class="font-bold text-5xl text-primary"><slot name="title" /></h1>
	</div>
	
	<div class="p-3.5 pt-0 grow h-full w-full">
		<slot name="page" />
	</div>
</div>