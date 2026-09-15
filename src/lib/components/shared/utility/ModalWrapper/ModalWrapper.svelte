<script lang="ts">
  import { fade } from 'svelte/transition';
  let { onclose, fadeInDuration = 400, fadeOutDuration = 250, children } = $props();
</script>

<div class="modal-wrapper">
  <div
    class="modal-backdrop"
    onclick={onclose}
    aria-hidden="true"
    in:fade={{ duration: fadeInDuration }}
    out:fade={{ duration: fadeOutDuration }}
  ></div>
  {@render children()}
</div>

<style>
  .modal-backdrop {
    position: fixed;
    pointer-events: all;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color-backdrop);
  }
  .modal-wrapper {
    position: fixed;
    display: grid;
    place-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    pointer-events: none;
    isolation: isolate;
  }
</style>
