<script>
  import Hero from './homeComponents/Hero.svelte';
  import Map from './homeComponents/Map.svelte';
  import { resolve } from '$app/paths';
  let targetElement;

  function scrollToElement() {
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('element not found');
    }
  }
</script>

<main class="page-container">
  <Hero action={scrollToElement} />
  <div id="scroll-target" bind:this={targetElement}>
    <Map />
  </div>
  <a class="home" href={resolve('/')} data-sveltekit-reload>Refresh</a>
</main>

<style>
  .page-container {
    /* Temporary extra space for scrollin' */
    margin-block-end: 800px;
  }

  .home {
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
