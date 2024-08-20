<script lang="ts">
	import Action from '$lib/Action.svelte';
	import Actions from '$lib/Actions.svelte';
	import Board from '$lib/Board.svelte';
	import Finish from '$lib/Finish.svelte';
	import Rules from '$lib/Rules.svelte';

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

	<div class="container">
		{#if state === 'win' || state === 'loose'}
			<Finish {state} />
		{:else}
			<Rules />
		{/if}
		<Actions>
			<Action disabled={!canUndo(history)} onClick={onUndo}>← Undo</Action>
			<Action disabled={!canRedo(history)} onClick={onRedo}>Redo →</Action>
			<Action disabled={state === 'idle'} onClick={onRestart}>Restart</Action>
			<Action href="https://github.com/isqua/swap-game">Source code</Action>
		</Actions>
	</div>
</main>

<style lang="css">
	.page {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.container {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	@media (orientation: portrait) {
		.page {
			flex-direction: row-reverse;
			justify-content: flex-start;
		}
	}
</style>
