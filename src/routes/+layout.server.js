import { me } from '$lib/api/user.js';

export async function load({ locals } ) {

	let user;
	if (locals.user) {
		user = locals.user;
	}
	return {
		'user': user,
	}
}