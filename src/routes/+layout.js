import { me } from '$lib/api/user.js';

export async function load() {
	let user = null;
	await me().then((data) => {
		if (!data) {
			return null;
		}
		user = data.data;
	}).catch((error) => {
		console.error('Error:', error);
	});

	return {
		'user': user
	}
}