
export const baseURL = 'http://localhost:8000/'

const formHeaders = () => {
	// Gets JWT authorisation token from session storage
	const token = sessionStorage.getItem('token');

	let headers = {'Content-Type': 'application/json', }
	// If token exists, add it to the headers to provide credentials to the server
	if (token) {
		headers['Authorization'] = `JWT ${token}`;
	}

	return headers;
}

export const GET = async (endpoint) => {


	return await fetch(baseURL + endpoint,
		{
			method: 'GET',
			headers: formHeaders()
		}
	).then((response) => response.json())
		.then((data) => {
			return data;
		}).catch((error) => {
			console.error('Error:', error);
		});

}

export const POST = async (endpoint, data) => {
	return await fetch(baseURL + endpoint, {
		method: 'POST',
		headers: formHeaders(),
		body: data

	}).then((response) => response.json())
		.then((data) => {
			return data;
		}).catch((error) => {
			console.error('Error:', error);
		});
}