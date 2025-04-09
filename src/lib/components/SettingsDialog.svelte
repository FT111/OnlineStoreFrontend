<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Breadcrumb } from '$lib/components/ui/breadcrumb/index.js';
	import SKUrow from '$lib/components/sales/SKUrow.svelte';
	import { Check, Info, Package, ReceiptText, Save } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Dropdown from '$lib/components/DropdownBase.svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import { CircleDashed, Circle, CircleArrowRight, CircleCheck, X, User, GlobeLock} from 'lucide-svelte';
	import { orderStatuses as statuses} from '$lib/constants.svelte.js';
	import { updateOrder } from '$lib/api/transactions.js';
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import { Switch } from '$lib/components/ui/switch/index.js';

	let { user } = $props();

	const tabs = [
		{
			title: 'Account',
			icon: User,
		},
		{
			title: 'Privacy',
			icon: GlobeLock,
		},
	]
	let settingsOpen = $state(false);
	let selectedTab = $derived(page.state.settingsPage || tabs[0].title);

	$effect(()=>{
		settingsOpen = page.state.settingsOpen
	})

	const updatePageState = () => {
		replaceState('', {settingsOpen: settingsOpen});
	}
	const setPage = (page) => {
		replaceState('', {settingsOpen: settingsOpen, settingsPage: page});
	}
</script>

<Dialog.Root bind:open={settingsOpen} onOpenChange={()=>{updatePageState(); }}>
	<Dialog.Content class="sm:max-w-[1000px] p-0 md:max-h-[500px] overflow-clip">
		<Dialog.Header class="sr-only">
			<Dialog.Title class="sr-only">Settings</Dialog.Title>
			<Dialog.Description>
				View order details
			</Dialog.Description>
		</Dialog.Header>

		<Sidebar.Provider class="items-start md:max-h-[500px]">
			<Sidebar.Root collapsible="none" class="hidden md:flex md:max-h-[500px]">
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
									{#each tabs as tab (tab)}
										{@const TabIcon = tab.icon}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton onclick={()=>{setPage(tab.title)}} class="{selectedTab===tab.title && 'bg-slate-200 hover:bg-slate-200'} transition-all">
											<TabIcon stroke-width={1.25} />
											<span>
													{tab.title}
												</span>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
										{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>

				<Sidebar.Footer>
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<p class="text-xs text-muted-foreground">
							</p>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.Footer>
			</Sidebar.Root>

			<!--		Content		-->
			<form class="flex h-[500px] flex-1 flex-col overflow-hidden">
				<header class="flex flex-row w-full h-fit bg-white/30 backdrop-blur-2xl p-4 gap-2.5 items-center">
					<p class="text-sm text-muted-foreground">{selectedTab}</p>
<!--					<Button type="submit" size="sm" class="{isOrderUpdated && '!scale-100'} scale-0 rounded-3xl origin-left transition-all ease-in-out" submit>-->
<!--						<Save size={20} strokeWidth={1.25}  /> Update-->
<!--					</Button>-->
				</header>

				<Tabs.Root value={selectedTab} class="overflow-y-auto">
					<Tabs.Content value="Account" class="overflow-y-auto">
					</Tabs.Content>

					<Tabs.Content value="Privacy" class="py-0">
						<div class="flex flex-col gap-1 w-full p-4">

							<div class="bg-cyan-500/15 border-none flex flex-row justify-between items-center h-fit p-4 rounded-2xl">
								<div class="flex flex-col gap-0.5 max-w-72 text-pretty">
									<label for="cookies" class="font-medium">Optional Cookies and Analytics</label>
									<p class="text-xs text-muted-foreground">These cookies measure your site activity and share it anonymously with sellers so they can improve their products.</p>
									<div class="flex flex-row gap-1 p-1 font-medium">
										<Info class="size-4 text-muted-foreground" />
										<p class="text-xs text-muted-foreground">This setting only applies to this browser</p>
									</div>
								</div>

								<div>
									<Switch
										id="cookies"
										/>
								</div>
							</div>

						</div>
					</Tabs.Content>
				</Tabs.Root>

			</form>
		</Sidebar.Provider>
	</Dialog.Content>
</Dialog.Root>
