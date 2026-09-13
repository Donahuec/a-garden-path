<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ImageButton from './ImageButton.svelte';
  import image from '$lib/assets/img/home/flowers.jpeg?enhanced&fit=cover';
  import { fn } from 'storybook/test';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Images/ImageButton',
    component: ImageButton,
    tags: ['autodocs'],
    args: {
      image,
      title: 'Title',
      alt: 'Alt Text',
      size: '250',
      onclick: fn()
    }
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Base" args={{ image: image, title: 'Title', alt: 'alt', size: '250' }} />
