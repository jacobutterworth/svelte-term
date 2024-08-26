<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let skill: string;
	export let yearsOfExperience: number;
	export let isLastRow = false;

	const dispatch = createEventDispatcher();

	function handleDelete() {
		dispatch("delete");
	}

	function handleAdd() {
		dispatch("add");
	}
</script>

<div class="row">
	<input type="text" bind:value={skill} placeholder="Skill" class="input input-bordered flex-1" />
	<input
		type="number"
		bind:value={yearsOfExperience}
		placeholder="Years of Experience"
		class="input input-bordered flex-1"
	/>

	{#if isLastRow}
		<button on:click={handleAdd} class="btn btn-md">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				{...$$props}
			>
				<path
					fill="currentColor"
					d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"
				/>
			</svg>
		</button>
	{:else}
		<button on:click={handleDelete} class="btn btn-md">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				{...$$props}
			>
				<path
					fill="currentColor"
					d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
				/>
			</svg>
		</button>
	{/if}
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: 10px;
	}
</style>
