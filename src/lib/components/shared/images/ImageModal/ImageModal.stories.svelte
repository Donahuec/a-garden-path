<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ImageModal from './ImageModal.svelte';
  import image from '$lib/assets/img/home/flowers.jpeg?enhanced&fit=cover';
  import { fn } from 'storybook/test';
  import { trapFocus as tf } from '$lib/attachments/trapFocus.svelte.ts';

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
      image,
      title: 'Title',
      alt: 'Alt Text',
      description: 'Description Text',
      trapFocus: trapFocusOnModal,
      close: fn(),
      isSlideshow: true,
      index: 1,
      displayPrevious: fn(),
      displayNext: fn(),
      globals: {
        backgrounds: { value: 'dark' }
      }
    }
  });
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
/>
<Story
  name="Not Slideshow"
  args={{
    isSlideshow: false
  }}
/>
