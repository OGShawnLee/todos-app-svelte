<script lang="ts">
  import { todos } from '../state';
  import { useClassNameResolver } from 'malachite-ui/hooks';

  const { filter: current } = todos;

  export let filter: Filter;

  $: isSelected = $current === filter;

  const className = useClassNameResolver<'isSelected'>({
    base: 'capitalize <sm:text-sm xl:text-base text-slate-600 font-bold transition duration-300 ease-out',
    selected: {
      on: 'text-blue transform focus:text-cyan',
      off: 'hover:text-white focus:text-white',
    },
  });
</script>

<button class={className({ isSelected })} on:click>
  {filter.toLowerCase()}
</button>
