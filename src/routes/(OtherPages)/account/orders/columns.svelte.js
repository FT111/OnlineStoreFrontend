import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import DataTableActions from './data-table-actions.svelte';
import DataTableSortableHeader from './data-table-sortable-header.svelte';

export const columnsSvelte = [
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
		header: ({ column }) => {
			return renderComponent(DataTableSortableHeader, {
				title: 'Date',
				className: '',
				onclick: () => {column.toggleSorting(column.getIsSorted() === "asc")},
			})},
		cell: ({ row }) => {
			return new Date(row.getValue('addedAt')*1000).toLocaleDateString('en-GB');
		},
	},
	{
		'accessorKey': 'totalQuantity',
		'header': 'Quantity',
	},
	{
		accessorKey: 'totalValue',
		header: ({column}) => {
				return renderComponent(DataTableSortableHeader, {
					title: 'Total',
					className: 'flex flex-row self-end justify-end justify-self-end',
					onclick: () => {column.toggleSorting(column.getIsSorted() === "asc")},
				})},

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