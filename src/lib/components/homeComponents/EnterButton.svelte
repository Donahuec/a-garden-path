<script>
  let { action } = $props();
</script>

<div class="hero-action">
  <button class="enter-btn" onclick={() => action()}>
    <span class="enter-text font-header">Enter</span>
  </button>
  <div class="enter-btn-bg"></div>
</div>

<style>
  @keyframes fade-slide {
    0% {
      opacity: 0;
      transform: translateY(300%);
    }
    30% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .hero-action {
    display: grid;
    isolation: isolate;
    place-content: center;
    margin-block-start: var(--spacing-xlarge-px);
    animation: fade-in 750ms ease backwards;
    animation-delay: var(--animation-delay, 2000ms);
    @media (prefers-reduced-motion: no-preference) {
      animation: fade-slide 750ms ease-out backwards;
      animation-delay: var(--animation-delay, 2000ms);
    }
  }

  .enter-btn:focus-visible {
    outline: 2px dashed var(--secondary);
    outline-offset: 4px;
  }

  .enter-btn-bg,
  .enter-btn {
    grid-area: 1 / 1;
    height: var(--spacing-xxlarge-rem);
    width: var(--spacing-xxlarge-rem);
    border-radius: 50%;
  }

  .enter-btn-bg,
  .enter-btn::before {
    border-radius: 50%;
    background-color: var(--light-shade);
    transition:
      transform 250ms ease-in-out,
      opacity 250ms ease-in-out;
  }

  .enter-btn:active::before {
    opacity: 70%;
  }

  .enter-btn {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--dark-shade);
    text-transform: uppercase;
    --font-weight: 600;
    font-size: 1.5rem;
    letter-spacing: 2px;
  }

  .enter-btn-bg {
    z-index: 1;
    opacity: 0.25;
  }

  .enter-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .enter-btn:hover {
    cursor: pointer;

    & ~ .enter-btn-bg {
      transform: scale(1.25);
    }

    &::before {
      transform: scale(1.05);
    }
  }

  .enter-btn:active {
    & ~ .enter-btn-bg {
      transform: scale(1.15);
    }

    &::before {
      transform: scale(0.975);
    }
  }
</style>
