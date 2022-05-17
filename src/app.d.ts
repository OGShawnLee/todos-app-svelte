type Filter = 'ACTIVE' | 'ALL' | 'COMPLETED';

type ColorTheme = 'DARK' | 'LIGHT';

interface Settings {
  askBeforeAllCompletedDeletion: boolean;
  askBeforeTodoDeletion: boolean;
}

interface Todo {
  id: number;
  isCompleted: boolean;
  value: string;
}
