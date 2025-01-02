
import { GET, POST, PUT } from './core.js';
const offset = 25;

export const fetchListings = async () => {
	return await GET('listings/?limit=35');
}

export const fetchListing = async (id, includePrivileged) => {
	return await GET(`listings/${id}${includePrivileged ? '?includePrivileged=true' : ''}`);
}

export const newListing = async (data) => {
	const body = JSON.stringify(data)
	return await POST('listings/', body);
}

export const newSKU = async (listingId, data) => {
	if (data.discount === '' || data.discount === '0') {
		data.discount = null;
	} else {
		data.discount = Number(data.discount);
	}
	const body = JSON.stringify(data)
	return await POST(`listings/${listingId}/sku`, body);
}

export const updateListing = async (id, data) => {
	const body = JSON.stringify(data)
	return await PUT(`listings/${id}`, body);
}

export const updateSKU = async (id, data) => {
	const body = JSON.stringify(data)
	return await PUT(`listings/${id}/${data.id}`, body);
}


export const queryListings = async (query=null, category=null, subCategory=null, sort=null, order=null, username=null, page=1) => {

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

	requestString += `&limit=36&offset=${page*offset-offset}`

	console.log('REQUEST STRING: ',requestString)
	return await GET(requestString)
}

export const fetchUserListings = async (userID, includePrivileged=false) => {
	return await GET(`users/${userID}/listings${includePrivileged ? '?includePrivileged=true' : ''}`);
}