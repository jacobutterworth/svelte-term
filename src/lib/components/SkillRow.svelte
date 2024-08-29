<script lang="ts">
	import Select from "svelte-select";
	type SkillOption = {
		value: Number;
		label: string;
		isNew: boolean;
	};
	type Props = {
		skill: string;
		yearsOfExperience: number;
		isLastRow: boolean;
		skillOptions: SkillOption[];

		remove: () => void;
		add: () => void;
	};

	let { skill, yearsOfExperience, isLastRow, skillOptions, remove, add }: Props = $props();

	let filterText = $state("");

	let items = $state(
		skillOptions.map((skill) => ({
			value: skill.value,
			label: skill.label,
			isNew: false
		}))
	);

	async function handleCreate(e: CustomEvent<SkillOption>) {
		console.log("creating", items, filterText, e.detail.label);

		if (items.filter((i) => i.isNew).length === 0) {
			let tempArray = items.filter((item) => item.label !== e.detail.label);
			items = [...tempArray];
			console.log("items", items);
			return;
		}
		const newItem = items.filter((i) => i.isNew)[0].label;

		await fetch("/api/skills/create-skill", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ skill_name: newItem })
		});
	}

	function handleFilter(e: CustomEvent<SkillOption[]>) {
		if (e.detail.length === 0 && filterText.length > 0) {
			const prev = items.filter((i) => !i.isNew);
			items = [...prev, { value: 0, label: filterText, isNew: true }];
		}
	}
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
				on:change={(e) => handleCreate(e)}
				on:filter={handleFilter}
				bind:filterText
				containerStyles="border-radius: 2px; height: 100%; border: 0px; max-width: 100%;"
				{items}
			>
				<div slot="item" let:item>
					{item.isNew === true ? "Add new: " : ""}
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
</style>
