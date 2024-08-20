<script lang="ts">
	export let href: string = '';
	export let disabled: boolean = false;
	export let onClick: (() => void) | undefined = undefined;
</script>

{#if href}
	<a {href} on:click={onClick} class="action">
		<slot />
	</a>
{:else}
	<button type="button" {disabled} on:click={onClick} class="action">
		<slot />
	</button>
{/if}

<style>
	.action {
		font-size: inherit;
		flex-grow: 1;
		text-decoration: none;
		text-align: center;
		background-color: tan;
		font-weight: 500;
		color: #724913;
		border: none;
		padding: 1em 2em;
		border-radius: 1em;
		cursor: pointer;
		transition:
			background-color 0.3s,
			transform 0.3s;
	}

	.action:disabled {
		background-color: wheat;
		color: tan;
		cursor: not-allowed;
	}

	.action:not(:disabled):hover,
	.action:not(:disabled):active {
		background-color: #fdba74;
		transform: scale(1.03);
	}
</style>
