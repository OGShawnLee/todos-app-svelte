type Filter = 'ACTIVE' | 'ALL' | 'COMPLETED';

type ColorTheme = 'DARK' | 'LIGHT';

interface Todo {
  id: number;
  isCompleted: boolean;
  value: string;
}
