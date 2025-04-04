<script>
	import Image from "../image.svelte";
    import * as Carousel from "../ui/carousel/index.js";
    import { baseURL } from "$lib/api/core.js";


    let { listing, selectedSKU } = $props();
</script>

<div class="size-full px-10">
    <Carousel.Root  class="w-full" opts={{
        'dragFree': false,
        'loop': true,
        'slidesToScroll': 1
        
        }}>
                <Carousel.Content class="-ml-1 flex-1 grow size-full">

                {#if selectedSKU?.images?.length ===0}
                    <!-- <Carousel.Item class="size-full">
                            <Image
                                src={`${baseURL}static/listingImages/${imageHref}`}
                                alt="Listing Image"
                                class="w-full h-auto"
                                loading="lazy"
                                />
                    </Carousel.Item>    -->
                    <p class="flex flex-col items-center justify-center w-full h-full text-base font-medium text-muted-foreground">
                        No images provided.
                    </p>
                    {:else}
                    {#each selectedSKU.images as imageHref}
                    <Carousel.Item class="size-full grow flex items-center justify-center">
                            <div class="size-full flex-1 grow items-center justify-center aspect-square flex flex-col">
                                <Image
                                    src={`${baseURL}static/listingImages/${imageHref}`}
                                    alt="Listing Image"
                                    class="w-full h-auto object-contain rounded-xl"
                                    loading="lazy"
                                    />
                            </div>
                        </Carousel.Item>   
                    {/each}
                {/if}
                
            </Carousel.Content>
        {#if selectedSKU?.images?.length > 1}
        <Carousel.Previous />
        <Carousel.Next />
        {/if}
    </Carousel.Root>
    
</div>