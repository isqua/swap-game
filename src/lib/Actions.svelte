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
	}

	@media (min-width: 640px) {
		.actions {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
