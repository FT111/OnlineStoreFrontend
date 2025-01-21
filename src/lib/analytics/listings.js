import { POST } from '$lib/api/core.js';
import { isConsentGiven } from '$lib/analytics/consent.js';

export let registerListingClick = async (listing) => {
	if (!isConsentGiven()) return;

		// Send a POST request to the server to register the click
		return POST(`analytics/${listing.id}/click`)
}

export let registerListingView = async (listing) => {
	if (!isConsentGiven()) return;

	// Send a POST request to the server to register the view
	return POST(`analytics/${listing.id}/view`)
}

export let registerListingImpression = async (listing) => {
	if (!isConsentGiven()) return;

// 	Add the impression to the cookie
	console.log(document.cookie.split(';'));
	let existingImpressions = document.cookie.split(';').find(row => row.startsWith(' impressions='));
	// If there are no impressions, set the cookie
	if (!existingImpressions) {
		document.cookie = `impressions=${listing.id}; max-age=31536000; path=/`;
		return;
	}

	// If there are impressions, add the new impression to the cookie
	let impressions = existingImpressions ? existingImpressions.split('=')[1] : '';
	impressions = impressions.split(',')
	if (!impressions.includes(listing.id)) {
		impressions.push(listing.id);
		document.cookie = `impressions=${impressions.join(',')}; max-age=31536000; path=/`;
	}

}