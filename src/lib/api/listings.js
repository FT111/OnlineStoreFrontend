



export const fetchListings = async () => {
	let response = await fetch('http://127.0.0.1:8000/listings/?limit=24&sort=price&order=asc', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	}).then((response) => response.json())
		.then((data) => {
			return data;
		}).catch((error) => {
			console.error('Error:', error);
		})
	return response;
};