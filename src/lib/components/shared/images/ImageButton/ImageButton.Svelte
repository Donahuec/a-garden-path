<script lang="ts">
  import TitledImage from '$lib/components/shared/images/TitledImage/TitledImage.svelte';
  import type { Picture } from '@sveltejs/enhanced-img';

  interface Props {
    id?: string;
    image: Picture;
    title: string;
    alt: string;
    size: string;
    onclick: () => void;
  }

  let { id, image, title, alt, size, onclick }: Props = $props();
</script>

<button class="image-button" {onclick} style:--image-size={size} {id}>
  <TitledImage {image} {title} {alt} {size} />
</button>

<style>
  .image-button {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    max-width: var(--image-size, 250px);
    max-height: var(--image-size, 250px);
    border-radius: var(--border-radius-medium);
  }
  .image-button:focus-visible,
  .image-button:hover:not(:active) {
    --image-scale: var(--button-scale-up);
    --caption-translate-y: -3px;
  }

  .image-button:hover {
    cursor: pointer;
  }

  .image-button:focus-visible {
    outline: 2px dashed var(--secondary);
    outline-offset: 4px;
  }
</style>
