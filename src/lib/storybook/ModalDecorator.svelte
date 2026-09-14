<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div>
  {@render children()}
</div>

<style>
  div {
    height: 500px;
    margin: 3em;
  }
</style>
