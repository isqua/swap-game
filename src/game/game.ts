export type RootState = Readonly<Array<number>>;
export type GameState = 'idle' | 'play' | 'win' | 'loose';

export const initialState: RootState = Object.freeze([1, 1, 1, 1, 0, -1, -1, -1, -1]);
export const desiredState: RootState = Object.freeze([-1, -1, -1, -1, 0, 1, 1, 1, 1]);

export const restart = () => Array.from(initialState);

const swap = (state: Readonly<RootState>, a: number, b: number) => {
	const copy = state.slice(0);

	copy[a] = state[b];
	copy[b] = state[a];

	return copy;
};

const getDesiredIndex = (state: RootState, index: number) => {
	// 1 can move only forward, -1 only backward
	const direction = state[index];
	const newIndex = index + direction;

	// Chips can jump to 0 if it is just after different value
	if (state[newIndex] !== 0 && state[newIndex] !== state[index]) {
		return newIndex + direction;
	}

	return newIndex;
};

const canBeOccupied = (state: RootState, index: number): boolean => state[index] === 0;

export const move = (state: RootState, index: number): RootState => {
	const newIndex = getDesiredIndex(state, index);

	return canBeOccupied(state, newIndex) ? swap(state, index, newIndex) : state;
};

const canMove = (state: RootState, index: number): boolean => {
	if (canBeOccupied(state, index)) {
		return false;
	}

	const newIndex = getDesiredIndex(state, index);

	return canBeOccupied(state, newIndex);
};

export const checkGameState = (state: RootState): GameState => {
	if (state.join(',') === initialState.join(',')) {
		return 'idle';
	}

	if (state.join(',') === desiredState.join(',')) {
		return 'win';
	}

	if (state.some((_, index) => canMove(state, index))) {
		return 'play';
	}

	return 'loose';
};
