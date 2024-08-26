<script lang="ts">
	import { onMount } from "svelte";
	import SkillRow from "$lib/components/SkillRow.svelte";

	let skills = [{ skill: "", yearsOfExperience: 0 }];

	function addSkill() {
		skills = [...skills, { skill: "", yearsOfExperience: 0 }];
	}

	function deleteSkill(index: number) {
		skills = skills.filter((_, i) => i !== index);
	}
</script>

<div class="hero w-full">
	<div class="hero-content flex flex-col lg:flex-row-reverse gap-4">
		<div class="text-center lg:text-left w-full p-4 lg:p-8"></div>
		<div class="card bg-base-100 w-full shadow-md">
			<form class="card-body p-4 sm:p-8">
				<div class="row-auto flex flex-col gap-4 sm:flex-row sm:gap-2">
					<div class="form-control flex-1">
						<label class="label" for="name">
							<span class="label-text">Name</span>
						</label>
						<label class="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="h-4 w-4 opacity-70"
							>
								<path
									d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
								/>
							</svg>
							<input type="text" class="grow" id="name" />
						</label>
					</div>
					<div class="form-control flex-1">
						<label class="label" for="email">
							<span
								class="label-text tooltip cursor-pointer underline decoration-dotted"
								data-tip="This isn't stored anywhere"
								>Email
							</span>
						</label>

						<label class="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="h-4 w-4 opacity-70"
							>
								<path
									d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
								/>
								<path
									d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
								/>
							</svg>
							<input type="text" class="grow" id="email" />
						</label>
					</div>
				</div>
				<span class="label-text font-semibold">Skills</span>
				{#each skills as { skill, yearsOfExperience }, index (index)}
					<SkillRow
						bind:skill
						bind:yearsOfExperience
						isLastRow={index === skills.length - 1}
						on:add={addSkill}
						on:delete={() => deleteSkill(index)}
					/>
				{/each}

				<div class="form-control mt-6">
					<button class="btn btn-success text-white w-full">Generate</button>
				</div>
			</form>
		</div>
	</div>
</div>
