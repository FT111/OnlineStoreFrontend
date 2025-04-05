<script>
	import DashboardPageLayout from '$lib/components/DashboardPageLayout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onMount } from 'svelte';
	import { Check, Edit, Edit2, Pencil, Plus, Save, X } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { updateUser } from '$lib/api/user.js';
	import { invalidateAll } from '$app/navigation';
	import { baseURL } from '$lib/api/core.js';

	let { data } = $props();
	let editedUser = $state(data.user);
	let saveBtnState = $state();

	$inspect(editedUser);
	onMount(() => {
		editedUser = data.user;
	});

	const updateBanner = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				editedUser.bannerURL = reader.result;
			};
			reader.readAsDataURL(file);
		}
	};

	const updateProfile = async () => {
		console.log('Updating profile...');
		saveBtnState = 'loading';

		await updateUser(editedUser)
			.then((response) => {
				saveBtnState = 'success';
				invalidateAll().then(
					() => {
						editedUser = data.user;
						setTimeout(() => {
							saveBtnState = null;
						}, 2000);
					}
				)
			})
			.catch((error) => {
				saveBtnState = 'failed';
				setTimeout(() => {
					saveBtnState = null;
				}, 2000);
			});

	}
</script>
<DashboardPageLayout>
	{#snippet title()}
		<div class="flex flex-row gap-2.5 items-center">

			Profile Customisation
			<Button form="profileEditForm" class=" rounded-full transition-all gap-1.5 origin-left ease-in-out {JSON.stringify(editedUser)!==JSON.stringify(data.user) ? 'scale-100': ' scale-0 '}" type="submit" size="sm">
				{#if saveBtnState === 'success'}
					<Check size={20} strokeWidth={1.25} />
				{:else if saveBtnState === 'failed'}
					<X size={20} strokeWidth={1.25} />
				{:else}
					<Save size={20} strokeWidth={1.25} />Save and Publish
				{/if}
			</Button>
		</div>
	{/snippet}

	{#snippet page()}
		<!-- Container -->
		<form class="flex flex-col w-full justify-center gap-2.5 items-center" onsubmit={()=>{updateProfile()}} id="profileEditForm">

<!--	Main section		-->
			<Card.Root class="p-0 md:w-3/5 xl:2/3 w-full flex flex-col  overflow-hidden gap-2.5">
<!--		Banner 		-->
				<div class="flex flex-row justify-center items-center relative w-full h-32 bg-slate-100 hover:bg-slate-300 transition-all group">
					{#if editedUser.bannerURL?.length !== 0}
							<Edit2 class="absolute right-2 top-2 text-slate-200 hover:text-slate-400 transition-all group-hover:text-slate-400" />
						{#if editedUser.bannerURL !== data.user.bannerURL}
						<img  src={editedUser.bannerURL} alt="Your banner" class="absolute w-full h-32 object-cover" />
						{:else}
							<img  src={`${baseURL}static/user-profiles/${editedUser.bannerURL}`} alt="Your banner" class="absolute w-full h-32 object-cover" />
						{/if}
							<div class="flex flex-row w-full h-32 absolute p-1">
							<label>
								<Pencil class="absolute right-2 top-2 text-slate-200 hover:text-slate-400 transition-all group-hover:text-slate-400" />
								<input type="file" accept="image/*" class="hidden" id="bannerURL" oninput={updateBanner}/>
							</label>
						</div>
					{:else}
						<label>
							<span class="flex flex-row items-center gap-1 text-muted-foreground rounded-full px-3 p-2 bg-slate-200 transition-all group-hover:gap-2">
								Add a banner
								<Plus />
							</span>
							<input type="file" accept="image/*" class="hidden" id="bannerURL" oninput={updateBanner}/>
						</label>
						{/if}
				</div>
<!--		Avatar and username		-->
				<div class="flex flex-col gap-1.5 py-1">
					<div class="w-full flex flex-row gap-3 items-center justify-center px-12">
						<Avatar.Root class="size-14 shadow-sm">
							<Avatar.Image src={editedUser.profilePictureURL} alt={editedUser.username} />
							<Avatar.Fallback class="text-3xl rounded-full p-2.5"><Plus size={24} /></Avatar.Fallback>
						</Avatar.Root>

						<p class="text-4xl font-medium text-primary h-fit">{editedUser.username}</p>
					</div>
					<p class="self-center text-sm font-normal p-2.5 max-w-60 pb-3">
						{editedUser.description}
					</p>
				</div>



			</Card.Root>

<!--			Other details	-->
			<div class="flex flex-col md:w-3/5 xl:2/3 w-full gap-2.5 p-2.5">
<!--					<InputWithLabel-->
<!--						label="Username"-->
<!--						bind:value={editedUser.username}-->
<!--						placeholder="Your username that represents your account on eBuy"-->
<!--						>Username</InputWithLabel>-->

					<InputWithLabel
						area
						label="Description"
						bind:value={editedUser.description}
						placeholder="Enter your profile's	description"
						>Description</InputWithLabel>

			</div>
		</form>
		{/snippet}
	</DashboardPageLayout>