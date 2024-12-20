
export const load = async ({ params, parent }) => {
	const { listing } = await parent()
	const selectedSKU = listing.skus.find(sku => sku.id === params.skuID)
	console.log('Selected SKU:',selectedSKU)

	return {
			selectedSKU
	}
}