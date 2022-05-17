import type { Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';
import { isArray, isBoolean, isEmpty, isNumber, isObject, isString } from 'malachite-ui/predicate';
import { makeReadable } from 'malachite-ui/utils';

export function useDarkMode(initialValue: ColorTheme, localStorageKey: string) {
  const Theme: Writable<ColorTheme> = writable(initialValue, (set) => {
    const value = localStorage.getItem(localStorageKey) as ColorTheme | null;

    const setColorTheme = {
      DARK() {
        set('DARK');
        setDarkMode();
      },
      LIGHT() {
        set('LIGHT');
        setLightMode();
      },
    };

    if (value === 'DARK' || value === 'LIGHT') setColorTheme[value]();
    else if (preffersDarkMode()) setColorTheme.DARK();

    return Theme.subscribe((mode) => {
      localStorage.setItem(localStorageKey, mode);
      setColorTheme[mode]();
    });
  });

  return {
    subscribe: Theme.subscribe,
    isDarkMode: derived(Theme, (theme) => theme === 'DARK'),
    set: Theme.set,
    toggle: () => {
      Theme.update((colorTheme) => (colorTheme === 'DARK' ? 'LIGHT' : 'DARK'));
    },
  };
}

function preffersDarkMode() {
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light');
  return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'DARK' : 'LIGHT';
}

function setDarkMode() {
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light');
}

function setLightMode() {
  document.documentElement.classList.add('light');
  document.documentElement.classList.remove('dark');
}

export function useSettings(initialValue: Settings, localStorageKey: string) {
  const Settings: Writable<Settings> = writable(initialValue, (set) => {
    const value = localStorage.getItem(localStorageKey);
    if (value) {
      const parsed = JSON.parse(value);
      if (isSettingsObject(parsed)) set(parsed);
    }
    return Settings.subscribe((settings) => {
      localStorage.setItem(localStorageKey, JSON.stringify(settings));
    });
  });
  return {
    ...Settings,
    reset: () => Settings.set(initialValue),
  };
}

function isSettingsObject(val: unknown): val is Settings {
  return (
    isObject(val, ['askBeforeTodoDeletion', 'askBeforeCompletedDeletion']) &&
    isBoolean(val.askBeforeTodoDeletion) &&
    isBoolean(val.askBeforeTodoDeletion)
  );
}

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
