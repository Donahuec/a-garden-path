<script lang="ts">
  import { fly } from 'svelte/transition';
  import { getSlideshowContext, type SlideshowContext } from '$lib/contexts/slideshowContext';
  import { ImageData } from '$lib/models/imageMetadata.svelte';
  import '$lib/styles/media-queries.css';

  interface Props {
    image: ImageData;
    trapFocus: () => any;
    isSlideshow: boolean;
    index?: number;
  }

  let { image, trapFocus, isSlideshow = true, index = 0 }: Props = $props();

  const displayContext: SlideshowContext = $derived(
    isSlideshow
      ? getSlideshowContext()
      : { currentDisplayIndex: index, direction: 0, setIndex: (i) => {}, setDirection: (d) => {} }
  );
</script>

<article
  class="modal"
  in:fly|global={{
    x: displayContext.currentDisplayIndex === -1 ? 0 : 500 * displayContext.direction,
    y: displayContext.direction === 0 || displayContext.currentDisplayIndex === -1 ? 300 : 0,
    duration: 500
  }}
  out:fly|global={{
    x: displayContext.currentDisplayIndex === -1 ? 0 : -500 * displayContext.direction,
    y: displayContext.direction === 0 || displayContext.currentDisplayIndex === -1 ? 300 : 0,
    duration: 500
  }}
  {@attach trapFocus()}
>
  <h2 class="primary-image-title font-header">
    {image.title}
  </h2>
  <figure class="primary-image-figure">
    <enhanced:img class="primary-image" src={image.image} alt={image.alt} />
    <figcaption class="primary-image-caption">{image.description}</figcaption>
  </figure>
</article>

<style>
  .modal {
    position: relative;
    width: fit-content;
    pointer-events: auto;
    display: grid;
    grid-template-rows: auto auto 1fr;
    @media (--media-max-small) {
      max-width: 90vw;
    }
  }
  .primary-image-figure {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 2;
  }

  .primary-image {
    height: auto;
    width: auto;
    background-color: var(--dark-shade);
    padding: var(--spacing-medium-px);
    border-radius: var(--border-radius-medium);
    box-shadow: var(--box-shadow-high);
    max-width: 70vw;
    max-height: 70vh;
    margin-inline: auto;
    border-radius: var(--border-radius-medium);
    @media (--media-max-small) {
      padding: var(--spacing-small-px);
      max-height: 50vh;
      max-width: 85vw;
    }
  }

  .primary-image-title {
    text-align: center;
    line-height: 1;
    padding: 0;
    padding-block: var(--spacing-medium-rem);
  }

  .primary-image-caption {
    text-align: center;
    padding-inline: var(--spacing-small-rem);
    padding-block: var(--spacing-medium-rem);
    font-size: 1rem;
    max-width: 70vw;
    @media (--media-max-small) {
      max-width: 95vw;
    }
  }
</style>
