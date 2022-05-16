<script lang="ts">
  import Switch from './Switch.svelte';
  import { inputElement, todos } from '../state';

  let className: string;
  export { className as class };

  let value = '';
  let isCompleted = false;

  function add() {
    todos.add(value, isCompleted);
    value = '';
    isCompleted = false;

    todos.filterBy.all();
  }
</script>

<section class="h-14 px-6 {className} | bg-slate-800 rounded-md shadow-lg">
  <h2 class="sr-only">New Todo</h2>
  <form class="h-full | flex items-center gap-3" on:submit|preventDefault={add}>
    <Switch bind:isCompleted />
    <label for="todo-input" class="sr-only"> Create a New Todo </label>
    <input
      bind:this={$inputElement}
      type="text"
      class="h-full w-full | bg-transparent xl:text-lg caret-blue"
      placeholder="Create a new todo..."
      id="todo-input"
      autocomplete="false"
      bind:value />
  </form>
</section>

<style>
  /* Change autocomplete styles in WebKit */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px hsl(235, 24%, 19%) inset;
    transition: background-color 5000s ease-in-out 0s;
  }
</style>
