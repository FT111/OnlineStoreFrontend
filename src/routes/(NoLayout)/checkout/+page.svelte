
<script>
	import Logo from "$lib/branding/logo.svelte";
	import { basketStore } from '$lib/basket.svelte.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import SkuRow from '$lib/components/sales/SKUrow.svelte';
	import Price from '$lib/components/price.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeft, CheckCheck, CheckCircle, Circle, CreditCard, Plus } from 'lucide-svelte';
	import { afterNavigate } from '$app/navigation';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { fly } from 'svelte/transition';
	import { Payment } from '$lib/payments.svelte.js';
	
	const { data } = $props()
	let previousPage = $state('/')
	// Stores temporarily to provide visual feedback
	let cardNumber = $state('')
	
	let transaction = Payment();
	$inspect(transaction.paymentMethod)
	
	afterNavigate(({from}) => {
		previousPage = from?.url.pathname || previousPage
	})
	
	const validateCardNumber = (cardNumber) => {
		let sum = 0
		let isSecond = false
		for (let i = cardNumber.length - 1; i >= 0; i--) {
			let d = cardNumber[i] - '0'
			if (isSecond) {
				d = d * 2
			}
			sum += Math.floor(d / 10) + d % 10
			isSecond = !isSecond
		}
		return sum % 10 === 0
	}

	async function setFromForm(target, formEvent) {
		return new Promise(async (resolve, reject) => {
			const form = formEvent.target;

			transaction.paymentMethod = (Object.fromEntries(new FormData(form)))
			resolve(transaction.paymentMethod)
		})
	}
	
	
	const handleFinishAndPay = async (event) => {
		// Finishes the payment process and merges the delivery data with the basket data
		event.preventDefault()
		const form = event.target
		const formData = new FormData(form)
		const data = Object.fromEntries(formData)
		console.log(data)
		
	}
	
	$effect(() => {
		console.log(transaction)
	})
</script>

<form id="paymentMethodDialogForm" onsubmit={(e)=>{console.log('moew?');setFromForm(transaction.setPaymentMethod, e)}}></form>

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
			<div class="md:w-3/4 flex flex-col w-fit">
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
						{#if data.user.addressLine1}
							<p class="flex flex-row gap-1 text-muted-foreground items-center self-end text-sm"><CheckCircle size="15" /><span>Using your saved address</span></p>
						{/if}
					</div>
				</div>
				<div class="flex flex-col gap-2.5">
					<h3 class="text-2xl">Payment</h3>
					<p class="text-sm text-muted-foreground">Please enter your payment details. <br />We do not store them after receiving your payment.</p>
					<Dialog.Root>
						<Dialog.Trigger as="div" class="flex flex-row items-center justify-center h-28 w-full border border-dashed transition-all
						 rounded-xl border-slate-400/50 hover:border-emerald-700/70 hover:bg-emerald-100/60 group">
							<div class="flex flex-row gap-1.5 items-center group-hover:scale-[1.02] transition-all">
								<Plus /> Enter a payment method
							</div>
						</Dialog.Trigger>
						
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title class="flex flex-row gap-1.5 items-center"><CreditCard size={20} strokeWidth={1.25} /> Payment details</Dialog.Title>
								<Dialog.Description>Please take care to avoid anyone looking at your screen to prevent fraud.</Dialog.Description>
							</Dialog.Header>
							<div class="flex flex-col gap-2.5">
								<div class="flex flex-row max-h-16 items-center">
									<InputWithLabel bind:value={cardNumber} type="number" class="flex flex-col gap-0.5 w-full h-full z-10 "
																	maxlength="16" sv="8" name="cardNumber" label="Card number"
																	placeholder="XXXX XXXX XXXX XXXX"
																	form="paymentMethodDialogForm" required>Card number</InputWithLabel>
									<div class="size-24 grid grid-cols-1 grid-rows-1 content-center place-items-center">
									{#if cardNumber?.toString().startsWith('4')}
										<svg in:fly={{x: -50, z: -10}} out:fly={{x: -50, z: -10}} style="grid-column: 1; grid-row: 1" class="size-full  block m-auto pt-3 content-center items-center place-items-center text-center" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 0 1 1.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 0 0-.149-.199 6.948 6.948 0 0 0-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z"></path></g></svg>
									{:else if cardNumber?.toString().startsWith('5') || cardNumber?.toString().startsWith(('3'))}
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
								<div class="flex flex-row gap-2.5 flex-grow">
									<InputWithLabel form="paymentMethodDialogForm"  name="cardExpiry" label="Expiry date" placeholder="XX/XX"
																	minlength="5" maxlength="5" required>Expiry date</InputWithLabel>
									<InputWithLabel form="paymentMethodDialogForm" name="cardCVV" label="CVV" placeholder="2 or 3 character CVV"
																	minlength="2" maxlength="3" type="number" required>CVV</InputWithLabel>
								</div>
							</div>
							<Dialog.Footer>
								<Button variant="default" type="submit" form="paymentMethodDialogForm">Add<Plus /></Button>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>
		
		</div>
		<div class="basis-1/2 bg-secondary text-secondary-foreground flex flex-col items-start md:overflow-y-scroll ">
			<div class="md:max-w-full flex flex-col w-full h-full">
				<h2 class="p-6 pb-2 z-10 text-2xl top-0 sticky bg-secondary/80 w-full text-left backdrop-blur-2xl">Summary</h2>
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
						<ul>
							<li class="flex flex-row gap-1.5">{basketStore.basket.total} products — <p>Total includes VAT</p></li>
							<li class="flex flex-col items-start text-sm text-black">Total<Price price={basketStore.basket.value} /></li>
						</ul>
						<Button size="lg" class="w-full p-2.5 shadow-xl" variant="default" type="submit" submit>Finish and Pay</Button>
					</div>
				</div>
			</div>
			
			</div>
	</form>
</div>
