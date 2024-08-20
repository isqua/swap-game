<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<slot />

<style lang="css">
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	:global(body) {
		background-color: antiquewhite;
		color: saddlebrown;
		font-size: 16px;
		font-family: sans-serif;
		display: flex;
		flex-direction: column;
	}
</style>
