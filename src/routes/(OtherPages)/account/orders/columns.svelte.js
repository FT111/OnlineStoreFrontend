import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import DataTableActions from './data-table-actions.svelte';
import DataTableSortableHeader from './data-table-sortable-header.svelte';
import openRowDetail from './+page.svelte';
import { orderStatuses, orderStatusesCancellable } from '$lib/constants.svelte.js';

export const columnsSvelte = [
	{
		accessorKey: 'id',
		header: 'Order ID',
		cell: ({ row }) => {
			const idCell = createRawSnippet((getID) => {
				const id = getID();
				return {
					render: () => `<div class="text-left w-fit tracking-tight font-mono text-xs text-muted-foreground">${id}</div>`,
				};
			});
			return renderSnippet(
				idCell,
				(row.getValue('id'))
			)
		}
	},
	{
		'accessorKey': 'recipient.username',
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
		'accessorKey': 'quantity',
		'header': 'Quantity',
	},
	{
		accessorKey: 'value',
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
				(row.getValue('value') / 100).toLocaleString('en-GB', {
					style: 'currency',
					currency: 'GBP',
				})
			);
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const cellSnippet = createRawSnippet((getStatus) => {
				const status = getStatus();
				const statusData = orderStatusesCancellable.find((s) => s.title === status);
				const Icon = statusData.icon;

				return {
					render: () => `<div class='flex flex-row items-center p-1.5 px-2.5 text-sm rounded-full bg-${statusData.colour}'>
						<span class='${statusData.text ? `text-${statusData.text}` : ''}'>${status}</span>
					</div>`
				}})
			return renderSnippet(
				cellSnippet,
				(row.getValue('status'))
			)
		}
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return renderComponent(DataTableActions, { id: row.getValue('id') });
		},
	},
]