
<script>
	// This script is used to track the impression of listings on the page
	// Placed with each listing component
	
	import { registerListingImpression } from '$lib/analytics/listings.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let viewTime;
	
	let {
		listing,
		listingRef,
	} = $props();
	
	onMount(() => {
	let observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Track the impression of the listing
				// Waits for listing to be in view for 1.5 seconds
				
				viewTime = setTimeout(() => {
					registerListingImpression(listing);
					observer.unobserve(entry.target);
				}, 1500);
			} else {
				clearTimeout(viewTime);
			}
		});
	}, {
		rootMargin: '0px',
		threshold: 0.8
	});
	
	if (listingRef) {
		observer.observe(listingRef);
	}
	
	})
	
</script>