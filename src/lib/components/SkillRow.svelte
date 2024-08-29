<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Select from "svelte-select";

	type Props = {
		skill: string;
		yearsOfExperience: number;
		isLastRow: boolean;
		skillOptions: {
			value: Number;
			label: string;
		}[];
		remove: () => void;
		add: () => void;
	};

	let { skill, yearsOfExperience, isLastRow, skillOptions, remove, add }: Props = $props();

	function handleCreate() {
		console.log("creating  ");
	}

	let filterText = "";

	let items = skillOptions.map((skill) => ({ value: skill.value, label: skill.label }));

	// function handleFilter(e) {
	// 	console.log("filter", e);
	// 	const filtered = e.detail;
	// 	if (filtered.length === 0 && filterText.length > 0) {
	// 		const prev = items.filter((i) => !i.created);
	// 		items = [...prev, { value: filterText, label: filterText, created: true }];
	// 	}
	// }

	// function handleChange(e) {
	// 	console.log("handleChange", e);
	// 	if (e.detail.created) {
	// 		// Add the new item to the list
	// 		items = [...items.filter((i) => !i.created), e.detail];
	// 	}
	// 	// Remove the 'created' flag from all items
	// 	items = items.map((i) => {
	// 		const { created, ...rest } = i;
	// 		return rest;
	// 	});
	// 	skill = e.detail.value;
	// }
</script>

<div class="flex gap-4">
	<div class="form-control w-5/6">
		<label class="input input-bordered flex items-center gap-2 w-full" for="skill-select">
			<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
				<path fill="currentColor" d="M30 30h-8V4h8zm-10 0h-8V12h8zm-10 0H2V18h8z" />
			</svg>

			<Select
				id="skill-select"
				class="select-style"
				on:input={() => console.log("imput")}
				bind:filterText
				placeholder=""
				containerStyles="border-radius: 2px; height: 100%; border: 0px; max-width: 100%;"
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
		class="input input-bordered w-1/6"
	/>

	{#if isLastRow}
		<button onclick={() => add()} class="btn btn-md">
			<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"
				/>
			</svg>
		</button>
	{:else}
		<button onclick={() => remove()} class="btn btn-md">
			<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
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
