import { me } from '$lib/api/user.js';

export const handle = async ({ event, request, resolve }) => {

	const token = event.cookies.get('token');
	console.log(`Token: ${token}`);

	if (token) {
		await me(token).then((data) => {
			event.locals.user = data.data;

		});
	}

	return resolve(event);

}