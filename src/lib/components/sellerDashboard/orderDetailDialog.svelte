<script>
import { Input } from '$lib/components/ui/input/index.js';
import { Button } from '$lib/components/ui/button/index.js';
import * as Sidebar from '$lib/components/ui/sidebar/index.js';
import * as Dialog from '$lib/components/ui/dialog/index.js';
import { Breadcrumb } from '$lib/components/ui/breadcrumb/index.js';
import SKUrow from '$lib/components/sales/SKUrow.svelte';
import { Package, ReceiptText } from 'lucide-svelte';
import * as Tabs from '$lib/components/ui/tabs/index.js';

let { detailViewOpen, selectedOrder, updatePageState } = $props()
let selectedTab = $state('Products')

</script>

<Dialog.Root open={detailViewOpen} onOpenChange={updatePageState}>
	<Dialog.Content class="sm:max-w-[1000px] p-0 md:max-h-[500px] overflow-clip">
		<Dialog.Header class="sr-only">
			<Dialog.Title class="sr-only">Order #{selectedOrder.id}</Dialog.Title>
			<Dialog.Description>
				View order details
			</Dialog.Description>
		</Dialog.Header>
			
			<Sidebar.Provider class="items-start md:max-h-[500px]">
				<Sidebar.Root collapsible="none" class="hidden md:flex">
					<Sidebar.Content>
						<Sidebar.Group>
							<Sidebar.GroupContent>
								<Sidebar.Menu>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton onclick={()=>{selectedTab='Products'}}>
											<Package size={20} strokeWidth={1.25} />
											<span>
												Products
											</span>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton onclick={()=>{selectedTab='Details'}}>
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
				</Sidebar.Root>
				
<!--		Content		-->
				<div class="flex h-[480px] flex-1 flex-col overflow-hidden">
					<header class="flex flex-row w-full h-fit bg-white/30 backdrop-blur-2xl p-4">
						<p class="text-sm text-muted-foreground">{selectedTab}</p>
					</header>
					
					<Tabs.Root bind:value={selectedTab}>
						<Tabs.Content value="Products">
							<div class="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
									{#each selectedOrder.skus as product}
										<SKUrow product={product} mutableQuantity={false} />
									{/each}
							</div>
						</Tabs.Content>
						<Tabs.Content value="Details">
							<div class="flex flex-col gap-2 max-w-48 p-2">
								{#each Object.entries(selectedOrder.recipient) as [key, value]}
									<div class="flex flex-row justify-between">
										<p class="text-sm text-muted-foreground">{key}</p>
										<p class="text-sm">{value}</p>
									</div>
								{/each}
								
							</div>
						</Tabs.Content>
					</Tabs.Root>
					
				</div>
			</Sidebar.Provider>
	</Dialog.Content>
</Dialog.Root>
