<script lang="ts">
  import { bgMobileDark, bgDesktopDark } from './assets';
  import { Filter, Form, Todo as TodoComponent } from './components';
  import { todos } from './state';
  import { slide } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';

  const { filtered, left } = todos;
</script>

<picture
  class="fixed top-0 left-0 right-0 -z-10 h-[200px] | block | sm:h-[300px]"
  aria-hidden="true">
  <source media="(max-width: 375px)" srcset={bgMobileDark} sizes="375x200" />
  <source media="(min-width: 375px)" srcset={bgDesktopDark} sizes="1400x300" />
  <img class="h-full w-full object-center object-cover" src={bgMobileDark} sizes="375x200" alt="" />
</picture>

<header class="max-w-xs mx-auto py-12 | sm:max-w-xl">
  <h1 class="uppercase text-3xl text-white font-bold tracking-[0.35em] | lg:text-4xl">Todo</h1>
</header>

<main class="max-w-xs mx-auto | sm:max-w-xl">
  <Form class="mb-8" />

  <section class="mb-8 | bg-slate-800 rounded-md shadow-lg">
    <h2 class="sr-only">Todos</h2>

    <ul>
      {#each $filtered as { id, value, isCompleted } (id)}
        <li class="border-b border-b-slate-700">
          <TodoComponent {id} {value} {isCompleted} />
        </li>
      {:else}
        <div
          class="h-18 px-6 | grid place-content-center | border-b border-b-slate-700"
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
        class="<sm:text-sm xl:text-lg transition duration-300 ease-out hover:text-white focus:text-white"
        on:click={todos.clear}>
        Clear Completed
      </button>
    </div>
  </section>

  <div
    class="h-16 px-6 mb-12 | flex items-center justify-center gap-8 | bg-slate-800 shadow-lg rounded-md | lg:hidden">
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
