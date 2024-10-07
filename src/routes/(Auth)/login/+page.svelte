
<script>
  	import { baseURL } from '$lib/api/core.js';
	import {Input} from "$lib/components/ui/input"
	import { Card } from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { login } from '$lib/api/authentication.js';
	import AuthButton from '$lib/components/authButton.svelte';
	import { enhance } from '$app/forms';
		import { goto, invalidateAll } from '$app/navigation';
	
		
	let email;
	let password;
	let signInFormElement;
	let submitBtnElement;
	let signIn;
	
	async function handleLoginAttempt() {
		await login(email, password)
	}
</script>

<div class="flex flex-row w-full md:p-4 p-2 h-screen">
<!--	Image -->
	<div class="h-full hidden md:flex basis-1/2 p-7 rounded-3xl text-white bg-primary overflow-hidden">
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
			<defs>
				<pattern id="bg" patternUnits="userSpaceOnUse" width="80" height="40" stroke-width="1.5" stroke="currentColor" fill="none" >
					<path class="stroke-slate-600/60" stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
					<path class="translate-x-10 stroke-slate-600/80" stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#bg)"/>
		</svg>
	
	
	</div>
	
<!--	Form -->
	<div class="flex flex-col grow h-full items-center justify-center">
		
		<Card class="flex flex-col justify-between basis-7/12 md:p-16 md:px-16 p-8 w-fit border-slate-200/20 bg-slate-100 shadow-none rounded-2xl items-center">
			<div class="flex flex-col gap-1 items-center">
				<h1 class="text-5xl font-bold text-primary">Welcome back!</h1>
				<p class="font-medium text-slate-600">Please sign in to your account</p>
			</div>

			
			<form bind:this={signInFormElement} on:submit={signIn} class="flex flex-col gap-4 md:w-5/6 w-full">
				<Input bind:value={email} type="email" required placeholder="Email" name="username" />
				<Input bind:value={password} type="password" required placeholder="Password" name="password"  />
				
				<AuthButton bind:this={submitBtnElement} authFunction={handleLoginAttempt} bind:onPress={signIn} class="w-full justify-between hover:drop-shadow-xl drop-shadow-none transition-all duration-150">
					Sign in
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
					</svg>
				</AuthButton>
			</form>
		
		</Card>
		
		<a href="/signup">
			<Button variant="outline"  class="mt-16 font-semibold">Or Sign up</Button>
		</a>

	</div>
</div>