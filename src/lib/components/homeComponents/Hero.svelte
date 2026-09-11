<script>
  import '$lib/styles/media-queries.css';
  import EnterButton from './EnterButton.svelte';
  let { action } = $props();
</script>

<section class="hero">
  <div class="background-wrapper" aria-hidden="true"></div>
  <div class="title-container">
    <div class="container">
      <h1 class="page-header">
        <span class="intro">Hi! I'm <span class="flourish font-flourish">Caitlin!</span></span>
        <span class="found">You've Found My</span>
        <span class="digital font-mono">&lcub; Digital Garden &rcub;</span>
      </h1>
      <div class="color-squares">
        <div class="square" style="--square-color:var(--dark-shade)"></div>
        <div class="square"></div>
        <div class="square" style="--square-color:var(--light-accent)"></div>
        <div class="square" style="--square-color:var(--light-shade)"></div>
        <div class="square" style="--square-color:var(--secondary)"></div>
      </div>
      <div class="enter-container">
        <EnterButton {action} --animation-delay="1700ms" />
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-slide {
    from {
      opacity: 0;
      transform: translateY(300%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .background-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('$lib/assets/img/home/homeCover.jpeg');
    background-size: cover;
    background-position: center;
    background-color: var(--primary);
    background-blend-mode: multiply;
    opacity: 0.3;
    z-index: -1; /* Pushes the background behind all page content */
    pointer-events: none; /* Ensures clicks pass through to content */
    /* The magic: Top 70% is fully solid, bottom 30% fades to transparent */
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  }

  .hero {
    height: 100vh;
    width: 100%;
    margin-inline: auto;
  }

  .title-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: var(--s-large-px);
    height: 100vh;
    align-items: center;
    @media (--media-max-small) {
      padding: 0;
      grid-template-columns: 1fr;
    }
  }

  .page-header {
    display: flex;
    flex-direction: column;
    gap: var(--s-xsmall-rem);
    font-weight: 400;
    align-items: center;
    line-height: 1.5;
    @media (--media-max-small) {
      font-size: 1.7rem;
    }
  }

  .container {
    grid-column: 2;
    @media (--media-max-small) {
      grid-column: 1;
    }
  }

  .color-squares {
    display: flex;
    gap: 4px;
    border: 1px dashed var(--primary);
    padding: 4px;
    width: fit-content;
    margin-inline: auto;
    margin-block: 2rem;

    .square {
      background-color: var(--square-color, var(--primary));
      height: var(--s-small-rem);
      width: var(--s-large-rem);
      @media (--media-max-small) {
        width: var(--s-medium-rem);
      }
    }
  }

  .intro {
    display: inline-block;
  }

  .flourish {
    color: var(--secondary-text);
    font-size: 1.3em;
    line-height: 1;
    /* This font has a large descender on capital letters
      So we do some pixel pushing to make it look aligned
      with the rest of the header
     */
    display: inline-block;
    vertical-align: middle;
    margin-top: -0.225em;
  }

  .digital {
    /* TODO FIGURE OUT COLOR ALPHA VAR */
    --color-alpha: 0.5;
    color: var(--light-accent);
    white-space: nowrap;
  }

  .intro,
  .found,
  .digital,
  .color-squares {
    animation: fade-in 1500ms backwards;
  }

  .intro {
    animation-delay: 250ms;
  }

  .found {
    animation-delay: 1250ms;
  }

  .digital {
    animation-delay: 1300ms;
  }

  .color-squares {
    animation-delay: 1400ms;
  }
</style>
