<script lang="ts">
  import { fly } from 'svelte/transition';
  import { trapFocus } from '$lib/attachments/trapFocus.svelte.ts';
  import ImageButton from '$lib/components/shared/images/ImageButton/ImageButton.svelte';
  let {
    module,
    imageMeta,
    index,
    displayIndex = $bindable(),
    displayPrevious,
    displayNext,
    direction = $bindable()
  } = $props();

  let imageButton;

  let alt = $derived(imageMeta.alt || '');
  let title = $derived(imageMeta.title || 'Untitled');
  let description = $derived(imageMeta.description || alt);

  let open = $derived(index == displayIndex);

  let flyY = $derived(direction === 0 || displayIndex === -1 ? 300 : 0);
  let flyInX = $derived(displayIndex === -1 ? 0 : 500 * direction);
  let flyOutX = $derived(displayIndex === -1 ? 0 : -500 * direction);

  function trapFocusOnModal() {
    return (node) => {
      const tf = trapFocus(node, `next-button-${index}`, imageButton);
      return tf.destroy;
    };
  }
</script>

<ImageButton
  bind:this={imageButton}
  image={module}
  {title}
  {alt}
  size="250"
  onclick={() => {
    direction = 0;
    displayIndex = index;
  }}
/>

{#if open}
  <div class="modal-container">
    <article
      class="modal"
      {@attach trapFocusOnModal()}
      in:fly|global={{ x: flyInX, y: flyY, duration: 500 }}
      out:fly|global={{ x: flyOutX, y: flyY, duration: 500 }}
    >
      <h2 class="primary-image-title font-header">{title}</h2>
      <figure class="primary-image-figure">
        <enhanced:img class="primary-image" src={module} {alt} />
        <figcaption class="primary-image-caption">{description}</figcaption>
      </figure>
      <button class="nav-button prev" onclick={() => displayPrevious()} aria-label="Previous">
        <span class="arrow">&#10218;</span>
      </button>
      <button
        id={`next-button-${index}`}
        class="nav-button next"
        onclick={() => displayNext()}
        aria-label="Next"
      >
        <span class="arrow">&#10219;</span>
      </button>
    </article>
  </div>
{/if}

<style>
  .modal-container {
    position: fixed;
    display: grid;
    place-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    pointer-events: none;
  }

  .modal {
    position: relative;
    background-color: var(--dark-shade);
    width: fit-content;
    padding: var(--spacing-medium-px);
    border-radius: var(--border-radius-medium);
    box-shadow: var(--box-shadow-high);
    pointer-events: auto;
  }

  .primary-image {
    height: auto;
    width: auto;
    max-width: 70vw;
    max-height: 70vh;
    margin-inline: auto;
    border-radius: var(--border-radius-medium);
  }

  .primary-image-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    line-height: 1;
    padding: 0;
    transform: translateY(calc(calc(var(--spacing-small-px) + 100%) * -1));
  }

  .primary-image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    transform: translateY(calc(var(--spacing-small-px) + 100%));
    padding: 0;
    margin: 0;
    font-size: 1rem;
  }

  .nav-button {
    color: var(--light-shade);
    font-size: var(--spacing-xlarge-rem);
    line-height: 0;
    height: var(--spacing-xxlarge-rem);
    width: var(--spacing-xxlarge-rem);
    position: absolute;
    top: 50%;
    border-radius: 50%;
    &.prev {
      left: 0;
      transform: translateY(-50%) translateX(calc(calc(var(--spacing-large-px) + 100%) * -1));
      .arrow {
        margin-left: calc(-5px + var(--spacing-large-rem));
      }
    }
    &.next {
      right: 0;
      transform: translateY(-50%) translateX(calc(var(--spacing-large-px) + 100%));
      .arrow {
        margin-left: calc(-5px + var(--spacing-large-rem));
      }
    }
    .arrow {
      display: block;
      width: var(--spacing-xlarge-rem);
      position: absolute;
      margin-top: -4px;
      top: 50%;
      transition: transform 250ms ease-out;
    }
  }

  .nav-button:hover {
    cursor: pointer;
  }

  .nav-button.prev:hover:not(:active) .arrow {
    transform: translateX(-25%);
  }

  .nav-button.next:hover:not(:active) .arrow {
    transform: translateX(25%);
  }

  .nav-button:focus-visible {
    outline: 2px dashed var(--secondary);
  }
</style>
