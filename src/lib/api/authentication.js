
import { POST, PUT } from './core.js';

export const login = async (email, password) => {
	const response = await POST('auth/token/', JSON.stringify({'email': email, 'password': password}));

	if (!response.data.token) {
		new Error('Login failed');
	}
	document.cookie = `token=${response.data.token}; path=/;`;
	sessionStorage.setItem('token', response.data.token);

	return true;
}



export const signUp = async (username, name, email, password) => {
	const nameSplit = name.split(' ');
	const firstName = nameSplit[0];
	const lastName = nameSplit[nameSplit.length - 1];

	const body = JSON.stringify({'username': username, 'firstName': firstName, 'surname': lastName, 'email': email, 'password': password});
	console.log(body);
	const response = await PUT('users/', body);

	if (!response.data.token) {
		new Error('Sign up failed');
	}
	document.cookie = `token=${response.data.token}; path=/;`;
	sessionStorage.setItem('token', response.data.token);

	return true;
}