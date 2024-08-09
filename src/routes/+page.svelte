<script lang="ts">
	import Board from '$lib/Board.svelte';
	import Status from '$lib/Status.svelte';

	import { checkGameState, move, restart, type RootState } from '../game';

	let positions: RootState = restart();

	function moveChip(index: number) {
		positions = move(positions, index);
	}

	function onRestart() {
		positions = restart();
	}
</script>

<main class="page">
	<div class="board">
		<Board state={positions} onMove={moveChip} />
	</div>

	<Status state={checkGameState(positions)} {onRestart} />
</main>

<style lang="css">
	.page {
		display: flex;
		flex-direction: column;
	}

	@media (orientation: portrait) {
		.page {
			flex-direction: row-reverse;
			justify-content: flex-start;
		}
	}
</style>
