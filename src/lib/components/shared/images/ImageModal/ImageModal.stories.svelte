<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ImageModal from './ImageModal.svelte';
  //@ts-ignore
  import image from '$lib/assets/img/home/flowers.jpeg?enhanced&fit=cover';
  import { fn } from 'storybook/test';
  import { trapFocus as tf } from '$lib/attachments/trapFocus.svelte';
  import { type ImageMetadata, ImageData } from '$lib/models/imageMetadata';

  function trapFocusOnModal() {
    return (node) => {
      return tf(node);
    };
  }

  const { Story } = defineMeta({
    title: 'Components/Modals/ImageModal',
    component: ImageModal,
    tags: ['autodocs'],
    //@ts-ignore
    decorators: [() => ModalDecorator],
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
    } as any,
    globals: {
      backgrounds: { value: 'dark' }
    }
  });

  function buildImageData(title: string, alt: string, description: string): ImageData {
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
  import ModalDecorator from '$lib/storybook/ModalDecorator.svelte';

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
