
import {GET, POST} from './core.js';

export const fetchListings = async () => {
	return await GET('listings/?limit=24');
}

export const fetchListing = async (id, includePrivileged) => {
	return await GET(`listings/${id}${includePrivileged ? '?includePrivileged=true' : ''}`);
}

export const newListing = async (data) => {
	const body = JSON.stringify(data)
	return await POST('listings/', body);
}

export const queryListings = async (query=null, category=null, subCategory=null, sort=null, order=null, username=null) => {

	let requestString = `listings/?`
	if (query) {
		requestString += `query=${query}&`
	}
	if (category && category !== 'All Categories' && category !== 'Categories') {
		requestString += `category=${category}&`
	}
	if (subCategory && subCategory !== 'All Sub Categories' && subCategory !== 'Sub Categories') {
		requestString += `subCategory=${subCategory}&`
	}
	if (sort) {
		requestString += `sort=${sort}&`
	}
	if (order) {
		requestString += `&order=${order.toLowerCase().slice(0, -1)}`
	}
	if (username) {
		requestString += `&username=${username}`
	}

	requestString += `&limit=36`

	console.log('REQUEST STRING: ',requestString)
	return await GET(requestString)
}

export const fetchUserListings = async (userID, includePrivileged=false) => {
	return await GET(`users/${userID}/listings${includePrivileged ? '?includePrivileged=true' : ''}`);
}