
<script>
  import * as Avatar from '$lib/components/ui/avatar/index.js';
	
	const profileUser = {
		username: 'johndoe',
		profilePictureURL: 'https://via.placeholder.com/150',
	  	bannerURL: 'https://live.staticflickr.com/65535/51155108931_45026fc05d_h.jpg',
		rating: 4.5,
		description: 'I am a software engineer who sells things on this marketplace',

	}
</script>

<div class="px-8">
	
	<div class="flex flex-col w-full p-4 h-96 mt-20 overflow-hidden">
		<div class="grow overflow-hidden h-80">
			<img src={profileUser.bannerURL} alt="User Profile" class="w-full h-96 object-cover rounded-t-2xl" />
		</div>
		
		<div class="grow rounded-b-2xl bg-secondary h-full w-full p-6 flex flex-row justify-between">
<!--		User Primary Detail Container	-->
			<div class="flex flex-col gap-2 basis-1/3">
<!--			Avatar and Name container	-->
				<div class="flex flex-row gap-3 items-center">
					<Avatar.Root class="h-12 w-12">
						<Avatar.Image src={profileUser.profilePictureURL} alt="Avatar" />
						<Avatar.Fallback>{profileUser.username[0].toUpperCase()}</Avatar.Fallback>
					</Avatar.Root>
					<p class="text-4xl font-bold text-primary">{profileUser.username}</p>
				</div>
				
				<p class=" text-md font-medium grow p-4 bg-neutral-50 rounded-xl w-full ">
					{profileUser.description}
				</p>
			</div>

		</div>
	</div>

</div>