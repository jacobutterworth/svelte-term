<script lang="ts">
	import "../app.css";
	import Terminal from "./Terminal.svelte";
	import { clickoutside } from "$lib/utils/clickOutside";
	import { onMount } from "svelte";

	let isExpanded = false;
	let terminalContainer: HTMLDivElement;

	function handleClickOutside() {
		console.log("click_outside");
		isExpanded = false;
	}

	function handleExpand() {
		console.log("handleExpand");
		isExpanded = true;
	}

	function handleCloseTerminal() {
		console.log("Terminal closed");
		isExpanded = false;
	}

	onMount(() => {
		if (terminalContainer) {
			terminalContainer.addEventListener("closeterminal", handleCloseTerminal);
		}

		return () => {
			if (terminalContainer) {
				terminalContainer.removeEventListener("closeterminal", handleCloseTerminal);
			}
		};
	});
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer>
		<div
			use:clickoutside
			on:clickoutside={handleClickOutside}
			on:click={handleExpand}
			on:keydown={handleExpand}
			bind:this={terminalContainer}
			tabindex="-1"
			role="button"
			class="w-full"
		>
			<Terminal {isExpanded} />
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-height: 30vh;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 0 0;
		}
	}
</style>
