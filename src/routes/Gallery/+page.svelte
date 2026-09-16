<script lang="ts">
  import metadata from '$lib/assets/img/home/meta.json';
  import '$lib/styles/media-queries.css';
  import { setSlideshowContext } from '$lib/contexts/slideshowContext';
  import type { SlideshowContext } from '$lib/contexts/slideshowContext';
  import type { Picture } from '@sveltejs/enhanced-img';
  import { type ImageMetadataImport, ImageMap } from '$lib/models/imageMetadata.svelte';
  import { trapFocus } from '$lib/attachments/trapFocus.svelte';
  import ImageGallery from '$lib/components/shared/images/ImageGallery/ImageGallery.svelte';

  const imageModules: Record<string, Picture> = import.meta.glob('$lib/assets/img/home/*.jpeg', {
    eager: true,
    import: 'default',
    query: {
      enhanced: true,
      fit: 'cover'
    }
  });

  let imageData: ImageMap = $state(new ImageMap(imageModules, metadata as ImageMetadataImport));

  let currentDisplayIndex: number = $state(-1);
  let direction: number = $state(0);

  let displayContext: SlideshowContext = $state({
    get currentDisplayIndex() {
      return currentDisplayIndex;
    },
    get direction() {
      return direction;
    },
    setIndex: (index) => {
      currentDisplayIndex = index;
    },
    setDirection: (dir) => {
      direction = dir;
    }
  });

  let previous: number = $derived(
    displayContext.currentDisplayIndex - 1 >= 0
      ? displayContext.currentDisplayIndex - 1
      : imageData.count - 1
  );
  let next: number = $derived(
    displayContext.currentDisplayIndex + 1 < imageData.count
      ? displayContext.currentDisplayIndex + 1
      : 0
  );

  const right = -1;
  const left = 1;
  const vertical = 0;

  setSlideshowContext(displayContext);

  $effect(() => {
    if (displayContext.currentDisplayIndex == -1) {
      displayContext.direction = vertical;
    }
  });

  function displayPrevious() {
    displayContext.direction = left;
    displayContext.currentDisplayIndex = previous;
  }

  function displayNext() {
    displayContext.direction = right;
    displayContext.currentDisplayIndex = next;
  }

  function open(index: number) {
    displayContext.direction = vertical;
    displayContext.currentDisplayIndex = index;
  }
  function close() {
    displayContext.direction = vertical;
    displayContext.currentDisplayIndex = -1;
  }

  function handleKeydown(event) {
    if (displayContext.currentDisplayIndex !== -1) {
      if (event.key === 'Escape') {
        displayContext.direction = 0;
        displayContext.currentDisplayIndex = -1;
      } else if (event.key === 'ArrowRight') {
        displayNext();
      } else if (event.key === 'ArrowLeft') {
        displayPrevious();
      }
    }
  }

  function trapFocusOnModal() {
    return (node) => {
      return trapFocus(
        node,
        `image-modal-next-button-${displayContext.currentDisplayIndex}`,
        `image-button-${displayContext.currentDisplayIndex}`
      );
    };
  }
</script>

<svelte:window onkeydown={handleKeydown} />
<main class="page-container">
  <h1>Images</h1>
  <section id="gallery" class="image-gallery">
    <ImageGallery images={imageData} id="image-gallery" />
  </section>
</main>

<style>
  .page-container {
    max-width: 80vw;
    margin-inline: auto;
    margin-block-start: var(--spacing-xlarge-px);
  }
</style>
