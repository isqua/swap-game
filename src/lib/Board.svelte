<script lang="ts">
	import { move, restart } from '../game';

	import Cell from './Cell.svelte';
	import Chip from './Chip.svelte';

	let state = restart();

	function moveChip(index: number) {
		state = move(state, index);
	}
</script>

<ul>
	{#each state as value, index}
		<Cell>
			<Chip {value} onClick={() => moveChip(index)} />
		</Cell>
	{/each}
</ul>
