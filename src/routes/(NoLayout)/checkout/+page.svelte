
<script>
	import Logo from '$lib/branding/logo.svelte';
	import { basketStore } from '$lib/basket.svelte.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import SkuRow from '$lib/components/sales/SKUrow.svelte';
	import Price from '$lib/components/price.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeft, Check, CheckCircle, CreditCard, Edit2, Plus } from 'lucide-svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { fly } from 'svelte/transition';
	import { Payment, validateCardNumber } from '$lib/payments.svelte.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { toast } from 'svelte-sonner';
	import HelpTooltip from '$lib/components/HelpTooltip.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import PaymentMethodSelector from '$lib/components/sales/PaymentMethodSelector.svelte';
	import { submitCheckout } from '$lib/api/transactions.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { onMount } from 'svelte';

	const { data } = $props()
	let previousPage = $state('/')
	let transactionForm = $state(null)
	let isDeliveryDetailsValid = $state(false)
	onMount(() => {
		isDeliveryDetailsValid = transactionForm.checkValidity()
	})
	
	let shipmentSellers = $derived.by(()=> {
		return Object.values(basketStore.basket.items).map((item) => item.listing.ownerUser)
	})
	
	// One shipment for each unique seller
	let shipmentCount = $derived.by(()=>{
		return new Set(shipmentSellers).size
	})
	
	let transaction = $state(Payment());
	$inspect(transaction)
	
	afterNavigate(({from}) => {
		previousPage = from?.url.pathname!=='/checkout' ? from?.url.pathname || previousPage : '/'
	})
	beforeNavigate((navigation)=>{
		// Prevents the user from leaving the page if the basket is not empty (completed purchase)
		if (!basketStore.basket.length || window.confirm('Are you sure you want to leave?' +
			' \n Your unsaved details will be lost.')) {
		} else {
			navigation.cancel()
		}
	})
	
	const handleFinishAndPay = async (event) => {
		// Finishes the payment process and merges the delivery data with the basket data
		event.preventDefault()
		const form = event.target
		const formData = new FormData(form)
		transaction.deliveryDetails = Object.fromEntries(formData)
		
		if (!transaction.paymentDetails.set || !isDeliveryDetailsValid) {
			toast.error('Please enter your payment information')
			return
		}
		transaction.basket = basketStore.basket
		
		await submitCheckout(transaction)
		
		basketStore.clearBasket()
		await goto('/')
		
	}
</script>

