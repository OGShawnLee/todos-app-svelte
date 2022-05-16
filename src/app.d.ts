type Filter = 'ACTIVE' | 'ALL' | 'COMPLETED';

interface Todo {
  id: number;
  isCompleted: boolean;
  value: string;
}
