<script lang="ts">
  import { onMount } from 'svelte';

  // Define types
  type Command = {
    text: string;
    type: 'command' | 'response';
  };

  let commands: Command[] = [];
  let currentCommand: string = '';
  const prompt: string = '$ ';

  const handleCommand = () => {
    if (currentCommand.trim() !== '') {
      commands = [
        ...commands,
        { text: `${prompt}${currentCommand}`, type: 'command' },
      ];
      processCommand(currentCommand);
      currentCommand = '';
    }
  };

  const processCommand = (cmd: string) => {
    // Add predefined commands here
    let response = '';
    switch (cmd.toLowerCase()) {
      case 'help':
        response = 'Available commands: help, about, clear';
        break;
      case 'about':
        response = 'This is a SvelteKit terminal emulator website built by [Your Name].';
        break;
      case 'clear':
        commands = [];
        return;
      default:
        response = `Command not found: ${cmd}`;
    }
    commands = [...commands, { text: response, type: 'response' }];
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleCommand();
    }
  };

  onMount(() => {
    const input = document.getElementById('terminal-input') as HTMLInputElement;
    input.focus();
  });
</script>

<div class="terminal">
  {#each commands as command (command.text)}
    <div class="terminal-line {command.type}">{command.text}</div>
  {/each}
  <div class="input-line">
    <span>{prompt}</span>
    <input
      id="terminal-input"
      type="text"
      bind:value={currentCommand}
      on:keydown={handleKeyDown}
    />
  </div>
</div>

<style>
  .terminal {
    border-radius: 4px;
    background-color: black;
    color: green;
    font-family: 'Courier New', Courier, monospace;
    padding: 20px;
    width: 100%;
    height: 100vh;
    /* margin: auto; */
    overflow-y: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
    color: green;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    width: 100%;
  }
</style>
