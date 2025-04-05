<script>
    import * as Dialog from "$lib/components/ui/dialog/index.js";
	import Dropdown from "../dropdown.svelte";
	import Button from "../ui/button/button.svelte";
	import { Textarea } from "../ui/textarea";
	import SkUrow from "./SKUrow.svelte";
    import {Slider} from "../ui/slider/index.js";
	import InputWithLabel from "../InputWithLabel.svelte";
	import { AppleIcon, InfoIcon } from "lucide-svelte";
	import { submitListingReview } from "$lib/api/listings";
	import { toast } from "svelte-sonner";

    let { open = $bindable(), selectedListing } = $props();
    
    let reviewData = $state({
        listingID: selectedListing?.listing?.id,
        rating: 5,
        description: "",
    });

    const handleReviewSubmission = (e) => {
        e.preventDefault();
        reviewData.listingID = selectedListing?.listing?.id;
        submitListingReview(selectedListing.listing.id, reviewData)
            .then((response) => {
                toast.success("Review submitted successfully", response);
                open = false;
            })
            .catch((error) => {
                toast.error("Error submitting review: " + error.message);
            });
    };

</script>

<Dialog.Root bind:open={open}>
	<Dialog.Content class="w-full max-w-2xl bg-slate-50">
		<Dialog.Header class="flex flex-col gap-2">
			<Dialog.Title>Add a review for {selectedListing?.listing?.title}</Dialog.Title>
			<Dialog.Description>
                <div class="flex flex-row gap-2 text-black">   
                    <SkUrow
                        product={selectedListing}
                        mutableQuantity={false}
                    />
                    </div>
			</Dialog.Description>
		</Dialog.Header>
<!-- Body -->
        <form class="flex flex-col gap-4" onsubmit={handleReviewSubmission} id="review">  
            <div class="flex flex-col gap-1">
                <InputWithLabel
                    label="Review"
                    id="text"
                    bind:value={reviewData.description}
                    area
                    optional
                    class="bg-none">Review</InputWithLabel>
            </div>

            <div class="flex flex-col gap-1">
                <label for="rating" class="text-xs px-2 font-normal">Rating</label>
                <div class="flex flex-row gap-4 items-center justify-center">
                    <Slider type="single" bind:value={reviewData.rating} max={5} min={1} />
                    <p class="text-3xl font-semibold flex flex-row gap-0.5 items-center">
                        {reviewData.rating}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="size-6 stroke-accent text-medium">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>

                    </p>
                </div>
            </div>
    </form>

            
            <Dialog.Footer class="flex flex-col gap-2">
            <p class="text-xs text-muted-foreground flex flex-row gap-1 items-center">
                <InfoIcon size={20} class="stroke-muted-foreground" />
                Your review will be publicly visible to other users<br />and credited to your account.</p>
            <div class="flex flex-row gap-2 justify-end">

                <Dialog.Close><Button variant="secondary">Cancel</Button></Dialog.Close>
                <Button
                form="review"
                type="submit"
                class="bg-emerald-600 hover:bg-emerald-700 text-white"
            >Submit</Button>
            </div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
