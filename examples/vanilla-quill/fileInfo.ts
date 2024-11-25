import { DirectoryInfo } from '@/utils/exampleFileUtils';
        export const FILE_INFO: DirectoryInfo = {"isFile":false,"name":"vanilla-quill","path":"/","children":[{"isFile":false,"name":"src","path":"/src","children":[{"isFile":true,"isOpen":false,"language":"typescript","name":"main.ts","path":"/src/main.ts","content":"/* eslint-disable jsdoc/require-jsdoc */\nimport yorkie, { DocEventType, Indexable, OperationInfo } from 'yorkie-js-sdk';\nimport Quill, { type DeltaOperation, type DeltaStatic } from 'quill';\nimport QuillCursors from 'quill-cursors';\nimport ColorHash from 'color-hash';\nimport { network } from './network';\nimport { displayLog, displayPeers } from './utils';\nimport { YorkieDoc, YorkiePresence } from './type';\nimport 'quill/dist/quill.snow.css';\nimport './style.css';\n\ntype TextValueType = {\n  attributes?: Indexable;\n  content?: string;\n};\n\nconst peersElem = document.getElementById('peers')!;\nconst documentElem = document.getElementById('document')!;\nconst documentTextElem = document.getElementById('document-text')!;\nconst networkStatusElem = document.getElementById('network-status')!;\nconst colorHash = new ColorHash();\nconst documentKey = `vanilla-quill-${new Date()\n  .toISOString()\n  .substring(0, 10)\n  .replace(/-/g, '')}`;\n\nfunction toDeltaOperation<T extends TextValueType>(\n  textValue: T,\n): DeltaOperation {\n  const { embed, ...restAttributes } = textValue.attributes ?? {};\n  if (embed) {\n    return { insert: embed, attributes: restAttributes };\n  }\n\n  return {\n    insert: textValue.content || '',\n    attributes: textValue.attributes,\n  };\n}\n\nasync function main() {\n  // 01-1. create client with RPCAddr then activate it.\n  const client = new yorkie.Client(import.meta.env.VITE_YORKIE_API_ADDR, {\n    apiKey: import.meta.env.VITE_YORKIE_API_KEY,\n  });\n  await client.activate();\n\n  // 02-1. create a document then attach it into the client.\n  const doc = new yorkie.Document<YorkieDoc, YorkiePresence>(documentKey, {\n    enableDevtools: true,\n  });\n  doc.subscribe('connection', (event) => {\n    network.statusListener(networkStatusElem)(event);\n  });\n  doc.subscribe('presence', (event) => {\n    if (event.type !== DocEventType.PresenceChanged) {\n      displayPeers(peersElem, doc.getPresences(), client.getID()!);\n    }\n  });\n\n  await client.attach(doc, {\n    initialPresence: {\n      username: client.getID()!.slice(-2),\n      color: colorHash.hex(client.getID()!.slice(-2)),\n      selection: undefined,\n    },\n  });\n\n  doc.update((root) => {\n    if (!root.content) {\n      root.content = new yorkie.Text();\n      root.content.edit(0, 0, '\\n');\n    }\n  }, 'create content if not exists');\n\n  // 02-2. subscribe document event.\n  doc.subscribe((event) => {\n    if (event.type === 'snapshot') {\n      // The text is replaced to snapshot and must be re-synced.\n      syncText();\n    }\n    displayLog(documentElem, documentTextElem, doc);\n  });\n\n  doc.subscribe('$.content', (event) => {\n    if (event.type === 'remote-change') {\n      handleOperations(event.value.operations);\n    }\n    updateAllCursors();\n  });\n  doc.subscribe('others', (event) => {\n    if (event.type === DocEventType.Unwatched) {\n      cursors.removeCursor(event.value.clientID);\n    } else if (event.type === DocEventType.PresenceChanged) {\n      updateCursor(event.value);\n    }\n  });\n\n  function updateCursor(user: { clientID: string; presence: YorkiePresence }) {\n    const { clientID, presence } = user;\n    if (clientID === client.getID()) return;\n    // TODO(chacha912): After resolving the presence initialization issue(#608),\n    // remove the following check.\n    if (!presence) return;\n\n    const { username, color, selection } = presence;\n    if (!selection) return;\n    const range = doc.getRoot().content.posRangeToIndexRange(selection);\n    cursors.createCursor(clientID, username, color);\n    cursors.moveCursor(clientID, {\n      index: range[0],\n      length: range[1] - range[0],\n    });\n  }\n\n  function updateAllCursors() {\n    for (const user of doc.getPresences()) {\n      updateCursor(user);\n    }\n  }\n\n  await client.sync();\n\n  // 03. create an instance of Quill\n  Quill.register('modules/cursors', QuillCursors);\n  const quill = new Quill('#editor', {\n    modules: {\n      toolbar: [\n        ['bold', 'italic', 'underline', 'strike'],\n        ['blockquote', 'code-block'],\n        [{ header: 1 }, { header: 2 }],\n        [{ list: 'ordered' }, { list: 'bullet' }],\n        [{ script: 'sub' }, { script: 'super' }],\n        [{ indent: '-1' }, { indent: '+1' }],\n        [{ direction: 'rtl' }],\n        [{ size: ['small', false, 'large', 'huge'] }],\n        [{ header: [1, 2, 3, 4, 5, 6, false] }],\n        [{ color: [] }, { background: [] }],\n        [{ font: [] }],\n        [{ align: [] }],\n        ['image', 'video'],\n        ['clean'],\n      ],\n      cursors: true,\n    },\n    theme: 'snow',\n  });\n  const cursors = quill.getModule('cursors');\n\n  // 04. bind the document with the Quill.\n  // 04-1. Quill to Document.\n  quill\n    .on('text-change', (delta, _, source) => {\n      if (source === 'api' || !delta.ops) {\n        return;\n      }\n\n      let from = 0,\n        to = 0;\n      console.log(`%c quill: ${JSON.stringify(delta.ops)}`, 'color: green');\n      for (const op of delta.ops) {\n        if (op.attributes !== undefined || op.insert !== undefined) {\n          if (op.retain !== undefined) {\n            to = from + op.retain;\n          }\n          console.log(\n            `%c local: ${from}-${to}: ${op.insert} ${\n              op.attributes ? JSON.stringify(op.attributes) : '{}'\n            }`,\n            'color: green',\n          );\n\n          doc.update((root, presence) => {\n            let range;\n            if (op.attributes !== undefined && op.insert === undefined) {\n              root.content.setStyle(from, to, op.attributes);\n            } else if (op.insert !== undefined) {\n              if (to < from) {\n                to = from;\n              }\n\n              if (typeof op.insert === 'object') {\n                range = root.content.edit(from, to, ' ', {\n                  embed: JSON.stringify(op.insert),\n                  ...op.attributes,\n                });\n              } else {\n                range = root.content.edit(from, to, op.insert, op.attributes);\n              }\n              from = to + op.insert.length;\n            }\n\n            range &&\n              presence.set({\n                selection: root.content.indexRangeToPosRange(range),\n              });\n          }, `update style by ${client.getID()}`);\n        } else if (op.delete !== undefined) {\n          to = from + op.delete;\n          console.log(`%c local: ${from}-${to}: ''`, 'color: green');\n\n          doc.update((root, presence) => {\n            const range = root.content.edit(from, to, '');\n            range &&\n              presence.set({\n                selection: root.content.indexRangeToPosRange(range),\n              });\n          }, `update content by ${client.getID()}`);\n        } else if (op.retain !== undefined) {\n          from = to + op.retain;\n          to = from;\n        }\n      }\n    })\n    .on('selection-change', (range, _, source) => {\n      if (!range) {\n        return;\n      }\n\n      // NOTE(chacha912): If the selection in the Quill editor does not match the range computed by yorkie,\n      // additional updates are necessary. This condition addresses situations where Quill's selection behaves\n      // differently, such as when inserting text before a range selection made by another user, causing\n      // the second character onwards to be included in the selection.\n      if (source === 'api') {\n        const { selection } = doc.getMyPresence();\n        if (selection) {\n          const [from, to] = doc\n            .getRoot()\n            .content.posRangeToIndexRange(selection);\n          const { index, length } = range;\n          if (from === index && to === index + length) {\n            return;\n          }\n        }\n      }\n\n      doc.update((root, presence) => {\n        presence.set({\n          selection: root.content.indexRangeToPosRange([\n            range.index,\n            range.index + range.length,\n          ]),\n        });\n      }, `update selection by ${client.getID()}`);\n    });\n\n  // 04-2. document to Quill(remote).\n  function handleOperations(ops: Array<OperationInfo>) {\n    const deltaOperations = [];\n    let prevTo = 0;\n    for (const op of ops) {\n      if (op.type === 'edit') {\n        const from = op.from;\n        const to = op.to;\n        const retainFrom = from - prevTo;\n        const retainTo = to - from;\n\n        const { insert, attributes } = toDeltaOperation(op.value!);\n        console.log(`%c remote: ${from}-${to}: ${insert}`, 'color: skyblue');\n\n        if (retainFrom) {\n          deltaOperations.push({ retain: retainFrom });\n        }\n        if (retainTo) {\n          deltaOperations.push({ delete: retainTo });\n        }\n        if (insert) {\n          const op: DeltaOperation = { insert };\n          if (attributes) {\n            op.attributes = attributes;\n          }\n          deltaOperations.push(op);\n        }\n        prevTo = to;\n      } else if (op.type === 'style') {\n        const from = op.from;\n        const to = op.to;\n        const retainFrom = from - prevTo;\n        const retainTo = to - from;\n        const { attributes } = toDeltaOperation(op.value!);\n        console.log(\n          `%c remote: ${from}-${to}: ${JSON.stringify(attributes)}`,\n          'color: skyblue',\n        );\n\n        if (retainFrom) {\n          deltaOperations.push({ retain: retainFrom });\n        }\n        if (attributes) {\n          const op: DeltaOperation = { attributes };\n          if (retainTo) {\n            op.retain = retainTo;\n          }\n\n          deltaOperations.push(op);\n        }\n        prevTo = to;\n      }\n    }\n\n    if (deltaOperations.length) {\n      console.log(\n        `%c to quill: ${JSON.stringify(deltaOperations)}`,\n        'color: green',\n      );\n      const delta = {\n        ops: deltaOperations,\n      } as DeltaStatic;\n      quill.updateContents(delta, 'api');\n    }\n  }\n\n  // 05. synchronize text of document and Quill.\n  function syncText() {\n    const text = doc.getRoot().content;\n\n    const delta = {\n      ops: text.values().map((val) => toDeltaOperation(val)),\n    } as DeltaStatic;\n    quill.setContents(delta, 'api');\n  }\n\n  syncText();\n  updateAllCursors();\n  displayLog(documentElem, documentTextElem, doc);\n}\n\nmain();\n"},{"isFile":true,"isOpen":false,"language":"typescript","name":"network.ts","path":"/src/network.ts","content":"import { DocEvent, StreamConnectionStatus } from 'yorkie-js-sdk';\nexport const network = {\n  isOnline: false,\n  showOffline: (elem: HTMLElement) => {\n    network.isOnline = false;\n    elem.innerHTML = '<span class=\"red\"> </span>';\n  },\n  showOnline: (elem: HTMLElement) => {\n    network.isOnline = true;\n    elem.innerHTML = '<span class=\"green\"> </span>';\n  },\n  statusListener: (elem: HTMLElement) => {\n    return (event: DocEvent) => {\n      if (\n        network.isOnline &&\n        event.value == StreamConnectionStatus.Disconnected\n      ) {\n        network.showOffline(elem);\n      } else if (\n        !network.isOnline &&\n        event.value == StreamConnectionStatus.Connected\n      ) {\n        network.showOnline(elem);\n      }\n    };\n  },\n};\n"},{"isFile":true,"isOpen":false,"language":"css","name":"style.css","path":"/src/style.css","content":"body {\n  background: white;\n}\n\n.green {\n  background-color: green;\n}\n.red {\n  background-color: red;\n}\n\n#network-status span {\n  display: inline-block;\n  height: 0.8rem;\n  width: 0.8rem;\n  border-radius: 0.4rem;\n}\n\n#network-status:before {\n  content: 'network: ';\n  font-size: 1rem;\n}\n\n#peers:before {\n  display: block;\n  content: 'peers: ';\n  font-size: 1rem;\n}\n\n#document:before {\n  display: block;\n  content: 'document: ';\n  font-size: 1rem;\n}\n\n#document-text:before {\n  display: block;\n  content: 'text: ';\n  font-size: 1rem;\n}\n\n#network-status,\n#peers,\n#document,\n#document-text {\n  margin: 1rem 0;\n  font-family: monospace;\n}\n\n.ql-editor {\n  min-height: 300px;\n  overflow-y: auto;\n  resize: vertical;\n}\n"},{"isFile":true,"isOpen":false,"language":"typescript","name":"type.ts","path":"/src/type.ts","content":"import { type Text, TextPosStructRange } from 'yorkie-js-sdk';\n\nexport type YorkieDoc = {\n  content: Text;\n};\n\nexport type YorkiePresence = {\n  username: string;\n  color: string;\n  selection?: TextPosStructRange;\n};\n"},{"isFile":true,"isOpen":false,"language":"typescript","name":"utils.ts","path":"/src/utils.ts","content":"/* eslint-disable jsdoc/require-jsdoc */\nimport { Document, Indexable } from 'yorkie-js-sdk';\nimport { YorkieDoc, YorkiePresence } from './type';\n\n// function to display peers\nexport function displayPeers(\n  elem: HTMLElement,\n  peers: Array<{ clientID: string; presence: Indexable }>,\n  myClientID: string,\n) {\n  const usernames = [];\n  for (const { clientID, presence } of peers) {\n    usernames.push(\n      myClientID === clientID\n        ? `<b>${presence.username}</b>`\n        : presence.username,\n    );\n  }\n  elem.innerHTML = JSON.stringify(usernames);\n}\n\n// function to display document content\nexport function displayLog(\n  elem: HTMLElement,\n  textElem: HTMLElement,\n  doc: Document<YorkieDoc, YorkiePresence>,\n) {\n  elem.innerText = doc.toJSON();\n  textElem.innerText = doc.getRoot().content.toTestString();\n}\n"},{"isFile":true,"isOpen":false,"language":"typescript","name":"vite-env.d.ts","path":"/src/vite-env.d.ts","content":"/// <reference types=\"vite/client\" />\n"}]},{"isFile":true,"isOpen":false,"language":"","name":".env","path":"/.env","content":"VITE_YORKIE_API_ADDR='http://localhost:8080'\nVITE_YORKIE_API_KEY=''\n"},{"isFile":true,"isOpen":false,"language":"production","name":".env.production","path":"/.env.production","content":""},{"isFile":true,"isOpen":false,"language":"","name":".gitignore","path":"/.gitignore","content":"# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n"},{"isFile":true,"isOpen":false,"language":"markdown","name":"README.md","path":"/README.md","content":"# Yorkie Quill Example\n\n<p>\n    <a href=\"https://yorkie.dev/yorkie-js-sdk/examples/vanilla-quill/\" target=\"_blank\">\n        <img src=\"https://img.shields.io/badge/preview-message?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuODU3MTcgMi43ODE5OUwxMS4yNzUxIDkuMTI2NzhDMTEuNTU0NCA5LjUyODAxIDEyLjEwNjIgOS42MjY3NiAxMi41MDc0IDkuMzQ3NDRDMTIuNTkzNCA5LjI4NzUgMTIuNjY4MSA5LjIxMjggMTIuNzI4MSA5LjEyNjc4TDE3LjE0NiAyLjc4MTk5QzE3LjcwNDggMS45Nzk1NCAxNy41MDcyIDAuODc2MTMxIDE2LjcwNDggMC4zMTc0OTRDMTYuNDA4IDAuMTEwODM3IDE2LjA1NSAwIDE1LjY5MzIgMEg4LjMxMDAxQzcuMzMyMiAwIDYuNTM5NTUgMC43OTI2NTQgNi41Mzk1NSAxLjc3MDQ2QzYuNTM5NjggMi4xMzIxMSA2LjY1MDUxIDIuNDg1MTEgNi44NTcxNyAyLjc4MTk5WiIgZmlsbD0iIzUxNEM0OSIvPgo8cGF0aCBkPSJNMTMuODA4OSAxNC4yMzg4QzE0LjEyMzEgMTQuNDE4IDE0LjQ4NDcgMTQuNDk2NiAxNC44NDUgMTQuNDY0MkwyMi45MjYgMTMuNzM1QzIzLjU3NTMgMTMuNjc2NSAyNC4wNTQgMTMuMTAyNyAyMy45OTU1IDEyLjQ1MzVDMjMuOTkyNCAxMi40MTkyIDIzLjk4NzggMTIuMzg1MSAyMy45ODE3IDEyLjM1MTNDMjMuNzM4OSAxMC45OTY4IDIzLjI2MTEgOS42OTUyNyAyMi41Njk5IDguNTA1NDZDMjEuODc4NiA3LjMxNTY1IDIwLjk4NDggNi4yNTU3NyAxOS45Mjg2IDUuMzczOTFDMTkuNDI4MiA0Ljk1NjE0IDE4LjY4MzkgNS4wMjMwNyAxOC4yNjYyIDUuNTIzNTZDMTguMjQ0MiA1LjU0OTkgMTguMjIzMyA1LjU3NzI2IDE4LjIwMzYgNS42MDU1MUwxMy41NjcgMTIuMjY0MUMxMy4zNjAzIDEyLjU2MSAxMy4yNDk1IDEyLjkxNCAxMy4yNDk1IDEzLjI3NThWMTMuMjUzN0MxMy4yNDk1IDEzLjQ1NjIgMTMuMzAxNiAxMy42NTU0IDEzLjQwMDggMTMuODMxOUMxMy41MDUgMTQuMDA1NCAxMy42NTIxIDE0LjE0OTMgMTMuODI4MSAxNC4yNDk2IiBmaWxsPSIjRkRDNDMzIi8+CjxwYXRoIGQ9Ik0xMC42NDE2IDEzLjc0MzRDMTAuNTM3NSAxMy45NTU5IDEwLjM3MiAxNC4xMzIyIDEwLjE2NjUgMTQuMjQ5NEwxMC4xOTE1IDE0LjIzNTFDOS44NzczNCAxNC40MTQzIDkuNTE1NjkgMTQuNDkyOSA5LjE1NTQ0IDE0LjQ2MDVMMS4wNzQ0MSAxMy43MzEzQzEuMDQwMTggMTMuNzI4MyAxLjAwNjA3IDEzLjcyMzcgMC45NzIyMjUgMTMuNzE3NkMwLjMzMDYyIDEzLjYwMjUgLTAuMDk2MzExOSAxMi45ODkyIDAuMDE4NzI0MiAxMi4zNDc2QzAuMjYxNTIyIDEwLjk5MyAwLjczOTM1NCA5LjY5MTU2IDEuNDMwNDYgOC41MDE2M0MyLjEyMTU3IDcuMzExNjkgMy4wMTU1MSA2LjI1MjA2IDQuMDcxODQgNS4zNzAwOEM0LjA5ODE4IDUuMzQ4MDYgNC4xMjU1NCA1LjMyNzE5IDQuMTUzNzkgNS4zMDc0N0M0LjY4ODc2IDQuOTM1IDUuNDI0MjcgNS4wNjY3MSA1Ljc5Njg3IDUuNjAxNjhMMTAuNDMzNCAxMi4yNjA0QzEwLjY0MDEgMTIuNTU3MyAxMC43NTA5IDEyLjkxMDMgMTAuNzUwOSAxMy4yNzIxVjEzLjI0MzJDMTAuNzUwOSAxMy40Nzk3IDEwLjY3OTggMTMuNzExIDEwLjU0NjggMTMuOTA2NyIgZmlsbD0iI0ZEQzQzMyIvPgo8L3N2Zz4K&color=FEF3D7\" alt=\"Live Preview\" />\n    </a>\n</p>\n\nThis demo shows the real-time collaborative version of the [Quill](https://quilljs.com/) editor with [Yorkie](https://yorkie.dev/) and [Vite](https://vitejs.dev/).\n\n## How to run demo\n\n### With Yorkie Dashboard\n\nInstall dependencies\n\n```bash\n# In the root directory of the repository.\n$ pnpm install\n```\n\nCreate an account on [Yorkie Dashboard](https://yorkie.dev/dashboard)\nCreate a new project and copy your public key from the dashboard\nUpdate the `.env` file like so:\n\n```\nVITE_YORKIE_API_ADDR='https://api.yorkie.dev'\nVITE_YORKIE_API_KEY='your_key_xxxx'\n```\n\nStart demo project\n\n```bash\n# In the root directory of the repository.\n$ pnpm vanilla-quill dev\n\n# Or in the directory of the example.\n$ pnpm dev\n```\n\n### With local Yorkie server\n\nInstall dependencies\n\n```bash\n# In the root directory of the repository.\n$ pnpm install\n```\n\nAt project root, run below command to start Yorkie.\n\n```bash\n$ docker compose -f docker/docker-compose.yml up --build -d\n```\n\nUpdate the `.env` file like so:\n\n```\nVITE_YORKIE_API_ADDR='http://localhost:8080'\nVITE_YORKIE_API_KEY=''\n```\n\nStart demo project\n\n```bash\n# In the root directory of the repository.\n$ pnpm vanilla-quill dev\n\n# Or in the directory of the example.\n$ pnpm dev\n```\n"},{"isFile":true,"isOpen":false,"language":"markup","name":"index.html","path":"/index.html","content":"<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Yorkie + Quill Example</title>\n  </head>\n  <body>\n    <div id=\"network-status\"></div>\n    <div id=\"editor\"></div>\n    <div id=\"peers\"></div>\n    <div id=\"document\"></div>\n    <div id=\"document-text\"></div>\n    <script type=\"module\" src=\"/src/main.ts\"></script>\n  </body>\n</html>\n"},{"isFile":true,"isOpen":false,"language":"json","name":"package.json","path":"/package.json","content":"{\n  \"name\": \"vanilla-quill\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"tsc && vite build\",\n    \"preview\": \"vite preview\"\n  },\n  \"devDependencies\": {\n    \"@types/color-hash\": \"^1.0.2\",\n    \"@types/quill\": \"^1.3.10\",\n    \"typescript\": \"^5.3.3\",\n    \"vite\": \"^5.0.12\"\n  },\n  \"dependencies\": {\n    \"color-hash\": \"^2.0.2\",\n    \"quill\": \"^1.3.7\",\n    \"quill-cursors\": \"^4.0.0\",\n    \"quill-delta\": \"^5.0.0\",\n    \"yorkie-js-sdk\": \"^0.5.6\"\n  }\n}\n"},{"isFile":true,"isOpen":false,"language":"json","name":"tsconfig.json","path":"/tsconfig.json","content":"{\n  \"compilerOptions\": {\n    \"target\": \"ESNext\",\n    \"useDefineForClassFields\": true,\n    \"module\": \"ESNext\",\n    \"lib\": [\"ESNext\", \"DOM\"],\n    \"moduleResolution\": \"Node\",\n    \"strict\": true,\n    \"sourceMap\": true,\n    \"resolveJsonModule\": true,\n    \"isolatedModules\": true,\n    \"esModuleInterop\": true,\n    \"noEmit\": true,\n    \"skipLibCheck\": true,\n    \"paths\": {\n      \"@yorkie-js-sdk/src/*\": [\"../../packages/sdk/src/*\"]\n    }\n  },\n  \"include\": [\"src\"]\n}\n"},{"isFile":true,"isOpen":false,"language":"javascript","name":"vite.config.js","path":"/vite.config.js","content":"import { defineConfig } from 'vite';\nimport path from 'path';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  base: '',\n  resolve: {\n    alias: [\n      {\n        find: '@yorkie-js-sdk/src',\n        replacement: path.resolve(__dirname, '../../packages/sdk/src'),\n      },\n    ],\n  },\n});\n"}]}