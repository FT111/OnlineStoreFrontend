<script>
    import * as Dialog from "$lib/components/ui/dialog/index.js";
	import Dropdown from "../dropdown.svelte";
	import Button from "../ui/button/button.svelte";
	import { Textarea } from "../ui/textarea";
	import SkUrow from "./SKUrow.svelte";
    import {Slider} from "../ui/slider/index.js";

    let { open = $bindable(), selectedListing } = $props();
    
    let review = $state({
        text: "",
        rating: 5,
    });

</script>

<Dialog.Root bind:open={open}>
	<Dialog.Content class="w-full max-w-2xl">
		<Dialog.Header class="flex flex-col gap-2">
			<Dialog.Title>Add a review for {selectedListing?.listing?.title}</Dialog.Title>
			<Dialog.Description>
                <div class="flex flex-row gap-2">   
                    <SkUrow
                        product={selectedListing}
                        mutableQuantity={false}
                    />
                    </div>
			</Dialog.Description>
		</Dialog.Header>
<!-- Body -->
        <div class="flex flex-col gap-4">   
            <div class="flex flex-col gap-1">
                <label for="review" class="text-sm font-medium">Review</label>
                <Textarea id="review" rows="4" class="w-full p-2 border rounded-md"></Textarea>
            </div>
            <Slider type="single" bind:value={review.rating} max={5} step={1} />

        </div>

		<Dialog.Footer class="flex flex-row justify-end gap-2">
			<Dialog.Close>Cancel</Dialog.Close>
			<Button
                onClick={() => {
                    // Handle review submission
                    open = false;
                }}
            >Add</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>