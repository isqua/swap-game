export type RootState = Readonly<Array<number>>;
export type GameState = 'idle' | 'play' | 'win' | 'loose';

export const initialState: RootState = Object.freeze([1, 1, 1, 1, 0, -1, -1, -1, -1]);
export const desiredState: RootState = Object.freeze([-1, -1, -1, -1, 0, 1, 1, 1, 1]);

export const restart = () => Array.from(initialState);

const isEqual = (a: RootState, b: RootState): boolean =>
	a.every((value, index) => value === b[index]);

const isSameColor = (state: RootState, a: number, b: number) => state[a] === state[b];

const isEmpty = (state: RootState, index: number): boolean => state[index] === 0;

const swap = (state: Readonly<RootState>, a: number, b: number) =>
	state.map((value, index, arr) => {
		if (index === a) return arr[b];
		if (index === b) return arr[a];
		return value;
	});

const getDesiredIndex = (state: RootState, index: number): number | null => {
	if (isEmpty(state, index)) {
		return null;
	}

	// 1 can move only forward, -1 only backward
	const direction = state[index];
	const newIndex = index + direction;

	if (isEmpty(state, newIndex)) {
		return newIndex;
	}

	// Chips can jump to 0 if it is just after different value
	if (!isSameColor(state, index, newIndex) && isEmpty(state, newIndex + direction)) {
		return newIndex + direction;
	}

	return null;
};

export const move = (state: RootState, index: number): RootState => {
	const newIndex = getDesiredIndex(state, index);

	return newIndex === null ? state : swap(state, index, newIndex);
};

export const canMove = (state: RootState, index: number): boolean =>
	getDesiredIndex(state, index) !== null;

export const playGame = (initial: RootState, moves: number[]): RootState =>
	moves.reduce((currentState, chipIndex) => move(currentState, chipIndex), initial);

export const checkGameState = (state: RootState): GameState => {
	if (isEqual(state, initialState)) {
		return 'idle';
	}

	if (isEqual(state, desiredState)) {
		return 'win';
	}

	if (state.some((_, index) => canMove(state, index))) {
		return 'play';
	}

	return 'loose';
};
