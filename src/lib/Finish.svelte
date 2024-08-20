<script lang="ts">
	import { scale } from 'svelte/transition';

	export let state: 'win' | 'loose';
</script>

<p class="finish" in:scale={{ duration: 300, opacity: 0, start: 3 }}>
	{#if state === 'win'}
		You win!
	{:else if state === 'loose'}
		You loose!
	{/if}
</p>

<style lang="css">
	.finish {
		margin: auto;
		text-align: center;
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
