
<script>
	import Logo from '$lib/branding/logo.svelte';
	import { basketStore } from '$lib/basket.svelte.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import SkuRow from '$lib/components/sales/SKUrow.svelte';
	import Price from '$lib/components/price.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeft, CheckCircle, CreditCard, Edit2, Plus } from 'lucide-svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { fly } from 'svelte/transition';
	import { Payment } from '$lib/payments.svelte.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { toast } from 'svelte-sonner';
	import HelpTooltip from '$lib/components/HelpTooltip.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	const { data } = $props()
	let previousPage = $state('/')
	// Stores temporarily to provide visual feedback
	let cardNumber = $state('')
	
	let cardBrand = $derived.by(() => {
		if (cardNumber?.toString().startsWith('4')) {
			return 'Visa'
		} else if (cardNumber?.toString().startsWith('3')) {
			return 'American Express'
		} else if (cardNumber?.toString().startsWith('5') || cardNumber?.toString().startsWith(('2'))) {
			return 'Mastercard'
		}
	})
	
	let shipmentSellers = $derived.by(()=> {
		return Object.values(basketStore.basket.items).map((item) => item.listing.ownerUser)
	})
	
	// One shipment for each unique seller
	let shipmentCount = $derived.by(()=>{
		return new Set(shipmentSellers).size
	})
	
	// Controls the state of the payment dialog
	let paymentDialogOpenState = $state(false)
	
	let transaction = $state(Payment());
	
	afterNavigate(({from}) => {
		previousPage = from?.url.pathname!=='/checkout' ? from?.url.pathname || previousPage : '/'
	})
	beforeNavigate((navigation)=>{
		if (window.confirm('Are you sure you want to leave?' +
			' \n Your unsaved details will be lost.')) {
		} else {
			navigation.cancel()
		}
	})
	
	const validateCardNumber = (cardNumber) => {
		// Luhn algorithm
		let sum = 0
		let isSecond = false
		
		for (let i = cardNumber.length - 1; i >= 0; i--) {
			// Parse the digit
			let d = cardNumber[i] - '0'
			// If it's the second digit, double it
			if (isSecond) {
				d = d * 2
			}
			// Add two digits to handle
			sum += Math.floor(d / 10) + d % 10
			
			// Toggle flag
			isSecond = !isSecond
		}
		
		// If the sum is divisible by 10, the number is valid
		return sum % 10 === 0
	}

	async function setPaymentMethod(formEvent) {
		// Sets the payment method for the transaction
		const form = formEvent.target
		const formData = new FormData(form)
		let {cardNumber, cardExpiry} = Object.fromEntries(formData)
		let {cardExpiryMonth, cardExpiryYear} = cardExpiry.split('/').map((x) => parseInt(x))
		let currentDate = new Date()
		
		// Guard clauses
		if (cardExpiryMonth < currentDate.getMonth() + 1 && cardExpiryYear <= currentDate.getFullYear()) {
			toast.error('Card has expired')
			throw new Error('Card has expired')
		}
		if (!validateCardNumber(cardNumber) || cardNumber.length < 13
			|| formData.get('cardNumber').length > 19) {
			toast.error('Invalid card number')
			throw new Error('Invalid card number')

		}
		
		transaction.paymentMethod = Object.fromEntries(formData)
	}
	
	
	const handleFinishAndPay = async (event) => {
		// Finishes the payment process and merges the delivery data with the basket data
		event.preventDefault()
		const form = event.target
		const formData = new FormData(form)
		transaction.setDeliveryDetails(Object.fromEntries(formData))
		
		await transaction.submit()
		
	}
</script>

<form id="paymentMethodDialogForm" onsubmit={(e)=>{
	e.preventDefault();
	setPaymentMethod(e).then(
	()=>{paymentDialogOpenState=false}
	).catch((e)=>{}
)}}></form>
<input type="hidden" name="set" value={true} form="paymentMethodDialogForm" />

