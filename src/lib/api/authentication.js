
import { GET, POST, PUT } from './core.js';


export const token = () => {
	if (!document.cookie.split('; ').find(row => row.startsWith('token='))) {
		return null;
	}
	return document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
}


export const login = async (email, password) => {
	const response = await POST('auth/token/', JSON.stringify({'email': email, 'password': password}));
	document.cookie = `token=${response.data.token}`;

	if (!response.data.token) {
		new Error('Login failed');
	}
	return true;
}


export const logout = async () => {
	await POST('auth/logout/', null);
	sessionStorage.removeItem('token');

	return true;
}

export const signUp = async (username, name, email, password) => {
	const nameSplit = name.split(' ');
	const firstName = nameSplit[0];
	const lastName = nameSplit[nameSplit.length - 1];

	const body = JSON.stringify({'username': username, 'firstName': firstName,
																							'surname': lastName, 'email': email, 'password': password});
	console.log(body);
	const response = await PUT('users/', body);

	if (!response.data.token) {
		new Error('Sign up failed');
	}

	document.cookie = `token=${response.data.token}`;

	return true;
}