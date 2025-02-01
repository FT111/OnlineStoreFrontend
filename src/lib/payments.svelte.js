

export const Payment = () => {
		let paymentMethod = $state({
			'cardNumber': '',
			'cardHolder': '',
			'cardExpiration': '',
			'cardCVC': ''
		})

		let deliveryDetails = $state({
			'firstName': '',
			'surname': '',
			'addressLine1': '',
			'addressLine2': '',
			'city': '',
			'country': '',
			'postalCode': ''
		})

		let basket = $state({
			items: {},
			total: 0,
			value: 0,
			enriched: false
		});

	async function setPaymentMethod(newPaymentMethod) {
		return new Promise((resolve, reject) => {
			paymentMethod = newPaymentMethod;
			console.log(paymentMethod);
			resolve();
		})
	}

	// Set a state object from a form, targets a function
	async function setFromForm(target, formEvent) {
		return new Promise(async (resolve, reject) => {
			const form = formEvent.target;

			await setPaymentMethod(Object.fromEntries(new FormData(form))).then(() => {
				resolve();
			})
		})
	}

	function setDeliveryDetails(newDeliveryDetails) {
		deliveryDetails = newDeliveryDetails;
	}

	function submit() {
		// Submit payment
	}

	return {
		paymentMethod,
		deliveryDetails,
		basket,
		setPaymentMethod,
		setDeliveryDetails,
		setFromForm,
		submit
	}

}