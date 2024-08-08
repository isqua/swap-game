<script lang="ts">
	export let value;
	export let onClick;
</script>

<button type="button" class="cell" on:click={onClick}>
	{value}
</button>
