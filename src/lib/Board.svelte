<script lang="ts">
	import Cell from './Cell.svelte';
	import Chip from './Chip.svelte';

	let state = [1, 1, 1, 1, 0, -1, -1, -1, -1];
</script>

<ul>
	{#each state as value, index}
		<Cell>
			<Chip {value} onClick={() => console.log({ value, index })} />
		</Cell>
	{/each}
</ul>
