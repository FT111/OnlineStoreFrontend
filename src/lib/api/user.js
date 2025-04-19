
import { GET, POST, PUT } from './core.js';

export const me = async (token=null) => {
	return GET('users/me', token);
}

export const updateUser = async (user) => {
	return PUT(`users/${user.id}`, JSON.stringify(user));
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

export const fetchStatistics = async (start, end) => {
	return GET(`users/me/statistics/${start}/${end}`);
}

export const fetchUserReviews = async (id) => {
	return GET(`users/${id}/reviews`);
}

export const submitUserReview = async (id, review) => {
	return POST(`users/${id}/reviews`, JSON.stringify(review));
}