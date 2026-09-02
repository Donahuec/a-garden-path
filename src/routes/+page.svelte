<script>
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
	<section class="hero">
		<div class="background-wrapper" aria-hidden="true"></div>
		<div class="title-container">
			<div class="container">
				<h1 class="page-header">
					<span>Hi! I'm <span class="flourish">Caitlin!</span></span>
					<span>You've Found My</span>
					<span class="digital">&lcub; Digital Garden &rcub;</span>
				</h1>
				<div class="color-squares">
					<div class="square" style="--square-color:var(--dark-shade)"></div>
					<div class="square"></div>
					<div class="square" style="--square-color:var(--light-accent)"></div>
					<div class="square" style="--square-color:var(--light-shade)"></div>
					<div class="square" style="--square-color:var(--secondary)"></div>
				</div>
				<div class="hero-action">
					<button class="enter-btn" onclick={scrollToElement}><span>Enter</span></button>
					<div class="enter-btn-bg"></div>
				</div>
			</div>
		</div>
	</section>
	<section class="map" id="map" bind:this={targetElement}>
		<div>
			<h2>What Is This Place?</h2>
			<p>
				My own <span class="flourish">cozy little home</span> on the web.
			</p>
		</div>
		<div class="quick-access">
			<h2>Looking for Something?</h2>
			<nav class="dev-links">
				<a href="https://github.com/Donahuec">Github</a>
				<a href="https://www.linkedin.com/in/donahuec/">LinkedIn</a>
				<a href="https://mineral-collection.vercel.app/">Mineral Collection</a>
				<a href="https://github.com/Donahuec/mineral-collection">Mineral Collection - Github</a>
			</nav>
		</div>
	</section>
</main>

<style>
	.page-container {
		margin-block-end: 800px;
	}
	.background-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('$lib/assets/img/homeCover.jpeg');
		background-size: cover;
		background-position: center;
		background-color: var(--primary);
		background-blend-mode: multiply;
		opacity: 0.2;
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
	}

	.page-header {
		display: flex;
		flex-direction: column;
		gap: var(--s-xsmall-rem);
		font-weight: 400;
		align-items: center;
		line-height: 1.5;
	}

	.container {
		grid-column: 2;
	}

	.color-squares {
		display: flex;
		gap: 4px;
		border: 1px dashed var(--primary);
		padding: 4px;
		width: fit-content;
		margin-inline: auto;
		margin-block: 4px;
	}

	.square {
		background-color: var(--square-color, var(--primary));
		height: var(--s-small-rem);
		width: var(--s-large-rem);
	}

	.flourish {
		color: var(--secondary);
		font-family: var(--flourish-font-family);
		font-weight: 400;
		font-size: 1.3em;
	}

	.digital {
		font-weight: 400;
		color: var(--light-accent);
		font-family: var(--font-mono);
		white-space: nowrap;
	}

	.hero-action {
		display: grid;
		isolation: isolate;
		place-content: center;
		margin-block-start: var(--s-large-px);
	}

	.enter-btn-bg,
	.enter-btn {
		grid-area: 1 / 1;
		height: var(--s-xlarge-rem);
		width: var(--s-xlarge-rem);
		border-radius: 50%;
		background-color: var(--light-shade);
	}

	.enter-btn {
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: var(--dark-shade);
		text-transform: uppercase;
		font-family: var(--header-font-family);
		font-weight: 600;
		transition: transform 250ms;
		font-size: 1.5rem;
		letter-spacing: 2px;
	}

	.enter-btn-bg {
		z-index: 1;
		transition: transform 250ms;
		opacity: 0.25;
	}

	.enter-btn:hover ~ .enter-btn-bg {
		transform: scale(1.25);
	}

	.map {
		padding: var(--s-large-px);
		display: flex;
		justify-content: space-evenly;
		margin-inline: auto;
	}

	.dev-links {
		display: flex;
		flex-direction: column;
	}
</style>
