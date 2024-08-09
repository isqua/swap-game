<script lang="ts">
	import { type RootState } from '../game';

	import Cell from './Cell.svelte';
	import Chip from './Chip.svelte';

	export let state: RootState;
	export let onMove: (index: number) => void;
</script>

<ul class="board">
	{#each state as value, index}
		<Cell>
			{#if value !== 0}
				<Chip {value} onClick={() => onMove(index)} />
			{/if}
		</Cell>
	{/each}
</ul>

<style lang="css">
	.board {
		display: flex;
		flex-direction: row;
		padding: 0;
		list-style: none;
		width: 100%;
		height: 12vw;
		padding: 0 1vw;
		box-sizing: border-box;
		border-radius: 2vw;
		justify-content: space-around;
		align-items: center;
		background: #0f2027;
		background-image: linear-gradient(to bottom, #2c5364, #203a43, #0f2027);
		user-select: none;

		--cell-size: 8vw;
		--chip-size: 5.6vw;
	}

	@media (orientation: portrait) {
		.board {
			flex-direction: column;
			height: 90vh;
			width: 12vh;
			padding: 1vh 0;

			--cell-size: 8vh;
			--chip-size: 5.6vh;
		}
	}
</style>
