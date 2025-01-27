
<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import Logo from '$lib/branding/logo.svelte';

	let { data } = $props();
</script>

<div class="w-full h-screen flex flex-col gap-6 items-center justify-center bg-primary  "
style={"background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.01'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");"}>
	<Logo class="text-white text-4xl tracking-tight " />
	<Card.Root class="p-6 w-full sm:w-1/3 border-none">
		<Card.Title>Reset your password</Card.Title>
		<Card.Content>
			<form class="flex flex-col gap-4">
				<InputWithLabel type="password" placeholder="New password">New password</InputWithLabel>
				<InputWithLabel type="password" placeholder="Confirm new password">Password Confirmation</InputWithLabel>
				
				<Button type="submit" class="w-full">Reset password</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
