# Frontend Mentor - Todo App Solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Todo App Solution](#frontend-mentor---todo-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![Desktop Dark Mode View](./screenshots/Screenshot%202022-05-17%20at%2009-49-22%20Frontend%20Mentor%20Todo%20App.png)
![Desktop Light Mode View](./screenshots/Screenshot%202022-05-17%20at%2009-50-04%20Frontend%20Mentor%20Todo%20App.png)

### Links

- Solution URL: [To be added](https://your-solution-url.com)
- Live Site URL: [Deployed on Vercel](https://todos-app-svelte-phi.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- WindiCSS + Flexbox
- Malachite UI
- Svelte + TypeScript + Transition API + State Management
- Mobile-first workflow
- Vite

### What I learned

I learnt how to modify the inputs autofilled styles, this was needed to keep the inputs looking appropiate for the dark and light mode.

```css
html.dark input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px hsl(235, 24%, 19%) inset;
  transition: background-color 5000s ease-in-out 0s;
}

html.light input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: black;
  -webkit-box-shadow: 0 0 0px 1000px hsl(236, 33%, 92%) inset;
  transition: background-color 5000s ease-in-out 0s;
}
```

I also had some practice building custom hooks for handling the todos, **all I have to do is initialise it once and the entire app has access to it!** No need to import a bloated and convoluted state management library!

```ts
export function useTodos(initialValue: Todo[], localStorageKey: string) {
  const Todos: Writable<Todo[]> = writable<Todo[]>([], (set) => {
    const value = localStorage.getItem(localStorageKey);
    if (value) {
      const parsed = JSON.parse(value);
      if (isArrayTodos(parsed)) initialValue = parsed;
    }
    set(initialValue);
    return Todos.subscribe((todos) => saveTodos(todos, localStorageKey));
  });

  const Filter = writable<Filter>('ALL');
  function useShow(filter: Filter) {
    return () => Filter.set(filter);
  }

  return {
    subscribe: Todos.subscribe,
    filter: makeReadable(Filter),
    filtered: derived([Todos, Filter], ([todos, filter]) => {
      switch (filter) {
        case 'ACTIVE':
          return todos.filter(({ isCompleted }) => !isCompleted);
        case 'ALL':
          return todos;
        case 'COMPLETED':
          return todos.filter(({ isCompleted }) => isCompleted);
        default:
          return todos;
      }
    }),
    left: derived(Todos, (todos) =>
      todos.reduce((total, { isCompleted }) => total + (isCompleted ? 0 : 1), 0)
    ),
    add(value: string, isCompleted = false) {
      if (isEmpty(value)) return;
      Todos.update((todos) => {
        return [{ value, isCompleted, id: Date.now() }, ...todos];
      });
    },
    toggle(id: number, isCompleted: boolean) {
      Todos.update((todos) => {
        const todo = todos.find((todo) => todo.id === id);
        if (todo) todo.isCompleted = !isCompleted;
        return todos;
      });
    },
    clear() {
      Todos.update((todos) => todos.filter((todo) => !todo.isCompleted));
    },
    delete(id: number) {
      Todos.update((todos) => todos.filter((todo) => todo.id !== id));
    },
    set: Todos.set,
    filterBy: {
      active: useShow('ACTIVE'),
      all: useShow('ALL'),
      completed: useShow('COMPLETED'),
    },
  };
}
```

### Useful resources

- [Removing Input Autocomplete Styles](https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/) - This helped me modify the default styles of autocompleted inputs to better fit the application current theme.

## Author

- Frontend Mentor - [@Shawn Lee](https://www.frontendmentor.io/profile/OGShawnLee)
