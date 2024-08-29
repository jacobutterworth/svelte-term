<script lang="ts">
	import JobStatsForm from "$lib/components/JobStatsForm.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	console.log(data);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="" />
</svelte:head>

<main class="flex flex-col items-center p-4 sm:p-8">
	<h1 class="text-center p-4 sm:p-8">Careers stats socials generator</h1>
	<JobStatsForm skills={data.options} />
</main>

<style>
	h1 {
		width: 100%;
	}
</style>
