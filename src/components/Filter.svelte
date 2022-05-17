<script lang="ts" context="module">
  function capitalise(str: string) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  }
</script>

<script lang="ts">
  import { todos } from '../state';
  import { useClassNameResolver } from 'malachite-ui/hooks';

  const { filter: current } = todos;

  export let filter: Filter;

  $: isSelected = $current === filter;

  const className = useClassNameResolver<'isSelected'>({
    base: '<sm:text-sm xl:text-base text-slate-600 font-bold transition duration-300 ease-out',
    selected: {
      on: 'text-blue transform focus:text-cyan',
      off: 'dark:(hover:text-white focus:text-white) hover:text-black focus:text-black',
    },
  });
</script>

<button class={className({ isSelected })} on:click aria-label="Show {capitalise(filter)} Todos">
  {capitalise(filter)}
</button>
