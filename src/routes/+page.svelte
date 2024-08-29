<script>
	import JobStatsForm from "$lib/components/JobStatsForm.svelte";
	export let data;
	console.log(data);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="" />
</svelte:head>

<main class="flex flex-col items-center p-4 sm:p-8">
	<h1 class="text-center p-4 sm:p-8">Job stats image generator</h1>
	<JobStatsForm />
</main>

<style>
	h1 {
		width: 100%;
	}
</style>
