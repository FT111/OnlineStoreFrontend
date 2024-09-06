
import {GET} from './core.js';

export const fetchListings = async () => {
	return await GET('listings/?limit=24');
}

export const fetchListing = async (id) => {
	return await GET(`listings/${id}`);
}

export const queryListings = async (query, category, subCategory, sort, order) => {

	let requestString = `listings/?`
	if (query) {
		requestString += `query=${query}&`
	}
	if (category && category !== 'All Categories' && category !== 'Categories') {
		requestString += `category=${category}&`
	}
	if (subCategory && subCategory !== 'All Subcategories' && subCategory !== 'Sub Categories') {
		requestString += `subCategory=${subCategory}&`
	}
	if (sort) {
		requestString += `sort=${sort}&`
	}
	if (order) {
		requestString += `&order=${order.toLowerCase().slice(0, -1)}`
	}

	requestString += `&limit=36`

	console.log('REQUEST STRING: ',requestString)
	return await GET(requestString)
}