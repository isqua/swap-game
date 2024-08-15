export type HistoryState<T> = {
	events: Array<T>;
	current: number;
};

export const restart = <T>(): HistoryState<T> => ({
	events: [],
	current: -1
});

export const add = <T>(state: HistoryState<T>, event: T): HistoryState<T> => ({
	events: [...getEvents(state), event],
	current: state.current + 1
});

export const undo = <T>(state: HistoryState<T>): HistoryState<T> => ({
	events: state.events,
	current: Math.max(-1, state.current - 1)
});

export const redo = <T>(state: HistoryState<T>): HistoryState<T> => ({
	events: state.events,
	current: Math.min(state.events.length - 1, state.current + 1)
});

export const getEvents = <T>(state: HistoryState<T>): Array<T> =>
	state.events.slice(0, state.current + 1);

export const canUndo = <T>(state: HistoryState<T>): boolean => state.current >= 0;

export const canRedo = <T>(state: HistoryState<T>): boolean =>
	state.current < state.events.length - 1;
