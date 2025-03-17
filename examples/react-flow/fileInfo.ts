import { DirectoryInfo } from '@/utils/exampleFileUtils';
        export const FILE_INFO: DirectoryInfo = {"isFile":false,"name":"react-flow","path":"/","children":[{"isFile":false,"name":"src","path":"/src","children":[{"isFile":true,"isOpen":false,"language":"css","name":"App.css","path":"/src/App.css","content":"#root {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n  transition: filter 300ms;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.react:hover {\n  filter: drop-shadow(0 0 2em #61dafbaa);\n}\n\n@keyframes logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  a:nth-of-type(2) .logo {\n    animation: logo-spin infinite 20s linear;\n  }\n}\n\n.card {\n  padding: 2em;\n}\n\n.read-the-docs {\n  color: #888;\n}\n"},{"isFile":true,"isOpen":false,"language":"tsx","name":"App.tsx","path":"/src/App.tsx","content":"import { useCallback } from 'react';\nimport { JSONArray, JSONObject, useDocument } from '@yorkie-js/react';\nimport {\n  ReactFlow,\n  Controls,\n  MiniMap,\n  Node,\n  Edge,\n  Background,\n  NodeChange,\n  EdgeChange,\n} from '@xyflow/react';\nimport '@xyflow/react/dist/style.css';\nimport './App.css';\n\ntype Graph = {\n  nodes: JSONArray<JSONObject<Node>>;\n  edges: JSONArray<JSONObject<Edge>>;\n};\n\nfunction App() {\n  const { root, update, loading, error } = useDocument<Graph>();\n\n  const onNodesChange = useCallback(\n    (changes: Array<NodeChange>) => {\n      update((r) => {\n        for (const c of changes) {\n          switch (c.type) {\n            case 'add':\n              r.nodes.push(c.item);\n              break;\n            case 'replace':\n              {\n                const idx = r.nodes.findIndex((n) => n.id === c.id);\n                r.nodes[idx] = c.item;\n              }\n              break;\n            case 'remove':\n              {\n                const idx = r.nodes.findIndex((n) => n.id === c.id);\n                r.nodes.deleteByID!(r.nodes[idx].getID!());\n              }\n              break;\n            case 'position':\n              {\n                const idx = r.nodes.findIndex((n) => n.id === c.id);\n                r.nodes[idx].position = c.position!;\n              }\n              break;\n            case 'select':\n              {\n                const idx = r.nodes.findIndex((n) => n.id === c.id);\n                r.nodes[idx].selected = c.selected;\n              }\n              break;\n            default:\n              break;\n          }\n        }\n      });\n    },\n    [update],\n  );\n\n  const onEdgesChange = useCallback(\n    (changes: Array<EdgeChange>) => {\n      update((r) => {\n        for (const c of changes) {\n          switch (c.type) {\n            case 'add':\n              r.edges.push(c.item);\n              break;\n            case 'replace':\n              {\n                const idx = r.edges.findIndex((e) => e.id === c.id);\n                r.edges[idx] = c.item;\n              }\n              break;\n            case 'remove':\n              {\n                const idx = r.edges.findIndex((e) => e.id === c.id);\n                r.edges.deleteByID!(r.edges[idx].getID!());\n              }\n              break;\n            case 'select':\n              {\n                const idx = r.edges.findIndex((e) => e.id === c.id);\n                r.edges[idx].selected = c.selected;\n              }\n              break;\n            default:\n              break;\n          }\n        }\n      });\n    },\n    [update],\n  );\n\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error.message}</div>;\n\n  return (\n    <div style={{ position: 'fixed', inset: 0, height: '100vh' }}>\n      <ReactFlow\n        nodes={root.nodes}\n        edges={root.edges}\n        onNodesChange={onNodesChange}\n        onEdgesChange={onEdgesChange}\n        fitView\n      >\n        <Background gap={10} size={1} color=\"silver\" />\n        <Controls orientation=\"horizontal\" showInteractive={false} />\n        <MiniMap />\n      </ReactFlow>\n    </div>\n  );\n}\n\nexport default App;\n"},{"isFile":true,"isOpen":false,"language":"css","name":"index.css","path":"/src/index.css","content":":root {\n  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;\n}\n"},{"isFile":true,"isOpen":false,"language":"tsx","name":"main.tsx","path":"/src/main.tsx","content":"import { createRoot } from 'react-dom/client';\nimport { DocumentProvider, YorkieProvider } from '@yorkie-js/react';\nimport './index.css';\nimport App from './App';\n\nconst initialNodes = [\n  {\n    id: '1',\n    type: 'input',\n    data: { label: 'Multiplayer' },\n    position: { x: 250, y: 25 },\n  },\n  {\n    id: '2',\n    data: { label: 'Graph' },\n    position: { x: 100, y: 125 },\n  },\n  {\n    id: '3',\n    data: { label: 'React Flow' },\n    position: { x: 250, y: 225 },\n    style: { borderColor: '#FF0072' },\n  },\n  {\n    id: '4',\n    type: 'output',\n    data: { label: 'Yorkie' },\n    position: { x: 100, y: 325 },\n    style: { borderColor: '#944DFA' },\n  },\n];\n\nconst initialEdges = [\n  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },\n  { id: 'e2-3', source: '2', target: '3', label: 'with' },\n  { id: 'e3-4', source: '3', target: '4', label: 'and', animated: true },\n];\n\nconst initialGraph = {\n  nodes: initialNodes,\n  edges: initialEdges,\n};\n\ncreateRoot(document.getElementById('root')!).render(\n  <YorkieProvider\n    apiKey={import.meta.env.VITE_YORKIE_API_KEY}\n    rpcAddr={import.meta.env.VITE_YORKIE_API_ADDR}\n  >\n    <DocumentProvider\n      docKey={`react-flow-${new Date()\n        .toISOString()\n        .substring(0, 10)\n        .replace(/-/g, '')}`}\n      initialRoot={initialGraph}\n    >\n      <App />\n    </DocumentProvider>\n  </YorkieProvider>,\n);\n"},{"isFile":true,"isOpen":false,"language":"typescript","name":"vite-env.d.ts","path":"/src/vite-env.d.ts","content":"/// <reference types=\"vite/client\" />\n"}]},{"isFile":false,"name":"public","path":"/public","children":[{"isFile":true,"isOpen":false,"language":"svg","name":"vite.svg","path":"/public/vite.svg","content":"<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--logos\" width=\"31.88\" height=\"32\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 256 257\"><defs><linearGradient id=\"IconifyId1813088fe1fbc01fb466\" x1=\"-.828%\" x2=\"57.636%\" y1=\"7.652%\" y2=\"78.411%\"><stop offset=\"0%\" stop-color=\"#41D1FF\"></stop><stop offset=\"100%\" stop-color=\"#BD34FE\"></stop></linearGradient><linearGradient id=\"IconifyId1813088fe1fbc01fb467\" x1=\"43.376%\" x2=\"50.316%\" y1=\"2.242%\" y2=\"89.03%\"><stop offset=\"0%\" stop-color=\"#FFEA83\"></stop><stop offset=\"8.333%\" stop-color=\"#FFDD35\"></stop><stop offset=\"100%\" stop-color=\"#FFA800\"></stop></linearGradient></defs><path fill=\"url(#IconifyId1813088fe1fbc01fb466)\" d=\"M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z\"></path><path fill=\"url(#IconifyId1813088fe1fbc01fb467)\" d=\"M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z\"></path></svg>"}]},{"isFile":true,"isOpen":false,"language":"","name":".env","path":"/.env","content":"VITE_YORKIE_API_ADDR='http://localhost:8080'\nVITE_YORKIE_API_KEY=''\n"},{"isFile":true,"isOpen":false,"language":"production","name":".env.production","path":"/.env.production","content":""},{"isFile":true,"isOpen":false,"language":"","name":".gitignore","path":"/.gitignore","content":"# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n"},{"isFile":true,"isOpen":false,"language":"markdown","name":"README.md","path":"/README.md","content":"# Yorkie React Flow Example\n\n<p>\n    <a href=\"https://yorkie.dev/yorkie-js-sdk/examples/react-flow/\" target=\"_blank\">\n        <img src=\"https://img.shields.io/badge/preview-message?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuODU3MTcgMi43ODE5OUwxMS4yNzUxIDkuMTI2NzhDMTEuNTU0NCA5LjUyODAxIDEyLjEwNjIgOS42MjY3NiAxMi41MDc0IDkuMzQ3NDRDMTIuNTkzNCA5LjI4NzUgMTIuNjY4MSA5LjIxMjggMTIuNzI4MSA5LjEyNjc4TDE3LjE0NiAyLjc4MTk5QzE3LjcwNDggMS45Nzk1NCAxNy41MDcyIDAuODc2MTMxIDE2LjcwNDggMC4zMTc0OTRDMTYuNDA4IDAuMTEwODM3IDE2LjA1NSAwIDE1LjY5MzIgMEg4LjMxMDAxQzcuMzMyMiAwIDYuNTM5NTUgMC43OTI2NTQgNi41Mzk1NSAxLjc3MDQ2QzYuNTM5NjggMi4xMzIxMSA2LjY1MDUxIDIuNDg1MTEgNi44NTcxNyAyLjc4MTk5WiIgZmlsbD0iIzUxNEM0OSIvPgo8cGF0aCBkPSJNMTMuODA4OSAxNC4yMzg4QzE0LjEyMzEgMTQuNDE4IDE0LjQ4NDcgMTQuNDk2NiAxNC44NDUgMTQuNDY0MkwyMi45MjYgMTMuNzM1QzIzLjU3NTMgMTMuNjc2NSAyNC4wNTQgMTMuMTAyNyAyMy45OTU1IDEyLjQ1MzVDMjMuOTkyNCAxMi40MTkyIDIzLjk4NzggMTIuMzg1MSAyMy45ODE3IDEyLjM1MTNDMjMuNzM4OSAxMC45OTY4IDIzLjI2MTEgOS42OTUyNyAyMi41Njk5IDguNTA1NDZDMjEuODc4NiA3LjMxNTY1IDIwLjk4NDggNi4yNTU3NyAxOS45Mjg2IDUuMzczOTFDMTkuNDI4MiA0Ljk1NjE0IDE4LjY4MzkgNS4wMjMwNyAxOC4yNjYyIDUuNTIzNTZDMTguMjQ0MiA1LjU0OTkgMTguMjIzMyA1LjU3NzI2IDE4LjIwMzYgNS42MDU1MUwxMy41NjcgMTIuMjY0MUMxMy4zNjAzIDEyLjU2MSAxMy4yNDk1IDEyLjkxNCAxMy4yNDk1IDEzLjI3NThWMTMuMjUzN0MxMy4yNDk1IDEzLjQ1NjIgMTMuMzAxNiAxMy42NTU0IDEzLjQwMDggMTMuODMxOUMxMy41MDUgMTQuMDA1NCAxMy42NTIxIDE0LjE0OTMgMTMuODI4MSAxNC4yNDk2IiBmaWxsPSIjRkRDNDMzIi8+CjxwYXRoIGQ9Ik0xMC42NDE2IDEzLjc0MzRDMTAuNTM3NSAxMy45NTU5IDEwLjM3MiAxNC4xMzIyIDEwLjE2NjUgMTQuMjQ5NEwxMC4xOTE1IDE0LjIzNTFDOS44NzczNCAxNC40MTQzIDkuNTE1NjkgMTQuNDkyOSA5LjE1NTQ0IDE0LjQ2MDVMMS4wNzQ0MSAxMy43MzEzQzEuMDQwMTggMTMuNzI4MyAxLjAwNjA3IDEzLjcyMzcgMC45NzIyMjUgMTMuNzE3NkMwLjMzMDYyIDEzLjYwMjUgLTAuMDk2MzExOSAxMi45ODkyIDAuMDE4NzI0MiAxMi4zNDc2QzAuMjYxNTIyIDEwLjk5MyAwLjczOTM1NCA5LjY5MTU2IDEuNDMwNDYgOC41MDE2M0MyLjEyMTU3IDcuMzExNjkgMy4wMTU1MSA2LjI1MjA2IDQuMDcxODQgNS4zNzAwOEM0LjA5ODE4IDUuMzQ4MDYgNC4xMjU1NCA1LjMyNzE5IDQuMTUzNzkgNS4zMDc0N0M0LjY4ODc2IDQuOTM1IDUuNDI0MjcgNS4wNjY3MSA1Ljc5Njg3IDUuNjAxNjhMMTAuNDMzNCAxMi4yNjA0QzEwLjY0MDEgMTIuNTU3MyAxMC43NTA5IDEyLjkxMDMgMTAuNzUwOSAxMy4yNzIxVjEzLjI0MzJDMTAuNzUwOSAxMy40Nzk3IDEwLjY3OTggMTMuNzExIDEwLjU0NjggMTMuOTA2NyIgZmlsbD0iI0ZEQzQzMyIvPgo8L3N2Zz4K&color=FEF3D7\" alt=\"Live Preview\" />\n    </a>\n</p>\n\n<img width=\"500\" alt=\"React Flow\" src=\"thumbnail.png\"/>\n\n## How to run demo\n\nAt project root, run below command to start Yorkie server.\n\n```bash\n$ docker compose -f docker/docker-compose.yml up --build -d\n```\n\nThen install dependencies and run the demo.\n\n```bash\n# In the root directory of the repository.\n$ pnpm install\n```\n\nNow you can run the demo.\n\n```bash\n# In the root directory of the repository.\n$ pnpm react-flow dev\n\n# Or in the directory of the example.\n$ pnpm dev\n```\n"},{"isFile":true,"isOpen":false,"language":"markup","name":"index.html","path":"/index.html","content":"<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vite + React + TS</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>\n"},{"isFile":true,"isOpen":false,"language":"json","name":"package.json","path":"/package.json","content":"{\n  \"name\": \"react-flow\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"tsc && vite build\",\n    \"lint\": \"eslint .\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"react\": \"^19.0.0\",\n    \"react-dom\": \"^19.0.0\",\n    \"@xyflow/react\": \"^12.4.4\",\n    \"@yorkie-js/react\": \"workspace:*\"\n  },\n  \"devDependencies\": {\n    \"@eslint/js\": \"^9.21.0\",\n    \"@types/react\": \"^19.0.10\",\n    \"@types/react-dom\": \"^19.0.4\",\n    \"@vitejs/plugin-react\": \"^4.3.4\",\n    \"eslint\": \"^9.21.0\",\n    \"eslint-plugin-react-hooks\": \"^5.1.0\",\n    \"eslint-plugin-react-refresh\": \"^0.4.19\",\n    \"globals\": \"^15.15.0\",\n    \"typescript\": \"^5.3.3\",\n    \"vite\": \"^6.2.0\"\n  }\n}\n"},{"isFile":true,"isOpen":false,"language":"png","name":"thumbnail.png","path":"/thumbnail.png","content":""},{"isFile":true,"isOpen":false,"language":"json","name":"tsconfig.app.json","path":"/tsconfig.app.json","content":"{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"useDefineForClassFields\": true,\n    \"lib\": [\"ES2020\", \"DOM\", \"DOM.Iterable\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\",\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true,\n\n    \"paths\": {\n      \"@yorkie-js/sdk/src/*\": [\"../../packages/sdk/src/*\"]\n    }\n  },\n  \"include\": [\"src\"]\n}\n"},{"isFile":true,"isOpen":false,"language":"json","name":"tsconfig.json","path":"/tsconfig.json","content":"{\n  \"files\": [],\n  \"references\": [\n    { \"path\": \"./tsconfig.app.json\" },\n    { \"path\": \"./tsconfig.node.json\" }\n  ]\n}\n"},{"isFile":true,"isOpen":false,"language":"json","name":"tsconfig.node.json","path":"/tsconfig.node.json","content":"{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"lib\": [\"ES2023\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true,\n\n    \"paths\": {\n      \"@yorkie-js/sdk/src/*\": [\"../../packages/sdk/src/*\"]\n    }\n  },\n  \"include\": [\"vite.config.ts\"]\n}\n"},{"isFile":true,"isOpen":false,"language":"typescript","name":"vite.config.ts","path":"/vite.config.ts","content":"import path from 'path';\nimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\n// https://vite.dev/config/\nexport default defineConfig({\n  base: '',\n  plugins: [react()],\n  resolve: {\n    alias: [\n      {\n        find: '@yorkie-js/react',\n        replacement: path.resolve(__dirname, '../../packages/react/src'),\n      },\n      {\n        find: '@yorkie-js/sdk/src',\n        replacement: path.resolve(__dirname, '../../packages/sdk/src'),\n      },\n    ],\n  },\n});\n"}]}