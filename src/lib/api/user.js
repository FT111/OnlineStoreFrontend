
import { GET, POST } from './core.js';

export const me = async (token=null) => {
	return GET('users/me', token);
}

export const getUserByID = async (id, token=null) => {
	return GET(`users/${id}`, token);
}

export const requestPasswordReset = async (email) => {
	return POST('users/requestPasswordReset', JSON.stringify({'email': email}));
}

export const resetPassword = async (token, password) => {
	return POST(`users/resetPassword`, JSON.stringify({'token': token, 'password': password}));
}

export const getStatistics = async (start, end) => {
	return GET(`users/me/statistics/${start}/${end}`);
}