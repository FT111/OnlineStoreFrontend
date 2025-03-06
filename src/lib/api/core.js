import { browser } from '$app/environment';
import { isConsentGiven } from '$lib/analytics/consent.js';
import { token } from '$lib/api/authentication.js';

export const baseURL = 'http://localhost:8000/'

const formHeaders = (userToken) => {

	// If token is not provided, check if it exists in the browser
	// Allows for it to be used in the server
	if (browser && !userToken) {
		userToken = token()
	}

	let headers = {'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',}
	// If token exists, add it to the headers to provide credentials to the server
	if (userToken) {
		headers['Authorization'] = `Bearer ${userToken}`;
	}
	// Adds analytics consent header if user has given consent
	if (browser && isConsentGiven()) {
		headers['X-Analytics-Consent'] = 'true';
	} else {
		headers['X-Analytics-Consent'] = 'false';
	}

	return headers;
}

export const GET = async (endpoint, token=null, credentialsOpt='omit') => {
	return await fetch(baseURL + endpoint,
		{
			method: 'GET',
			headers: formHeaders(token),
			credentials: 'include',
		}
	).then((response) => response.json()
		.then((data) => {
			if (!response.ok) {
				return new Error(data.detail[0]);
			}
			return data;
		}).catch((error) => {
			return error
		}));
}

export const POST = async (endpoint, data = null, credentialsOpt='omit') => {
	return await fetch(baseURL + endpoint, {
		method: 'POST',
		headers: formHeaders(),
		body: data ? data : null, // If data is not provided, send null
		credentials: 'include',

	}).catch((error) => {
		console.log('Error: ', error);
		return error
	}).then((response) => {console.log(response);return response.json()
		.then((data) => {
			console.log('Data: ', data);
			if (!response.ok) {
				return data
			}
			return data
		}).catch((error) => {
			return error
		}
		);
	}
	);
}

export const PUT = async (endpoint, data, token=null, credentialsOpt='omit') => {
	return await fetch(baseURL + endpoint, {
		method: 'PUT',
		headers: formHeaders(),
		body: data,
		credentials: 'include',

	}).then((response) => response.json()
		.then((data) => {
			return data
		}).catch((error) => {
			return error
		}
		));
}