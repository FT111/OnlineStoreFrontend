import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import DataTableActions from './data-table-actions.svelte';

export const columns = [
	{
		accessorKey: 'id',
		header: 'Order ID',
	},
	{
		'accessorKey': 'recipient.name',
		'header': 'Recipient',
	},
	{
		accessorKey: 'addedAt',
		header: 'Date',
	},
	{
		'accessorKey': 'totalQuantity',
		'header': 'Quantity',
	},
	{
		accessorKey: 'totalValue',
		header: () => {
			const amountHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="text-right">Amount</div>`,
			}));
			return renderSnippet(amountHeaderSnippet, "");
		},
		cell: ({ row }) => {
			const amountCellSnippet = createRawSnippet((getAmount) => {
				const amount = getAmount();
				return {
					render: () => `<div class="text-right font-medium">${amount}</div>`,
				};
			});

			return renderSnippet(
				amountCellSnippet,
				(row.getValue('totalValue') / 100).toLocaleString('en-GB', {
					style: 'currency',
					currency: 'GBP',
				})
			);
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return renderComponent(DataTableActions, { id: row.getValue('id') });
		},
	},
]