<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ImageModal from './ImageModal.svelte';
  //@ts-ignore
  import image from '$lib/assets/img/home/flowers.jpeg?enhanced&fit=cover';
  import { fn } from 'storybook/test';
  import { trapFocus as tf } from '$lib/attachments/trapFocus.svelte';
  import { type ImageMetadata, ImageData } from '$lib/models/imageMetadata.svelte';

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
    decorators: [() => ModalWrapper],
    args: {
      title: 'Title',
      alt: 'Alt Text',
      description: 'This is a Description',
      trapFocus: trapFocusOnModal,
      isSlideshow: true,
      index: 1
    } as any,
    parameters: {
      docs: {
        story: {
          inline: false,
          iframeHeight: '600px'
        }
      }
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
  import { setSlideshowContext, type SlideshowContext } from '$lib/contexts/slideshowContext';
  import ModalWrapper from '../../utility/ModalWrapper/ModalWrapper.svelte';

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
