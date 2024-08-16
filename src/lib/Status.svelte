<script lang="ts">
	import type { GameState } from '../game';

	export let state: GameState;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="status">
	{#if state === 'win'}
		<p class="finish">You win!</p>
	{:else if state === 'loose'}
		<p class="finish">You loose!</p>
	{:else}
		<p>
			Swap the balls! Each ball can move to an empty cell if it is adjacent. It can also jump over 1
			ball of a different color.
		</p>
		<p>The red balls can only move forward, and the white ones can only move backwards.</p>
	{/if}
</div>

<style lang="css">
	.status {
		max-width: 40em;
		margin: auto;
		padding: 2em;
		text-align: center;
	}

	.finish {
		max-width: none;
		font-family: 'Luckiest Guy';
		letter-spacing: 0.05em;
		color: #fff;
		font-size: 15vmin;
		text-shadow:
			0 -0.04em 0 #212121,
			0.04em -0.04em 0 #212121,
			0.04em 0 0 #212121,
			0.04em 0.04em 0 #212121,
			0 0.04em 0 #212121,
			-0.04em 0.04em 0 #212121,
			-0.04em 0 0 #212121,
			-0.04em -0.04em 0 #212121,
			0em 0.07em 0.03em rgba(0, 0, 0, 0.3),
			0em 0.15em 0.2em rgba(0, 0, 0, 0.25);
	}
</style>
