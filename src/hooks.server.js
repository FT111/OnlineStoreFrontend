import { me } from '$lib/api/user.js';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export const handle = async ({ event, request, resolve }) => {

	const token = event.cookies.get('token');

	if (token) {
		await me(token).then((data) => {
			if (!data) {
				return resolve(event);
			}
			event.locals.user = data.data;

		});
	}

	// Protect routes that require authentication
	if (event.locals.user) {
		return resolve(event);
	}
	if (event.url.pathname.startsWith('/sales') ||
		event.url.pathname.startsWith('/account') ||
		event.url.pathname.startsWith('/checkout')) {

		redirect(302, `/login?src=${event.url.pathname + event.url.search}`);
	}


	return resolve(event);

}