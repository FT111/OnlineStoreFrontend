<script>
	import { requestPasswordReset } from '$lib/api/user.js';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	let { children, defaultText='' } = $props();

	let passwordResetOpenState = $state(false);

	async function handlePasswordResetRequest(e) {
		e.preventDefault();
		passwordResetOpenState = false;

		const formData = new FormData(e.target);
		const emailAddress = formData.get('emailAddress');
		console.log(emailAddress);
		const data =  await requestPasswordReset(emailAddress);
		if (Object.keys(data).includes('data')) {
			toast.success('Password reset email sent if the email exists');
		} else {
			toast.error('Error occurred');
		}
	}
</script>

<Popover.Root bind:open={passwordResetOpenState}>
						<Popover.Trigger>
							{@render children?.()}
						</Popover.Trigger>
						<Popover.Content>
							<form class="flex flex-col gap-2.5 items-start" onsubmit={(e)=>handlePasswordResetRequest(e)}>
								<Input minlength=1 type="email" value={defaultText} required placeholder="Email" name="emailAddress" />
								<Button submit variant="secondary" class="w-full" type="submit">Email me a password reset</Button>
							</form>
						</Popover.Content>
					</Popover.Root>
