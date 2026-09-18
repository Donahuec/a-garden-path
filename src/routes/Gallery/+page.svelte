<script lang="ts">
  import metadata from '$lib/assets/img/home/meta.json';
  import '$lib/styles/media-queries.css';
  import { setSlideshowContext } from '$lib/contexts/slideshowContext';
  import type { SlideshowContext } from '$lib/contexts/slideshowContext';
  import type { Picture } from '@sveltejs/enhanced-img';
  import { type ImageMetadataImport, ImageMap } from '$lib/models/imageMetadata.svelte';
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

  setSlideshowContext(displayContext);
</script>

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
