<script>
  import Hero from './homeComponents/Hero.svelte';
  import Map from './homeComponents/Map.svelte';
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
</main>

<style>
  .page-container {
    /* Temporary extra space for scrollin' */
    margin-block-end: 800px;
  }
</style>
