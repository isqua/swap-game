export type RootState = Array<number>;

export const initialState: Readonly<RootState> = Object.freeze([1, 1, 1, 1, 0, -1, -1, -1, -1]);

export const restart = () => Array.from(initialState);

const swap = (state: Readonly<RootState>, a: number, b: number) => {
	const copy = state.slice(0);

	copy[a] = state[b];
	copy[b] = state[a];

	return copy;
};

export const move = (state: RootState, index: number): RootState => {
	// 1 can move only forward, -1 only backward
	const direction = state[index];
	let newIndex = index + direction;

	// Chips can jump to 0 if it is just after different value
	if (state[newIndex] !== 0 && state[newIndex] !== state[index]) {
		newIndex += direction;
	}

	const canMove = state[newIndex] === 0;

	return canMove ? swap(state, index, newIndex) : state;
};
