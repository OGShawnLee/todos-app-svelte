<script lang="ts">
  import {
    BackgroundImage,
    DeleteCompletedDialog,
    Filter,
    Form,
    ThemeSwitch,
    Todo as TodoComponent,
    Settings,
  } from './components';
  import { settings, todos } from './state';
  import { slide } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';

  const { filtered, left } = todos;

  $: completedLength = $todos.length - $left;

  let open = false;
  let openSettings = false;
</script>

<BackgroundImage />

<Settings bind:open={openSettings} />

<header class="max-w-xs mx-auto py-12 | flex items-center justify-between | sm:max-w-xl">
  <h1 class="uppercase text-3xl text-white font-bold tracking-[0.35em] | lg:text-4xl">Todo</h1>
  <div class="flex items-center gap-6">
    <button
      class="flex items-center justify-center"
      on:click={() => (openSettings = !openSettings)}>
      <span class="sr-only"> Open Settings </span>
      <i class="bx bxs-cog text-white text-3xl" />
    </button>
    <ThemeSwitch />
  </div>
</header>

<main class="max-w-xs mx-auto | sm:max-w-xl">
  <Form class="mb-8" />

  <section class="mb-8 | dark:bg-slate-800 bg-slate-100 rounded-md shadow-lg">
    <h2 class="sr-only">Todos</h2>

    <ul>
      {#each $filtered as { id, value, isCompleted } (id)}
        <li class="border-b dark:border-b-slate-700 border-b-slate-200">
          <TodoComponent {id} {value} {isCompleted} />
        </li>
      {:else}
        <div
          class="h-18 px-6 | grid place-content-center | border-b dark:border-b-slate-700 border-b-slate-200"
          transition:slide={{ duration: 300, easing: quadOut }}>
          <span class="text-sm sm:text-base text-slate-600"> Nothing to show, Uhh? </span>
        </div>
      {/each}
    </ul>

    <div class="h-16 px-6 | flex items-center justify-between | text-slate-600">
      <span class="<sm:text-sm xl:text-lg"> {$left} items left </span>

      <div class="hidden | gap-3 | lg:flex">
        <Filter filter="ALL" on:click={todos.filterBy.all} />
        <Filter filter="ACTIVE" on:click={todos.filterBy.active} />
        <Filter filter="COMPLETED" on:click={todos.filterBy.completed} />
      </div>

      <button
        class="<sm:text-sm xl:text-lg transition duration-300 ease-out hover:(dark:text-white text-black) focus:(dark:text-white text-black)"
        on:click={() => {
          if (completedLength <= 0) return;
          if ($settings.askBeforeAllCompletedDeletion) return (open = true);
          todos.clear();
        }}>
        Clear Completed

        <DeleteCompletedDialog bind:open length={completedLength} />
      </button>
    </div>
  </section>

  <div
    class="h-16 px-6 mb-12 | flex items-center justify-center gap-8 | dark:bg-slate-800 bg-slate-100 shadow-lg rounded-md | lg:hidden">
    <Filter filter="ALL" on:click={todos.filterBy.all} />
    <Filter filter="ACTIVE" on:click={todos.filterBy.active} />
    <Filter filter="COMPLETED" on:click={todos.filterBy.completed} />
  </div>
</main>

<style global>
  button,
  input {
    outline: none;
  }
</style>
