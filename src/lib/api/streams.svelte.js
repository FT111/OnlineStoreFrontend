import { baseURL } from '$lib/api/core.js';
import { token } from '$lib/api/authentication.js';
import { SSE } from 'sse.js';
import { onMount } from 'svelte';

// SSE pushed live stats using sse.js polyfill

// To be updated to the object above from a component
export let UpdateSteam = $state({
	stream: null
});

export const createUpdateStream = (userID) => {
	 const stream = new SSE(`${baseURL}users/${userID}/updates`,
		{
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${token()}`
			}
		}
	);

	return {
		get () {
			return stream;
		},
		subscribe (callback) {
			stream.onmessage = (event) => {
				callback(JSON.parse(event.data));
			};


		}
	}

}

export const updateStreamFactory = (userID) => {
	UpdateSteam.stream = createUpdateStream(userID);
}

