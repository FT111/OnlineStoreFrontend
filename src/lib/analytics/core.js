
import { isConsentGiven } from '$lib/analytics/consent.js';

export const initAnalytics = () => {

	// Redundant check, avoids accidental initialisation
	if (!isConsentGiven()) {
		return;
	}

	console.log('Analytics initialized');
}