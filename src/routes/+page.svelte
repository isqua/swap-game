<script lang="ts">
	import Board from '$lib/Board.svelte';
	import Status from '$lib/Status.svelte';

	import {
		add,
		canMove,
		canUndo,
		canRedo,
		undo,
		redo,
		getEvents,
		checkGameState,
		move,
		playGame,
		restart,
		restartHistory,
		type HistoryState,
		type RootState
	} from '../game';

	let positions: RootState = restart();
	let history: HistoryState<number> = restartHistory();

	$: state = checkGameState(positions);

	function moveChip(index: number) {
		if (canMove(positions, index)) {
			history = add(history, index);
			positions = move(positions, index);
		}
	}

	function onRestart() {
		history = restartHistory();
		positions = restart();
	}

	function onUndo() {
		history = undo(history);
		positions = playGame(restart(), getEvents(history));
	}

	function onRedo() {
		history = redo(history);
		positions = playGame(restart(), getEvents(history));
	}
</script>

<main class="page">
	<div class="board">
		<Board state={positions} onMove={moveChip} />
	</div>

	<Status {state}>
		{#if state !== 'idle'}
			<button type="button" on:click={onRestart}>Restart</button>
		{/if}
		<button type="button" disabled={!canUndo(history)} on:click={onUndo}>← Undo</button>
		<button type="button" disabled={!canRedo(history)} on:click={onRedo}>Redo →</button>
	</Status>
</main>

<style lang="css">
	.page {
		flex-grow: 1;
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
