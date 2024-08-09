
import {GET} from './base';

export const fetchListings = async () => {
	return await GET('listings/?limit=24');
}