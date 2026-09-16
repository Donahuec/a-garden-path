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

<div class="modal-container">
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
</div>

<style>
  .modal-container {
    position: fixed;
    display: grid;
    place-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    pointer-events: none;
  }

  .modal {
    position: relative;
    width: fit-content;
    pointer-events: auto;
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
  }

  .primary-image-title {
    /* position: absolute; */
    /* top: 0;
    left: 0;
    right: 0; */
    text-align: center;
    line-height: 1;
    padding: 0;
    padding-block: var(--spacing-medium-rem);
    /* transform: translateY(calc(calc(var(--spacing-small-px) + 100%) * -1)); */
  }

  .primary-image-caption {
    /* position: absolute; */
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    /* transform: translateY(calc(var(--spacing-small-px) + 100%)); */
    padding: 0;
    padding-block: var(--spacing-medium-rem);
    margin: 0;
    font-size: 1rem;
    max-width: 70vw;
  }
</style>
