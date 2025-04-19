<script>
	import { onMount } from 'svelte';
	import Price from './price.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import Image from '$lib/components/image.svelte';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Searchbar from './searchbar.svelte';
	import { logout } from '$lib/api/authentication.js';
	import { buttonVariants} from '$lib/components/ui/button/index.js';
	import Basket from '$lib/components/sales/basket.svelte';

	import { basketStore } from '$lib/basket.svelte.js';
	import { Plus, Settings } from 'lucide-svelte';
		import NewListingDialog from '$lib/components/NewListingDialog.svelte';
	import { goto, pushState } from '$app/navigation';

	let {
		navElement = $bindable(),
		searchElement = $bindable(),
		hideSearch = false,
		user
	} = $props();
	
	let hideClass = $state('');
	if (hideSearch) {
		hideClass = '-translate-y-32';
	}
</script>


<nav class="fixed top-0 z-50">
	<div bind:this={navElement}  class="fixed top-0 w-screen h-16 align-center items-center justify-between
                 flex flex-row p-3 sm:p-5 sm:px-8 px-4 gap-5 bg-primary //border-t-accent text-white
                 //border-t-[6px] backdrop-blur-2xl z-50 transition-all">
		<a href="/" class="hidden sm:block">
			<h2 class=" text-3xl tracking-tight font-medium">eBuy</h2>
		</a>
		
		
			<div class="lg:w-1/2 md:w-2/3 w-full grow sm:grow-0 transition-all ease-in-out {hideClass}" bind:this={searchElement}>
				
				<Searchbar />
				
			</div>
		
		<div class="flex flex-row w-min sm:gap-5 gap-4 items-center">
			
			<NewListingDialog>
				<div class="flex flex-row gap-1.5 bg-background/15 items-center p-2 px-4 rounded-3xl hover:backdrop-brightness-125 transition-colors">
					<Plus class="size-6 {hideSearch ? 'text-black' : 'text-white'}" />
					Sell
					
				</div>
			</NewListingDialog>
			
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hidden sm:block">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
			</svg>
			
			<Basket />
			{#key user}
				{#if user}
					
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
						>
							<Avatar.Root>
								<Avatar.Image src={user.profilePictureURL} alt="Avatar" />
								<Avatar.Fallback class="">{user.username[0] + user.username[1]}</Avatar.Fallback>
							</Avatar.Root>
						</DropdownMenu.Trigger
						>
						<DropdownMenu.Content class="w-56">
							<DropdownMenu.Group>
								<DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
								<DropdownMenu.Separator />
								<DropdownMenu.Group>
									<a href="/users/{user.id}">
										<DropdownMenu.Item>
											<span>Profile</span>
											<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
										</DropdownMenu.Item>
									</a>
									<a href="/account/purchases">
										<DropdownMenu.Item>
											<span>Purchases</span>
											<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
										</DropdownMenu.Item>
									</a>
									<a href="/account/profile">
										<DropdownMenu.Item>
											<span>My account</span>
											<DropdownMenu.Shortcut>⌘,</DropdownMenu.Shortcut>
										</DropdownMenu.Item>
									</a>
								</DropdownMenu.Group>
								<DropdownMenu.Separator />
								<DropdownMenu.Group>
									<DropdownMenu.GroupHeading>
										<span>My Sales</span>
									</DropdownMenu.GroupHeading>
									<a href="/sales/dashboard">
									<DropdownMenu.Item>
												<span>Dashboard</span>
											</DropdownMenu.Item>
									</a>
											<a href="/sales/listings">
												<DropdownMenu.Item>
													<span>Listings</span>
												</DropdownMenu.Item>
											</a>
									<a href="/sales/orders">
											<DropdownMenu.Item>
												<span>Orders</span>
											</DropdownMenu.Item>
										</a>
								</DropdownMenu.Group>
								<DropdownMenu.Separator />
							<DropdownMenu.Group>
								<DropdownMenu.Item onclick={()=>{pushState('', {settingsOpen: true})}}>
										<span>Settings</span>
										<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
									</DropdownMenu.Item>
							</DropdownMenu.Group>
								<DropdownMenu.Seperator />
								<DropdownMenu.Item onclick={()=>{logout(); goto('/')}}>
									<span>Log out</span>
									<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
						{:else}
					<button class="p-0 size-8" aria-label="Open settings page" onclick={()=>{pushState('', {settingsOpen: true})}}>
						<Settings stroke-width={1.25} size={20} />
					</button>

							<div class="flex flex-row gap-3">
								<a href="/signup">
									<Button variant="secondary">Sign up</Button>
								</a>
								<a href="/login">
									<Button class="bg-slate-50/0" variant="outline">Log in</Button>
								</a>
							</div>
				{/if}
			{/key}
		
		</div>
	</div>
</nav>