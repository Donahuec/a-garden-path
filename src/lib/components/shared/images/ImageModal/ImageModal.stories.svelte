<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ImageModal from './ImageModal.svelte';
  import image from '$lib/assets/img/home/flowers.jpeg?enhanced&fit=cover';
  import { fn } from 'storybook/test';
  import { trapFocus as tf } from '$lib/attachments/trapFocus.svelte.ts';
  import { ImageData } from '$lib/models/ImageMetadata';
  import type { ImageMetadata } from '$lib/models/ImageMetadata';

  function trapFocusOnModal() {
    return (node) => {
      const tfm = tf(node);
      return tfm.destroy;
    };
  }

  const { Story } = defineMeta({
    title: 'Images/ImageModal',
    component: ImageModal,
    tags: ['autodocs'],
    args: {
      title: 'Title',
      alt: 'Alt Text',
      description: 'This is a Description',
      trapFocus: trapFocusOnModal,
      close: fn(),
      isSlideshow: true,
      index: 1,
      displayPrevious: fn(),
      displayNext: fn()
    },
    globals: {
      backgrounds: { value: 'dark' }
    }
  });

  function buildImageData(title, alt, description) {
    let imageMetadata: ImageMetadata = {
      fileName: 'FileName',
      title: title,
      alt: alt,
      description: description
    };

    return new ImageData(image, imageMetadata);
  }
</script>

<script>
  import { setSlideshowContext } from '$lib/contexts/slideshowContext';

  setSlideshowContext({ currentDisplayIndex: 1, direction: 0 });
</script>

<Story
  name="Slideshow"
  args={{
    isSlideshow: true
  }}
>
  {#snippet template(args)}
    <ImageModal {...args} image={buildImageData(args.title, args.alt, args.description)} />
  {/snippet}
</Story>

<Story
  name="Static"
  args={{
    isSlideshow: false
  }}
>
  {#snippet template(args)}
    <ImageModal {...args} image={buildImageData(args.title, args.alt, args.description)} />
  {/snippet}
</Story>
