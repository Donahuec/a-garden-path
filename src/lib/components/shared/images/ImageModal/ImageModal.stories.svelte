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

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
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
      direction: 0,
      globals: {
        // 👇 Set background value for all component stories
        backgrounds: { value: 'dark' }
      }
    }
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story
  name="Base"
  args={{ image: image, title: 'Title', alt: 'alt', description: 'This is a description' }}
/>
