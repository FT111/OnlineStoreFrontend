
import { GET, POST } from './core.js';

export const me = async (token=null) => {
	return GET('users/me', token);
}

export const getUserByID = async (id, token=null) => {
	return GET(`users/${id}`, token);
}

export const requestPasswordReset = async (email) => {
	return POST('users/reset', JSON.stringify({'email': email}));
}