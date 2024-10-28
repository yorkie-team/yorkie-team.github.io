import { DirectoryInfo } from '@/utils/exampleFileUtils';
        export const FILE_INFO: DirectoryInfo = {"isFile":false,"name":"react-tldraw","path":"/","children":[{"isFile":false,"name":"src","path":"/src","children":[{"isFile":false,"name":"hooks","path":"/src/hooks","children":[{"isFile":true,"isOpen":false,"language":"typescript","name":"types.ts","path":"/src/hooks/types.ts","content":"// Yorkie type for typescript\nimport type { TDAsset, TDBinding, TDShape, TDUser } from '@tldraw/tldraw';\nimport type { JSONObject } from 'yorkie-js-sdk';\nexport type Options = {\n  apiKey?: string;\n  syncLoopDuration: number;\n  reconnectStreamDelay: number;\n};\n\nexport type YorkieDocType = {\n  shapes: JSONObject<Record<string, JSONObject<TDShape>>>;\n  bindings: JSONObject<Record<string, JSONObject<TDBinding>>>;\n  assets: JSONObject<Record<string, JSONObject<TDAsset>>>;\n};\n\nexport type YorkiePresenceType = {\n  tdUser: TDUser;\n};\n"},{"isFile":true,"isOpen":false,"language":"typescript","name":"useMultiplayerState.ts","path":"/src/hooks/useMultiplayerState.ts","content":"/* eslint-disable jsdoc/require-jsdoc */\nimport { useCallback, useEffect, useState } from 'react';\nimport {\n  TDUserStatus,\n  TDAsset,\n  TDBinding,\n  TDShape,\n  TDUser,\n  TldrawApp,\n} from '@tldraw/tldraw';\nimport { useThrottleCallback } from '@react-hook/throttle';\nimport * as yorkie from 'yorkie-js-sdk';\nimport randomColor from 'randomcolor';\nimport { uniqueNamesGenerator, names } from 'unique-names-generator';\nimport _ from 'lodash';\n\nimport type { Options, YorkieDocType, YorkiePresenceType } from './types';\n\n// Yorkie Client declaration\nlet client: yorkie.Client;\n\n// Yorkie Document declaration\nlet doc: yorkie.Document<YorkieDocType, YorkiePresenceType>;\n\nexport function useMultiplayerState(roomId: string) {\n  const [app, setApp] = useState<TldrawApp>();\n  const [loading, setLoading] = useState(true);\n\n  // Callbacks --------------\n\n  const onMount = useCallback(\n    (app: TldrawApp) => {\n      app.loadRoom(roomId);\n      app.setIsLoading(true);\n      app.pause();\n      setApp(app);\n\n      const randomName = uniqueNamesGenerator({\n        dictionaries: [names],\n      });\n\n      // On mount, create new user\n      app.updateUsers([\n        {\n          id: app!.currentUser!.id,\n          point: [0, 0],\n          color: randomColor(),\n          status: TDUserStatus.Connected,\n          activeShapes: [],\n          selectedIds: [],\n          metadata: { name: randomName }, // <-- custom metadata\n        },\n      ]);\n    },\n    [roomId],\n  );\n\n  // Update Yorkie doc when the app's shapes change.\n  // Prevent overloading yorkie update api call by throttle\n  const onChangePage = useThrottleCallback(\n    (\n      app: TldrawApp,\n      shapes: Record<string, TDShape | undefined>,\n      bindings: Record<string, TDBinding | undefined>,\n    ) => {\n      if (!app || client === undefined || doc === undefined) return;\n\n      const getUpdatedPropertyList = <T extends object>(\n        source: T,\n        target: T,\n      ) => {\n        return (Object.keys(source) as Array<keyof T>).filter(\n          (key) => !_.isEqual(source[key], target[key]),\n        );\n      };\n\n      Object.entries(shapes).forEach(([id, shape]) => {\n        doc.update((root) => {\n          if (!shape) {\n            delete root.shapes[id];\n          } else if (!root.shapes[id]) {\n            root.shapes[id] = shape;\n          } else {\n            const updatedPropertyList = getUpdatedPropertyList(\n              shape,\n              root.shapes[id]!.toJS!(),\n            );\n\n            updatedPropertyList.forEach((key) => {\n              const newValue = shape[key];\n              (root.shapes[id][key] as typeof newValue) = newValue;\n            });\n          }\n        });\n      });\n\n      Object.entries(bindings).forEach(([id, binding]) => {\n        doc.update((root) => {\n          if (!binding) {\n            delete root.bindings[id];\n          } else if (!root.bindings[id]) {\n            root.bindings[id] = binding;\n          } else {\n            const updatedPropertyList = getUpdatedPropertyList(\n              binding,\n              root.bindings[id]!.toJS!(),\n            );\n\n            updatedPropertyList.forEach((key) => {\n              const newValue = binding[key];\n              (root.bindings[id][key] as typeof newValue) = newValue;\n            });\n          }\n        });\n      });\n\n      // Should store app.document.assets which is global asset storage referenced by inner page assets\n      // Document key for assets should be asset.id (string), not index\n      Object.entries(app.assets).forEach(([, asset]) => {\n        doc.update((root) => {\n          if (!asset.id) {\n            delete root.assets[asset.id];\n          } else if (root.assets[asset.id]) {\n            root.assets[asset.id] = asset;\n          } else {\n            const updatedPropertyList = getUpdatedPropertyList(\n              asset,\n              root.assets[asset.id]!.toJS!(),\n            );\n\n            updatedPropertyList.forEach((key) => {\n              const newValue = asset[key];\n              (root.assets[asset.id][key] as typeof newValue) = newValue;\n            });\n          }\n        });\n      });\n    },\n    60,\n    false,\n  );\n\n  // Handle presence updates when the user's pointer / selection changes\n  const onChangePresence = useThrottleCallback(\n    (app: TldrawApp, user: TDUser) => {\n      if (!app || client === undefined || !client.isActive()) return;\n\n      doc.update((root, presence) => {\n        presence.set({ tdUser: user });\n      });\n    },\n    60,\n    false,\n  );\n\n  // Document Changes --------\n\n  useEffect(() => {\n    if (!app) return;\n\n    // Detach & deactive yorkie client before unload\n    function handleDisconnect() {\n      if (client === undefined || doc === undefined) return;\n\n      client.detach(doc);\n      client.deactivate();\n    }\n\n    window.addEventListener('beforeunload', handleDisconnect);\n\n    // Subscribe to changes\n    function handleChanges() {\n      const root = doc.getRoot();\n\n      // Parse proxy object to record\n      const shapeRecord: Record<string, TDShape> = JSON.parse(\n        root.shapes.toJSON!(),\n      );\n      const bindingRecord: Record<string, TDBinding> = JSON.parse(\n        root.bindings.toJSON!(),\n      );\n      const assetRecord: Record<string, TDAsset> = JSON.parse(\n        root.assets.toJSON!(),\n      );\n\n      // Replace page content with changed(propagated) records\n      app?.replacePageContent(shapeRecord, bindingRecord, assetRecord);\n    }\n\n    let stillAlive = true;\n\n    // Setup the document's storage and subscriptions\n    async function setupDocument() {\n      try {\n        // 01. Create client with RPCAddr and options with apiKey if provided.\n        //     Then activate client.\n        const options: Options = {\n          apiKey: import.meta.env.VITE_YORKIE_API_KEY,\n          syncLoopDuration: 0,\n          reconnectStreamDelay: 1000,\n        };\n\n        client = new yorkie.Client(\n          import.meta.env.VITE_YORKIE_API_ADDR,\n          options,\n        );\n        await client.activate();\n\n        // 02. Create document with tldraw custom object type.\n        doc = new yorkie.Document<YorkieDocType, YorkiePresenceType>(roomId, {\n          enableDevtools: true,\n        });\n\n        // 02-1. Subscribe peers-changed event and update tldraw users state\n        doc.subscribe('my-presence', (event) => {\n          if (event.type === yorkie.DocEventType.Initialized) {\n            const allPeers = doc\n              .getPresences()\n              .map((peer) => peer.presence.tdUser);\n            app?.updateUsers(allPeers);\n          }\n        });\n        doc.subscribe('others', (event) => {\n          // remove leaved users\n          if (event.type === yorkie.DocEventType.Unwatched) {\n            app?.removeUser(event.value.presence.tdUser.id);\n          }\n\n          // update users\n          const allPeers = doc\n            .getPresences()\n            .map((peer) => peer.presence.tdUser);\n          app?.updateUsers(allPeers);\n        });\n\n        // 02-2. Attach document with initialPresence.\n        const option = app?.currentUser && {\n          initialPresence: { tdUser: app.currentUser },\n        };\n        await client.attach(doc, option);\n\n        // 03. Initialize document if document not exists.\n        doc.update((root) => {\n          if (!root.shapes) {\n            root.shapes = {};\n          }\n          if (!root.bindings) {\n            root.bindings = {};\n          }\n          if (!root.assets) {\n            root.assets = {};\n          }\n        }, 'create shapes/bindings/assets object if not exists');\n\n        // 04. Subscribe document event and handle changes.\n        doc.subscribe((event) => {\n          if (event.type === 'remote-change') {\n            handleChanges();\n          }\n        });\n\n        // 05. Sync client to sync document with other peers.\n        await client.sync();\n\n        if (stillAlive) {\n          // Update the document with initial content\n          handleChanges();\n\n          // Zoom to fit the content & finish loading\n          if (app) {\n            app.zoomToFit();\n            if (app.zoom > 1) {\n              app.resetZoom();\n            }\n            app.setIsLoading(false);\n          }\n\n          setLoading(false);\n        }\n      } catch (e) {\n        console.error(e);\n      }\n    }\n\n    setupDocument();\n\n    return () => {\n      window.removeEventListener('beforeunload', handleDisconnect);\n      stillAlive = false;\n    };\n  }, [app]);\n\n  return {\n    onMount,\n    onChangePage,\n    loading,\n    onChangePresence,\n  };\n}\n"}]},{"isFile":true,"isOpen":false,"language":"css","name":"App.css","path":"/src/App.css","content":"html,\n* {\n    box-sizing: border-box;\n}\n\nbody {\n    overscroll-behavior: none;\n    margin: 0px;\n    padding: 0px;\n    font-size: 1em;\n    font-family: Arial, Helvetica, sans-serif;\n}\n\n.tldraw {\n    position: fixed;\n    top: 0px;\n    left: 0px;\n    right: 0px;\n    bottom: 0px;\n    width: 100%;\n    height: 100%;\n}"},{"isFile":true,"isOpen":false,"language":"tsx","name":"App.tsx","path":"/src/App.tsx","content":"import { Tldraw, useFileSystem } from '@tldraw/tldraw';\nimport { useMultiplayerState } from './hooks/useMultiplayerState';\nimport CustomCursor from './CustomCursor';\nimport './App.css';\n\n/*\nThis demo shows how to integrate TLDraw with a multiplayer room\nvia Yorkie.\n\nWarning: Keeping images enabled for multiplayer applications\nwithout providing a storage bucket based solution will cause\nmassive base64 string to be written to the multiplayer storage.\nIt's recommended to use a storage bucket based solution, such as\nAmazon AWS S3.\n*/\n\nexport default function App() {\n  const fileSystemEvents = useFileSystem();\n  const { ...events } = useMultiplayerState(\n    `tldraw-${(new Date()).toISOString().substring(0, 10).replace(/-/g, '')}`\n  );\n  const component = { Cursor: CustomCursor };\n\n  return (\n    <div className=\"tldraw\">\n      <Tldraw\n        components={component}\n        autofocus\n        disableAssets={true}\n        showPages={false}\n        {...fileSystemEvents}\n        {...events}\n      />\n    </div>\n  );\n}\n"},{"isFile":true,"isOpen":false,"language":"tsx","name":"CustomCursor.tsx","path":"/src/CustomCursor.tsx","content":"import { CursorComponent } from '@tldraw/core';\n\n// A custom cursor component.\n// Component overrides for the tldraw renderer\nconst CustomCursor: CursorComponent<{ name: 'Anonymous' }> = ({\n  color,\n  metadata,\n}) => {\n  return (\n    <div\n      style={{\n        display: 'flex',\n        width: 'fit-content',\n        alignItems: 'center',\n        gap: 8,\n      }}\n    >\n      <div\n        style={{\n          width: 12,\n          height: 12,\n          background: color,\n          borderRadius: '100%',\n        }}\n      />\n      <div\n        style={{\n          background: 'white',\n          padding: '4px 8px',\n          borderRadius: 4,\n          whiteSpace: 'nowrap',\n        }}\n      >\n        {metadata!.name}\n      </div>\n    </div>\n  );\n};\n\nexport default CustomCursor;\n"},{"isFile":true,"isOpen":false,"language":"tsx","name":"main.tsx","path":"/src/main.tsx","content":"import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n);\n"},{"isFile":true,"isOpen":false,"language":"typescript","name":"tldraw.d.ts","path":"/src/tldraw.d.ts","content":"import { Indexable, Json } from '@yorkie-js-sdk/src/document/document';\nimport { TDUser } from '@tldraw/tldraw';\n\ndeclare module '@tldraw/tldraw' {\n  interface TDUser extends Indexable {}\n}\n"},{"isFile":true,"isOpen":false,"language":"typescript","name":"vite-env.d.ts","path":"/src/vite-env.d.ts","content":"/// <reference types=\"vite/client\" />\n"}]},{"isFile":true,"isOpen":false,"language":"","name":".env","path":"/.env","content":"VITE_YORKIE_API_ADDR='http://localhost:8080'\nVITE_YORKIE_API_KEY=''"},{"isFile":true,"isOpen":false,"language":"production","name":".env.production","path":"/.env.production","content":""},{"isFile":true,"isOpen":false,"language":"","name":".gitignore","path":"/.gitignore","content":"# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n"},{"isFile":true,"isOpen":false,"language":"markdown","name":"README.md","path":"/README.md","content":"# Yorkie React tldraw Example\n\n<p>\n    <a href=\"https://yorkie.dev/yorkie-js-sdk/examples/react-tldraw/\" target=\"_blank\">\n        <img src=\"https://img.shields.io/badge/preview-message?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuODU3MTcgMi43ODE5OUwxMS4yNzUxIDkuMTI2NzhDMTEuNTU0NCA5LjUyODAxIDEyLjEwNjIgOS42MjY3NiAxMi41MDc0IDkuMzQ3NDRDMTIuNTkzNCA5LjI4NzUgMTIuNjY4MSA5LjIxMjggMTIuNzI4MSA5LjEyNjc4TDE3LjE0NiAyLjc4MTk5QzE3LjcwNDggMS45Nzk1NCAxNy41MDcyIDAuODc2MTMxIDE2LjcwNDggMC4zMTc0OTRDMTYuNDA4IDAuMTEwODM3IDE2LjA1NSAwIDE1LjY5MzIgMEg4LjMxMDAxQzcuMzMyMiAwIDYuNTM5NTUgMC43OTI2NTQgNi41Mzk1NSAxLjc3MDQ2QzYuNTM5NjggMi4xMzIxMSA2LjY1MDUxIDIuNDg1MTEgNi44NTcxNyAyLjc4MTk5WiIgZmlsbD0iIzUxNEM0OSIvPgo8cGF0aCBkPSJNMTMuODA4OSAxNC4yMzg4QzE0LjEyMzEgMTQuNDE4IDE0LjQ4NDcgMTQuNDk2NiAxNC44NDUgMTQuNDY0MkwyMi45MjYgMTMuNzM1QzIzLjU3NTMgMTMuNjc2NSAyNC4wNTQgMTMuMTAyNyAyMy45OTU1IDEyLjQ1MzVDMjMuOTkyNCAxMi40MTkyIDIzLjk4NzggMTIuMzg1MSAyMy45ODE3IDEyLjM1MTNDMjMuNzM4OSAxMC45OTY4IDIzLjI2MTEgOS42OTUyNyAyMi41Njk5IDguNTA1NDZDMjEuODc4NiA3LjMxNTY1IDIwLjk4NDggNi4yNTU3NyAxOS45Mjg2IDUuMzczOTFDMTkuNDI4MiA0Ljk1NjE0IDE4LjY4MzkgNS4wMjMwNyAxOC4yNjYyIDUuNTIzNTZDMTguMjQ0MiA1LjU0OTkgMTguMjIzMyA1LjU3NzI2IDE4LjIwMzYgNS42MDU1MUwxMy41NjcgMTIuMjY0MUMxMy4zNjAzIDEyLjU2MSAxMy4yNDk1IDEyLjkxNCAxMy4yNDk1IDEzLjI3NThWMTMuMjUzN0MxMy4yNDk1IDEzLjQ1NjIgMTMuMzAxNiAxMy42NTU0IDEzLjQwMDggMTMuODMxOUMxMy41MDUgMTQuMDA1NCAxMy42NTIxIDE0LjE0OTMgMTMuODI4MSAxNC4yNDk2IiBmaWxsPSIjRkRDNDMzIi8+CjxwYXRoIGQ9Ik0xMC42NDE2IDEzLjc0MzRDMTAuNTM3NSAxMy45NTU5IDEwLjM3MiAxNC4xMzIyIDEwLjE2NjUgMTQuMjQ5NEwxMC4xOTE1IDE0LjIzNTFDOS44NzczNCAxNC40MTQzIDkuNTE1NjkgMTQuNDkyOSA5LjE1NTQ0IDE0LjQ2MDVMMS4wNzQ0MSAxMy43MzEzQzEuMDQwMTggMTMuNzI4MyAxLjAwNjA3IDEzLjcyMzcgMC45NzIyMjUgMTMuNzE3NkMwLjMzMDYyIDEzLjYwMjUgLTAuMDk2MzExOSAxMi45ODkyIDAuMDE4NzI0MiAxMi4zNDc2QzAuMjYxNTIyIDEwLjk5MyAwLjczOTM1NCA5LjY5MTU2IDEuNDMwNDYgOC41MDE2M0MyLjEyMTU3IDcuMzExNjkgMy4wMTU1MSA2LjI1MjA2IDQuMDcxODQgNS4zNzAwOEM0LjA5ODE4IDUuMzQ4MDYgNC4xMjU1NCA1LjMyNzE5IDQuMTUzNzkgNS4zMDc0N0M0LjY4ODc2IDQuOTM1IDUuNDI0MjcgNS4wNjY3MSA1Ljc5Njg3IDUuNjAxNjhMMTAuNDMzNCAxMi4yNjA0QzEwLjY0MDEgMTIuNTU3MyAxMC43NTA5IDEyLjkxMDMgMTAuNzUwOSAxMy4yNzIxVjEzLjI0MzJDMTAuNzUwOSAxMy40Nzk3IDEwLjY3OTggMTMuNzExIDEwLjU0NjggMTMuOTA2NyIgZmlsbD0iI0ZEQzQzMyIvPgo8L3N2Zz4K&color=FEF3D7\" alt=\"Live Preview\" />\n    </a>\n</p>\n\n<img width=\"500\" alt=\"React tldraw\" src=\"thumbnail.jpg\"/>\n\n## How to run demo\n\nAt project root, run below command to start Yorkie server.\n\n```bash\n$ docker compose -f docker/docker-compose.yml up --build -d\n```\n\nThen install dependencies and run the demo.\n\n```bash\n# In the root directory of the repository.\n$ pnpm install\n```\n\nNow you can run the demo.\n\n```bash\n# In the root directory of the repository.\n$ pnpm react-tldraw dev\n\n# Or in the directory of the example.\n$ pnpm dev\n```\n"},{"isFile":true,"isOpen":false,"language":"markup","name":"index.html","path":"/index.html","content":"<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>react-tldraw</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>\n"},{"isFile":true,"isOpen":false,"language":"json","name":"package.json","path":"/package.json","content":"{\n  \"name\": \"react-tldraw\",\n  \"private\": true,\n  \"version\": \"0.1.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"tsc && vite build\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"@react-hook/throttle\": \"^2.2.0\",\n    \"@tldraw/core\": \"^1.23.2\",\n    \"@tldraw/tldraw\": \"1.26.3\",\n    \"lodash\": \"^4.17.21\",\n    \"randomcolor\": \"^0.6.2\",\n    \"react\": \"^18.2.0\",\n    \"react-dom\": \"^18.2.0\",\n    \"unique-names-generator\": \"^4.7.1\",\n    \"yorkie-js-sdk\": \"^0.5.4\"\n  },\n  \"devDependencies\": {\n    \"@types/lodash\": \"^4.14.198\",\n    \"@types/randomcolor\": \"^0.5.5\",\n    \"@types/react\": \"^18.2.0\",\n    \"@types/react-dom\": \"^18.2.0\",\n    \"@vitejs/plugin-react\": \"^4.2.1\",\n    \"typescript\": \"^5.3.3\",\n    \"vite\": \"^5.0.12\",\n    \"vite-tsconfig-paths\": \"^4.3.1\"\n  }\n}\n"},{"isFile":true,"isOpen":false,"language":"jpg","name":"thumbnail.jpg","path":"/thumbnail.jpg","content":""},{"isFile":true,"isOpen":false,"language":"json","name":"tsconfig.json","path":"/tsconfig.json","content":"{\n  \"compilerOptions\": {\n    \"target\": \"ESNext\",\n    \"useDefineForClassFields\": true,\n    \"lib\": [\"DOM\", \"DOM.Iterable\", \"ESNext\"],\n    \"allowJs\": false,\n    \"skipLibCheck\": true,\n    \"esModuleInterop\": false,\n    \"allowSyntheticDefaultImports\": true,\n    \"strict\": true,\n    \"forceConsistentCasingInFileNames\": true,\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"Node\",\n    \"resolveJsonModule\": true,\n    \"isolatedModules\": true,\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\",\n    \"paths\": {\n      \"@yorkie-js-sdk/src/*\": [\"../../packages/sdk/src/*\"]\n    }\n  },\n  \"include\": [\"src\"],\n  \"references\": [{ \"path\": \"./tsconfig.node.json\" }]\n}\n"},{"isFile":true,"isOpen":false,"language":"json","name":"tsconfig.node.json","path":"/tsconfig.node.json","content":"{\n  \"compilerOptions\": {\n    \"composite\": true,\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"Node\",\n    \"allowSyntheticDefaultImports\": true\n  },\n  \"include\": [\"vite.config.ts\"]\n}\n"},{"isFile":true,"isOpen":false,"language":"typescript","name":"vite.config.ts","path":"/vite.config.ts","content":"import path from 'path';\nimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport tsconfigPaths from 'vite-tsconfig-paths';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  base: '',\n  plugins: [react(), tsconfigPaths()],\n  resolve: {\n    alias: [\n      {\n        find: '@yorkie-js-sdk/src',\n        replacement: path.resolve(__dirname, '../../packages/sdk/src'),\n      },\n    ],\n  },\n});\n"}]}