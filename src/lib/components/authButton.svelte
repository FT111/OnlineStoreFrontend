
<script>
 
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';
	
	import { fade } from 'svelte/transition';
	export let authFunction;
	
	let btnElement;
	let btnAnimationClasses = '';
	let state = 'default';
	
	export const onPress = (event) => {
		event.preventDefault();
		state = 'processing';
		btnAnimationClasses = ' brightness-125 text-slate-50 disabled fill-slate-50 outline-[3px] outline-slate-500/40 '
	  
	  		authFunction().then(() => {
			state = 'success';
			btnAnimationClasses = 'bg-emerald-300 outline-emerald-700 outline-[3px] fill-primary text-primary disabled '
			setTimeout(() => {
				btnAnimationClasses = ' bg-primary ';
					
				  goto('/listings')
				  goto('/')
			}, 750);
		}).catch(() => {
			state = 'error';
			btnAnimationClasses = 'bg-red-800 text-slate-50 '
			setTimeout(() => {
				state = 'default';
				btnAnimationClasses = '';
			}, 2000);
		});
		
		
	}
</script>

<Button bind:this={btnElement} {...$$props} type="submit" class="w-full justify-between hover:drop-shadow-xl drop-shadow-none outline outline-0 transition-all duration-250 {btnAnimationClasses}"><div />
	{#if state === 'default'}
		<slot />

	{:else if state === 'processing'}
		Authenticating...
		<svg class="fill-slate-50 border-slate-50 text-slate-50 stroke-slate-50 motion-safe:animate-pulse " width="24" height="24" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}</style><g class="spinner_V8m1"><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" class="stroke-slate-50" ></circle></g></svg>
		
	{:else if state === 'success'}
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
			<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
		</svg>
		<div />
	{:else if state === 'error'}
		Email or password incorrect
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
		</svg>


	{/if}
</Button>