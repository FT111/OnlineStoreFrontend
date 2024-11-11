
<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button'
	import Image from '$lib/components/image.svelte'
	
	import Navbar from '$lib/components/navbar.svelte'
	import Footer from '$lib/components/Footer.svelte';
	export let data;

</script>

<Navbar user={data.user} />

<slot />

<Footer />
