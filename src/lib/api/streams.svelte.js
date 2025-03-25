import { baseURL } from '$lib/api/core.js';
import { token } from '$lib/api/authentication.js';
import { SSE } from 'sse.js';
import { onMount } from 'svelte';
import { toast } from 'svelte-sonner';

// SSE pushed live stats using sse.js polyfill

let UpdateStream = $state()
export let updateStreamData = $state({
	data: {},
	lastUpdate: 0
})


export const createUpdateStream = (userID) => {
	UpdateStream = new SSE(`${baseURL}users/${userID}/updates`, {
		headers: {
			Authorization: `Bearer ${token()}`
		}
	});

	UpdateStream.addEventListener('userStatsUpdate', (event) => {
		console.log('User Stats Update:', event.data);
		updateStreamData.data = JSON.parse(event.data.replace(/'/g, '"'));
		updateStreamData.lastUpdate = new Date().getTime();
	});

	UpdateStream.addEventListener('sale',
		(event) => {
			toast.success('New sale!');
		}
		)

}