<script lang="ts">
  import { todos } from '../state';

  let className: string | undefined = undefined;

  export { className as class };
  export let as: keyof HTMLElementTagNameMap = 'div';

  const { filtered } = todos;
</script>

<svelte:element this={as} class={className}>
  <slot todos={$filtered} />
</svelte:element>
