import { enrichBasket, submitCheckout } from '$lib/api/transactions.js';
import { basketStore} from '$lib/basket.svelte.js';


export const Payment = () => {
		let paymentDetails = $state({
			'cardNumber': '',
			'cardHolder': '',
			'cardExpiration': '',
			'cardCVV': '',
			'set': false
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

	function setPaymentMethod(newPaymentMethod) {
		paymentDetails = newPaymentMethod;
	}

	// Set a state object from a form, targets a function
	async function setFromForm(target, formEvent) {
		return new Promise(async (resolve, reject) => {
			const form = formEvent.target;

			setPaymentMethod(Object.fromEntries(new FormData(form))).then(() => {
				resolve();
			})
		})
	}

	function setDeliveryDetails(newDeliveryDetails) {
		deliveryDetails = newDeliveryDetails;
	}

	function submit() {
		return new Promise(async (resolve, reject) => {
			await basketStore.loadBasketContent().catch((error) => {
				reject(error);
			});

			const checkout = {
				'paymentDetails': paymentDetails,
				'deliveryDetails': deliveryDetails,
				'basket': basketStore.basket
			}

			console.log(checkout);

			await submitCheckout(checkout).then((response) => {
				resolve(response);
			})
		})
	}

	return {
		paymentDetails,
		deliveryDetails,
		basket,
		setPaymentMethod,
		setDeliveryDetails,
		setFromForm,
		submit
	}

}


export const validateCardNumber = (cardNumber) => {
	// Luhn algorithm
	let sum = 0
	let isSecond = false

	for (let i = cardNumber.length - 1; i >= 0; i--) {
		// Parse the digit
		let d = cardNumber[i] - '0'
		// If it's the second digit, double it
		if (isSecond) {
			d = d * 2
		}
		// Add two digits to handle
		sum += Math.floor(d / 10) + d % 10

		// Toggle flag
		isSecond = !isSecond
	}

	// If the sum is divisible by 10, the number is valid
	return sum % 10 === 0
}
