interface File {
  type: string;
  name: string;
  content: string;
}
interface NestedFolder {
  [key: string]: NestedFolder | File;
}

export interface ProjectStructure {
  [key: string]: NestedFolder | File;
}

export * from './kanban';
