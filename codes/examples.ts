// Example catalog shared by the examples page and the landing page.
export const CATEGORIES = {
  ALL: 'all',
  PRESENCE: 'presence',
  EDITOR: 'text-editor',
  CANVAS_TOOL: 'canvas-tool',
  PRODUCTIVITY: 'productivity',
  REACT: 'react-provider',
  ANDROID: 'android',
  IOS: 'ios',
} as const;
export type CategoryType = (typeof CATEGORIES)[keyof typeof CATEGORIES];
export type Example = {
  id: string;
  title: string;
  desc: string;
  thumbnail: string;
  category: CategoryType[];
};
export const EXAMPLES: Example[] = [
  {
    id: 'profile-stack',
    title: 'Profile Stack',
    desc: 'Profile stack shows the list of users currently accessing the Document.',
    thumbnail: 'profile-stack.jpg',
    category: [CATEGORIES.PRESENCE],
  },
  {
    id: 'simultaneous-cursors',
    title: 'Simultaneous Cursors',
    desc: 'This demo shows the real-time collaborative version of simple drawing, cursor animation with Yorkie and React.',
    thumbnail: 'simultaneous-cursors.png',
    category: [CATEGORIES.PRESENCE, CATEGORIES.REACT],
  },
  {
    id: 'simultaneous-cursors-android',
    title: 'Simultaneous Cursors Android',
    desc: 'This demo shows the real-time collaborative version of simple drawing, cursor animation with Yorkie and Android.',
    thumbnail: 'android-simultaneous-cursors.webp',
    category: [CATEGORIES.PRESENCE, CATEGORIES.ANDROID],
  },
  {
    id: 'kanban',
    title: 'Kanban Board',
    desc: 'Kanban Board is a tool for managing tasks and workflow. It is a visual way to manage tasks and workflow.',
    thumbnail: 'vuejs-kanban.jpg',
    category: [CATEGORIES.PRODUCTIVITY],
  },
  {
    id: 'todomvc',
    title: 'TodoMVC',
    desc: 'This is an example of real-time collaborative TodoMVC using Yorkie React.',
    thumbnail: 'react-todomvc.jpg',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.REACT],
  },
  {
    id: 'todomvc-android',
    title: 'TodoMVC Android',
    desc: 'This is an example of real-time collaborative TodoMVC using Yorkie Android.',
    thumbnail: 'android-todomvc.webp',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.ANDROID],
  },
  {
    id: 'todolist',
    title: 'Todo List',
    desc: 'This is an example of real-time collaborative todo list using Yorkie React.',
    thumbnail: 'nextjs-todolist.jpg',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.REACT],
  },
  {
    id: 'react-flow',
    title: 'React Flow',
    desc: 'This is an example of real-time collaborative React Flow using Yorkie React.',
    thumbnail: 'react-flow.png',
    category: [CATEGORIES.CANVAS_TOOL, CATEGORIES.REACT],
  },
  {
    id: 'codemirror',
    title: 'CodeMirror',
    desc: 'This is a real-time collaborative version of the CodeMirror editor. It uses the Text, a custom CRDT type from Yorkie.',
    thumbnail: 'vanilla-codemirror6.jpg',
    category: [CATEGORIES.EDITOR],
  },
  {
    id: 'tldraw',
    title: 'tldraw',
    desc: 'This is a real-time collaboration example of the tldraw whiteboard editor with Yorkie.',
    thumbnail: 'react-tldraw.jpg',
    category: [CATEGORIES.CANVAS_TOOL],
  },
  {
    id: 'prosemirror',
    title: 'ProseMirror',
    desc: 'This is a real-time collaborative version of the ProseMirror editor. It uses the Tree, a custom CRDT type from Yorkie.',
    thumbnail: 'vanilla-prosemirror.png',
    category: [CATEGORIES.EDITOR],
  },
  {
    id: 'quill',
    title: 'Rich Text Editor',
    desc: 'This demo shows the real-time collaborative version of the Quill editor with Yorkie and Vite.',
    thumbnail: 'vanilla-quill.png',
    category: [CATEGORIES.EDITOR],
  },
  {
    id: 'rich-text-editor-android',
    title: 'Rich Text Editor Android',
    desc: 'This demo shows the real-time collaborative version of the rich text editor with Yorkie and Android.',
    thumbnail: 'android-rich-text-editor.webp',
    category: [CATEGORIES.EDITOR, CATEGORIES.ANDROID],
  },
  {
    id: 'calendar',
    title: 'Scheduler',
    desc: 'This demo shows the real-time collaborative version of the Scheduler with Yorkie and Next.js.',
    thumbnail: 'nextjs-scheduler.png',
    category: [CATEGORIES.PRODUCTIVITY],
  },
  {
    id: 'scheduler-android',
    title: 'Scheduler Android',
    desc: 'This demo shows the real-time collaborative version of the Scheduler with Yorkie and Android.',
    thumbnail: 'android-scheduler.webp',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.ANDROID],
  },
  {
    id: 'scheduler-ios',
    title: 'Scheduler iOS',
    desc: 'This demo shows the real-time collaborative version of the Scheduler with Yorkie and iOS.',
    thumbnail: 'ios-scheduler.webp',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.IOS],
  },
  {
    id: 'rich-text-editor-ios',
    title: 'Rich Text Editor iOS',
    desc: 'This demo shows the real-time collaborative version of the rich text editor with Yorkie and iOS.',
    thumbnail: 'ios-rich-text-editor.webp',
    category: [CATEGORIES.EDITOR, CATEGORIES.IOS],
  },
  {
    id: 'simultaneous-cursors-ios',
    title: 'Simultaneous Cursors iOS',
    desc: 'This demo shows the real-time collaborative version of simple drawing, cursor animation with Yorkie and iOS.',
    thumbnail: 'ios-simultaneous-cursors.webp',
    category: [CATEGORIES.PRESENCE, CATEGORIES.IOS],
  },
  {
    id: 'todomvc-ios',
    title: 'TodoMVC iOS',
    desc: 'This is an example of real-time collaborative TodoMVC using Yorkie iOS SDK.',
    thumbnail: 'todomvc-ios.webp',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.IOS],
  },
];
