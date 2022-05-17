import { writable } from 'svelte/store';
import { useDarkMode, useTodos } from './lib';

export const inputElement = writable<HTMLElement | undefined>();

export const theme = useDarkMode('DARK', 'TODO-APP-OG-THEME-KEY');

export const todos = useTodos(
  [
    {
      id: 0,
      value: 'Complete online JavaScript course',
      isCompleted: true,
    },
    {
      id: 1,
      value: 'Jog around the park 3x',
      isCompleted: false,
    },
    {
      id: 2,
      value: '10 minutes meditatation',
      isCompleted: false,
    },
    {
      id: 3,
      value: 'Read for 1 hour',
      isCompleted: false,
    },
    {
      id: 4,
      value: 'Pick up groceries',
      isCompleted: false,
    },
    {
      id: 5,
      value: 'Complete Todo App on Frontend Mentor',
      isCompleted: false,
    },
  ],
  'TODO-APP-OG-TODOS-KEY'
);
