
import {GET} from './base';

export const fetchCategories = async () => {
	return await GET('categories/');
}