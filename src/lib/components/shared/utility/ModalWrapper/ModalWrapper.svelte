<script lang="ts">
  import { fade } from 'svelte/transition';
  let { children } = $props();
</script>

<div
  class="modal-backdrop"
  onclick={(event) => {
    if (event.target === event.currentTarget) {
      displayContext.currentDisplayIndex = -1;
    }
  }}
  aria-hidden="true"
  transition:fade={{ duration: 300 }}
></div>
<div class="modal-container">{@render children()}</div>

<style>
  .modal-backdrop {
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color-backdrop);
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
    pointer-events: none;
  }
</style>
