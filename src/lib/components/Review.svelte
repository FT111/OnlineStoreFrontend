<script>
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { fetchListingReviews } from '$lib/api/listings';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import Button from './ui/button/button.svelte';
	import { ChevronsDown, ChevronsUp } from 'lucide-svelte';

    let { review } = $props();
</script>

<div class="flex flex-col gap-0 h-40 bg-emerald-600/15 rounded-xl overflow-y-auto">
				<div class="px-4 pt-2 flex flex-row justify-between items-center bg-background/10 backdrop-blur-md sticky top-0 pb-1.5">
					<div class="flex flex-row gap-2 items-center">
						<a  href={`/users/${review.user.id}`}>
							<Avatar.Root>
								<Avatar.Image src={review.user.profilePictureURL} alt='Avatar' />
								<Avatar.Fallback>{review.user.username.slice(0,2).toUpperCase()}</Avatar.Fallback>
							</Avatar.Root>
						</a>
						<p class="text-md font-semibold">{review.user?.username}</p>
					</div>
					<div class="flex flex-col justify-end gap-0.5 items-end">
						<div class="flex flex-row gap-[0.25] items-center">
							{#each [...Array(review.rating)] as _}
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="size-6 stroke-accent text-medium">
									<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
								</svg>
							{/each}
						</div>
						<p class="text-xs font-light">{new Date(review.addedAt*1000).toLocaleDateString("en-GB")}</p>
					</div>
				</div>
				<p class="text-sm px-4 pb-4 font-normal">{review.description}</p>
	
			</div>

