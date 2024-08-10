
import {GET} from './base';

export const fetchListings = async () => {
	return await GET('listings/?limit=24');
}

export const queryListings = async (query) => {
	return await GET(`listings/?query=${query}`);
}