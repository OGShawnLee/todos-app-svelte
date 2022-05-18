<script>
  import { Switch, SwitchLabel } from 'malachite-ui/components';
  import { theme } from '../state';
  import { fade } from 'svelte/transition';
  import { iconMoon, iconSun } from '../assets';

  const { isDarkMode } = theme;
</script>

<Switch
  class="relative h-8 w-8 min-w-8 transform transition duration-300 focus:scale-125 hover:scale-125"
  checked={$isDarkMode}
  on:click={theme.toggle}>
  <SwitchLabel as="span" class="sr-only">Toggle Dark Mode</SwitchLabel>
  {#key $isDarkMode}
    <img
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      src={$isDarkMode ? iconSun : iconMoon}
      alt={$isDarkMode ? 'Light Mode' : 'Dark Mode'}
      transition:fade />
  {/key}
</Switch>
