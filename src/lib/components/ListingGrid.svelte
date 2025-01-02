<script lang="ts">
	import * as Pagination from "$lib/components/ui/pagination";
	import Listing from "$lib/components/Listing.svelte";
	
	let { listingSource,
				page = $bindable()
	} = $props();
	let perPage = $state(30);
	let count = $state(0);
	
	const fetchPageListings = async () => {
		const res = await listingSource();
		count = res.meta.total;
		perPage = res.meta.limit;
		return res;
	}
</script>

<!--	Listings  -->
		{#await fetchPageListings()}
			{#each Array.from({ length: perPage }) as _, i}
				<Listing isLoading={true} />
			{/each}
		
		{:then data}
			{#if Object.keys(data).length === 0}
				<div class="col-span-full p-16 flex flex-row gap-4 justify-center">
					<p class="text-5xl text-center"> No listings found
					</p>
				
				</div>
			{:else}
				{#each data.data as listing}
					<Listing listing={listing} editMode={false} />
				{/each}
			{/if}
		{:catch error}
			<p>{error.details}</p>
		{/await}
<!--	Pagination  -->
	<Pagination.Root count={count} perPage={perPage} class="col-span-full p-5" bind:page={page}  >
		{#snippet children({ pages, currentPage })}
			<Pagination.Content>
				<Pagination.Item>
						<Pagination.PrevButton />
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === "ellipsis"}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item isVisible={currentPage === page.value}>
							<Pagination.Link {page} isActive={currentPage === page.value}>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.NextButton />
				</Pagination.Item>
			</Pagination.Content>
		{/snippet}
	</Pagination.Root>
