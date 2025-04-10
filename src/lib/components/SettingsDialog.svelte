<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Breadcrumb } from '$lib/components/ui/breadcrumb/index.js';
	import { Building, Building2, Check, EyeOff, Globe, Info, Package, ReceiptText, Repeat2, Save } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { User, GlobeLock} from 'lucide-svelte';

	import { invalidateAll, replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { onMount } from 'svelte';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { updateUser } from '$lib/api/user.js';
	import { toast } from 'svelte-sonner';
	import PasswordResetPopover from '$lib/components/PasswordResetPopover.svelte';

	let { user } = $props();

	const tabs = [
		{
			title: 'Account',
			icon: User,
		},
		{
			title: 'Privacy',
			icon: GlobeLock,
		},
	]
	let settingsOpen = $state(false);
	let selectedTab = $derived(page.state.settingsPage || tabs[0].title);
	let settings = $state({
		user: JSON.parse(JSON.stringify(user)),
		optionalCookies: false,
	});
	let edited = $derived(JSON.stringify(settings.user) !== JSON.stringify(user));
	$inspect(settings);
	$inspect(user)

	onMount(()=>{
		settings.optionalCookies = localStorage.getItem('consent') || false;
	})

	// Syncs the state of the settings dialog with the page settings state
	// Could be a derived but this allows for the dialog to control open/close too
	$effect(()=>{
		settingsOpen = page.state.settingsOpen
	})

	$effect(()=>{
		localStorage.setItem('consent', settings.optionalCookies);
	})

	// // Syncs user copy with the actual user if changed
	$effect(()=>{
		settings.user = user;
	})

	const updatePageState = () => {
		replaceState('', {settingsOpen: settingsOpen});
	}
	const setPage = (page) => {
		replaceState('', {settingsOpen: settingsOpen, settingsPage: page});
	}
	const handleAccountSubmit = (e) => {
		e.preventDefault();

		updateUser(settings.user)
			.then((response) => {
				invalidateAll()
			})
			.catch((error) => {
				toast.error(error);
			});
	}
</script>

<Dialog.Root bind:open={settingsOpen} onOpenChange={()=>{updatePageState(); }}>
	<Dialog.Content class="sm:max-w-[1000px] p-0 md:max-h-[500px] overflow-clip">
		<Dialog.Header class="sr-only">
			<Dialog.Title class="sr-only">Settings</Dialog.Title>
			<Dialog.Description>
				View order details
			</Dialog.Description>
		</Dialog.Header>

		<Sidebar.Provider class="items-start md:max-h-[500px]">
			<Sidebar.Root collapsible="none" class="hidden md:flex md:max-h-[500px]">
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
									{#each tabs as tab (tab)}
										{@const TabIcon = tab.icon}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton onclick={()=>{setPage(tab.title)}} class="{selectedTab===tab.title && 'bg-slate-200 hover:bg-slate-200'} transition-all">
											<TabIcon stroke-width={1.25} />
											<span>
													{tab.title}
												</span>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
										{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>

				<Sidebar.Footer>
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<div class="text-lg flex flex-col gap-0.5 p-1.5 rounded-xl bg-accent/15">
								<div class="flex flex-row gap-1.5 items-center">
									<Avatar.Root>
										<Avatar.Image src={user.profilePictureURL} alt="Avatar" />
										<Avatar.Fallback class="">{user.username[0] + user.username[1]}</Avatar.Fallback>
									</Avatar.Root>
									{user.username}
								</div>
<!--								<span class="text-xs text-muted-foreground/70">id: {user.id}</span>-->
							</div>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.Footer>
			</Sidebar.Root>

			<!--		Content		-->
			<form class="flex h-[500px] flex-1 flex-col overflow-hidden">
				<header class="flex flex-row w-full h-fit bg-white/30 backdrop-blur-2xl p-4 pb-0 gap-2.5 items-center">
					<p class="text-sm text-muted-foreground">{selectedTab}
						<Button type="submit" form="accountForm" for="accountForm"  class=" {edited ? 'scale-100' : 'scale-0'} transition-all origin-left rounded-full">
							Save
						</Button>
					</p>
<!--					<Button type="submit" size="sm" class="{isOrderUpdated && '!scale-100'} scale-0 rounded-3xl origin-left transition-all ease-in-out" submit>-->
<!--						<Save size={20} strokeWidth={1.25}  /> Update-->
<!--					</Button>-->
				</header>

				<Tabs.Root value={selectedTab} class="overflow-y-auto h-full">
					<Tabs.Content value="Account" class="overflow-y-auto h-full">
						<form id="accountForm" onsubmit={handleAccountSubmit} class="flex flex-row gap-4 w-full h-fit flex-grow pt-0 p-4">

							<div class="flex flex-col gap-4 basis-1/2 grow">
								<div class="bg-cyan-500/15 border-none flex flex-col gap-1  h-full p-4 rounded-2xl">
									<div class="flex flex-col gap-0.5 max-w-72 text-pretty">
										<p class="font-medium items-center flex flex-row gap-1 mb-1">
											<Globe stroke-width={1.25}  size={18} />
											Public Information
										</p>
	<!--									<p class="text-xs text-muted-foreground">Your account's public details</p>-->
									</div>

									<div class="flex flex-col gap-2">
										<InputWithLabel
											label="Username"
											bind:value={settings.user.username}
											placeholder="Enter a username"
											description="Must be unique"
											required
										>Username</InputWithLabel>
								</div>
								</div>

								<div class="bg-cyan-500/15 border-none flex flex-col gap-1  h-full p-4 rounded-2xl">
									<div class="flex flex-col gap-0.5 max-w-72 text-pretty mb-1">
										<p class="font-medium items-center flex flex-row gap-1 ">
											<Building2 stroke-width={1.25} size={18} />
											Address
										</p>
										<p class="text-xs flex flex-row gap-1 items-center text-muted-foreground">
											<Repeat2 size={16} strokeWidth={1.25} />
											Your address is shared with sellers on purchase</p>
									</div>

									<div class="flex flex-col gap-2 pb-4">
										<InputWithLabel
											label="1st Line"
											bind:value={settings.user.addressLine1}
											optional
											placeholder="Enter your street address"
										><p>1<sup>st</sup> Line</p></InputWithLabel>

										<InputWithLabel
											label="2nd Line"
											optional
											bind:value={settings.user.addressLine1}
											placeholder="Enter your street address"
										><p>2<sup>nd</sup> Line</p></InputWithLabel>

										<InputWithLabel
											label="City"
											optional
											bind:value={settings.user.city}
											placeholder="Enter your city"
										>City</InputWithLabel>

										<div class="flex flex-row w-full gap-2">
											<InputWithLabel
												label="Country"
												optional
												bind:value={settings.user.country}
												placeholder="Enter your country"
											>Country</InputWithLabel>
											<InputWithLabel
												label="Postcode"
												optional
												bind:value={settings.user.postcode}
												placeholder="Enter your postcode"
											>Postcode</InputWithLabel>
										</div>


									</div>
								</div>
							</div>


								<div class="bg-cyan-500/15 basis-1/2 border-none flex flex-col gap-1  h-full p-4 rounded-2xl">
									<div class="flex flex-col gap-1 max-w-72 text-pretty mb-1">
										<p class="font-medium items-center flex flex-row gap-1">
											<EyeOff stroke-width={1.25}  size={18} />
											Private Information
										</p>
										<p class="text-xs text-muted-foreground flex flex-row gap-1 items-center">
											<Repeat2 size={24} strokeWidth={1.25} />
											Indicated data is shared with a seller when you purchase from them
										</p>
									</div>

									<div class="flex flex-col gap-1.5">
										<InputWithLabel
											label="First Name"
											bind:value={settings.user.firstName}
											placeholder="Enter your full name"
											required>
											<p class="flex flex-row gap-1 items-center">
												<Repeat2 size={18} strokeWidth={1.25} />
												First Name
											</p>
										</InputWithLabel>
										<InputWithLabel
											label="Surname"
											bind:value={settings.user.surname}
											placeholder="Enter your last name"
											required
										>
											<p class="flex flex-row gap-1 items-center">
											<Repeat2 size={18} strokeWidth={1.25} />
											Surname
											</p>
										</InputWithLabel>


										<InputWithLabel
											label="Email Address"
											bind:value={settings.user.emailAddress}
											placeholder="Enter an email address"
											required
										>
											<p  class="flex flex-row gap-1 items-center">
												<Repeat2 size={18} strokeWidth={1.25} />
												Email Address
											</p>
										</InputWithLabel>

										<PasswordResetPopover defaultText={user.emailAddress}>
											<Button variant="secondary" class="text-sm text-left text-muted-foreground p-0 py-0">Change account password</Button>
										</PasswordResetPopover>
									</div>
								</div>
						</form>

					</Tabs.Content>

					<Tabs.Content value="Privacy" class="py-0">
						<div class="flex flex-col gap-1 w-full p-4">

							<div class="bg-cyan-500/15 border-none flex flex-row justify-between items-center h-fit p-4 rounded-2xl">
								<div class="flex flex-col gap-0.5 max-w-72 text-pretty">
									<label for="cookies" class="font-medium">Optional Cookies and Analytics</label>
									<p class="text-xs text-muted-foreground">These cookies measure your site activity and share it anonymously with sellers so they can improve their products.</p>
									<div class="flex flex-row gap-1 p-1 font-medium">
										<Info class="size-4 text-muted-foreground" />
										<p class="text-xs text-muted-foreground">This setting only applies to this browser</p>
									</div>
								</div>

								<div>
									<Switch
										bind:checked={settings.optionalCookies}
										id="cookies"
										/>
								</div>
							</div>

						</div>
					</Tabs.Content>
				</Tabs.Root>

			</form>
		</Sidebar.Provider>
	</Dialog.Content>
</Dialog.Root>
