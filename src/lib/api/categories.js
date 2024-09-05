
import {GET} from './core.js';

export const fetchCategories = async () => {
	return await GET('categories/');
}

export const fetchCategory = async (categoryName) => {
	return await GET(`categories/${categoryName}`);
}