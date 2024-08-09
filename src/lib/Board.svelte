<script lang="ts">
	import { crossfade } from 'svelte/transition';

	import { type RootState } from '../game';

	import Cell from './Cell.svelte';
	import Chip from './Chip.svelte';

	const [send, receive] = crossfade({});

	export let state: RootState;
	export let onMove: (index: number) => void;

	$: boxes = (() => {
		let positiveCount = 0;
		let negativeCount = 0;

		return state.map((value) => {
			if (value > 0) {
				return [++positiveCount];
			}

			if (value < 0) {
				return [--negativeCount];
			}

			return [];
		});
	})();
</script>

<ul class="board">
	{#each boxes as box, index}
		<Cell>
			<Chip {box} {send} {receive} onClick={() => onMove(index)} />
		</Cell>
	{/each}
</ul>

<style lang="css">
	.board {
		display: flex;
		flex-direction: row;
		list-style: none;
		width: 100%;
		height: 12vw;
		padding: 0 1vw;
		margin: 0;
		box-sizing: border-box;
		border-radius: 0 0 2vmax 2vmax;
		justify-content: space-around;
		align-items: center;
		background: #0f2027;
		background-image: linear-gradient(to bottom, #2c5364, #203a43, #0f2027);
		user-select: none;

		--cell-size: 8vmax;
		--chip-size: 5.6vmax;
	}

	@media (orientation: portrait) {
		.board {
			flex-direction: column-reverse;
			height: 100%;
			width: 12vh;
			padding: 1vh 0;
			border-radius: 2vmax 0 0 2vmax;
		}
	}
</style>
