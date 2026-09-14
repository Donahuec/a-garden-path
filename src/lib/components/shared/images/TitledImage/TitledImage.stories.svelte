<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TitledImage from './TitledImage.svelte';
  //@ts-ignore
  import image from '$lib/assets/img/home/flowers.jpeg?enhanced&fit=cover';

  const { Story } = defineMeta({
    title: 'Components/Images/TitledImage',
    component: TitledImage,
    tags: ['autodocs'],
    args: {
      image,
      title: 'Title',
      alt: 'Alt Text',
      size: '250'
    }
  });
</script>

<Story name="Base" />
