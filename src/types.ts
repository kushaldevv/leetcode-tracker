export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  link: string;
  notes: string;
  submittedDate: string;
  table: TableData | null;
  dsaPattern: string;
  needsRevision: boolean;
}

export interface TableData {
  columns: ColumnData[];
  rows: string[][];
}

export interface ColumnData {
  name: string;
  isIteration: boolean;
}

export interface AddProblemFormData {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  link: string;
  dsaPattern: string;
  needsRevision: boolean;
  submittedDate: string;
}