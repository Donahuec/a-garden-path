<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import { onNavigate } from '$app/navigation';
  import '$lib/styles/media-queries.css';
  import '$lib/styles/resets.css';
  import '$lib/styles/utilities.css';
  import '$lib/styles/colors.css';
  import '$lib/styles/variables.css';
  import '$lib/styles/typography.css';
  import '$lib/styles/globals.css';

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  let { children } = $props();

  // eslint-disable-next-line svelte/valid-prop-names-in-kit-pages
  export const prerender = true;
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="page-container">
  {@render children()}
</div>
