import { Circle, CircleArrowRight, CircleCheck, CircleDashed, X } from 'lucide-svelte';

export const orderStatuses = [
	{
		title: 'Processing',
		icon: CircleDashed,
		colour: 'slate-200'
	},
	{
		title: 'Dispatched',
		icon: Circle,
		colour: 'sky-700',
		text: 'white'
	},
	{
		title: 'Out for delivery',
		icon: CircleArrowRight,
		colour: 'green-600',
		text: 'white'
	},
	{
		title: 'Delivered',
		icon: CircleCheck,
		colour: 'emerald-800',
		text: 'white'
	}
]

export const orderStatuesNullable = [
	{
		title: 'None',
		icon: X,
		colour: 'transparent',
	},
	...orderStatuses
]