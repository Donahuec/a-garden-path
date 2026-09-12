<script lang="ts">
  import GalleryEntry from './components/GalleryEntry.svelte';
  import { images } from '$lib/assets/img/home/meta.json';
  import '$lib/styles/media-queries.css';
  const imageModules = import.meta.glob('$lib/assets/img/home/*.jpeg', {
    eager: true,
    query: {
      enhanced: true,
      fit: 'cover'
    }
  });

  let count = Object.entries(imageModules).length;

  let displayIndex = $state(-1);
  let previous = $derived(displayIndex - 1 >= 0 ? displayIndex - 1 : count - 1);
  let next = $derived(displayIndex + 1 < count ? displayIndex + 1 : 0);

  function displayPrevious() {
    displayIndex = previous;
  }

  function displayNext() {
    displayIndex = next;
  }

  function getImageName(path: string): string {
    let split = path.split('/');
    let fileName = split[split.length - 1];
    return fileName.split('.')[0];
  }

  function getImageMeta(path: string) {
    return images[getImageName(path)];
  }
</script>

<main class="page-container">
  <h1>Images</h1>
  <p>Previous: {previous} Current: {displayIndex} Next: {next} Length: {count}</p>
  <section id="gallery" class="image-gallery">
    {#each Object.entries(imageModules) as [_path, module], index (_path)}
      <GalleryEntry
        {module}
        imageMeta={getImageMeta(_path)}
        {index}
        bind:displayIndex
        {displayPrevious}
        {displayNext}
        {count}
      />
    {/each}
  </section>
</main>

<style>
  .page-container {
    max-width: 80vw;
    margin-inline: auto;
    margin-block-start: var(--s-large-px);
  }

  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
    grid-auto-rows: var(250px);
    gap: var(--s-small-rem);
    padding-block: var(--s-small-px);
    min-height: var(250px);
  }
</style>
