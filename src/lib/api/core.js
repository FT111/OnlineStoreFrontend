import { browser } from '$app/environment';
import { isConsentGiven } from '$lib/analytics/consent.js';

export const baseURL = 'http://localhost:8000/'

const formHeaders = (token=null) => {
	// Gets JWT authorisation token from session storage
	if (browser && !token) {
		token = sessionStorage.getItem('token');
	}
	if (browser && isConsentGiven()) {

	}

	let headers = {'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': 'http://localhost:8000'}
	// If token exists, add it to the headers to provide credentials to the server
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}
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
			credentials: credentialsOpt,
		}
	).then((response) => response.json())
		.then((data) => {
			return data;
		}).catch((error) => {
			console.error('Error:', error);
		});

}

export const POST = async (endpoint, data, credentialsOpt='omit') => {
	return await fetch(baseURL + endpoint, {
		method: 'POST',
		headers: formHeaders(),
		body: data,
		credentials: credentialsOpt,

	}).then((response) => response.json())
		.then((data) => {
			return data;
		}).catch((error) => {
			console.error('Error:', error);
		});
}

export const PUT = async (endpoint, data, token=null, credentialsOpt='omit') => {
	return await fetch(baseURL + endpoint, {
		method: 'PUT',
		headers: formHeaders(token),
		body: data,
		credentials: credentialsOpt,

	}).then((response) => response.json())
		.then((data) => {
			return data;
		}).catch((error) => {
			console.error('Error:', error);
		});
}