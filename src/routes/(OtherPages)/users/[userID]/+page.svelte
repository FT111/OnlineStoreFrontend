
<script>
	
	const profileUser = {
		username: 'johndoe',
		profilePictureURL: 'https://via.placeholder.com/150',
	  	bannerURL: 'https://live.staticflickr.com/65535/51155108931_45026fc05d_h.jpg',
		rating: 4.5,
		description: 'I am a software engineer',

	}
</script>

<div class="flex flex-col w-full p-4 h-96 mt-16 overflow-hidden">
	<div class="grow overflow-hidden h-80">
		<img src={profileUser.bannerURL} alt="User Profile" class="w-full h-96 object-cover rounded-t-2xl" />
	</div>
	
	<div class="grow rounded-b-2xl bg-secondary h-full w-full  p-6">
		<p class="text-4xl font-bold text-primary">{profileUser.username}</p>
	</div>
</div>