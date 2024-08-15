import { describe, it, expect } from 'vitest';
import { restart, add, undo, redo, getEvents, canUndo, canRedo } from './history';

describe('History', () => {
	it('should restart the history', () => {
		const state = restart<string>();

		expect(getEvents(state)).toEqual([]);
		expect(canUndo(state)).toEqual(false);
		expect(canRedo(state)).toEqual(false);
	});

	it('should add events to the history', () => {
		let state = restart<string>();
		state = add(state, 'event1');
		state = add(state, 'event2');
		state = add(state, 'event3');

		expect(getEvents(state)).toEqual(['event1', 'event2', 'event3']);
		expect(canUndo(state)).toEqual(true);
		expect(canRedo(state)).toEqual(false);
	});

	it('should undo an event', () => {
		let state = restart<string>();
		state = add(state, 'event1');
		state = undo(state);

		expect(getEvents(state)).toEqual([]);
		expect(canUndo(state)).toEqual(false);
		expect(canRedo(state)).toEqual(true);
	});

	it('should redo an event', () => {
		let state = restart<string>();
		state = add(state, 'event1');
		state = add(state, 'event2');
		state = undo(state);
		state = redo(state);

		expect(getEvents(state)).toEqual(['event1', 'event2']);
	});

	it('should not break if there is nothing to undo', () => {
		let state = restart<string>();
		state = undo(state);
		state = undo(state);
		state = add(state, 'event1');

		expect(getEvents(state)).toEqual(['event1']);
	});

	it('should not break if there is nothing to redo', () => {
		let state = restart<string>();
		state = add(state, 'event1');
		state = redo(state);
		state = add(state, 'event2');

		expect(getEvents(state)).toEqual(['event1', 'event2']);
	});

	it('should override events when adding not to latest position', () => {
		let state = restart<string>();
		state = add(state, 'event1');
		state = add(state, 'event2');
		state = undo(state);
		state = add(state, 'event3');

		expect(getEvents(state)).toEqual(['event1', 'event3']);
		expect(canUndo(state)).toEqual(true);
		expect(canRedo(state)).toEqual(false);
	});
});
