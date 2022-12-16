import { Language } from 'prism-react-renderer';

interface ProjectComponent {
  isFile: boolean;
  name: string;
  children?: Array<ProjectFolder | ProjectFile>;
}
export interface ProjectFile extends ProjectComponent {
  isFile: true;
  isOpen: boolean;
  language: Language;
  content: string;
}
export interface ProjectFolder extends ProjectComponent {
  isFile: false;
  children?: Array<ProjectFolder | ProjectFile>;
}

export interface ProjectCode {
  name: string;
  children: Array<ProjectFolder | ProjectFile>;
}

export * from './kanban';
