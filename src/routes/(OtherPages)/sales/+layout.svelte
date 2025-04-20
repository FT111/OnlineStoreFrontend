
<script>
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
import { Separator } from '$lib/components/ui/separator/index.js';
import * as Avatar from '$lib/components/ui/avatar/index.js';
import { Card } from '$lib/components/ui/card/index.js';
import { Button } from '$lib/components/ui/button/index.js';
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
import { page } from '$app/state';
	import { ChartSpline, LayoutDashboard, LayoutList, Plus, Truck, Wallet } from 'lucide-svelte';
import NewListingDialog from '$lib/components/NewListingDialog.svelte';
import { logout } from '$lib/api/authentication.js';


	let { data, children } = $props();
let user = $derived(data.user);


let selectedPage = $derived(page.url.pathname.split('/')[2]);

let buttonClasses = ' border-transparent hover:border-accent/10 border justify-start transition-all hover:bg-slate-50 bg-sidebar ';
let selectedClasses = ' !bg-slate-200/70 pl-5 ';


</script>

<Sidebar.Provider>
	<Sidebar.Root variant="inset" class="mt-14  z-10 bg-sidebar">
		<Sidebar.Header class="z-10">
			<Sidebar.Menu class="z-10">
				<Sidebar.MenuItem class="text-sm flex flex-row items-center text-neutral-500 gap-1">
					<Sidebar.Trigger class="-ml-1 size-8 hover:bg-secondary hover:text-secondary-foreground" />
					<p class="font-medium">Seller Dashboard</p>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger class="w-full">
								<Card class="bg-accent/15 rounded-xl outline-slate-300 border-0 hover:outline-accent outline-1 hover:bg-accent/20
					transition-all shadow-none cursor-pointer p-1.5 px-2.5 flex flex-row gap-2 hover:outline-2 outline !duration-75
					items-center justify-between w-full ">
									<div class="flex flex-row gap-3 items-center w-full">
										<Avatar.Root class="text-primary h-11 w-11">
											<Avatar.Image src={user['profilePictureURL']} alt="Avatar" />
											<Avatar.Fallback>EB</Avatar.Fallback>
										</Avatar.Root>
										
										<div class="flex flex-col p-2 justify-start">
											<p class="font-semibold text-sm overflow-ellipsis w-full">{user['username']}</p>
											<!--								<p class="text-sm text-left font-light text-slate-500">{user['id']}</p>-->
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
									<DropdownMenu.Item class="bg-red-100/50" onclick={()=>{logout()}}>
										<div class="flex flex-row w-full justify-between ">Sign out
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-accent">
												<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
											</svg>
										</div>
									</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Header>
		
		<Sidebar.Content class="p-1.5">
			
			<div class="flex flex-col gap-1.5">
				<div class="flex flex-col gap-1">
					<Button id="dashboard" href="/sales/dashboard" class="{selectedPage==='dashboard'&&selectedClasses} {buttonClasses}"
									variant="secondary"><LayoutDashboard size={20} strokeWidth={1.25} />Overview</Button>
					<Button id="orders" href="/sales/earnings" class="{selectedPage==='earnings'&&selectedClasses} {buttonClasses}"
									variant="secondary"><Wallet size={20} strokeWidth={1.25} />Earnings</Button>
					<Button id="listings" href="/sales/listings" class="{selectedPage==='listings'&&selectedClasses} {buttonClasses}"
									variant="secondary"><LayoutList size={20} strokeWidth={1.25} />Listings</Button>
					<Button id="orders" href="/sales/orders" class="{selectedPage==='orders'&&selectedClasses} {buttonClasses}"
									variant="secondary"><Truck size={20} strokeWidth={1.25} />Orders</Button>
				</div>
				<Separator />
			</div>
			
			
			<div class="flex flex-col  p-1">
				<div class="flex flex-row justify-between w-full items-center font-semibold text-lg rounded-md p-2">
					Your listings
					<NewListingDialog>
						<Button class="w-min p-0.5 size-7 text-slate-700 bg-emerald-500/30 hover:bg-emerald-500/60" size="sm">
							<Plus />
						</Button>
					</NewListingDialog>
				</div>
				
				<div class="flex flex-col gap-1 px-2 w-full">
					{#each data.userListings as listing}
						<Button data-sveltekit-preload-data="tap" variant="link" href={`/sales/listings/${listing.id}`} class="flex flex-row overflow-hidden px-0 p-0 py-0 h-fit justify-between">
							<p>{listing.title}</p>
						</Button>
					{/each}
				</div>
			</div>
		
		</Sidebar.Content>
	<Sidebar.Rail />
	</Sidebar.Root>
	
	<Sidebar.Inset>
		{@render children?.()}
	</Sidebar.Inset>
</Sidebar.Provider>