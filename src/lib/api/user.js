
import { GET } from './core.js';

export const me = async (token=null) => {
	return GET('users/me', token);
}