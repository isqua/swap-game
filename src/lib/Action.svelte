<script lang="ts">
	export let disabled: boolean = false;
	export let onClick: () => void;
</script>

<button type="button" {disabled} on:click={onClick} class="action">
	<slot />
</button>

<style>
	.action {
		font-size: inherit;
		flex-grow: 1;
		background-color: #d6d3d1;
		font-weight: 500;
		color: #292524;
		border: none;
		padding: 1em 2em;
		border-radius: 1em;
		cursor: pointer;
		transition:
			background-color 0.3s,
			transform 0.3s;
	}

	.action:disabled {
		background-color: #f1f5f9;
		color: #94a3b8;
		cursor: not-allowed;
	}

	.action:not(:disabled):hover,
	.action:not(:disabled):active {
		background-color: #fdba74;
		transform: scale(1.03);
	}
</style>
