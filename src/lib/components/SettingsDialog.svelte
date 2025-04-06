<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Breadcrumb } from '$lib/components/ui/breadcrumb/index.js';
	import SKUrow from '$lib/components/sales/SKUrow.svelte';
	import { Check, Package, ReceiptText, Save } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Dropdown from '$lib/components/DropdownBase.svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import { CircleDashed, Circle, CircleArrowRight, CircleCheck, X} from 'lucide-svelte';
	import { orderStatuses as statuses} from '$lib/constants.svelte.js';
	import { updateOrder } from '$lib/api/transactions.js';
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';

	let { user } = $props();

	let settingsOpen = $derived(page.state.settingsOpen);
	let selectedTab = $derived(page.state.settingsPage || 'Account');

	const setPage = (page) => {
		replaceState('', {selectedOrder: selectedOrder.id, detailViewOpen: true, detailViewPage: page});
	}
	const updatePageState = () => {
		replaceState('', {settingsOpen: settingsOpen});
	}
</script>

<Dialog.Root open={settingsOpen} onOpenChange={()=>{updatePageState(); }}>
	<Dialog.Content class="sm:max-w-[1000px] p-0 md:max-h-[500px] overflow-clip">
		<Dialog.Header class="sr-only">
			<Dialog.Title class="sr-only">Order #{selectedOrder?.id}</Dialog.Title>
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
								<Sidebar.MenuItem>
									<Sidebar.MenuButton onclick={()=>{setPage('Products')}} class="{selectedTab==='Products' && 'bg-slate-200 hover:bg-slate-200'} transition-all">
										<Package size={20} strokeWidth={1.25} />
										<span>
												Products
											</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton onclick={()=>{setPage('Details')}} class="{selectedTab==='Details' && 'bg-slate-200 hover:bg-slate-200'} transition-all">
										<ReceiptText size={20} strokeWidth={1.25} />
										<span>
												Details
											</span>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>

				<Sidebar.Footer>
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<p class="text-xs text-muted-foreground">
								Order <br /> <span class="font-mono">#{updatedOrder.id}</span>
							</p>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.Footer>
			</Sidebar.Root>

			<!--		Content		-->
			<form class="flex h-[500px] flex-1 flex-col overflow-hidden" onsubmit={handleOrderUpdate}>
				<header class="flex flex-row w-full h-fit bg-white/30 backdrop-blur-2xl p-4 gap-2.5 items-center">
					<p class="text-sm text-muted-foreground">{selectedTab}</p>
					<Button type="submit" size="sm" class="{isOrderUpdated && '!scale-100'} scale-0 rounded-3xl origin-left transition-all ease-in-out" submit>
						<Save size={20} strokeWidth={1.25}  /> Update
					</Button>
				</header>

				<Tabs.Root value={selectedTab} class="overflow-y-auto">
					<Tabs.Content value="Products" class="overflow-y-auto">
					</Tabs.Content>

					<Tabs.Content value="Details" class="py-0">

					</Tabs.Content>
				</Tabs.Root>

			</form>
		</Sidebar.Provider>
	</Dialog.Content>
</Dialog.Root>
