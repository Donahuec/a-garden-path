<script>
	import '$lib/styles/media-queries.css';
</script>

<section class="map" id="map">
	<div>
		<h2>What Is This Place?</h2>
		<p>
			My own <span class="flourish font-flourish">cozy little home</span> on the web.
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

<style>
	.map {
		padding: var(--s-large-px);
		display: flex;
		justify-content: space-evenly;
		margin-inline: auto;
		gap: 1rem;
		@media (--media-max-small) {
			flex-direction: column;
		}
	}

	.flourish {
		color: var(--secondary);
		font-size: 1.3em;
	}

	.dev-links {
		display: flex;
		flex-direction: column;
	}
</style>
