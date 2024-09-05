
const baseURL = 'http://localhost:8000/'

export const GET = async (endpoint) => {
	return await fetch(baseURL + endpoint).then((response) => response.json())
		.then((data) => {
			return data;
		}).catch((error) => {
			console.error('Error:', error);
		});

}

export const POST = async (endpoint, data) => {
	return await fetch(baseURL + endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	}).then((response) => response.json())
		.then((data) => {
			return data;
		}).catch((error) => {
			console.error('Error:', error);
		});
}