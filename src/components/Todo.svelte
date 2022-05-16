<script lang="ts">
  import Switch from './Switch.svelte';
  import { Dialog, DialogDescription, DialogTitle } from 'malachite-ui/components';
  import { fade, scale, slide } from 'svelte/transition';
  import { inputElement, todos } from '../state';
  import { quadOut } from 'svelte/easing';

  export let isCompleted: boolean;
  export let value: string;
  export let id: number;

  let open = false;
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
    on:click={() => (open = true)}>
    <span class="sr-only"> Delete Todo </span>
    <i class="bx bx-x text-2xl group-hover:text-cyan group-focus:text-cyan" />
  </button>
</article>

<Dialog
  class="fixed inset-0 | flex items-center justify-center"
  bind:open
  let:close
  let:overlay
  let:content>
  <div
    class="fixed inset-0 | bg-slate-900/70 backdrop-filter backdrop-blur-[1px]"
    use:overlay
    transition:fade />

  <div
    class="max-w-xs p-8 z-10 | bg-slate-800 rounded-md | sm:max-w-lg"
    use:content
    transition:scale={{ duration: 300, start: 0.75, easing: quadOut }}>
    <DialogTitle class="text-white font-bold sm:text-lg">
      Delete "{value}"?
    </DialogTitle>
    <DialogDescription class="text-sm">
      Do you want to delete this <b class="text-slate-100">
        {isCompleted ? 'completed' : 'incompleted'}
      </b>
      todo? This action will be
      <strong class="text-slate-100"> irreversible </strong>.
    </DialogDescription>
    <div class="mt-6 | flex items-center gap-6">
      <button
        class="px-6 py-2 | border-2 border-transparent rounded-md transition-colors duration-300 ease-out focus:(text-cyan border-cyan) hover:text-pink"
        on:click={close}>
        Cancel
      </button>
      <button
        class="px-6 py-2 | border-2 border-transparent rounded-md transition-colors duration-300 ease-out focus:(text-pink border-pink) hover:text-pink"
        on:click={() => {
          close($inputElement);
          todos.delete(id);
        }}>
        Delete
      </button>
    </div>
  </div>
</Dialog>

<style>
  .completed {
    text-decoration: line-through;
    color: hsl(237, 14%, 26%);
  }
</style>
