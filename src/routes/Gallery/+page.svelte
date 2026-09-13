<script lang="ts">
  import GalleryEntry from './components/GalleryEntry.svelte';
  import { images } from '$lib/assets/img/home/meta.json';
  import '$lib/styles/media-queries.css';
  import { fade } from 'svelte/transition';
  import { setSlideshowContext } from '$lib/contexts/slideshowContext';
  import type { SlideshowContext } from '$lib/contexts/slideshowContext';
  import type { Picture } from '@sveltejs/enhanced-img';
  import { ImageData } from '$lib/models/ImageMetadata';
  import type { ImageMetadata } from '$lib/models/ImageMetadata';

  const imageModules: Record<string, Picture> = import.meta.glob('$lib/assets/img/home/*.jpeg', {
    eager: true,
    import: 'default',
    query: {
      enhanced: true,
      fit: 'cover'
    }
  });

  let imageData: Record<number, ImageData> = $state([]);

  Object.entries(imageModules).forEach(([_path, image], index) => {
    const meta = getImageMeta(_path);
    if (meta) {
      imageData[index] = new ImageData(image, meta);
    }
  });

  let count = $derived(Object.entries(imageData).length);

  let displayContext = $state({
    currentDisplayIndex: -1,
    direction: 0
  } as SlideshowContext);

  let previous = $derived(
    displayContext.currentDisplayIndex - 1 >= 0 ? displayContext.currentDisplayIndex - 1 : count - 1
  );
  let next = $derived(
    displayContext.currentDisplayIndex + 1 < count ? displayContext.currentDisplayIndex + 1 : 0
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
    console.log(index);
    displayContext.direction = vertical;
    displayContext.currentDisplayIndex = parseInt(index);
  }
  function close() {
    displayContext.direction = vertical;
    displayContext.currentDisplayIndex = -1;
  }

  function getImageName(path: string): string {
    let split = path.split('/');
    let fileName = split[split.length - 1];
    return fileName.split('.')[0];
  }

  function getImageMeta(path: string): ImageMetadata {
    return images[getImageName(path)];
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
</script>

<svelte:window onkeydown={handleKeydown} />
<main class="page-container">
  {#if displayContext.currentDisplayIndex !== -1}
    <div
      class="modal-backdrop"
      onclick={(event) => {
        if (event.target === event.currentTarget) {
          displayContext.currentDisplayIndex = -1;
        }
      }}
      aria-hidden="true"
      transition:fade={{ duration: 300 }}
    ></div>
  {/if}
  <h1>Images</h1>
  <section id="gallery" class="image-gallery">
    {#each Object.entries(imageData) as [index, image] (index)}
      <GalleryEntry {image} {index} {displayPrevious} {displayNext} {open} {close} />
    {/each}
  </section>
</main>

<style>
  .page-container {
    max-width: 80vw;
    margin-inline: auto;
    margin-block-start: var(--spacing-xlarge-px);
  }

  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
    grid-auto-rows: var(250px);
    gap: var(--spacing-medium-rem);
    padding-block: var(--spacing-medium-px);
    min-height: var(250px);
  }

  .modal-backdrop {
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color-backdrop);
  }
</style>
