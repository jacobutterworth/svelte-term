<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Select from "svelte-select";

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
	function handleCreate() {
		console.log("creating  ");
	}

	let filterText = "";

	let items = [
		{ value: "1", label: "name 1", created: false },
		{ value: "2", label: "name 2", created: false },
		{ value: "3", label: "name 3", created: false },
		{ value: "4", label: "name 4", created: false },
		{ value: "5", label: "name 5", created: false }
	];

	function handleFilter(e: CustomEvent<string>) {
		if (e.detail.length === 0 && filterText.length > 0) {
			const prev = items.filter((i) => typeof i.created === "undefined");
			items = [...prev, { value: filterText.toString(), label: filterText, created: true }];
		}
	}

	function handleChange() {
		console.log("handleChange");
	}
</script>

<div class="flex gap-4">
	<div class="form-control flex-1">
		<label class="input input-bordered flex items-center gap-2 w-full" for="skill-select">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 32 32"
				{...$$props}
			>
				<path fill="currentColor" d="M30 30h-8V4h8zm-10 0h-8V12h8zm-10 0H2V18h8z" />
			</svg>
			<Select
				id="skill-select"
				class="select-style"
				on:change={handleChange}
				on:filter={handleFilter}
				bind:filterText
				placeholder=""
				containerStyles="border-radius: 2px; height: 100%; border: 0px;"
				{items}
			>
				<div slot="item" let:item>
					{item.created ? "Add new: " : ""}
					{item.label}
				</div>
			</Select>
		</label>
	</div>

	<input
		type="number"
		min="0"
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
	.select-style {
		width: 100%;
		border-radius: 1px;
		padding: 0.5rem;
	}
</style>
