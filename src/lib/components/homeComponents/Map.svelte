<script>
  import '$lib/styles/media-queries.css';
  import flowers from '$lib/assets/img/home/flowers.webp';
  import flowerBasin from '$lib/assets/img/home/flowerBasin.webp';
  import flowersRight from '$lib/assets/img/home/flowersRight.webp';
  import { images } from '$lib/assets/img/home/meta.json';
</script>

<section class="map" id="map">
  <div class="columns">
    <div class="what fade-in-on-scroll">
      <h2>What Is This Place?</h2>
      <p>
        My own <span class="flourish font-flourish">cozy little home</span> on the web.
      </p>
      <p>It's still in progress, but I'd like to share my photos, thoughts, and art here.</p>
    </div>
    <div class="quick-access fade-in-on-scroll">
      <h2>Looking for Something?</h2>
      <nav class="dev-links">
        <a href="https://github.com/Donahuec">Github</a>
        <a href="https://www.linkedin.com/in/donahuec/">LinkedIn</a>
        <a href="https://mineral-collection.vercel.app/">Mineral Collection</a>
        <a href="https://github.com/Donahuec/mineral-collection">Mineral Collection - Github</a>
      </nav>
    </div>
  </div>
  <div class="photos fade-in-on-scroll">
    <div class="photo-wrapper">
      <img class="photo" src={flowerBasin} alt={images.flowerBasin.alt} />
    </div>
    <div class="photo-wrapper">
      <img class="photo" src={flowers} alt={images.flowers.alt} />
    </div>
    <div class="photo-wrapper">
      <img class="photo" src={flowersRight} alt={images.flowersRight.alt} />
    </div>
  </div>
</section>

<style>
  .map {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 2rem;
  }

  .columns {
    width: min(100%, 90vw);
    flex-wrap: wrap;
    padding: var(--s-large-px);
    display: flex;
    justify-content: space-around;
    gap: 1rem;

    @media (--media-max-large) {
      padding: var(--s-medium-px);
    }

    @media (--media-max-small) {
      flex-direction: column;
      width: min-content;
    }
  }

  .what {
    max-width: 50%;
    min-width: 30ch;
    @media (--media-max-small) {
      max-width: 80%;
    }
  }

  .quick-access {
    min-width: max-content;
  }

  .flourish {
    color: var(--secondary-text);
    line-height: 1;
    font-size: 1.3em;
  }

  .dev-links {
    display: flex;
    flex-direction: column;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeAndSlideIn {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in-on-scroll {
    animation: fadeIn linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
    @media (prefers-reduced-motion: no-preference) {
      animation: fadeAndSlideIn linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 30%;
    }
  }

  .photos {
    display: flex;
    gap: 32px;
    justify-content: space-evenly;
    width: min(100%, 90vw);
    min-width: 70vw;
    @media (--media-max-medium) {
      gap: 1.5rem;
    }
    @media (--media-max-small) {
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
  }

  .photo-wrapper {
    overflow: hidden;
    border-radius: 48px;
    opacity: 0.5;
    transition: opacity 400ms ease-out;
    transition-delay: 250ms;

    outline: 2px dashed var(--secondary);
    outline-offset: 8px;
  }

  @media (prefers-reduced-motion: no-preference) {
    .photo {
      transition: transform 400ms ease-out;
      transition-delay: 250ms;
      will-change: transform;
    }
  }

  .photo {
    max-width: 256px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  .photo-wrapper:hover {
    opacity: 0.75;
    transition-delay: 0;
    .photo {
      @media (prefers-reduced-motion: no-preference) {
        transform: scale(1.1);
        transition-delay: 0;
      }
    }
  }
</style>
