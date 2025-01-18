import { POST } from '$lib/api/core.js';
import { isConsentGiven } from '$lib/analytics/consent.js';

export let registerListingClick = async (listing) => {
	if (!isConsentGiven()) return;

		// Send a POST request to the server to register the click
		return POST(`analytics/${listing.id}/click`)
}