
<script>
import Sidebar from '$lib/components/Sidebar.svelte'
import { Separator } from '$lib/components/ui/separator/index.js';
import * as Avatar from '$lib/components/ui/avatar/index.js';
import { Card } from '$lib/components/ui/card/index.js';
import { Button } from '$lib/components/ui/button/index.js';
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
import { page } from '$app/state';
import { Plus } from 'lucide-svelte';
import NewListingDialog from '$lib/components/NewListingDialog.svelte';


	let { data, children } = $props();
let user = $derived(data.user);


let selectedPage = $derived(page.url.pathname.split('/')[2]);


</script>

<div class="w-full h-full flex flex-row">
	<Sidebar>
		<div class="flex flex-col gap-3 text-slate-800">
<!--		User section	-->
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Card class="bg-slate-50 rounded-xl outline-slate-600 border-0 hover:outline-accent outline-1 hover:bg-orange-50/65
					transition-all shadow-none cursor-pointer p-1.5 px-2.5 flex flex-row gap-2 hover:outline-2 outline !duration-75
					items-center justify-between ">
						<div class="flex flex-row gap-3 items-center">
							<Avatar.Root class="text-primary h-11 w-11">
								<Avatar.Image src={user['profilePictureURL']} alt="Avatar" />
								<Avatar.Fallback>EB</Avatar.Fallback>
							</Avatar.Root>
							
							<div class="flex flex-col p-2 justify-start">
								<p class="font-semibold text-xl">{user['username']}</p>
								<p class="text-sm text-left font-light text-slate-500">{user['id']}</p>
							</div>
						</div>
						
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-slate-600">
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
						</svg>
					</Card>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56">
					<DropdownMenu.Group>
						<DropdownMenu.Item href="/users/{user.id}">Profile</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item class="bg-red-100/50">
							<div class="flex flex-row w-full justify-between ">Sign out
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-accent">
									<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
								</svg>
							</div>
							</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
				
			
			<Separator />
			
			
			<Button id="dashboard" href="/account/dashboard" class="{selectedPage==='dashboard' ? 'border-accent' : ''} bg-white hover:border-accent border   hover:bg-white" variant="secondary">Dashboard</Button>
			<Button id="listings" href="/account/listings" class="{selectedPage==='listings' ? 'border-accent ' : ''} bg-white hover:border-accent border   hover:bg-white" variant="secondary">Listings</Button>
			<Button id="orders" href="/account/sales" class="{selectedPage==='orders' ? 'border-accent ' : ''} bg-white hover:border-accent border  hover:bg-white" variant="secondary">Orders</Button>
			
			<Separator />
			
			<div class="flex flex-col  p-1">
				<div class="flex flex-row justify-between w-full items-center font-semibold text-lg rounded-md p-2">
					Your listings
					<NewListingDialog>
						<Button class="w-min p-2 px-3" size="sm">
							<Plus />
						</Button>
					</NewListingDialog>
				</div>
				
				<div class="flex flex-col gap-1 px-2">
					{#each data.userListings as listing}
						<Button data-sveltekit-preload-data="tap" variant="link" href={`/account/listings/${listing.id}`} class="flex flex-row px-0 p-0 py-0 h-fit justify-between">
							<p>{listing.title}</p>
						</Button>
					{/each}
				</div>
			</div>
		
		</div>
	</Sidebar>
	
	<div class="basis-5/6">
		{@render children?.()}
	</div>
	
</div>
