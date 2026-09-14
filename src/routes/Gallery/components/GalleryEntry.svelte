<script lang="ts">
  import { trapFocus } from '$lib/attachments/trapFocus.svelte';
  import ImageButton from '$lib/components/shared/images/ImageButton/ImageButton.svelte';
  import ImageModal from '$lib/components/shared/images/ImageModal/ImageModal.svelte';
  import { getSlideshowContext, type SlideshowContext } from '$lib/contexts/slideshowContext';

  let { image, index, displayPrevious, displayNext, open, close } = $props();

  const displayContext: SlideshowContext = getSlideshowContext();
  let imageButton;

  let opened: boolean = $derived(index == displayContext.currentDisplayIndex);

  function trapFocusOnModal() {
    return (node) => {
      return trapFocus(node, `next-button-${index}`, imageButton);
    };
  }
</script>

<ImageButton
  bind:this={imageButton}
  image={image.image}
  title={image.title}
  alt={image.alt}
  size="250"
  onclick={() => {
    open(index);
  }}
/>

{#if opened}
  <ImageModal
    {image}
    {index}
    {displayPrevious}
    {displayNext}
    {close}
    isSlideshow={true}
    trapFocus={trapFocusOnModal}
  />
{/if}
