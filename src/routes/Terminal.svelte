<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';

  // Define types
  type Command = {
    id: string;  // Use a more granular unique identifier
    text: string;
    type: 'command' | 'response';
  };

  let commands: Command[] = [];
  let currentCommand: string = '';
  const prompt: string = '$ ';
  let terminalInput: HTMLInputElement;
  let belowInputDiv: HTMLDivElement;
  let commandCounter = 0; // Counter to ensure uniqueness

  const generateUniqueId = () => {
    commandCounter += 1;
    return `${new Date().toISOString()}-${commandCounter}`;
  };

  const handleCommand = () => {
    if (currentCommand.trim() !== '') {
      const newCommand: Command = {
        id: generateUniqueId(), // Generate a unique id
        text: `${prompt}${currentCommand}`,
        type: 'command'
      };
      commands = [...commands, newCommand];
      processCommand(newCommand.text);
      currentCommand = '';
    }
  };

  const processCommand = (cmd: string) => {
    let response = '';
    const input = cmd.trimEnd();
    switch (input.toLowerCase()) {
      case '$ help':
        response = 'Available commands: help, about, clear';
        break;
      case '$ about':
        response = 'This is a SvelteKit terminal emulator.';
        break;
      case '$ clear':
        commands = [];
        return;
      default:
        response = `Command not found: ${cmd}`;
    }
    commands = [...commands, { id: generateUniqueId(), text: response, type: 'response' }];
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleCommand();
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
    const input = document.getElementById('terminal-input') as HTMLInputElement;
    input.focus();
    adjustBelowInputHeight();
  });

  afterUpdate(() => {
    adjustBelowInputHeight();
  });
</script>

<div class="terminal">
  {#each commands as command (command.id)}
    <div class="terminal-line {command.type}">{command.text}</div>
  {/each}
  <div class="input-line">
    <span>{prompt}</span>
    <input
      id="terminal-input"
      type="text"
      bind:value={currentCommand}
      on:keydown={handleKeyDown}
      bind:this={terminalInput}
    />
  </div>
  <div
    class="below-input"
    on:click={focusInput}
    on:keydown={handleKeyDown}
    role="textbox"
    tabindex="-1"
    bind:this={belowInputDiv}
  ></div>
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
    overflow-y: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .below-input {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent; /* This is for debugging; make it transparent once confirmed */
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
