import {browser} from '$app/environment';
import { goto, invalidateAll } from '$app/navigation';

export const load = () => {
	if (browser) {
		// Remove token from session storage
		sessionStorage.removeItem('token');
		// Redirect to home page
		invalidateAll().then(() => {
			goto('/');
		});
	}
}