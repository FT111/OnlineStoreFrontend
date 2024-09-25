

export const handle = async ({event, resolve}) => {

	event.locals.user = {
		id: 424242,
		name: 'John Doe',
		email: 'johndoe@example.com',
	}

	const response = await resolve(event);

	return response;

}