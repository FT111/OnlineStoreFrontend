
import { GET } from './core.js';

export const me = async () => {
	return GET('users/me');
}