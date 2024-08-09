export {
	canMove,
	checkGameState,
	move,
	playGame,
	restart,
	type GameState,
	type RootState
} from './game';

export {
	add,
	canRedo,
	canUndo,
	getEvents,
	redo,
	restart as restartHistory,
	undo,
	type HistoryState
} from './history';
