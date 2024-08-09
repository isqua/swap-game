<li class="cell">
	<slot />
</li>

<style lang="css">
	.cell {
		display: flex;
		background-image: linear-gradient(to top, #2c5364, #203a43, #0f2027);
		border-radius: 50%;
		width: var(--cell-size);
		height: var(--cell-size);
	}
</style>
