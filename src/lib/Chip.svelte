<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { CrossfadeParams, TransitionConfig } from 'svelte/transition';

	type TransitionCallback = (
		node: HTMLElement,
		params: CrossfadeParams & {
			key: number;
		}
	) => () => TransitionConfig;

	export let box: number[];
	export let onClick;
	export let send: TransitionCallback;
	export let receive: TransitionCallback;
</script>

{#each box as value (value)}
	<button
		type="button"
		class="chip"
		class:right={value > 0}
		class:left={value < 0}
		on:click={onClick}
		animate:flip
		in:receive={{ key: value }}
		out:send={{ key: value }}
	>
		{value > 0 ? 'Right' : 'Left'}
	</button>
{/each}

<style lang="css">
	.chip {
		display: block;
		margin: auto;
		width: var(--chip-size);
		height: var(--chip-size);
		border-radius: 50%;
		cursor: pointer;
		box-shadow: -3px 5px 10px rgba(0, 0, 0, 0.6);
		border: 0;
		font-size: 0;
		color: transparent;
		opacity: 1 !important;
	}

	.chip.left {
		background: #fff;
		background-image: linear-gradient(to top, #abbaab, #ffffff);
		background-image: radial-gradient(
			circle at 65% 22%,
			#fff 0,
			#f0f0f0 20%,
			#abbaab 60%,
			#abbaab 79%,
			#333 100%
		);
	}

	.chip.right {
		background: crimson;
		background-image: linear-gradient(to bottom, #ed213a, #93291e);
		background-image: radial-gradient(
			circle at 65% 22%,
			#ed213a 0,
			#ed213a 20%,
			#dd1818 60%,
			#93291e 79%,
			#333 100%
		);
	}
</style>
