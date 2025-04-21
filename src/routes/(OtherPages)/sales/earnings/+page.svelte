<script>
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Price from '$lib/components/price.svelte';
	import { onMount } from 'svelte';
	import { HandCoins, BanknoteIcon, ArrowDown, Plus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { backOut } from 'svelte/easing';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import { fly } from 'svelte/transition';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { Progress } from '$lib/components/ui/progress/index.js';

	let { data } = $props();

	let withdrawalValue = $state(data.user.balance<10 ? data.user.balance/100 : 10);
	let pageOpenTime = $state(new Date());
	onMount(() => {
		pageOpenTime = new Date();
	});

</script>

<DashboardPageLayout>
	{#snippet title()}
		Sale Earnings
	{/snippet}

	{#snippet page()}
		<div class="flex flex-col justify-center items-center">
			<Tabs.Root value="balance" class="w-96">
				<Tabs.List class="gap-1">
					<Tabs.Trigger value="balance">
						<BanknoteIcon size={20} strokeWidth={1.25} />
						Balance</Tabs.Trigger>
					<Tabs.Trigger value="earnings">
						<HandCoins size={20} strokeWidth={1.25} />
						Earnings</Tabs.Trigger>
					<Dialog.Root>
						<Dialog.Trigger>
							<Button class="flex flex-row gap-0.5 rounded-full bg-emerald-200/50 hover:bg-emerald-300 h-8 text-secondary-foreground w-fit">
								<ArrowDown size={20} strokeWidth={1.25} />
								Withdraw
							</Button>
						</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Withdraw from your available balance</Dialog.Title>
								<Dialog.Description>
									You can instantly withdraw via bank transfer.
									<br />
									There is no fee or minimum withdrawal amount.
								</Dialog.Description>
							</Dialog.Header>

							<form class="flex flex-col gap-2">
								<InputWithLabel
									label="Account Number"
									type="text"
									placeholder="12345678"
									class="w-full"
									maxlength="8"
									required
									>Account Number</InputWithLabel>

								<div class="flex flex-col w-full gap-1">
									<label for="sort" class="text-xs  px-1.5 font-medium text-slate-600">
										Sort Code
									</label>
									<InputOTP.Root maxlength={6} name="sort" >
										{#snippet children({ cells })}
											<InputOTP.Group>
												{#each cells.slice(0, 2) as cell}
													<InputOTP.Slot {cell} />
												{/each}
											</InputOTP.Group>
											<InputOTP.Separator />
											<InputOTP.Group>
												{#each cells.slice(2, 4) as cell}
													<InputOTP.Slot {cell} />
												{/each}
											</InputOTP.Group>
											<InputOTP.Separator />
											<InputOTP.Group>
												{#each cells.slice(4, 6) as cell}
													<InputOTP.Slot {cell} />
												{/each}
											</InputOTP.Group>
										{/snippet}
									</InputOTP.Root>
								</div>


								<InputWithLabel
									label="Amount (GBP)"
									type="number"
									placeholder="£0"
									class="w-full"
									min="1"
									bind:value={withdrawalValue}
									required
									max="{data.user.balance / 100}"
									>Amount (GBP)</InputWithLabel>

								<div class="flex flex-row gap-1.5 w-full py-2 items-center">
									<Price price={withdrawalValue*100} small class="text-sm font-semibold text-muted-foreground" />
									<Progress value={withdrawalValue} max={data.user.balance / 100} class="w-full h-2 bg-slate-200" />
									<Price price={data.user.balance} small class="text-sm font-semibold text-muted-foreground" />
								</div>

								<p class="flex flex-row justify-center items-center py-2 w-full text-xs text-muted-foreground font-medium">
									{#if withdrawalValue > data.user.balance / 100}
										<span class="text-red-500">You cannot withdraw more than your available balance</span>
									{:else if withdrawalValue < 0}
										<span class="text-red-500">You cannot withdraw a negative amount</span>
									{:else if withdrawalValue === 0 || withdrawalValue === '' || withdrawalValue === null}
										<span class="text-red-500">You cannot withdraw £0</span>
									{:else}
										After your withdrawal, your balance will be £{(data.user.balance /100 - withdrawalValue).toFixed(2)}
									{/if}
								</p>

								<div class="flex flex-row w-full justify-end gap-2 mt-4">
									<Button type="submit" class="bg-primary text-white">Finish Withdrawal</Button>
								</div>
							</form>
						</Dialog.Content>
					</Dialog.Root>
				</Tabs.List>
				<Tabs.Content value="balance">
					<div class="flex flex-col gap-2 justify-end">
						<Card.Root class="md:w-96 w-full min-h-44 justify-between flex flex-col ">
							<div class="flex flex-col">
								<Card.Header>
									<Card.Title>Available Balance</Card.Title>
				<!--					<Card.Description>-->
				<!--						Your earnings from sales made on the platform.-->
				<!--					</Card.Description>-->
								</Card.Header>
								<Card.Content class="flex flex-col gap-4 py-1">
									<Price price={data.user.balance} />
								</Card.Content>
							</div>
							<Card.Footer>
								<p class="text-xs font-light text-muted-foreground text-right w-full">Last updated: {pageOpenTime.toLocaleTimeString('UK')}</p>
							</Card.Footer>
						</Card.Root>
					</div>
				</Tabs.Content>
				<Tabs.Content value="earnings">
					<Card.Root class="md:w-96 w-full min-h-44 justify-between flex flex-col">
						<div class="flex flex-col">
							<Card.Header>
								<Card.Title>Overall Earnings</Card.Title>
							</Card.Header>
							<Card.Content class="flex flex-col gap-2 py-1">
								<Price price={data.user.allTimeBalance} />
								<Card.Description class="text-xs text-muted-foreground">
									Your all-time earnings from sales.  <br />
									Refunded orders are not included.
								</Card.Description>
							</Card.Content>
						</div>
						<Card.Footer class="self-end justify-self-end place-self-end">
							<p class="text-xs font-light text-muted-foreground text-right w-full">Last updated: {pageOpenTime.toLocaleTimeString('UK')}</p>
						</Card.Footer >
					</Card.Root>
				</Tabs.Content>
			</Tabs.Root>

			<Card.Root class="md:w-96 w-full mt-4">
				<Card.Header>
					<Card.Title>Orders</Card.Title>
				</Card.Header>
				<Card.Content class="flex flex-col gap-2">
					{#each data.orders.sales as order}
						<div class="flex flex-row justify-between items-center ">
							<div class="flex flex-row items-center gap-0.5">
								<p class="text-sm font-medium {order.status==='Cancelled' && 'line-through' }">{new Date(order.addedAt *1000).toLocaleDateString('GB')}</p>
								{#if order.status === 'Cancelled'}
									<p class="text-xs text-muted-foreground !no-underline">• Refunded</p>
								{/if}
							</div>
							<p class="text-emerald-700 flex flex-row items-center gap-0.5 {order.status==='Cancelled' && 'line-through' }"><Plus size={20} /> £{order.value/100}</p>
						</div>
					{/each}
				</Card.Content>
			</Card.Root>


		</div>
	{/snippet}
</DashboardPageLayout>