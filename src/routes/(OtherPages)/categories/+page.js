
import { fetchCategories } from '$lib/api/categories.js';

export const load = async () => {
	const categoryData = await fetchCategories();
	return {
		categories: {
			...categoryData.data
		}
	};
};