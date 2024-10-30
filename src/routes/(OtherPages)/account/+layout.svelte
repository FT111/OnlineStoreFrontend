
<script>
import Sidebar from '$lib/components/Sidebar.svelte'
import { Separator } from '$lib/components/ui/separator/index.js';
import * as Avatar from '$lib/components/ui/avatar/index.js';
import { Card } from '$lib/components/ui/card/index.js';
import { Button } from '$lib/components/ui/button/index.js';

export let data;
$: user = data.user;
</script>

<div class="w-full h-full flex flex-row">
	<Sidebar>
		<div class="flex flex-col gap-4 text-slate-800">
<!--		User section	-->
			<Card class="bg-slate-50 rounded-xl border-slate-200 border-2 hover:border-slate-900 transition-all shadow-none cursor-pointer p-1.5 px-2.5 flex flex-row gap-2 items-center">
				<Avatar.Root class="text-primary h-11 w-11">
					<Avatar.Image src={user['profilePictureURL']} alt="Avatar" />
					<Avatar.Fallback>EB</Avatar.Fallback>
				</Avatar.Root>
				
				<div class="flex flex-col p-2">
					<p class="font-semibold text-xl">{user['username']}</p>
					<p class="text-sm font-light text-slate-500">{user['id']}</p>
				</div>
			</Card>
			
<!--			<Separator />-->
			
			<Button class="bg-white hover:border-slate-900 border border-white  hover:bg-white" variant="secondary">My Account</Button>
		</div>
	</Sidebar>
	
	<div class="basis-5/6">
		<slot />
	</div>
	
</div>
