import { DirectoryInfo } from '@/utils/exampleFileUtils';
export const FILE_INFO: DirectoryInfo = {
  isFile: false,
  name: 'vanilla-codemirror6',
  path: '/',
  children: [
    {
      isFile: false,
      name: 'src',
      path: '/src',
      children: [
        {
          isFile: true,
          isOpen: false,
          language: 'typescript',
          name: 'main.ts',
          path: '/src/main.ts',
          content:
            "/* eslint-disable jsdoc/require-jsdoc */\nimport yorkie, { DocEventType } from '@yorkie-js/sdk';\nimport type { EditOpInfo, OperationInfo } from '@yorkie-js/sdk';\nimport { basicSetup, EditorView } from 'codemirror';\nimport { keymap } from '@codemirror/view';\nimport {\n  markdown,\n  markdownKeymap,\n  markdownLanguage,\n} from '@codemirror/lang-markdown';\nimport { Transaction, TransactionSpec } from '@codemirror/state';\nimport { network } from './network';\nimport { displayLog, displayPeers } from './utils';\nimport { YorkieDoc, YorkiePresence } from './type';\nimport './style.css';\n\nconst editorParentElem = document.getElementById('editor')!;\nconst peersElem = document.getElementById('peers')!;\nconst documentElem = document.getElementById('document')!;\nconst documentTextElem = document.getElementById('document-text')!;\nconst networkStatusElem = document.getElementById('network-status')!;\n\nasync function main() {\n  // 01. create client with RPCAddr then activate it.\n  const client = new yorkie.Client(import.meta.env.VITE_YORKIE_API_ADDR, {\n    apiKey: import.meta.env.VITE_YORKIE_API_KEY,\n  });\n  await client.activate();\n\n  // 02-1. create a document then attach it into the client.\n  const doc = new yorkie.Document<YorkieDoc, YorkiePresence>(\n    `codemirror6-${new Date()\n      .toISOString()\n      .substring(0, 10)\n      .replace(/-/g, '')}`,\n    {\n      enableDevtools: true,\n    },\n  );\n  doc.subscribe('connection', (event) => {\n    network.statusListener(networkStatusElem)(event);\n  });\n  doc.subscribe('presence', (event) => {\n    if (event.type !== DocEventType.PresenceChanged) {\n      displayPeers(peersElem, doc.getPresences(), client.getID()!);\n    }\n  });\n  await client.attach(doc);\n  doc.update((root) => {\n    if (!root.content) {\n      root.content = new yorkie.Text();\n    }\n  }, 'create content if not exists');\n\n  // 02-2. subscribe document event.\n  const syncText = () => {\n    const text = doc.getRoot().content;\n    const selection = doc.getMyPresence().selection;\n    const transactionSpec: TransactionSpec = {\n      changes: { from: 0, to: view.state.doc.length, insert: text.toString() },\n      annotations: [Transaction.remote.of(true)],\n    };\n\n    if (selection) {\n      // Restore the cursor position when the text is replaced.\n      const cursor = text.posRangeToIndexRange(selection);\n      transactionSpec['selection'] = {\n        anchor: cursor[0],\n        head: cursor[1],\n      };\n    }\n    view.dispatch(transactionSpec);\n  };\n  doc.subscribe((event) => {\n    if (event.type === 'snapshot') {\n      // The text is replaced to snapshot and must be re-synced.\n      syncText();\n    }\n    displayLog(documentElem, documentTextElem, doc);\n  });\n\n  doc.subscribe('$.content', (event) => {\n    if (event.type === 'remote-change') {\n      const { operations } = event.value;\n      handleOperations(operations);\n    }\n  });\n\n  await client.sync();\n\n  // 03-1. define function that bind the document with the codemirror(broadcast local changes to peers)\n  const updateListener = EditorView.updateListener.of((viewUpdate) => {\n    if (viewUpdate.docChanged) {\n      for (const tr of viewUpdate.transactions) {\n        const events = ['select', 'input', 'delete', 'move', 'undo', 'redo'];\n        if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {\n          continue;\n        }\n        if (tr.annotation(Transaction.remote)) {\n          continue;\n        }\n        let adj = 0;\n        tr.changes.iterChanges((fromA, toA, _, __, inserted) => {\n          const insertText = inserted.toJSON().join('\\n');\n          doc.update((root) => {\n            root.content.edit(fromA + adj, toA + adj, insertText);\n          }, `update content byA ${client.getID()}`);\n          adj += insertText.length - (toA - fromA);\n        });\n      }\n    }\n\n    const hasFocus =\n      viewUpdate.view.hasFocus && viewUpdate.view.dom.ownerDocument.hasFocus();\n    const sel = hasFocus ? viewUpdate.state.selection.main : null;\n\n    doc.update((root, presence) => {\n      if (sel && root.content) {\n        const selection = root.content.indexRangeToPosRange([\n          sel.anchor,\n          sel.head,\n        ]);\n\n        if (\n          JSON.stringify(selection) !==\n          JSON.stringify(presence.get('selection'))\n        ) {\n          presence.set({\n            selection,\n          });\n        }\n      } else if (presence.get('selection')) {\n        presence.set({\n          selection: undefined,\n        });\n      }\n    });\n  });\n\n  // 03-2. create codemirror instance\n  const view = new EditorView({\n    doc: '',\n    extensions: [\n      basicSetup,\n      markdown({ base: markdownLanguage }),\n      keymap.of(markdownKeymap),\n      updateListener,\n    ],\n    parent: editorParentElem,\n  });\n\n  // 03-3. define event handler that apply remote changes to local\n  function handleOperations(operations: Array<OperationInfo>) {\n    for (const op of operations) {\n      if (op.type === 'edit') {\n        handleEditOp(op);\n      }\n    }\n  }\n  function handleEditOp(op: EditOpInfo) {\n    const changes = [\n      {\n        from: Math.max(0, op.from),\n        to: Math.max(0, op.to),\n        insert: op.value!.content,\n      },\n    ];\n\n    view.dispatch({\n      changes,\n      annotations: [Transaction.remote.of(true)],\n    });\n  }\n\n  syncText();\n  displayLog(documentElem, documentTextElem, doc);\n}\n\nmain();\n",
        },
        {
          isFile: true,
          isOpen: false,
          language: 'typescript',
          name: 'network.ts',
          path: '/src/network.ts',
          content:
            "import { DocEvent, StreamConnectionStatus } from '@yorkie-js/sdk';\nexport const network = {\n  isOnline: false,\n  showOffline: (elem: HTMLElement) => {\n    network.isOnline = false;\n    elem.innerHTML = '<span class=\"red\"> </span>';\n  },\n  showOnline: (elem: HTMLElement) => {\n    network.isOnline = true;\n    elem.innerHTML = '<span class=\"green\"> </span>';\n  },\n  statusListener: (elem: HTMLElement) => {\n    return (event: DocEvent) => {\n      if (\n        network.isOnline &&\n        event.value == StreamConnectionStatus.Disconnected\n      ) {\n        network.showOffline(elem);\n      } else if (\n        !network.isOnline &&\n        event.value == StreamConnectionStatus.Connected\n      ) {\n        network.showOnline(elem);\n      }\n    };\n  },\n};\n",
        },
        {
          isFile: true,
          isOpen: false,
          language: 'css',
          name: 'style.css',
          path: '/src/style.css',
          content:
            "body {\n  background: white;\n}\n\n.green {\n  background-color: green;\n}\n.red {\n  background-color: red;\n}\n\n#network-status span {\n  display: inline-block;\n  height: 0.8rem;\n  width: 0.8rem;\n  border-radius: 0.4rem;\n}\n\n#network-status:before {\n  content: 'network: ';\n  font-size: 1rem;\n}\n\n#peers:before {\n  display: block;\n  content: 'peers: ';\n  font-size: 1rem;\n}\n\n#document:before {\n  display: block;\n  content: 'document: ';\n  font-size: 1rem;\n}\n\n#document-text:before {\n  display: block;\n  content: 'text: ';\n  font-size: 1rem;\n}\n\n#network-status,\n#peers,\n#document,\n#document-text {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n\n  font-family: monospace;\n}\n",
        },
        {
          isFile: true,
          isOpen: false,
          language: 'typescript',
          name: 'type.ts',
          path: '/src/type.ts',
          content:
            "import { TextPosStructRange, type Text } from '@yorkie-js/sdk';\n\nexport type YorkieDoc = {\n  content: Text;\n};\n\nexport type YorkiePresence = {\n  selection?: TextPosStructRange;\n};\n",
        },
        {
          isFile: true,
          isOpen: false,
          language: 'typescript',
          name: 'utils.ts',
          path: '/src/utils.ts',
          content:
            "/* eslint-disable jsdoc/require-jsdoc */\nimport { Document, Indexable } from '@yorkie-js/sdk';\nimport { YorkieDoc } from './type';\n\n// function to display peers\nexport function displayPeers(\n  elem: HTMLElement,\n  peers: Array<{ clientID: string; presence: Indexable }>,\n  myClientID: string,\n) {\n  const usernames = [];\n  for (const { clientID } of peers) {\n    usernames.push(myClientID === clientID ? `<b>${clientID}</b>` : clientID);\n  }\n  elem.innerHTML = JSON.stringify(usernames);\n}\n\n// function to display document content\nexport function displayLog(\n  elem: HTMLElement,\n  textElem: HTMLElement,\n  doc: Document<YorkieDoc>,\n) {\n  elem.innerText = doc.toJSON();\n  textElem.innerText = doc.getRoot().content.toTestString();\n}\n",
        },
        {
          isFile: true,
          isOpen: false,
          language: 'typescript',
          name: 'vite-env.d.ts',
          path: '/src/vite-env.d.ts',
          content: '/// <reference types="vite/client" />\n',
        },
      ],
    },
    {
      isFile: true,
      isOpen: false,
      language: '',
      name: '.env',
      path: '/.env',
      content: "VITE_YORKIE_API_ADDR='http://localhost:8080'\nVITE_YORKIE_API_KEY=''\n",
    },
    {
      isFile: true,
      isOpen: false,
      language: 'production',
      name: '.env.production',
      path: '/.env.production',
      content: '',
    },
    {
      isFile: true,
      isOpen: false,
      language: '',
      name: '.gitignore',
      path: '/.gitignore',
      content:
        '# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n',
    },
    {
      isFile: true,
      isOpen: false,
      language: 'markdown',
      name: 'README.md',
      path: '/README.md',
      content:
        '# Yorkie CodeMirror6 Example\n\n<p>\n    <a href="https://yorkie.dev/yorkie-js-sdk/examples/vanilla-codemirror6/" target="_blank">\n        <img src="https://img.shields.io/badge/preview-message?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuODU3MTcgMi43ODE5OUwxMS4yNzUxIDkuMTI2NzhDMTEuNTU0NCA5LjUyODAxIDEyLjEwNjIgOS42MjY3NiAxMi41MDc0IDkuMzQ3NDRDMTIuNTkzNCA5LjI4NzUgMTIuNjY4MSA5LjIxMjggMTIuNzI4MSA5LjEyNjc4TDE3LjE0NiAyLjc4MTk5QzE3LjcwNDggMS45Nzk1NCAxNy41MDcyIDAuODc2MTMxIDE2LjcwNDggMC4zMTc0OTRDMTYuNDA4IDAuMTEwODM3IDE2LjA1NSAwIDE1LjY5MzIgMEg4LjMxMDAxQzcuMzMyMiAwIDYuNTM5NTUgMC43OTI2NTQgNi41Mzk1NSAxLjc3MDQ2QzYuNTM5NjggMi4xMzIxMSA2LjY1MDUxIDIuNDg1MTEgNi44NTcxNyAyLjc4MTk5WiIgZmlsbD0iIzUxNEM0OSIvPgo8cGF0aCBkPSJNMTMuODA4OSAxNC4yMzg4QzE0LjEyMzEgMTQuNDE4IDE0LjQ4NDcgMTQuNDk2NiAxNC44NDUgMTQuNDY0MkwyMi45MjYgMTMuNzM1QzIzLjU3NTMgMTMuNjc2NSAyNC4wNTQgMTMuMTAyNyAyMy45OTU1IDEyLjQ1MzVDMjMuOTkyNCAxMi40MTkyIDIzLjk4NzggMTIuMzg1MSAyMy45ODE3IDEyLjM1MTNDMjMuNzM4OSAxMC45OTY4IDIzLjI2MTEgOS42OTUyNyAyMi41Njk5IDguNTA1NDZDMjEuODc4NiA3LjMxNTY1IDIwLjk4NDggNi4yNTU3NyAxOS45Mjg2IDUuMzczOTFDMTkuNDI4MiA0Ljk1NjE0IDE4LjY4MzkgNS4wMjMwNyAxOC4yNjYyIDUuNTIzNTZDMTguMjQ0MiA1LjU0OTkgMTguMjIzMyA1LjU3NzI2IDE4LjIwMzYgNS42MDU1MUwxMy41NjcgMTIuMjY0MUMxMy4zNjAzIDEyLjU2MSAxMy4yNDk1IDEyLjkxNCAxMy4yNDk1IDEzLjI3NThWMTMuMjUzN0MxMy4yNDk1IDEzLjQ1NjIgMTMuMzAxNiAxMy42NTU0IDEzLjQwMDggMTMuODMxOUMxMy41MDUgMTQuMDA1NCAxMy42NTIxIDE0LjE0OTMgMTMuODI4MSAxNC4yNDk2IiBmaWxsPSIjRkRDNDMzIi8+CjxwYXRoIGQ9Ik0xMC42NDE2IDEzLjc0MzRDMTAuNTM3NSAxMy45NTU5IDEwLjM3MiAxNC4xMzIyIDEwLjE2NjUgMTQuMjQ5NEwxMC4xOTE1IDE0LjIzNTFDOS44NzczNCAxNC40MTQzIDkuNTE1NjkgMTQuNDkyOSA5LjE1NTQ0IDE0LjQ2MDVMMS4wNzQ0MSAxMy43MzEzQzEuMDQwMTggMTMuNzI4MyAxLjAwNjA3IDEzLjcyMzcgMC45NzIyMjUgMTMuNzE3NkMwLjMzMDYyIDEzLjYwMjUgLTAuMDk2MzExOSAxMi45ODkyIDAuMDE4NzI0MiAxMi4zNDc2QzAuMjYxNTIyIDEwLjk5MyAwLjczOTM1NCA5LjY5MTU2IDEuNDMwNDYgOC41MDE2M0MyLjEyMTU3IDcuMzExNjkgMy4wMTU1MSA2LjI1MjA2IDQuMDcxODQgNS4zNzAwOEM0LjA5ODE4IDUuMzQ4MDYgNC4xMjU1NCA1LjMyNzE5IDQuMTUzNzkgNS4zMDc0N0M0LjY4ODc2IDQuOTM1IDUuNDI0MjcgNS4wNjY3MSA1Ljc5Njg3IDUuNjAxNjhMMTAuNDMzNCAxMi4yNjA0QzEwLjY0MDEgMTIuNTU3MyAxMC43NTA5IDEyLjkxMDMgMTAuNzUwOSAxMy4yNzIxVjEzLjI0MzJDMTAuNzUwOSAxMy40Nzk3IDEwLjY3OTggMTMuNzExIDEwLjU0NjggMTMuOTA2NyIgZmlsbD0iI0ZEQzQzMyIvPgo8L3N2Zz4K&color=FEF3D7" alt="Live Preview" />\n    </a>\n</p>\n\n<img width="500" alt="CodeMirror6" src="thumbnail.jpg"/>\n\n## How to run demo\n\nAt project root, run below command to start Yorkie.\n\n```bash\n$ docker compose -f docker/docker-compose.yml up --build -d\n```\n\nInstall dependencies\n\n```bash\n# In the root directory of the repository.\n$ pnpm install\n```\n\nStart demo project\n\n```bash\n# In the root directory of the repository.\n$ pnpm vanilla-codemirror6 dev\n\n# Or in the directory of the example.\n$ pnpm dev\n```\n',
    },
    {
      isFile: true,
      isOpen: false,
      language: 'markup',
      name: 'index.html',
      path: '/index.html',
      content:
        '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Yorkie + CodeMirror 6 Example</title>\n  </head>\n  <body>\n    <div id="network-status"></div>\n    <div id="editor"></div>\n    <div id="peers"></div>\n    <div id="document"></div>\n    <div id="document-text"></div>\n    <script type="module" src="/src/main.ts"></script>\n  </body>\n</html>\n',
    },
    {
      isFile: true,
      isOpen: false,
      language: 'json',
      name: 'package.json',
      path: '/package.json',
      content:
        '{\n  "name": "vanilla-codemirror6",\n  "private": true,\n  "version": "0.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "tsc && vite build",\n    "preview": "vite preview"\n  },\n  "devDependencies": {\n    "typescript": "^5.3.3",\n    "vite": "^5.0.12"\n  },\n  "dependencies": {\n    "@codemirror/commands": "6.1.2",\n    "@codemirror/highlight": "^0.19.8",\n    "@codemirror/lang-markdown": "^6.0.2",\n    "@codemirror/language-data": "^6.1.0",\n    "@codemirror/state": "^6.4.1",\n    "@codemirror/view": "6.23.1",\n    "codemirror": "^6.0.1",\n    "yorkie-js-sdk": "^0.6.0"\n  }\n}\n',
    },
    { isFile: true, isOpen: false, language: 'jpg', name: 'thumbnail.jpg', path: '/thumbnail.jpg', content: '' },
    {
      isFile: true,
      isOpen: false,
      language: 'json',
      name: 'tsconfig.json',
      path: '/tsconfig.json',
      content:
        '{\n  "compilerOptions": {\n    "target": "ESNext",\n    "useDefineForClassFields": true,\n    "module": "ESNext",\n    "lib": ["ESNext", "DOM"],\n    "moduleResolution": "Node",\n    "strict": true,\n    "sourceMap": true,\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "esModuleInterop": true,\n    "noEmit": true,\n    "skipLibCheck": true,\n    "paths": {\n      "@yorkie-js-sdk/src/*": ["../../packages/sdk/src/*"]\n    }\n  },\n  "include": ["src"]\n}\n',
    },
    {
      isFile: true,
      isOpen: false,
      language: 'javascript',
      name: 'vite.config.js',
      path: '/vite.config.js',
      content:
        "import { defineConfig } from 'vite';\nimport path from 'path';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  base: '',\n  resolve: {\n    alias: [\n      {\n        find: '@yorkie-js-sdk/src',\n        replacement: path.resolve(__dirname, '../../packages/sdk/src'),\n      },\n    ],\n  },\n});\n",
    },
  ],
};
