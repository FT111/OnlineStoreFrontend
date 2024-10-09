
import { POST, PUT } from './core.js';

export const login = async (email, password) => {
	const response = await POST('auth/token/', JSON.stringify({'email': email, 'password': password}));

	if (!response.data.token) {
		return false;
	}
	document.cookie = `token=${response.data.token}; path=/;`;
	sessionStorage.setItem('token', response.data.token);

	return true;
}



export const signUp = async (username, name, email, password) => {
	const nameSplit = name.split(' ');
	const firstName = nameSplit[0];
	const lastName = nameSplit[nameSplit.length - 1];
	const response = await PUT('users', JSON.stringify({'username': username, 'firstName': firstName, 'surname': lastName, 'email': email, 'password': password}));

	if (!response.data.token) {
		return false;
	}
	document.cookie = `token=${response.data.token}; path=/;`;
	sessionStorage.setItem('token', response.data.token);

	return true;
}