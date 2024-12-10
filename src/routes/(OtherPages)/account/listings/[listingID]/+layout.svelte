<script>

	import { Info, Plus } from 'lucide-svelte';
	import { page } from '$app/stores';

	export let data;

	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Price from '$lib/components/price.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	
	let selectedVariantID;
	$: if (Object.hasOwn($page.params, 'skuID')) {
	  	selectedVariantID = $page.params.skuID;
	} else {
		selectedVariantID = null;
	}

</script>

<DashboardPageLayout>
	<p slot="header">Editing</p>
	<h1 slot="title">{data.listing.title}</h1>
	
	<div slot="page" class="h-full">
		<div class="h-full flex flex-col justify-between">
			<slot />
		
<!--			Variant cards-->
			<div class="flex flex-row gap-3 sticky bottom-3.5 w-full h-fit bg-slate-100 self-end rounded-2xl drop-shadow-sm">
			
<!--				Main listing card -->
				<div class="flex-col flex gap-2.5 w-fit h-fit p-4 rounded-l-2xl bg-amber-50">
					<p>Listing</p>
					<Card.Root class="w-56 border-slate-700 h-36 border-[1.5px] hover:border-accent/60 scale-105 transition-all justify-between flex flex-col">
						<div>
							<Card.Header class="p-3.5">
								<p>{data.listing.title}</p>
							</Card.Header>
							<Card.Description class="px-3.5">
								<p>{data.listing.description}</p>
							</Card.Description>
						</div>
						
						<Card.Footer class="p-3.5 flex flex-row gap-1 w-full">
							<Badge class="py-1.5 px-2.5 gap-1" variant={data.listing.public ? 'default' : 'secondary'}>
								<Info class="size-4" />
								<p>{data.listing.public ? 'Public' : 'Private'}</p>
							</Badge>
						</Card.Footer>
					</Card.Root>
				</div>

				<div class="flex-col flex gap-2.5 w-fit h-fit p-4 rounded-2xl">
					<p>Products</p>
					<div class="flex flex-row gap-3 h-full">
						{#each data.listing.skus as sku}
							<a href={`/account/listings/${data.listing.id}/${sku.id}`}>
								<Card.Root class="w-56 h-36 justify-between flex flex-col hover:border-accent transition-all hover:brightness-125
													{Number(selectedVariantID)===Number(sku.id) ? ' border-slate-800' : ''}">
									<Card.Header class="p-3.5">
										<p>{sku.title}</p>
									</Card.Header>
									<Card.Description class="px-3.5 p-4 self-end text-black">
										<Price price={sku.price} />
									</Card.Description>
								</Card.Root>
							</a>
						{/each}
						
					<!--	Add new variant card -->
						<a href={`/account/listings/${data.listing.id}/new`}>
							<Card.Root class="w-56 h-36 flex flex-col border-2 border-dashed bg-emerald-50/40 items-center justify-center
											  hover:border-solid hover:bg-emerald-100 hover:border-emerald-500 transition-all group">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 opacity-30 hover:opacity-70 group-hover:opacity-70 text-emerald-700 transition-all">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
								</svg>
							</Card.Root>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</DashboardPageLayout>