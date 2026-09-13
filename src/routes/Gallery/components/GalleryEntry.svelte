<script lang="ts">
  import { trapFocus } from '$lib/attachments/trapFocus.svelte.ts';
  import ImageButton from '$lib/components/shared/images/ImageButton/ImageButton.svelte';
  import ImageModal from '$lib/components/shared/images/ImageModal/ImageModal.svelte';
  import { getSlideshowContext } from '$lib/contexts/slideshowContext';

  let { image, index, displayPrevious, displayNext, open, close } = $props();

  const displayContext = getSlideshowContext();
  let imageButton;

  let opened = $derived(index == displayContext.currentDisplayIndex);

  function trapFocusOnModal() {
    return (node) => {
      const tf = trapFocus(node, `next-button-${index}`, imageButton);
      return tf.destroy;
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
    trapFocus={trapFocusOnModal}
  />
{/if}
