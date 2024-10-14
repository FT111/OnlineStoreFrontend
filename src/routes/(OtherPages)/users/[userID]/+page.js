
import { getUserByID } from '$lib/api/user.js';

export const load = async ({ params }) => {
	const user = await getUserByID(params['userID']);
	return {
		profileUser: {
			...user.data
		}
	}
}