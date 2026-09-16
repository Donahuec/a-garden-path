<script lang="ts">
  import { trapFocus } from '$lib/attachments/trapFocus.svelte';
  import { getSlideshowContext, type SlideshowContext } from '$lib/contexts/slideshowContext';
  import type { ImageMap } from '$lib/models/imageMetadata.svelte';
  import SlideshowModalWrapper from '../../utility/SlideshowModalWrapper/SlideshowModalWrapper.svelte';
  import ImageButton from '../ImageButton/ImageButton.svelte';
  import ImageModal from '../ImageModal/ImageModal.svelte';

  interface Props {
    images: ImageMap;
    id: string;
    minSize?: string;
  }
  let { images, id, minSize }: Props = $props();

  let startIndex: number = $derived(images.startIndex);
  let maxIndex: number = $derived(images.maxIndex);

  const displayContext: SlideshowContext = $state(getSlideshowContext());

  let previous: number = $derived(
    displayContext.currentDisplayIndex - 1 >= startIndex
      ? displayContext.currentDisplayIndex - 1
      : maxIndex
  );
  let next: number = $derived(
    displayContext.currentDisplayIndex + 1 <= maxIndex
      ? displayContext.currentDisplayIndex + 1
      : startIndex
  );

  const right = -1;
  const left = 1;
  const vertical = 0;

  $effect(() => {
    if (displayContext.currentDisplayIndex == -1) {
      displayContext.setDirection(vertical);
    }
  });

  function displayPrevious() {
    displayContext.setDirection(left);
    displayContext.setIndex(previous);
  }

  function displayNext() {
    displayContext.setDirection(right);
    displayContext.setIndex(next);
  }

  function open(index: number) {
    displayContext.setDirection(vertical);
    displayContext.setIndex(index);
  }
  function close() {
    displayContext.setDirection(vertical);
    displayContext.setIndex(-1);
  }

  function handleKeydown(event) {
    if (displayContext.currentDisplayIndex !== -1) {
      if (event.key === 'Escape') {
        close();
      } else if (event.key === 'ArrowRight') {
        displayNext();
      } else if (event.key === 'ArrowLeft') {
        displayPrevious();
      }
    }
  }

  // Potential ideas for improvement
  // Overall it just needs to be simplified, it is overengineered for the current state...
  // Potentially attach to the wrapper instead?
  // potentially use 'this' reference to always return to the button that opened the modal
  function trapFocusOnModal() {
    return (node) => {
      return trapFocus(node, `image-modal-next-button-${displayContext.currentDisplayIndex}`);
    };
  }
</script>

<svelte:window onkeydown={handleKeydown} />
<div class="gallery-container" {id} style:--image-min-size={minSize}>
  {#each images.imageData as [index, image] (index)}
    <ImageButton
      id={`${id}-image-button-${index}`}
      image={image.image}
      title={image.title}
      alt={image.alt}
      size="100%"
      onclick={() => {
        open(index);
      }}
    />
  {/each}
</div>

{#if displayContext.currentDisplayIndex >= startIndex && displayContext.currentDisplayIndex <= maxIndex}
  <SlideshowModalWrapper
    onclose={(event) => {
      if (event.target === event.currentTarget) {
        close();
      }
    }}
    {displayPrevious}
    {displayNext}
  >
    {#key displayContext.currentDisplayIndex}
      <ImageModal
        image={images.getValue(displayContext.currentDisplayIndex)}
        index={displayContext.currentDisplayIndex}
        isSlideshow={true}
        trapFocus={trapFocusOnModal}
      />
    {/key}
  </SlideshowModalWrapper>
{/if}

<style>
  .gallery-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--image-min-size, 250px), 1fr));
    gap: var(--spacing-medium-rem);
    padding-block: var(--spacing-medium-px);
  }
</style>
