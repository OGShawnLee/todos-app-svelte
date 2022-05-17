<script lang="ts">
  import { Switch, SwitchLabel } from 'malachite-ui/components';
  import { iconCheck } from '../assets';
  import { fade } from 'svelte/transition';

  export let isCompleted: boolean;
</script>

<Switch
  bind:checked={isCompleted}
  class={{
    base: 'h-7.5 w-7.5 min-w-7.5 | grid place-content-center | rounded-full transition',
    checked: {
      on: 'bg-gradient-to-tl from-pink to-cyan focus:(bg-gradient-to-tl from-blue to-cyan transform scale-105)',
      off: 'border-2 dark:border-slate-700 border-slate-200 dark:(hover:border-blue focus:border-blue) light:(hover:border-blue focus:border-blue)',
    },
  }}
  on:click>
  <SwitchLabel as="span" class="sr-only">
    <slot>Toggle Todo Completed State</slot>
  </SwitchLabel>
  {#if isCompleted}
    <img src={iconCheck} alt="" transition:fade />
  {/if}
</Switch>
