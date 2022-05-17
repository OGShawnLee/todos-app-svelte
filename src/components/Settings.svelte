<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    Switch,
    SwitchGroup,
    SwitchLabel,
  } from 'malachite-ui/components';
  import { iconCheck } from '../assets';
  import { fade, fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import { settings } from '../state';

  export let open: boolean;
</script>

<Dialog bind:open class="fixed inset-0 grid place-content-center" let:content let:close>
  <DialogOverlay as="slot" let:overlay>
    <div class="fixed inset-0 | bg-slate-900/70" use:overlay transition:fade />
  </DialogOverlay>
  <div
    class="max-w-xs p-8 z-10 | dark:bg-slate-800 bg-slate-100 rounded-md lg:min-w-md"
    use:content
    transition:fly={{ y: 100, easing: quadOut }}>
    <DialogTitle
      class="mb-8 | uppercase text-2xl dark:text-white text-black font-bold tracking-[0.15em]">
      Settings
    </DialogTitle>

    <div class="flex flex-col gap-4">
      <SwitchGroup as="div" class="flex items-center gap-3" let:isChecked>
        <Switch
          bind:checked={$settings.askBeforeAllCompletedDeletion}
          class={{
            base: 'h-7.5 w-7.5 min-w-7.5 | grid place-content-center | rounded-full transition',
            checked: {
              on: 'bg-gradient-to-tl from-pink to-cyan focus:(bg-gradient-to-tl from-blue to-cyan transform scale-105)',
              off: 'border-2 dark:border-slate-700 border-slate-200 dark:(hover:border-blue focus:border-blue) light:(hover:border-blue focus:border-blue)',
            },
          }}>
          {#if isChecked}
            <img src={iconCheck} alt="" transition:fade />
          {/if}
        </Switch>
        <SwitchLabel as="span" class="<sm:text-sm">
          Confirm All Completed Todos Deletion
        </SwitchLabel>
      </SwitchGroup>
      <SwitchGroup as="div" class="flex items-center gap-3" let:isChecked>
        <Switch
          bind:checked={$settings.askBeforeTodoDeletion}
          class={{
            base: 'h-7.5 w-7.5 min-w-7.5 | grid place-content-center | rounded-full transition',
            checked: {
              on: 'bg-gradient-to-tl from-pink to-cyan focus:(bg-gradient-to-tl from-blue to-cyan transform scale-105)',
              off: 'border-2 dark:border-slate-700 border-slate-200 dark:(hover:border-blue focus:border-blue) light:(hover:border-blue focus:border-blue)',
            },
          }}>
          {#if isChecked}
            <img src={iconCheck} alt="" transition:fade />
          {/if}
        </Switch>
        <SwitchLabel as="span" class="<sm:text-sm">Confirm Todo Deletion</SwitchLabel>
      </SwitchGroup>
    </div>

    <div class="mt-6">
      <button
        class="px-6 py-2 | border-2 border-transparent rounded-md hover:dark:text-cyan focus:dark:border-cyan focus:light:border-slate-900"
        on:click={close}>Close</button>
    </div>
  </div>
</Dialog>
