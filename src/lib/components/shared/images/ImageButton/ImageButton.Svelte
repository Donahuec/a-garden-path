<script lang="ts">
  import TitledImage from '$lib/components/shared/images/TitledImage/TitledImage.svelte';

  interface Props {
    image: unknown;
    title: string;
    alt: string;
    size: string;
    onclick: () => void;
  }

  let { image, title, alt, size, onclick }: Props = $props();
</script>

<button class="image-button" {onclick} style:--image-size={`${size}px`}>
  <TitledImage {image} {title} {alt} {size} />
</button>

<style>
  .image-button {
    width: var(--image-size, 250px);
    height: var(--image-size, 250px);
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
