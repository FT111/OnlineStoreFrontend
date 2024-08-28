
import {GET} from './base';

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
	if (category) {
		requestString += `category=${category}&`
	}
	if (subCategory) {
		requestString += `subCategory=${subCategory}&`
	}
	if (sort) {
		requestString += `sort=${sort}`
	}
	if (order) {
		requestString += `&order=${order}`
	}

	requestString += `&limit=36`
	return await GET(requestString)
}