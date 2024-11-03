
<script>

import { Separator } from '$lib/components/ui/separator/index.js';
</script>

<div class="mt-16 grow">
	<div class="w-full p-4 flex flex-col gap-2 justify-center">
		<h1 class="font-bold text-4xl text-primary"><slot name="title" /></h1>
		<Separator class="h-1 rounded-3xl" />
	</div>
	
	<div class="p-3.5 grow h-full w-full">
		<slot name="page" />
	</div>
</div>