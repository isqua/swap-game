<script lang="ts">
	import type { GameState } from '../game';

	export let state: GameState;
</script>

<div class="status">
	{#if state === 'win'}
		<p>You win!</p>
	{:else if state === 'loose'}
		<p>You loose!</p>
	{:else}
		<p>
			Swap the balls! Each ball can move to an empty cell if it is adjacent. It can also jump over 1
			ball of a different color. The red balls can only move forward, and the white ones can only
			move backwards.
		</p>
	{/if}

	<div class="actions">
		<slot />
	</div>
</div>

<style lang="css">
	.status {
		flex-grow: 1;
		max-width: 40em;
		margin: auto;
		display: flex;
		padding: 2em;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
</style>
