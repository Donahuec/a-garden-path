<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { trapFocus } from '$lib/attachments/trapFocus.svelte.ts';
  let {
    module,
    imageMeta,
    index,
    displayIndex = $bindable(),
    displayPrevious,
    displayNext,
    count
  } = $props();

  let alt = $derived(imageMeta.alt || '');
  let title = $derived(imageMeta.title || 'Untitled');
  let description = $derived(imageMeta.description || alt);

  let open = $derived(index == displayIndex);

  let fadeBackdrop = $state(0);

  const right = -1;
  const left = 1;
  const vertical = 0;

  let direction = $state(0);

  function next() {
    direction = right;
    displayNext();
  }

  function previous() {
    direction = left;
    displayPrevious();
  }

  $effect(() => {
    if (index != displayIndex) {
      if (index === 0 && displayIndex === count - 1) {
        direction = left;
      } else if (index === count - 1 && displayIndex === 0) {
        direction = right;
      } else {
        direction = index > displayIndex ? left : right;
      }
    }
  });
</script>

<button class="gallery-image-button" onclick={() => (displayIndex = index)}>
  <figure class="gallery-image-figure">
    <enhanced:img class="gallery-image" src={module.default} {alt} width="250" height="250" />
    <figcaption class="gallery-image-caption">{title}</figcaption>
  </figure>
</button>

{#if open}
  <div
    class="modal-container"
    role="presentation"
    onkeydown={(e) => {
      if (e.key === 'Escape') {
        displayIndex = -1;
      }
    }}
  >
    <div
      class="modal-backdrop"
      onclick={(event) => {
        if (event.target === event.currentTarget) {
          displayIndex = -1;
        }
      }}
      aria-hidden="true"
      transition:fade={{ duration: 300 }}
    ></div>
    <article
      class="modal"
      {@attach trapFocus}
      in:fly|global={{ x: 300 * direction, duration: 1000 }}
      out:fly|global={{ x: -300 * direction, duration: 1000 }}
    >
      <h2 class="primary-image-title font-header">{title} ({index})</h2>
      <figure class="primary-image-figure">
        <enhanced:img class="primary-image" src={module.default} {alt} />
        <figcaption class="primary-image-caption">{description}</figcaption>
      </figure>
      <button class="nav-button prev" onclick={() => previous()} aria-label="Previous">
        <span class="arrow">&#10218;</span>
      </button>
      <button class="nav-button next" onclick={() => next()} aria-label="Next">
        <span class="arrow">&#10219;</span>
      </button>
    </article>
  </div>
{/if}

<style>
  .gallery-image {
    width: 250px;
    height: 250px;
    object-fit: cover;
    display: block;
    border-radius: var(--br-medium);
    will-change: transform;
    transition: transform 250ms;
  }

  .gallery-image-button {
    background-color: var(--color-background);
    border: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;
    position: relative;
    isolation: isolate;
    box-shadow: var(--box-shadow-medium);
    border-radius: var(--br-medium);
  }

  .gallery-image-figure::before {
    content: '';
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    background: var(--text-backdrop-gradient);
  }

  .gallery-image-figure {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    z-index: 0;
  }

  .gallery-image-caption {
    position: absolute;
    bottom: var(--s-xsmall-rem);
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2;
    text-transform: capitalize;
    color: var(--soft-white);
    transition: transform 250ms;
    font-size: var(--font-size-body);
    font-family: var(--font-family-body);
  }

  .gallery-image-button:focus-visible,
  .gallery-image-button:hover:not(:active) {
    .gallery-image {
      transform: scale(var(--button-scale-up));
    }
    .gallery-image-caption {
      transform: translateY(-3px);
    }
  }

  .gallery-image-button:hover {
    cursor: pointer;
  }

  .gallery-image-button:focus-visible {
    outline: 2px dashed var(--secondary);
    outline-offset: 4px;
  }

  .modal-container {
    position: fixed;
    display: grid;
    place-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color-backdrop);
  }

  .modal {
    position: relative;
    background-color: var(--dark-shade);
    width: fit-content;
    padding: var(--s-small-px);
    border-radius: var(--br-medium);
    box-shadow: var(--box-shadow-high);
  }

  .primary-image {
    height: auto;
    width: auto;
    max-width: 70vw;
    max-height: 70vh;
    margin-inline: auto;
    border-radius: var(--br-medium);
  }

  .primary-image-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    line-height: 1;
    padding: 0;
    transform: translateY(calc(calc(var(--s-xsmall-px) + 100%) * -1));
  }

  .primary-image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    transform: translateY(calc(var(--s-xsmall-px) + 100%));
    padding: 0;
    margin: 0;
  }

  .nav-button {
    color: var(--light-shade);
    font-size: var(--s-large-rem);
    line-height: 0;
    height: var(--s-large-rem);
    width: var(--s-large-rem);
    position: absolute;
    top: 50%;
    border-radius: 50%;
    &.prev {
      left: 0;
      transform: translateY(-50%) translateX(calc(calc(var(--s-medium-px) + 100%) * -1));
      .arrow {
        margin-left: -5px;
      }
    }
    &.next {
      right: 0;
      transform: translateY(-50%) translateX(calc(var(--s-medium-px) + 100%));
      .arrow {
        margin-right: -5px;
      }
    }
    .arrow {
      display: block;
      width: var(--s-large-rem);
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
