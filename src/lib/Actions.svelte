<div class="actions">
	<slot />
</div>

<style lang="css">
	.actions {
		padding: 2vmin;
		gap: 2vmin;
		display: grid;
		grid-template-columns: 1fr;
	}

	@media (min-width: 400px) {
		.actions {
			grid-template-columns: repeat(2, 1fr);
		}

		.actions :global(:last-child) {
			grid-column: 1 / -1;
		}
	}

	@media (min-width: 640px) {
		.actions {
			grid-template-columns: repeat(3, 1fr);
		}

		.actions :global(:last-child) {
			grid-column: auto;
		}
	}
</style>
