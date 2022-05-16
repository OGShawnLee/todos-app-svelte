<script lang="ts">
  import Switch from './Switch.svelte';
  import { slide } from 'svelte/transition';
  import { todos } from '../state';
  import { quadOut } from 'svelte/easing';

  export let isCompleted: boolean;
  export let value: string;
  export let id: number;
</script>

<article
  class="h-18 px-6 | flex items-center gap-4"
  transition:slide={{ duration: 300, easing: quadOut }}>
  <Switch {isCompleted} on:click={() => todos.toggle(id, isCompleted)} />
  <h3
    class="text-xs sm:text-sm xl:text-lg transition ease-out duration-300"
    class:completed={isCompleted}>
    {value}
  </h3>
  <button
    class="group ml-auto h-8 w-8 min-w-8 | bg-slate-800 text-slate-600 rounded-full transition duration-300 ease-out hover:bg-slate-700 focus:bg-slate-700"
    on:click={() => todos.delete(id)}>
    <span class="sr-only"> Delete Todo </span>
    <i class="bx bx-x text-2xl group-hover:text-cyan group-focus:text-cyan" />
  </button>
</article>

<style>
  .completed {
    text-decoration: line-through;
    color: hsl(237, 14%, 26%);
  }
</style>
