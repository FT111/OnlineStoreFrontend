
export const load = async ({ params }) => {
	return {
		props: {
			selectedSkuID: params.skuID
		}
	}
}