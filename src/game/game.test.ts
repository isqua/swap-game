import { describe, expect, it } from 'vitest';
import { checkGameState, desiredState, initialState, move, restart, type RootState } from './game';

const playGame = (initial: RootState, moves: number[]): RootState =>
	moves.reduce((currentState, chipIndex) => move(currentState, chipIndex), initial);

const checkGame = (initial: RootState, desired: RootState, moves: number[]) => {
	const actual = playGame(initial, moves);

	expect(actual).toEqual(desired);
};

describe('Game Logic', () => {
	it('should initialize with the correct state', () => {
		expect(restart()).toEqual(initialState);
	});

	it('should move 1 to the right if the next chip is 0', () => {
		const initial = [1, 1, 1, 1, 0, -1, -1, -1, -1];
		const desired = [1, 1, 1, 0, 1, -1, -1, -1, -1];

		checkGame(initial, desired, [3]);
	});

	it('should move 1 to the right if the nearest 0 is just in 1 cell', () => {
		const initial = [1, 1, 1, 1, -1, 0, -1, -1, -1];
		const desired = [1, 1, 1, 0, -1, 1, -1, -1, -1];

		checkGame(initial, desired, [3]);
	});

	it('should not move 1 if the next chip is 1', () => {
		const initial = [1, 1, 1, 1, 0, -1, -1, -1, -1];

		checkGame(initial, initial, [2]);
	});

	it('should not move 1 if the nearest 0 is further than 1 cell', () => {
		const initial = [1, 1, 1, 1, -1, -1, 0, -1, -1];

		checkGame(initial, initial, [2]);
	});

	it('should not move 1 if it is at the end of array', () => {
		const initial = [-1, -1, -1, -1, 0, 1, 1, 1, 1];

		checkGame(initial, initial, [initial.length - 1]);
	});

	it('should move -1 to the left if the previous chip is 0', () => {
		const initial = [1, 1, 1, 1, 0, -1, -1, -1, -1];
		const desired = [1, 1, 1, 1, -1, 0, -1, -1, -1];

		checkGame(initial, desired, [5]);
	});

	it('should not move -1 if the previous chip is not 0', () => {
		const initial = [1, 1, 1, 1, 0, -1, -1, -1, -1];

		checkGame(initial, initial, [6]);
	});

	it('should not move -1 if the nearest 0 is further than 1 cell', () => {
		const initial = [1, 1, 0, 1, 1, -1, -1, -1, -1];

		checkGame(initial, initial, [5]);
	});

	it('should not move -1 if it is at the start of array', () => {
		const initial = [-1, -1, -1, -1, 0, 1, 1, 1, 1];

		checkGame(initial, initial, [0]);
	});

	it('should show win mode if game is finished', () => {
		const game = desiredState;

		expect(checkGameState(game)).toEqual('win');
	});

	it('should show loose mode if there are no more moves available', () => {
		const game = [1, 1, 1, -1, -1, -1, -1, 0, 1];

		expect(checkGameState(game)).toEqual('loose');
	});

	it('should show idle mode if game is just started', () => {
		const game = restart();

		expect(checkGameState(game)).toEqual('idle');
	});

	it('should show play mode if game is not finished', () => {
		const actual = playGame(initialState, [3]);

		expect(checkGameState(actual)).toEqual('play');
	});
});
