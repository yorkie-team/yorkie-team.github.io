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
// Platform the example runs on. It picks the device frame drawn around the thumbnail.
export type ExamplePlatform = 'web' | 'android' | 'ios';
// Presentation hints for a thumbnail inside its frame. The screenshot always keeps its own aspect ratio.
export type ThumbnailLayout = {
  // Mobile screenshots taken in landscape get a landscape device frame instead of a portrait phone.
  orientation?: 'portrait' | 'landscape';
  // CSS object-position for screenshots cropped by a browser frame. Defaults to 'center top'.
  position?: string;
};
// Web thumbnails are named `<sdk-example-dir>.jpg`: `npm run fetch:examples` copies each
// `examples/<dir>/thumbnail.jpg` from yorkie-js-sdk to `public/assets/images/examples/<dir>.jpg`.
export type Example = {
  id: string;
  title: string;
  desc: string;
  thumbnail: string;
  platform: ExamplePlatform;
  thumbnailLayout?: ThumbnailLayout;
  category: CategoryType[];
};
export const EXAMPLES: Example[] = [
  {
    id: 'profile-stack',
    title: 'Profile Stack',
    desc: 'Profile stack shows the list of users currently accessing the Document.',
    thumbnail: 'profile-stack.jpg',
    platform: 'web',
    category: [CATEGORIES.PRESENCE],
  },
  {
    id: 'simultaneous-cursors',
    title: 'Simultaneous Cursors',
    desc: 'Live cursors driven by Presence, with reactions and an ephemeral pen trail, built with Yorkie React.',
    thumbnail: 'simultaneous-cursors.jpg',
    platform: 'web',
    category: [CATEGORIES.PRESENCE, CATEGORIES.REACT],
  },
  {
    id: 'simultaneous-cursors-android',
    title: 'Simultaneous Cursors Android',
    desc: 'This demo shows the real-time collaborative version of simple drawing, cursor animation with Yorkie and Android.',
    thumbnail: 'android-simultaneous-cursors.webp',
    platform: 'android',
    thumbnailLayout: { orientation: 'landscape' },
    category: [CATEGORIES.PRESENCE, CATEGORIES.ANDROID],
  },
  {
    id: 'kanban',
    title: 'Kanban Board',
    desc: 'A Vue board whose lists and cards are Yorkie Arrays. Add, move and delete cards together in real time.',
    thumbnail: 'vuejs-kanban.jpg',
    platform: 'web',
    thumbnailLayout: { position: 'left top' },
    category: [CATEGORIES.PRODUCTIVITY],
  },
  {
    id: 'todomvc',
    title: 'TodoMVC',
    desc: 'This is an example of real-time collaborative TodoMVC using Yorkie React.',
    thumbnail: 'react-todomvc.jpg',
    platform: 'web',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.REACT],
  },
  {
    id: 'todomvc-android',
    title: 'TodoMVC Android',
    desc: 'This is an example of real-time collaborative TodoMVC using Yorkie Android.',
    thumbnail: 'android-todomvc.webp',
    platform: 'android',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.ANDROID],
  },
  {
    id: 'todolist',
    title: 'Todo List',
    desc: 'This is an example of real-time collaborative todo list using Yorkie React.',
    thumbnail: 'nextjs-todolist.jpg',
    platform: 'web',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.REACT],
  },
  {
    id: 'react-flow',
    title: 'React Flow',
    desc: 'This is an example of real-time collaborative React Flow using Yorkie React.',
    thumbnail: 'react-flow.jpg',
    platform: 'web',
    category: [CATEGORIES.CANVAS_TOOL, CATEGORIES.REACT],
  },
  {
    id: 'codemirror',
    title: 'CodeMirror',
    desc: 'This is a real-time collaborative version of the CodeMirror editor. It uses the Text, a custom CRDT type from Yorkie.',
    thumbnail: 'vanilla-codemirror6.jpg',
    platform: 'web',
    category: [CATEGORIES.EDITOR],
  },
  {
    id: 'tldraw',
    title: 'tldraw',
    desc: 'This is a real-time collaboration example of the tldraw whiteboard editor with Yorkie.',
    thumbnail: 'react-tldraw.jpg',
    platform: 'web',
    category: [CATEGORIES.CANVAS_TOOL],
  },
  {
    id: 'prosemirror',
    title: 'ProseMirror',
    desc: 'This is a real-time collaborative version of the ProseMirror editor. It uses the Tree, a custom CRDT type from Yorkie.',
    thumbnail: 'vanilla-prosemirror.jpg',
    platform: 'web',
    category: [CATEGORIES.EDITOR],
  },
  {
    id: 'quill',
    title: 'Rich Text Editor',
    desc: 'This demo shows the real-time collaborative version of the Quill editor with Yorkie and Vite.',
    thumbnail: 'vanilla-quill.jpg',
    platform: 'web',
    category: [CATEGORIES.EDITOR],
  },
  {
    id: 'rich-text-editor-android',
    title: 'Rich Text Editor Android',
    desc: 'This demo shows the real-time collaborative version of the rich text editor with Yorkie and Android.',
    thumbnail: 'android-rich-text-editor.webp',
    platform: 'android',
    category: [CATEGORIES.EDITOR, CATEGORIES.ANDROID],
  },
  {
    id: 'calendar',
    title: 'Scheduler',
    desc: 'This demo shows the real-time collaborative version of the Scheduler with Yorkie and Next.js.',
    thumbnail: 'nextjs-scheduler.jpg',
    platform: 'web',
    thumbnailLayout: { position: 'left top' },
    category: [CATEGORIES.PRODUCTIVITY],
  },
  {
    id: 'scheduler-android',
    title: 'Scheduler Android',
    desc: 'This demo shows the real-time collaborative version of the Scheduler with Yorkie and Android.',
    thumbnail: 'android-scheduler.webp',
    platform: 'android',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.ANDROID],
  },
  {
    id: 'scheduler-ios',
    title: 'Scheduler iOS',
    desc: 'This demo shows the real-time collaborative version of the Scheduler with Yorkie and iOS.',
    thumbnail: 'ios-scheduler.webp',
    platform: 'ios',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.IOS],
  },
  {
    id: 'rich-text-editor-ios',
    title: 'Rich Text Editor iOS',
    desc: 'This demo shows the real-time collaborative version of the rich text editor with Yorkie and iOS.',
    thumbnail: 'ios-rich-text-editor.webp',
    platform: 'ios',
    thumbnailLayout: { orientation: 'landscape' },
    category: [CATEGORIES.EDITOR, CATEGORIES.IOS],
  },
  {
    id: 'simultaneous-cursors-ios',
    title: 'Simultaneous Cursors iOS',
    desc: 'This demo shows the real-time collaborative version of simple drawing, cursor animation with Yorkie and iOS.',
    thumbnail: 'ios-simultaneous-cursors.webp',
    platform: 'ios',
    thumbnailLayout: { orientation: 'landscape' },
    category: [CATEGORIES.PRESENCE, CATEGORIES.IOS],
  },
  {
    id: 'todomvc-ios',
    title: 'TodoMVC iOS',
    desc: 'This is an example of real-time collaborative TodoMVC using Yorkie iOS SDK.',
    thumbnail: 'todomvc-ios.webp',
    platform: 'ios',
    thumbnailLayout: { orientation: 'landscape' },
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.IOS],
  },
];