<div class="flex flex-col h-screen">
	<div class="relative h-[10vh] flex  items-center justify-between w-full  border border-b-[1px]">
		<a href={previousPage}  class="z-10 mx-4">
			<Button variant="ghost"><ArrowLeft stroke-width="1.25" /> Back</Button>
		</a>
		<div class="absolute items-center flex justify-center flex-row size-full">
			<Logo class="!text-4xl" />
		</div>
	</div>
	
	<form class="flex md:flex-row flex-col w-full h-[90vh]" onsubmit={(e)=>{handleFinishAndPay(e)}}>
		<div class="basis-1/2 flex-col flex md:items-end items-center p-6 overflow-y-scroll">
			<div class="md:w-3/4 flex flex-col w-fit gap-2.5">
				<div class="flex flex-col gap-2.5">
					<h3 class="text-2xl">Delivery</h3>
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
				</div>
				<div class="flex flex-col gap-2.5">
					<h3 class="text-2xl">Payment</h3>
					<p class="text-sm text-muted-foreground">Please enter your payment details. <br />We do not store them after receiving your payment.</p>
					<Dialog.Root bind:open={paymentDialogOpenState}>
						{#if !transaction.paymentMethod.set}
						<Dialog.Trigger as="div" class="flex flex-row items-center justify-center h-28 w-full border border-dashed transition-all
						 rounded-xl border-slate-400/50 hover:border-emerald-700/70 hover:bg-emerald-100/60 group">
							<div class="flex flex-row gap-1.5 items-center transition-all">
								<Plus /> Enter a payment method
							</div>
						</Dialog.Trigger>
							{:else}
							<Dialog.Trigger class="flex flex-row items-center h-28 w-full border transition-all p-4 px-6 hover:border-transparent duration-150
						 rounded-xl border-slate-400/50 group justify-between hover:outline-black outline-transparent outline outline-1" as="div">
								<div class="flex flex-row gap-4 item">
									<CreditCard size={28} strokeWidth={1.25} />
									<div class="flex flex-col justify-evenly items-start transition-all">
										<p class="text-lg font-mono">**** **** **** {transaction.paymentMethod.cardNumber.slice(-4)}</p>
										<p class="text-sm text-muted-foreground">
											{cardBrand} • Expires {transaction.paymentMethod.cardExpiry}</p>
									</div>
								</div>
								<Edit2 size={20} strokeWidth={1.25} class="opacity-40 group-hover:opacity-90 transition-all" />
							</Dialog.Trigger>
						{/if}
						
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title class="flex flex-row gap-1.5 items-center"><CreditCard size={20} strokeWidth={1.25} /> Payment details</Dialog.Title>
								<Dialog.Description>Please take care to avoid anyone looking at your screen to prevent fraud.</Dialog.Description>
							</Dialog.Header>
							<div class="flex flex-col gap-2.5">
								<div class="flex flex-row max-h-16 items-center">
									<InputWithLabel bind:value={cardNumber} type="number" class="flex flex-col gap-0.5 w-full h-full z-10 "
																	maxlength="19" minlength="13" name="cardNumber" label="Card number"
																	placeholder="XXXX XXXX XXXX XXXX"
																	form="paymentMethodDialogForm" required>
										<div class="flex flex-row items-center gap-1">
											Card number
											<HelpTooltip>
												<p>Requires a card number with a <span class="font-semibold">valid checksum</span><br /> <br />
												For testing, use 5309018071085996, 348672346862839 or 4539246541686045.
												</p>
											</HelpTooltip>
										</div>
									</InputWithLabel>
									<div class="size-24 pt-3 grid grid-cols-1 grid-rows-1 content-center place-items-center">
									{#if cardBrand === 'Visa'}
										<svg in:fly={{x: -50, z: -10}} out:fly={{x: -50, z: -10}} style="grid-column: 1; grid-row: 1" class="size-full  block m-auto pt-3 content-center items-center place-items-center text-center" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 0 1 1.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 0 0-.149-.199 6.948 6.948 0 0 0-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z"></path></g></svg>
									{:else if cardBrand === 'American Express'}
										<svg in:fly={{x: -50, z: -10}} out:fly={{x: -50, z: -10}} style="grid-column: 1; grid-row: 1"  class="size-full scale-[0.6] block m-auto pt-3 content-center items-center place-items-center text-center" width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  preserveAspectRatio="xMidYMid">
											<title>AMEX</title>
											<g>
												<rect fill="#FFFFFF" x="0" y="0" width="256" height="256"></rect>
												<path d="M0,0 L0,256 L256,256 L256,215.552 L220.672,215.552 L207.616,200.27904 L194.048,215.552 L93.696,215.552 L93.696,134.23104 L60.58496,134.23104 L101.97504,40.53504 L142.24896,40.53504 L151.97696,61.78304 L151.97696,40.53504 L201.984,40.53504 L210.34496,62.80704 L218.53696,40.53504 L256,40.53504 L256,0 L0,0 Z M227.072,53.76 L213.92896,88.40704 L210.432,97.79712 L206.848,88.40704 L193.62304,53.76 L164.69504,53.76 L164.69504,122.03008 L182.10304,122.03008 L182.10304,77.57312 L182.016,68.608 L185.43104,77.57312 L202.07104,122.03008 L218.624,122.03008 L235.35104,77.57312 L238.592,68.69504 L238.592,122.03008 L256,122.03008 L256,53.76 L227.072,53.76 Z M111.36,53.76 L81.152,122.03008 L100.94592,122.03008 L106.24,108.88704 L139.35104,108.88704 L144.64,122.03008 L164.69504,122.03008 L134.656,53.76 L111.36,53.76 Z M119.37792,76.88704 L122.79296,68.35712 L126.208,76.88704 L133.28896,94.12096 L112.29696,94.12096 L119.37792,76.88704 Z M228.43904,134.31808 L207.872,156.416 L187.392,134.31808 L164.69504,134.31808 L107.68896,134.31808 L107.68896,202.32704 L164.69504,202.32704 L164.69504,187.56608 L125.09696,187.56608 L125.09696,175.70304 L163.92704,175.70304 L163.92704,161.02912 L125.09696,161.02912 L125.09696,149.07904 L164.69504,149.07904 L164.69504,134.31808 L196.52096,168.448 L164.69504,202.32704 L186.71104,202.32704 L207.44704,180.14208 L228.096,202.32704 L250.70592,202.32704 L218.79296,168.192 L250.70592,134.31808 L228.43904,134.31808 Z M236.71296,168.11008 L256,187.73504 L256,148.736 L236.71296,168.11008 Z" fill="#006FCF"></path>
											</g>
										</svg>
									
									{:else if cardBrand === 'Mastercard'}
										<svg in:fly={{x: -50, z: -10}} out:fly={{x: -50, z: -10}} style="grid-column: 1; grid-row: 1"  class="size-full block m-auto pt-3 content-center items-center place-items-center text-center" xmlns="http://www.w3.org/2000/svg" width="2.11676in" height="1.5in" viewBox="0 0 152.407 108">
											<g>
												<rect width="152.407" height="108" style="fill: none"/>
												<g>
													<rect x="60.4117" y="25.6968" width="31.5" height="56.6064" style="fill: #ff5f00"/>
													<path d="M382.20839,306a35.9375,35.9375,0,0,1,13.7499-28.3032,36,36,0,1,0,0,56.6064A35.938,35.938,0,0,1,382.20839,306Z" transform="translate(-319.79649 -252)" style="fill: #eb001b"/>
													<path d="M454.20349,306a35.99867,35.99867,0,0,1-58.2452,28.3032,36.00518,36.00518,0,0,0,0-56.6064A35.99867,35.99867,0,0,1,454.20349,306Z" transform="translate(-319.79649 -252)" style="fill: #f79e1b"/>
													<path d="M450.76889,328.3077v-1.1589h.4673v-.2361h-1.1901v.2361h.4675v1.1589Zm2.3105,0v-1.3973h-.3648l-.41959.9611-.41971-.9611h-.365v1.3973h.2576v-1.054l.3935.9087h.2671l.39351-.911v1.0563Z" transform="translate(-319.79649 -252)" style="fill: #f79e1b"/>
												</g>
											</g>
										</svg>
										
										{/if}
									</div>
										</div>
								<InputWithLabel value={transaction.paymentMethod.cardHolder} form="paymentMethodDialogForm" name="cardHolder" label="Name on card" placeholder="Name on card" required>Name on card</InputWithLabel>
								<div class="flex flex-row gap-2.5 flex-grow">
									<InputWithLabel value={transaction.paymentMethod.cardExpiry} form="paymentMethodDialogForm"  name="cardExpiry" label="Expiry date" placeholder="XX/XX"
																	minlength="5" maxlength="5"  required>Expiry date</InputWithLabel>
									<InputWithLabel value={transaction.paymentMethod.cardCVV} form="paymentMethodDialogForm" name="cardCVV" label="CVV"
																	placeholder="2 or 3 character CVV" maxlength="3" minlength="2" required>CVV</InputWithLabel>
								</div>
							</div>
							<Dialog.Footer>
								<Button variant="default" type="submit" form="paymentMethodDialogForm">
									{#if transaction.paymentMethod.set}
										Update
									{:else}
										Save
									{/if}
								</Button>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>
		
		</div>
		<div class="basis-1/2 bg-secondary text-secondary-foreground flex flex-col items-start md:overflow-y-scroll ">
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
				<div class="p-4 justify-self-end z-10 sticky bottom-0 bg-secondary/60 text-muted-foreground backdrop-blur-2xl">
<!--				Content Container	-->
					<div class="flex flex-col md:w-2/3 w-full gap-2.5">
							<p class="flex flex-col items-start  text-black">Total<Price price={basketStore.basket.value} /></p>
						<div class="flex flex-row gap-1.5 text-sm"><p class="font-mono">{basketStore.basket.total}</p> products
							{#if shipmentCount > 1}
								<p>in {shipmentCount} shipments</p>
							{/if}
							•
							<p>Total includes VAT</p></div>
						<Button size="lg" class="w-full p-2.5 shadow-xl" variant="default" type="submit" submit>Finish and Pay</Button>
					</div>
				</div>
			</div>
			
			</div>
	</form>
</div>
