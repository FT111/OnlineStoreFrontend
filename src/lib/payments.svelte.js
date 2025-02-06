import { enrichBasket, submitCheckout } from '$lib/api/transactions.js';
import { basketStore} from '$lib/basket.svelte.js';


export const Payment = () => {
		let paymentMethod = $state({
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

	async function setPaymentMethod(newPaymentMethod) {
		paymentMethod = newPaymentMethod;
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
		return new Promise(async (resolve, reject) => {
			await basketStore.loadBasketContent().catch((error) => {
				reject(error);
			});

			const checkout = {
				'paymentDetails': paymentMethod,
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
		paymentMethod,
		deliveryDetails,
		basket,
		setPaymentMethod,
		setDeliveryDetails,
		setFromForm,
		submit
	}

}