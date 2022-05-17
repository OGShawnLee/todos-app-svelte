<script lang="ts">
  import { Dialog, DialogOverlay, DialogDescription, DialogTitle } from 'malachite-ui/components';
  import { fade, scale } from 'svelte/transition';
  import { inputElement, todos } from '../state';
  import { quadOut } from 'svelte/easing';

  export let length: number;
  export let open: boolean;
</script>

<Dialog class="fixed inset-0 | flex items-center justify-center" bind:open let:close let:content>
  <DialogOverlay as="slot" let:overlay>
    <div class="fixed inset-0 | bg-slate-900/70" use:overlay transition:fade />
  </DialogOverlay>

  <div
    class="max-w-xs p-8 z-10 | dark:bg-slate-800 bg-slate-100 rounded-md | sm:max-w-lg"
    use:content
    transition:scale={{ duration: 300, start: 0.75, easing: quadOut }}>
    <DialogTitle class="dark:text-white text-black font-bold sm:text-lg">
      Delete {length} completed {length > 1 ? 'todos' : 'todo'}?
    </DialogTitle>
    <DialogDescription class="text-sm">
      Do you want to delete all your completed todos? This action will be <strong
        class="dark:text-slate-100">
        irreversible
      </strong>.
    </DialogDescription>
    <div class="mt-6 | flex items-center gap-6">
      <button
        class="px-6 py-2 | border-2 border-transparent rounded-md transition-colors duration-300 ease-out 
        dark:focus:(text-cyan border-cyan) dark:hover:text-cyan focus:border-slate-900"
        on:click={close}>
        Cancel
      </button>
      <button
        class="px-6 py-2 | border-2 border-transparent rounded-md transition-colors duration-300 ease-out 
        dark:focus:(text-pink border-pink) dark:hover:text-pink focus:border-slate-900"
        on:click={() => {
          close($inputElement);
          todos.clear();
        }}>
        Delete
      </button>
    </div>
  </div>
</Dialog>
