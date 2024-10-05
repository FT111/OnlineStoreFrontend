
import { POST } from './core.js';

export const login = async (email, password) => {
	const response = await POST('auth/token/', JSON.stringify({'email': email, 'password': password}));

	if (!response.data.token) {
		return false;
	}
	document.cookie = `token=${response.data.token}; path=/;`;
	sessionStorage.setItem('token', response.data.token);

	return true;
}