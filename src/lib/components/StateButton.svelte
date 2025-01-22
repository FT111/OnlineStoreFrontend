<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto, invalidateAll } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';
	import { X } from 'lucide-svelte';

	export let authFunction;
	export let text = true;

	let btnElement;
	let btnDisabled = false;
	let btnAnimationClasses = '';
	let state = 'default';

	export const onPress = (event, goHome=false) => {
		event.preventDefault();
		btnDisabled = true;
		state = 'processing';
		btnAnimationClasses = ' brightness-125 text-slate-50 disabled fill-slate-50 outline-[4px] outline-slate-600/40 ';

		authFunction().then((res) => {
			state = 'success';
			btnAnimationClasses = 'bg-emerald-300 outline-emerald-700 outline-[3px] fill-primary text-primary disabled ';
			
			if (!res) {
				return;
			}
			
			
			if (goHome) {
				setTimeout(async () => {
					await invalidateAll();
					await goto('/');
				}, 250);
			}
		}).catch(() => {
			state = 'error';
			btnAnimationClasses = 'bg-red-700 text-slate-50 ';
			setTimeout(() => {
				state = 'default';
				btnAnimationClasses = '';
				btnDisabled = false;
			}, 2000);
		});
	}
</script>

<style>
    .buttonState {
        grid-column: 1;
        grid-row: 1;
				@apply items-center;
    }
</style>

<Button disabled={btnDisabled} bind:this={btnElement} {...$$props} type="submit"  class="grid grid-rows-1 grid-cols-1 w-full justify-between overflow-hidden disabled:opacity-100 hover:shadow-xl shadow-accent/100  shadow-none outline outline-2 outline-accent transition-all duration-250 {btnAnimationClasses}">
	{#if state === 'default'}
		<div in:fly={{y:-20, easing: backInOut, duration: 700}} class="buttonState w-full justify-between flex flex-row h-full ">
			<div />
			<slot />
		</div>
	
	{:else if state === 'processing'}
		<div in:fade={{duration: 700}} out:fly={{y:-20, easing: backInOut, duration: 700}} class="buttonState w-full justify-between flex flex-row h-full ">
			<div />
			<p in:fly={{y:20, easing: backInOut, duration: 700}}>Authenticating...</p>
			<svg class="fill-slate-50 border-slate-50 text-slate-50 stroke-slate-50 motion-safe:animate-pulse" width="24" height="24" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<style>.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}</style>
				<g class="spinner_V8m1">
					<circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" class="stroke-slate-50"></circle>
				</g>
			</svg>
		</div>
	
	{:else if state === 'success'}
		<div in:fly={{ y: 20, easing: backInOut, duration: 700 }} out:fly={{ y: 20, easing: backInOut, duration: 700 }} class="buttonState w-full justify-between flex flex-row h-full">
			<div />
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
				<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
			</svg>
			
			<div />
		</div>
	
	{:else if state === 'error'}
		<div in:fly={{ y: 20, easing: backInOut, duration: 700 }} out:fly={{ y: 20, easing: backInOut, duration: 700 }} class="buttonState w-full justify-center flex flex-row h-full">
			<X strokeWidth="1.25"  />
		</div>
	{/if}
</Button>