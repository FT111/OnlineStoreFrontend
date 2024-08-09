

export  const fetchCategories = async () => {
	let response = await fetch('http://127.0.0.1:8000/categories').then((response) => response.json())
		.then((data) => {
			return data;
		}).catch((error) => {
			console.error('Error:', error);
		})
	return response;
};
