<script lang="ts">
  import { bgMobileDark, bgDesktopDark, bgDesktopLight, bgMobileLight } from '../assets';
  import { theme } from '../state';
  import { fade } from 'svelte/transition';

  const { isDarkMode } = theme;

  $: bgDesktop = $isDarkMode ? bgDesktopDark : bgDesktopLight;
  $: bgMobile = $isDarkMode ? bgMobileDark : bgMobileLight;
</script>

{#key $isDarkMode}
  <picture
    class="fixed top-0 left-0 right-0 -z-10 h-[200px] | block | sm:h-[300px]"
    aria-hidden="true">
    <source media="(max-width: 375px)" srcset={bgMobile} sizes="375x200" />
    <source media="(min-width: 375px)" srcset={bgDesktop} sizes="1400x300" />
    <img
      class="h-full w-full object-center object-cover"
      src={bgMobile}
      sizes="375x200"
      alt=""
      transition:fade />
  </picture>
{/key}