<div class="flex flex-col h-screen">
	<div class="relative h-[10vh] flex  items-center justify-between w-full  border border-b-[1px]">
		<a href={previousPage}  class="z-10 mx-4">
			<Button variant="ghost"><ArrowLeft stroke-width="1.25" /> Back</Button>
		</a>
		<div class="absolute items-center flex justify-center flex-row size-full">
			<Logo class="!text-4xl" />
		</div>
	</div>
	
	<div class="flex md:flex-row flex-col w-full h-[90vh]" >
		<div class="basis-1/2 flex-col flex md:items-end items-center p-6 overflow-y-auto">
			<div class="md:w-3/4 flex flex-col w-fit gap-5">
				<form bind:this={transactionForm} id="transactionForm" class="group flex flex-col gap-2 " onsubmit={(e)=>{handleFinishAndPay(e)}} onchange={()=>{isDeliveryDetailsValid = transactionForm.checkValidity()}}>
					<div class="text-2xl flex flex-row gap-2.5 items-center">
						<h3>Delivery</h3>
						<Check class="group-has-[:invalid]:scale-0 scale-100 transition-all duration-150 origin-left opacity-70 ease-in-out" />
					</div>
					<p class="text-sm text-muted-foreground">Please enter your delivery details</p>
					<div class="flex flex-col gap-2.5">
						<div class="flex flex-row flex-grow flex-1 gap-2.5">
							<InputWithLabel value={data.user.firstName} label="First name" placeholder="Recipient's first name" name="firstName" required>First name</InputWithLabel>
							<InputWithLabel value={data.user.surname} label="Surname" placeholder="Recipient's surname" name="surname" required>Surname</InputWithLabel>
						</div>
						
						<InputWithLabel value={data.user.addressLine1 && data.user.addressLine1} name="addressLine1" label="Address line 1" placeholder="Address line 1" required>Address line 1</InputWithLabel>
						<InputWithLabel value={data.user.addressLine2 && data.user.addressLine2} name="addressLine2" label="Address line 2" placeholder="Address line 2">Address line 2 (optional)</InputWithLabel>
						
							<InputWithLabel value={data.user.city} name="city" label="City" placeholder="City" required>Town/City</InputWithLabel>
						<div class="flex flex-row gap-2.5">
							<InputWithLabel value={data.user.country} name="country" label="County" placeholder="Country" required>Country</InputWithLabel>
							<InputWithLabel value={data.user.postcode} name="postcode" label="Postcode" placeholder="Postcode"
															minlength="6" maxlength="7" required>Postcode</InputWithLabel>
						</div>
						
						<div class="flex md:flex-row flex-col md:justify-between gap-2 w-full text-sm">
							<div class="flex flex-row items-center gap-1.5">
								<Checkbox name="saveAddress" form="paymentMethodDialogForm" />
								<label for="saveAddress">Save this address for future purchases</label>
							</div>
						{#if data.user.addressLine1}
							<p class="flex flex-row gap-1 text-muted-foreground items-center self-end text-sm"><CheckCircle size="15" /><span>Using your saved address</span></p>
						{/if}
						</div>
					</div>
				</form>
				<div class="flex flex-col  gap-2.5 grow">
					<div class="text-2xl flex flex-row gap-2.5 items-center">
						<h3>Payment</h3>
						<Check class=" { transaction.paymentDetails.set ? 'scale-100' : 'scale-0' } transition-all duration-150 origin-left opacity-70 ease-in-out " />
					</div>					<p class="text-sm text-muted-foreground">Please enter your payment details. <br />We do not store them after receiving your payment.</p>
					<PaymentMethodSelector transaction={transaction} />
				</div>
			</div>
		</div>
		
		<div class="basis-1/2 bg-secondary text-secondary-foreground flex flex-col items-start md:overflow-y-auto ">
			<div class="md:max-w-full flex flex-col w-full h-full gap-1.5">
				<div class="p-6 pb-flex flex-col gap-1.5 sticky top-0 bg-secondary/80 backdrop-blur-2xl z-10 h-full w-full">
					<h2 class="pb-0 z-10 text-2xl w-full text-left">Summary</h2>
					<p class="  text-muted-foreground text-sm">Review your basket</p>
				</div>
				<ul class="px-6 flex-col gap-2 py-2 rounded-lg text-black max-w-5/6 w-fit md:flex hidden">
					{#if Object.keys(basketStore.basket.items).length === 0}
						{#each Array(3) as _}
							<Skeleton width="20" height="5">.</Skeleton>
						{/each}
					{:else}
						{#each Object.values(basketStore.basket.items) as item}
							<SkuRow class="bg-none flex flex-row" product={item} increaseQuantityCallback={()=>{basketStore.addSKU(item.sku)}} decreaseQuantityCallback={()=>{basketStore.removeSKU(item.sku)}}  />
						{/each}
					{/if}
				</ul>
<!--		Bottom Layout		-->
				<div class="grid grid-cols-1 grid-rows-1 justify-self-end justify-end sticky bottom-0 text-muted-foreground ">
				
<!--				Content Container	-->
					<div class="p-4 flex flex-col md:w-2/3 w-full gap-2.5 z-10 size-full justify-end" style="
											grid-column: 1;grid-row: 1">
							<p class="flex flex-col items-start  text-black">Total<Price price={basketStore.basket.value} /></p>
						<div class="flex flex-row gap-1.5 text-sm"><p class="font-mono">{basketStore.basket.total}</p> products
							{#if shipmentCount > 1}
								<p>in {shipmentCount} shipments</p>
							{/if}
							•
							<p>Total includes VAT</p></div>
						{#if !transaction.paymentDetails.set || !isDeliveryDetailsValid}

							<Tooltip.Provider>
								<Tooltip.Root delayDuration={1} open={true}>
									<Tooltip.Trigger>
										<Button size="lg" class="w-full p-2.5 shadow-xl disabled" variant="default" type="submit" form="transactionForm" disabled>Finish and Pay</Button>
									</Tooltip.Trigger>
									<Tooltip.Content>
										<p>
											{#if !transaction.paymentDetails.set}
												Please enter your payment details
											{:else}
												Please enter your delivery details
											{/if}
										</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</Tooltip.Provider>
						{:else}
						<Button size="lg" class="w-full p-2.5 shadow-xl { transaction.paymentDetails.set || 'disabled'}" variant="default" type={ transaction.paymentDetails.set ? 'submit' : 'disabled'}
										form="transactionForm">Finish and Pay</Button>
							{/if}
						<p class="text-[0.7rem] text-muted-foreground">
							By clicking 'Finish and Pay', you agree to share your delivery address, email address and name with the relevant sellers.
							<br />
							Payment details are only shared with the relevant payment processor.
							<br />
							Orders are fulfilled by sellers and individually refundable within 14 days of purchase.
							<br />
							Sellers have the right to cancel an order and refund payment.
						</p>
					</div>
<!--			Background		-->
					<div class="size-full backdrop-blur-2xl h-56 bottom-0"
							 style="mask: linear-gradient(transparent, whitesmoke, white, white);
											grid-column: 1;grid-row: 1"></div>
				</div>
			</div>
			
			</div>
</div>
</div>
