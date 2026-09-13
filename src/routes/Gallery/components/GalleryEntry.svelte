<script lang="ts">
  import { trapFocus } from '$lib/attachments/trapFocus.svelte.ts';
  import ImageButton from '$lib/components/shared/images/ImageButton/ImageButton.svelte';
  import ImageModal from '$lib/components/shared/images/ImageModal/ImageModal.svelte';
  import { getSlideshowContext } from '$lib/contexts/slideshowContext';

  let { image, imageMeta, index, displayPrevious, displayNext, open, close } = $props();

  const displayContext = getSlideshowContext();
  let imageButton;

  let alt = $derived(imageMeta.alt || '');
  let title = $derived(imageMeta.title || 'Untitled');
  let description = $derived(imageMeta.description || alt);

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
  {image}
  {title}
  {alt}
  size="250"
  onclick={() => {
    open(index);
  }}
/>

{#if opened}
  <ImageModal
    {image}
    {title}
    {alt}
    {description}
    {index}
    {displayPrevious}
    {displayNext}
    {close}
    trapFocus={trapFocusOnModal}
  />
{/if}
