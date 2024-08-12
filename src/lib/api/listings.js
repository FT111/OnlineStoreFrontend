
import {GET} from './base';

export const fetchListings = async () => {
	return await GET('listings/?limit=24');
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

	console.log(requestString)

	return await GET(requestString)
}