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

<div class="flex gap-4">
	<label class="input input-bordered flex items-center gap-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 32 32"
			{...$$props}
		>
			<path fill="currentColor" d="M30 30h-8V4h8zm-10 0h-8V12h8zm-10 0H2V18h8z" />
		</svg>
		<input type="text" bind:value={skill} class="input flex" />
	</label>

	<input
		type="number"
		bind:value={yearsOfExperience}
		placeholder="Years of Experience"
		class="input input-bordered flex"
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
		/* display: flex; */
		/* align-items: center; */
		/* gap: 10px; */
	}
</style>
