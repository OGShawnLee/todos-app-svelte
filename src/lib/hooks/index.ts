import type { Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';
import { isArray, isBoolean, isEmpty, isNumber, isObject, isString } from 'malachite-ui/predicate';
import { makeReadable } from 'malachite-ui/utils';

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

function isArrayTodos(value: unknown[]): value is Todo[] {
  return isArray(value, (obj): obj is Todo => {
    return (
      isObject(obj, ['id', 'isCompleted', 'value']) &&
      isNumber(obj.id) &&
      isBoolean(obj.isCompleted) &&
      isString(obj.value)
    );
  });
}

function saveTodos(todos: Todo[], localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(todos));
}
