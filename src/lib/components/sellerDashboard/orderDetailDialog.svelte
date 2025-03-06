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


let { detailViewOpen, selectedOrder, updatePageState, refreshOrdersCallback } = $props()
let selectedTab = $derived(page.state.detailViewPage);
let orderStatusSelectorState = $state(false);
let newStatus = $state(selectedOrder?.status);
$effect(() => {
	newStatus = selectedOrder?.status;
})

let updatedOrder = $derived({
	...selectedOrder, status: newStatus
														});
let isOrderUpdated = $derived.by(() => JSON.stringify(selectedOrder) !== JSON.stringify(updatedOrder));

const handleOrderUpdate = (e) => {
	e.preventDefault();
	updateOrder(updatedOrder.id, updatedOrder
	).then((response) => {
		refreshOrdersCallback();
	}).catch((error) => {
		console.error(error);
	});
}

const setPage = (page) => {
	replaceState('', {selectedOrder: selectedOrder.id, detailViewOpen: true, detailViewPage: page});
}
$inspect(selectedOrder, updatedOrder);
</script>

<Dialog.Root open={detailViewOpen} onOpenChange={()=>{updatePageState(); }}>
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
							<div class="flex flex-1 flex-col gap-0.5 overflow-y-auto pb-4">
									{#each updatedOrder.skus as product}
										<SKUrow product={product} mutableQuantity={false} />
									{/each}
							</div>
						</Tabs.Content>
						
						<Tabs.Content value="Details" class="py-0">
							<div class="flex flex-col gap-2.5 px-4">
								<Card.Root>
									<Card.Content class="flex flex-row justify-between items-center">
										<Card.Title>
											Order Status
										</Card.Title>
										{#if selectedOrder.status === 'Cancelled'}
											<p class="text-xl text-destructive text-right leading-5 font-medium">Cancelled
											<br /><span class="text-xs text-foreground font-normal">The recipient has been refunded.</span>
											</p>
										{:else}
											<div class="flex flex-col gap-1 items-end">
												<div class="flex flex-row gap-2 items-center">
													<Dropdown bind:open={orderStatusSelectorState} value={updatedOrder.status} class="max-w-48">
															{#each statuses as status}
																{@const Icon = status.icon}
																<Command.Item value={status.title} onSelect={() => {orderStatusSelectorState=false;newStatus=status.title}} class="{status.title===updatedOrder.status && 'bg-secondary'} flex flex-row justify-between">
																	<div class="flex flex-row gap-2 items-center">
																		<Icon size={18} strokeWidth={1.25} />
																		<p>{status.title}</p>
																	</div>
																	
																	{#if status.title === updatedOrder.status}
																		<Check size={18} strokeWidth={1.25} />
																	{/if}
																</Command.Item>
															{/each}
													</Dropdown>
													
		<!--									Cancellation dialog		-->
													<AlertDialog.Root>
														<AlertDialog.Trigger>
															<Button variant="destructive" size="sm" >
																Cancel
															</Button>
														</AlertDialog.Trigger>
														<AlertDialog.Content>
															<AlertDialog.Header>
																<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
																<AlertDialog.Description>
																	Cancelling an order is irreversible. The buyer will be refunded and the order will be marked as cancelled, then archived after 30 days.
																</AlertDialog.Description>
															</AlertDialog.Header>
															<AlertDialog.Footer>
																<form onsubmit={(e)=>{
																newStatus = 'Cancelled';
																handleOrderUpdate(e);
																}}>
																	<AlertDialog.Cancel type="button">Back</AlertDialog.Cancel>
																	<AlertDialog.Action type="submit">
																		Cancel order
																	</AlertDialog.Action>
																</form>
															</AlertDialog.Footer>
														</AlertDialog.Content>
													</AlertDialog.Root>
												</div>
												
												<p class="text-xs text-muted-foreground">Last updated on {new Date(selectedOrder?.updatedAt *1000).toLocaleDateString(
													'en-GB', { year: 'numeric', month: 'long', day: 'numeric' }
												)}</p>
											</div>
											{/if}
									</Card.Content>
								</Card.Root>
									
									<Card.Root>
									<Card.Header>
										<Card.Title>
											Recipient
										</Card.Title>
									</Card.Header>
									<Card.Content>
										<div class="flex flex-col gap-1 w-full">
											<div class="flex flex-row justify-between w-full">
												<p class="text-sm text-muted-foreground">Name</p>
												<p class="text-sm font-semibold">{selectedOrder.recipient.firstName} {selectedOrder.recipient.surname}</p>
											</div>
											<div class="flex flex-row justify-between w-full">
												<p class="text-sm text-muted-foreground">Email</p>
												<p class="text-sm font-semibold">{selectedOrder.recipient.emailAddress}</p>
											</div>
											<div class="flex flex-row justify-between w-full">
												<p class="text-sm text-muted-foreground">Address</p>
												<p class="text-sm font-semibold">
													{selectedOrder.recipient.addressLine1}{selectedOrder.recipient.addressLine2 && `, ${selectedOrder.recipient.addressLine2}`},
													{selectedOrder.recipient.city}, {selectedOrder.recipient.country} {selectedOrder.recipient.postcode}</p>
											
										</div>
										</div>
									
									</Card.Content>
								</Card.Root>
							</div>
						
						</Tabs.Content>
					</Tabs.Root>
					
				</form>
			</Sidebar.Provider>
	</Dialog.Content>
</Dialog.Root>
