<script>

	import { onMount } from 'svelte';
	import Price from './price.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import Image from '$lib/components/image.svelte';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	export let navElement;
	export let searchElement;
	export let hideSearch = false;
	let basketOpen = false;
	
	let hideClass = '';
	if (hideSearch) {
		hideClass = '-translate-y-32';
	}


	const productsInBasket = [
		{'title': 'Product 1', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 1'},
		{'title': 'Product 2', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 2'},
		{'title': 'Product 3', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 3'},
		{'title': 'Product 4', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 4'},
		{'title': 'Product 5', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 5'},
		{'title': 'Product 6', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 6'},
		{'title': 'Product 7', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 7'},
		{'title': 'Product 8', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 8'},
		{'title': 'Product 9', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 9'},
		{'title': 'Product 10', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 10'},
		{'title': 'Product 11', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 11'},
		{'title': 'Product 12', 'imageURL': 'https://via.placeholder.com/1000', 'price': 1099, 'quantity': 1, 'SKUtitle': 'Product Type 12'}
	]
	
	
</script>


<nav class="fixed top-0 z-50">
	<div bind:this={navElement} class="fixed top-0 w-screen h-16 align-center items-center justify-between
                 flex flex-row p-5 px-8 gap-5 bg-primary //border-t-accent text-white
                 //border-t-[6px] backdrop-blur-2xl z-50 transition-all">
		<a href="/">
			<h2 class="font-bold text-3xl">eBuy</h2>
		</a>
		
		
			<div class="lg:w-1/2 md:w-2/3 transition-all ease-in-out {hideClass}" bind:this={searchElement}>
				<div class="flex flex-row gap-3">
					<Input class="text-black rounded-3xl h-9/10 focus-visible:ring-accent focus-visible:outline-accent focus-visible:ring-offset-0 focus-visible:ring-1" placeholder="Search for anything..." />
					<Button class="rounded-3xl flex flex-row gap-2" variant="secondary">
						<p>Go</p>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
						</svg>
					</Button>
				</div>
			</div>
		
		<div class="flex flex-row w-min gap-7 items-center">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
			</svg>

			
			<Sheet.Root bind:open={basketOpen}>
				<Sheet.Trigger>
					<div>
						<span class="absolute top-3 text-xs bg-secondary rounded-3xl text-primary w-5">{productsInBasket.length}</span>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
						</svg>
					</div>
				</Sheet.Trigger>
				<Sheet.Content class="p-0">
					<div class="flex flex-col justify-between h-full">
						<div class="flex flex-col grow justify-between h-full p-6 pb-2">
							<Sheet.Header>
								<Sheet.Title>Your Basket</Sheet.Title>
								<Sheet.Description class="rounded-2xl grow">
									{#each productsInBasket as product}
										<a href="/listings/1" on:click={() => {basketOpen=false}}>
											<div class="bg-muted rounded-2xl flex flex-row justify-between h-28 gap-2 p-2.5 align-middle items-center">
												<div class="flex flex-row gap-1 h-full w-auto">
													<Image src={product.imageURL} alt="Product " class="w-10 h-10" />
													<div class="flex flex-col p-2">
														<p class="font-semibold text-xl">{product.title}</p>
													
													</div>
												</div>
												<Price price={product.price} />
											</div>
										
										</a>
									{/each}
								</Sheet.Description>
							
							</Sheet.Header>
						</div>
						
						<Sheet.Footer class=" justify-end">
							<div class="h-fit bg-muted w-full flex flex-row gap-8 p-5 mt-2 items-center justify-end">
								<Price price={productsInBasket.reduce((acc, product) => acc + product.price, 0)} />
								
								<a href="/checkout"><Button>Checkout</Button></a>
							</div>
						</Sheet.Footer>
					</div>
				
				</Sheet.Content>
			</Sheet.Root>
			
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root class="text-primary h-9 w-9">
		<!--				<Avatar.Image src="https://via.placeholder.com/100" alt="Avatar" />-->
						<Avatar.Fallback>EB</Avatar.Fallback>
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Profile</DropdownMenu.Item>
						<DropdownMenu.Item>My orders</DropdownMenu.Item>
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Label>My Sales</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Dashboard</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</nav>