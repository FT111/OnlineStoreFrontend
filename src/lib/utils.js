import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

import { cubicOut } from "svelte/easing";


export const flyAndScale = (
	node,
	params = { y: -8, x: 0, start: 0.95, duration: 150 }
) => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (valueA, scaleA, scaleB) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style) => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const formQueryURL = (query, category, subCategory, sort, order) => {

	if (category === 'All Categories' || category === 'Categories') {
		category = undefined;
	}
	if (subCategory === 'All Subcategories' || subCategory === 'Sub Categories') {
		subCategory = undefined;
	}
	if (sort === 'Sort' || sort === 'All Sorts') {
		sort = undefined;
	}

	switch (order) {
		case 'Asc.':
			order = 'asc';
			break;
		case 'Desc.':
			order = 'desc';
			break;
		default:
			order = undefined;
	}




	console.log(category, subCategory, sort, order);

	let requestString = `listings/?`;
	if (query) {
		requestString += `query=${query}&`;
	}
	if (category) {
		requestString += `category=${category}&`;
	}
	if (subCategory) {
		requestString += `subCategory=${subCategory}&`;
	}
	if (sort) {
		requestString += `sort=${sort}&`;
	}
	if (order) {
		requestString += `order=${order}`;
	}

	return requestString;
}