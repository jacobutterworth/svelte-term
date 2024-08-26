<script lang="ts">
	import { onMount, afterUpdate, createEventDispatcher } from "svelte";

	export let isExpanded = false; // Make this a prop

	const dispatch = createEventDispatcher();

	type Command = {
		id: string;
		text: string;
		type: "command" | "response";
	};

	let commands: Command[] = [];
	let commandHistory: string[] = [];
	const availableCommands: string[] = ["help", "about", "clear", "color", "echo", "exit", "close"];
	let currentCommand: string = "";
	const prompt: string = "$ ";
	let terminalInput: HTMLInputElement;
	let belowInputDiv: HTMLDivElement;
	let commandCounter = 0;
	let historyIndex: number | null = null;
	let color = "green";
	let lastCommandDiv: HTMLDivElement;

	const generateUniqueId = () => {
		commandCounter += 1;
		return `${new Date().toISOString()}-${commandCounter}`;
	};

	const handleCommand = () => {
		if (currentCommand.trim() !== "") {
			commandHistory.push(currentCommand);
			const newCommand: Command = {
				id: generateUniqueId(),
				text: `${prompt}${currentCommand}`,
				type: "command"
			};
			commands = [...commands, newCommand];
			processCommand(newCommand.text);
			currentCommand = "";
		}
	};

	const handleColorChange = (newColor: string) => {
		const validColors = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];

		if (validColors.includes(newColor.toLowerCase())) {
			color = newColor.toLowerCase();
			return true;
		} else {
			commands = [
				...commands,
				{ id: generateUniqueId(), text: `Invalid color: ${newColor}`, type: "response" }
			];
			return false;
		}
	};

	const processCommand = (cmd: string) => {
		let response = "";
		const input = cmd.trimEnd();

		const [baseCommand, ...args] = input.split(" ");

		switch (args[0]?.toLowerCase()) {
			case "help":
				response = `Available commands: ${availableCommands.join(", ")}`;
				break;
			case "about":
				response = "This is a SvelteKit terminal emulator.";
				break;
			case "clear":
				commands = [];
				return;
			case "color":
				console.log(args[1]);

				const valid = handleColorChange(args[1]);
				if (valid) {
					color = args[1].toLowerCase();
					response = `Color set to ${args[1]}`;
				}
				break;
			case "echo":
				response = args.slice(1).join(" ").replaceAll('"', "");
				break;
			case "close":
				response = "Closing terminal...";
				isExpanded = false;
				dispatch("closeTerminal"); // Dispatch the custom event
				break;
			default:
				response = `Command not found: ${input}`;
		}
		commands = [...commands, { id: generateUniqueId(), text: response, type: "response" }];
	};

	const navigateHistory = (direction: number) => {
		if (commandHistory.length === 0) return;

		if (historyIndex === null) {
			if (direction === 1) {
				return;
			} else {
				historyIndex = commandHistory.length - 1;
			}
			historyIndex = commandHistory.length - 1;
		} else {
			historyIndex = historyIndex + direction;

			if (historyIndex < 0) {
				historyIndex = 0;
			} else if (historyIndex >= commandHistory.length) {
				currentCommand = "";
				historyIndex = null;
				terminalInput.setSelectionRange(0, 0);
				return;
			}
		}

		currentCommand = commandHistory[historyIndex];
		if (terminalInput) {
			console.log("moving to end of input");
			terminalInput.setSelectionRange(currentCommand.length, currentCommand.length);
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			handleCommand();
		}
		if (event.key === "ArrowUp") {
			navigateHistory(-1);
		}
		if (event.key === "ArrowDown") {
			navigateHistory(1);
		}
	};

	const focusInput = () => {
		if (terminalInput) {
			terminalInput.focus();
		}
	};

	const adjustBelowInputHeight = () => {
		if (terminalInput && belowInputDiv) {
			const inputBottom = terminalInput.getBoundingClientRect().bottom;
			const windowHeight = window.innerHeight;
			const height = windowHeight - inputBottom;
			belowInputDiv.style.height = `${height}px`;
		}
	};

	onMount(() => {
		const input = document.getElementById("terminal-input") as HTMLInputElement;
		input.focus();
		adjustBelowInputHeight();
	});

	afterUpdate(() => {
		adjustBelowInputHeight();
		if (!isExpanded && lastCommandDiv) {
			lastCommandDiv.scrollIntoView({ behavior: "smooth" });
		}
	});

	const getTextColor = (inputColor: string) => {
		switch (inputColor) {
			case "black":
				return "text-black-500";
			case "red":
				return "text-red-500";
			case "green":
				return "text-green-500";
			case "yellow":
				return "text-yellow-500";
			case "blue":
				return "text-blue-500";
			case "magenta":
				return "text-purple-500";
			case "cyan":
				return "text-cyan-500";
			case "white":
				return "text-white";
		}
	};
</script>

<div
	class={`terminal ${getTextColor(color)} ${isExpanded ? "expanded" : "collapsed"}`}
	on:click={() => {
		adjustBelowInputHeight();
	}}
	aria-label="Terminal"
	role="button"
	tabindex="-1"
	on:keydown={handleKeyDown}
>
	{#each commands as command (command.id)}
		<div bind:this={lastCommandDiv} class="terminal-line {command.type}">{command.text}</div>
	{/each}
	<div class="input-line">
		<span>{prompt}</span>
		<input
			class={`${getTextColor(color)}`}
			id="terminal-input"
			type="text"
			bind:value={currentCommand}
			on:keydown={handleKeyDown}
			bind:this={terminalInput}
		/>
	</div>
</div>

<style>
	.terminal {
		border-radius: 4px;
		background-color: black;
		font-family: "Courier New", Courier, monospace;
		padding: 10px;
		width: 100%;
		overflow-y: auto;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		transition: height 0.3s ease;
		cursor: pointer;
	}

	.collapsed {
		height: 40px; /* Adjust to desired height when collapsed */
	}

	.expanded {
		height: 30vh; /* Adjust to desired height when expanded */
		cursor: default;
	}

	.terminal-line {
		margin: 0;
		padding: 0;
	}

	.command {
		color: lightgreen;
	}

	.response {
		color: lightblue;
	}

	.input-line {
		display: flex;
	}

	.input-line span {
		margin-right: 5px;
	}

	input {
		background: none;
		border: none;
		outline: none;
		font-family: inherit;
		font-size: inherit;
		width: 100%;
	}
</style>
