
<script>
	import { baseURL } from '$lib/api/core.js';
	import {Input} from "$lib/components/ui/input"
	import { Card } from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { signUp } from '$lib/api/authentication.js';
	import AuthButton from '$lib/components/authButton.svelte';
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
		import { Label } from '$lib/components/ui/dropdown-menu/index.js';

	
	let passwordInput;
	let passwordConfirmInput;
	
	// Passwords matching?


	let email;
	let password;
	let username;
	let confirmPassword;
	let name;
	let signInFormElement;
	let submitBtnElement;
	let signIn;

	async function handleSignUp() {
		console.log('Signing up');
		if (confirmPassword === password) {
			console.log('Passwords match');
			await signUp(username, name, email, password);
		}
	}

</script>

<div class="flex flex-row w-full md:p-4 p-2 h-screen gap-2">
	
	<!--	Form -->
	<div class="flex flex-col grow h-full items-center justify-center">
		
		<Card class="flex flex-col justify-between basis-7/12 md:p-16 md:px-4 p-8 md:w-2/3 gap-8 sm:w-4/5 w-full bg-slate-50 border-0 shadow-none rounded-2xl items-center">
			<div class="flex flex-col gap-1 items-center">
				<h1 class="text-5xl font-bold text-primary">Welcome!</h1>
				<p class="font-medium text-slate-600">Sign up and start selling today</p>
			</div>
			
			
			<form bind:this={signInFormElement} on:submit={signIn} class="flex flex-col gap-4 md:w-5/6 w-full">
				<Input bind:value={name} type="text" required placeholder="Your first and last name" name="name" />
				<Input bind:value={username} type="text" required placeholder="Username" name="username" />
				<Input bind:value={email} type="email" required placeholder="Email" name="email" />
				<Input bind:this={passwordInput} bind:value={password} type="password" required placeholder="Password" name="password"  />
				<Input bind:this={passwordConfirmInput} bind:value={confirmPassword} type="password" required placeholder="Confirm Password" name="passwordConfirm" />
				
				
				<AuthButton bind:this={submitBtnElement} authFunction={handleSignUp} bind:onPress={signIn} class="w-full justify-between hover:drop-shadow-xl drop-shadow-none transition-all duration-150 ">
					Sign up
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>

				</AuthButton>
			</form>
		
		</Card>
		
		<p class="space-x-2.5 text-slate-800/70">
			<a href="/login">
				<Button variant="outline"  class="mt-16 font-semibold text-slate-900">Or Log in</Button>
			</a>
			<span>if you're returning</span>
		</p>
	
	</div>
	
	<!--	Image -->
	<div class="h-full hidden md:flex basis-1/2 p-7 rounded-3xl text-white bg-primary overflow-hidden">
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
			<defs>
				<pattern id="bg" patternUnits="userSpaceOnUse" width="80" height="40" stroke-width="1.5" stroke="currentColor" fill="none" >
					<path class="translate-x-10 stroke-slate-600/35" stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
					<path class="stroke-slate-600/80" stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#bg)"/>
		</svg>
	
	
	</div>

</div>