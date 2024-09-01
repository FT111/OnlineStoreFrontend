
export const isConsentGiven = () => {
	return localStorage.getItem('consent') === 'true';
}

export const isConsentSet = () => {
	return localStorage.getItem('consent') !== null;
}

export const checkConsent = (popupElement) => {
	if (!isConsentSet()) {
		popupElement.style.display = 'flex';

	} else {
		if (isConsentGiven()) {
			// Initialize analytics if consent is given
			initAnalytics();

		} else {
			console.log('Consent not given')
		}
	}
}

const hidePopup = (popupElement) => {
	popupElement.classList.add('translate-y-32');
	checkConsent(popupElement);

	popupElement.addEventListener('transitionend', () => {
		popupElement.style.display = 'none';

		popupElement.removeEventListener('transitionend', () => {
		});
	});
}

const initAnalytics = () => {
	//
	console.log('Analytics initialized');
}


export const giveConsent = (popupElement) => {
	console.log('Consent pressed');
	localStorage.setItem('consent', 'true');
	hidePopup(popupElement);
}

export const revokeConsent = (popupElement) => {
	localStorage.setItem('consent', 'false');
	hidePopup(popupElement);

}

