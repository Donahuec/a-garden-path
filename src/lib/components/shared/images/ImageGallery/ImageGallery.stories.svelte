<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ImageGallery from './ImageGallery.svelte';

  import metadata from '$lib/assets/img/home/meta.json';
  import type { Picture } from '@sveltejs/enhanced-img';
  import { ImageMap, type ImageMetadataImport } from '$lib/models/imageMetadata.svelte';

  const imageModules: Record<string, Picture> = import.meta.glob('$lib/assets/img/home/*.jpeg', {
    eager: true,
    import: 'default',
    query: {
      enhanced: true,
      fit: 'cover'
    }
  });

  let imageData: ImageMap = new ImageMap(imageModules, metadata as ImageMetadataImport);

  const { Story } = defineMeta({
    title: 'Components/Images/Image Gallery',
    component: ImageGallery,
    tags: ['autodocs'],
    args: {
      images: imageData,
      id: 'storybook-gallery',
      minSize: '250px'
    }
  });
</script>

<script>
  import { setSlideshowContext, type SlideshowContext } from '$lib/contexts/slideshowContext';

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

<Story name="Base" />
