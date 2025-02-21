import { Circle, CircleArrowRight, CircleCheck, CircleDashed, X } from 'lucide-svelte';

export const orderStatuses = [
	{
		title: 'Processing',
		icon: CircleDashed
	},
	{
		title: 'Dispatched',
		icon: Circle
	},
	{
		title: 'Out for delivery',
		icon: CircleArrowRight
	},
	{
		title: 'Delivered',
		icon: CircleCheck
	}
]

export const orderStatuesNullable = [
	{
		title: 'None',
		icon: X,
	},
	...orderStatuses
]