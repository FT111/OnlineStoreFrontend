
import { GET, POST, PUT } from './core.js';
import { invalidateAll } from '$app/navigation';
import { toast } from 'svelte-sonner';


export const token = () => {
	if (!document.cookie.split('; ').find(row => row.startsWith('token='))) {
		return null;
	}
	return document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
}


export const login = async (email, password) => {
	const response = await POST('auth/token/', JSON.stringify({'email': email, 'password': password}))
		.then((response) => {
			if (response.detail) {
				toast.error(response.detail[0]?.ctx?.reason || response.detail[0]?.msg || response.detail);
			}
			return response;
		})
	document.cookie = `token=${response.data.token}; path=/;`;
	return true;
}

export const signUp = async (username, name, email, password) => {
	const nameSplit = name.split(' ');
	const firstName = nameSplit[0];
	const lastName = nameSplit[nameSplit.length - 1];

	const body = JSON.stringify({'username': username, 'firstName': firstName,
																							'surname': lastName, 'emailAddress': email, 'password': password});
	console.log(body);
	const response = await PUT('users/', body);

	if (!response.data.token) {
		new Error('Sign up failed');
	}

	document.cookie = `token=${response.data.token}`;

	return true;
}

export const logout = async () => {
	await POST('auth/logout/', null);
	document.cookie.split(';').forEach(function(c) {
		const split = c.trim().split('=');
		document.cookie = `${split[0]}=; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/;`;
	});

	await invalidateAll().then
	(() => {
		sessionStorage.removeItem('token');
		return true;
	});
	return false;
}