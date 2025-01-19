<script>
	
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowRight } from 'lucide-svelte';
	
</script>
<div class="p-7">
		<div class="w-full  h-96 rounded-3xl flex flex-col bg-indigo-50 pt-1 p-4">
				<p class="text-5xl font-semibold p-4 text-slate-700 ">Performance Starts Here</p>
			
			<div style="background-image:
    linear-gradient(to bottom, rgba(37,83,151,0.82), rgba(41,91,113,0.89)),
    url('https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');"
				class=" grow rounded-b-3xl rounded-t-lg flex flex-col justify-between bg-cover bg-center">
				<div></div>
				<div class="flex flex-row w-full justify-between items-center text-slate-50 font-normal p-9">From sleek laptops to high-performance desktops, discover what suits you best.
					<Button href="/listings?category=Electronics&showCategoryHeader=true" variant="secondary" class="min-w-32 rounded-full group transition-all gap-2 px-4">Visit our computing range <ArrowRight class="group group-hover:translate-x-2 transition-all" /></Button></div>
			</div>
		</div>
	</div>