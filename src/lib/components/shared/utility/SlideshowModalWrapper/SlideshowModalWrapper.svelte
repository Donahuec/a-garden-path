<script lang="ts">
  import { type SlideshowContext, getSlideshowContext } from '$lib/contexts/slideshowContext';
  import ModalWrapper from '../ModalWrapper/ModalWrapper.svelte';
  import { fade } from 'svelte/transition';

  interface Props {
    onclose: () => void;
    fadeInDuration: number;
    fadeOutDuration: number;
    displayPrevious: () => void;
    displayNext: () => void;
  }

  let {
    onclose,
    fadeInDuration = 400,
    fadeOutDuration = 250,
    displayPrevious,
    displayNext,
    children
  } = $props();

  const displayContext: SlideshowContext = $state(getSlideshowContext());

  let isOpen = $derived(displayContext.currentDisplayIndex != -1);
</script>

<ModalWrapper {isOpen} {onclose} {fadeInDuration} {fadeOutDuration}>
  {#key displayContext.currentDisplayIndex}
    <div class="modal-container">
      {@render children()}
    </div>
  {/key}
  <button
    id={`image-modal-next-button`}
    class="nav-button next"
    onclick={() => displayNext()}
    aria-label="Next"
    in:fade={{ duration: fadeInDuration }}
    out:fade={{ duration: fadeOutDuration }}
  >
    <span class="arrow">&#10219;</span>
  </button>
  <button
    class="nav-button prev"
    onclick={() => displayPrevious()}
    aria-label="Previous"
    in:fade={{ duration: fadeInDuration }}
    out:fade={{ duration: fadeOutDuration }}
  >
    <span class="arrow">&#10218;</span>
  </button>
</ModalWrapper>

<style>
  .modal-container {
    position: fixed;
    display: grid;
    place-content: center;
    justify-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    pointer-events: none;
    &::-webkit-scrollbar {
      display: none;
    }
    overflow: auto;
    /* 2. Hides scrollbar for Firefox */
    scrollbar-width: none;
    /* 3. Hides scrollbar for IE and Old Edge */
    -ms-overflow-style: none;
    /* Webkit prefix needed for Safari compatibility */
    --gradient: linear-gradient(
      to bottom,
      black calc(100% - calc(var(--spacing-large-rem) + var(--spacing-xsmall-rem))),
      transparent 100%
    );
    -webkit-mask-image: var(--gradient);
    mask-image: var(--gradient);
    @media (--media-max-small) {
      place-content: start center;
      bottom: calc(var(--spacing-xlarge-rem) + var(--spacing-medium-rem));
    }
  }
  .nav-button {
    --size: calc(var(--spacing-xlarge-rem) + var(--spacing-medium-rem));
    z-index: 100;
    color: var(--light-shade);
    font-size: var(--spacing-xlarge-rem);
    line-height: 0;
    height: var(--size);
    width: var(--size);
    position: fixed;
    top: calc(50% - calc(var(--size) / 2));
    border-radius: 50%;
    pointer-events: auto;
    @media (--media-max-small) {
      top: unset;
      bottom: var(--spacing-small-rem);
      grid-template-columns: 1fr;
    }

    &.prev {
      left: var(--spacing-medium-rem);
      .arrow {
        left: 5%;
      }
    }
    &.next {
      right: var(--spacing-medium-rem);
      .arrow {
        right: 5%;
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
