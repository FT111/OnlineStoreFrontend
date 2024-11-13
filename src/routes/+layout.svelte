<script>
	import "../app.css";
	import { onMount } from "svelte";
	import { checkConsent, giveConsent, revokeConsent } from '$lib/analytics/consent.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { basket } from '$lib/basket.js';
	let consentPopup;
	
	onMount(() => {
		checkConsent(consentPopup);
	});
	
	$: basket.subscribe(value => {
		console.log(value);
		if (value.length > 0) {
			localStorage.setItem('basket', JSON.stringify(value));
		}
		
		
	});
	
	
</script>


<slot />


<Toaster />

<!--Consent Popup-->
<div bind:this={consentPopup} class="fixed bottom-10 flex-row w-full justify-center items-center transition-all duration-150 ease-in-out hidden">
	<div class="sm:w-3/4 w-full m-2 flex flex-row gap-5 shadow-sm bg-slate-200/70 border-slate-400/40 border-1 border backdrop-blur-xl p-4 rounded-2xl items-center justify-between">
		<div class="flex flex-row gap-5 items-center">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
			</svg>
			
			<div class="flex flex-col gap-1">
				<p class="text-lg font-light"><span class="font-bold">This website uses cookies</span>  <a href="/privacy-policy" class="text-accent">Learn more</a></p>
				<p class="text-sm">We use cookies for <span class="font-semibold">analytics</span>, <span class="font-semibold">personalisation</span> and essential <span class="font-semibold">functionality</span>. You can decline optional cookies.</p>
			
			</div>
		</div>
		
		<div class="flex flex-col sm:flex-row gap-4">
			<Button on:click={() => giveConsent(consentPopup)} class="rounded-xl">Accept</Button>
			<Button on:click={() => revokeConsent(consentPopup)} class="rounded-xl" variant="secondary">Decline</Button>
		</div>
	</div>
</div>