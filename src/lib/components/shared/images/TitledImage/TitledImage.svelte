<script lang="ts">
  interface Props {
    image: unknown;
    title: string;
    alt: string;
    size: string;
  }

  let { image, title, alt, size }: Props = $props();
</script>

<figure class="image-figure">
  <enhanced:img class="image" src={image} {alt} style:--image-size={`${size}px`} />
  <figcaption class="image-caption">{title}</figcaption>
</figure>

<style>
  .image {
    width: var(--image-size, 250px);
    height: var(--image-size, 250px);
    object-fit: cover;
    display: block;
    border-radius: var(--br-medium);
    will-change: transform;
    transition: transform 250ms;
    transform: scale(var(--image-scale, 1));
  }

  .image-figure::before {
    content: '';
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    background: var(--text-backdrop-gradient);
  }

  .image-figure {
    position: relative;
    width: fit-content;
    padding: 0;
    margin: 0;
    z-index: 0;
    border-radius: var(--br-medium);
    overflow: hidden;
  }

  .image-caption {
    position: absolute;
    bottom: var(--s-xsmall-rem);
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2;
    text-transform: capitalize;
    color: var(--soft-white);
    transition: transform 250ms;
    font-family: var(--font-family-body);
    font-size: 1rem;
    transform: translateY(var(--caption-translate-y, 0));
  }
</style>
