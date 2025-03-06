import { DirectoryInfo } from '@/utils/exampleFileUtils';
export const FILE_INFO: DirectoryInfo = {
  isFile: false,
  name: 'nextjs-scheduler',
  path: '/',
  children: [
    {
      isFile: false,
      name: 'app',
      path: '/app',
      children: [
        {
          isFile: false,
          name: 'utils',
          path: '/app/utils',
          children: [
            {
              isFile: true,
              isOpen: false,
              language: 'typescript',
              name: 'handlePeers.ts',
              path: '/app/utils/handlePeers.ts',
              content:
                "import { Indexable } from '@yorkie-js/sdk';\n\nconst randomPeers = [\n  'Alice',\n  'Bob',\n  'Carol',\n  'Chuck',\n  'Dave',\n  'Erin',\n  'Frank',\n  'Grace',\n  'Ivan',\n  'Justin',\n  'Matilda',\n  'Oscar',\n  'Steve',\n  'Victor',\n  'Zoe',\n];\n\n/**\n * display each peer's name\n */\nexport function displayPeers(\n  peers: Array<{ clientID: string; presence: Indexable }>,\n) {\n  const users = [];\n  for (const { presence } of peers) {\n    users.push(presence.userName);\n  }\n\n  return users;\n}\n\n/**\n * create random name of anonymous peer\n */\nexport function createRandomPeers() {\n  const index = Math.floor(Math.random() * randomPeers.length);\n\n  return randomPeers[index];\n}\n",
            },
            {
              isFile: true,
              isOpen: false,
              language: 'typescript',
              name: 'parseDate.ts',
              path: '/app/utils/parseDate.ts',
              content:
                "/**\n * transform date format to DD-MM-YYYY\n */\nexport function parseDate(date: Date) {\n  let [month, day, year] = date.toLocaleDateString('en').split('/');\n\n  month = Number(month) > 9 ? month : '0' + month;\n  day = Number(day) > 9 ? day : '0' + day;\n  year = year.slice(2);\n\n  return `${day}-${month}-${year}`;\n}\n",
            },
            {
              isFile: true,
              isOpen: false,
              language: 'typescript',
              name: 'types.ts',
              path: '/app/utils/types.ts',
              content:
                'export interface ENVtypes {\n  url: string;\n  apiKey: string;\n}\n\nexport interface ContentTypes {\n  date: string;\n  text: string;\n}\n\nexport interface EditorPropsTypes {\n  content: Array<ContentTypes>;\n  actions: { [name: string]: any };\n}\n\nexport type ChangeEventHandler = (\n  event: React.ChangeEvent<HTMLInputElement>,\n) => void;\n\ntype ValuePiece = Date | any;\n\nexport type CalendarValue = ValuePiece | [ValuePiece, ValuePiece];\n',
            },
          ],
        },
        {
          isFile: false,
          name: 'styles',
          path: '/app/styles',
          children: [
            {
              isFile: true,
              isOpen: false,
              language: 'css',
              name: 'calendar.css',
              path: '/app/styles/calendar.css',
              content:
                '/* custom css code */\n\n.react-calendar {\n  width: 350px;\n  max-width: 100%;\n  background: white;\n  border: 1px solid #a0a096;\n  font-family: Arial, Helvetica, sans-serif;\n  line-height: 1.125em;\n}\n\n.react-calendar--doubleView {\n  width: 700px;\n}\n\n.react-calendar--doubleView .react-calendar__viewContainer {\n  display: flex;\n  margin: -0.5em;\n}\n\n.react-calendar--doubleView .react-calendar__viewContainer > * {\n  width: 50%;\n  margin: 0.5em;\n}\n\n.react-calendar,\n.react-calendar *,\n.react-calendar *:before,\n.react-calendar *:after {\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.react-calendar button {\n  margin: 0;\n  border: 0;\n  outline: none;\n}\n\n.react-calendar button:enabled:hover {\n  cursor: pointer;\n}\n\n.react-calendar__navigation {\n  display: flex;\n  height: 44px;\n  margin-bottom: 1em;\n}\n\n.react-calendar__navigation button {\n  min-width: 44px;\n  background: none;\n}\n\n.react-calendar__navigation button:disabled {\n  background-color: #f0f0f0;\n}\n\n.react-calendar__navigation button:enabled:hover,\n.react-calendar__navigation button:enabled:focus {\n  background-color: #e6e6e6;\n}\n\n.react-calendar__month-view__weekdays {\n  text-align: center;\n  text-transform: uppercase;\n  font-weight: bold;\n  font-size: 0.75em;\n}\n\n.react-calendar__month-view__weekdays__weekday {\n  padding: 0.5em;\n}\n\n.react-calendar__month-view__weekNumbers .react-calendar__tile {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75em;\n  font-weight: bold;\n}\n\n.react-calendar__month-view__days__day--weekend {\n  color: #d10000;\n}\n\n.react-calendar__month-view__days__day--neighboringMonth {\n  color: #757575;\n}\n\n.react-calendar__year-view .react-calendar__tile,\n.react-calendar__decade-view .react-calendar__tile,\n.react-calendar__century-view .react-calendar__tile {\n  padding: 2em 0.5em;\n}\n\n.react-calendar__tile {\n  max-width: 100%;\n  padding: 10px 6.6667px;\n  background: none;\n  text-align: center;\n  line-height: 16px;\n}\n\n.react-calendar__tile:disabled {\n  background-color: #f0f0f0;\n}\n\n.react-calendar__tile:enabled:hover,\n.react-calendar__tile:enabled:focus {\n  background-color: #e6e6e6;\n}\n\n.react-calendar__tile--now {\n  background: #ffff76;\n}\n\n.react-calendar__tile--now:enabled:hover,\n.react-calendar__tile--now:enabled:focus {\n  background: #ffffa9;\n}\n\n.react-calendar__tile--hasActive {\n  background: #76baff;\n}\n\n.react-calendar__tile--hasActive:enabled:hover,\n.react-calendar__tile--hasActive:enabled:focus {\n  background: #a9d4ff;\n}\n\n.react-calendar__tile--active {\n  background: #006edc;\n  color: white;\n}\n\n.highlight {\n  background-color: #00887a;\n  color: #f0f3f5;\n}\n\n.react-calendar__tile--active:enabled:hover,\n.react-calendar__tile--active:enabled:focus {\n  background: #1087ff;\n}\n\n.react-calendar--selectRange .react-calendar__tile--hover {\n  background-color: #e6e6e6;\n}\n',
            },
            {
              isFile: true,
              isOpen: false,
              language: 'css',
              name: 'globals.css',
              path: '/app/styles/globals.css',
              content:
                'body {\n  display: flex;\n  padding: 1rem;\n  justify-content: center;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-size: 17px;\n  color: #2f2f2f;\n  background-color: #cccccc;\n}\n\ninput {\n  width: 22rem;\n  height: 3.5rem;\n  outline: none;\n  margin-left: 1rem;\n  border: none;\n  font-size: 20px;\n}\n\ntextarea {\n  resize: none;\n  outline: none;\n  font-size: 17px;\n}\n\n.button {\n  font-size: 17px;\n  cursor: pointer;\n  border: none;\n  padding: 1rem 2rem 1rem 2rem;\n  color: #f0f3f5;\n  background-color: #00887a;\n}\n.button:hover {\n  background-color: #00557a;\n}\n',
            },
            {
              isFile: true,
              isOpen: false,
              language: 'css',
              name: 'page.module.css',
              path: '/app/styles/page.module.css',
              content:
                '.main {\n  width: 340px;\n}\n\n.textArea {\n  width: 100%;\n  height: 8rem;\n}\n\n.memo {\n  width: 100%;\n  min-height: 1rem;\n  border-top: 1px solid #2f2f2f;\n  border-bottom: 1px solid #2f2f2f;\n  word-wrap: break-word;\n}\n\n.inputForm_editor {\n  margin-top: 3rem;\n}\n',
            },
          ],
        },
        {
          isFile: true,
          isOpen: false,
          language: 'tsx',
          name: 'Scheduler.tsx',
          path: '/app/Scheduler.tsx',
          content:
            "'use client';\n\nimport React, { useState } from 'react';\nimport './styles/calendar.css';\nimport styles from './styles/page.module.css';\n\nimport { EditorPropsTypes, CalendarValue } from './utils/types';\nimport { parseDate } from './utils/parseDate';\nimport Calendar from 'react-calendar';\n\n/**\n * handle calendar component\n */\nexport default function Scheduler(props: EditorPropsTypes) {\n  const { content, actions } = props;\n  const [date, onChange] = useState<CalendarValue>(new Date());\n  const [text, setText] = useState<string>('Enter text here!');\n\n  const currentDate = date ? parseDate(new Date(date.toString())) : '';\n\n  const eventHandler = (event: string) => {\n    let flag = false;\n    switch (event) {\n      case 'PUSH':\n        flag = false;\n        content.forEach((item) => {\n          if (item.date === currentDate) {\n            flag = !flag;\n            return 0;\n          }\n        });\n\n        flag\n          ? actions.updateContent(currentDate, text)\n          : actions.addContent(currentDate, text);\n\n        setText('Enter text here!');\n        break;\n      case 'DELETE':\n        actions.deleteContent(currentDate);\n        break;\n    }\n  };\n\n  return (\n    <article>\n      <div>\n        <Calendar\n          onChange={onChange}\n          value={date}\n          locale=\"en-EN\"\n          showNeighboringMonth={false}\n          formatDay={(locale, date) =>\n            date.toLocaleString('en', { day: 'numeric' })\n          }\n          tileClassName={({ date }) =>\n            content.find((item) => item.date === parseDate(date))\n              ? 'highlight'\n              : ''\n          }\n        />\n        <p>selected day : {currentDate}</p>\n        <div className={styles.memo}>\n          {content.map((item, i: number) => {\n            if (item.date === currentDate) {\n              return <p key={i}>{item.text}</p>;\n            }\n          })}\n        </div>\n        <div className={styles.inputForm_editor}>\n          <h3>input form</h3>\n          <textarea\n            className={styles.textArea}\n            value={text}\n            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>\n              setText(e.target.value)\n            }\n          />\n        </div>\n        <button className=\"button\" onClick={() => eventHandler('PUSH')}>\n          push\n        </button>\n        <button className=\"button\" onClick={() => eventHandler('DELETE')}>\n          pop\n        </button>\n      </div>\n    </article>\n  );\n}\n",
        },
        { isFile: true, isOpen: false, language: 'ico', name: 'favicon.ico', path: '/app/favicon.ico', content: '' },
        {
          isFile: true,
          isOpen: false,
          language: 'tsx',
          name: 'layout.tsx',
          path: '/app/layout.tsx',
          content:
            "import './styles/globals.css';\nimport type { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: 'Next.js react-calendar example',\n  description: 'example of yorkie-js-sdk with next.js & react-calendar',\n  icons: {\n    icon: './favicon.ico',\n  },\n};\n\n/**\n * default root layout of service\n */\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang=\"en\">\n      <body>{children}</body>\n    </html>\n  );\n}\n",
        },
        {
          isFile: true,
          isOpen: false,
          language: 'tsx',
          name: 'not-found.tsx',
          path: '/app/not-found.tsx',
          content:
            '/**\n * 404-not found\n */\nexport default function notFound() {\n  return <h1>404 not found</h1>;\n}\n',
        },
        {
          isFile: true,
          isOpen: false,
          language: 'tsx',
          name: 'page.tsx',
          path: '/app/page.tsx',
          content:
            "/**\n * yorkie-js-sdk must be loaded on client-side\n */\n'use client';\n\nimport styles from './styles/page.module.css';\nimport React, { useEffect, useState } from 'react';\n\nimport { ContentTypes, ENVtypes } from './utils/types';\nimport { displayPeers, createRandomPeers } from './utils/handlePeers';\nimport { parseDate } from './utils/parseDate';\nimport yorkie, { Document, JSONArray, DocEventType } from '@yorkie-js/sdk';\nimport Scheduler from './Scheduler';\n\n// parseDate() value's format = \"DD-MM-YYYY\"\nconst defaultContent: JSONArray<ContentTypes> = [\n  {\n    date: parseDate(new Date()).replace(/^\\d{2}/, '01'),\n    text: 'payday',\n  },\n  {\n    date: parseDate(new Date()).replace(/^\\d{2}/, '17'),\n    text: \"Garry's birthday\",\n  },\n];\n\nconst ENV: ENVtypes = {\n  url: process.env.NEXT_PUBLIC_YORKIE_API_ADDR!,\n  apiKey: process.env.NEXT_PUBLIC_YORKIE_API_KEY!,\n};\n\nconst documentKey = `next.js-Scheduler-${parseDate(new Date())}`;\n\n/**\n * main page\n */\nexport default function Editor() {\n  const [peers, setPeers] = useState<Array<string>>([]);\n  const [content, setContent] = useState<Array<ContentTypes>>(defaultContent);\n\n  // create Yorkie Document with useState value\n  const [doc] = useState<Document<{ content: JSONArray<ContentTypes> }>>(\n    () =>\n      new yorkie.Document<{ content: JSONArray<ContentTypes> }>(documentKey),\n  );\n\n  const actions = {\n    // push new content to Yorkie's database\n    addContent(date: string, text: string) {\n      doc.update((root) => {\n        root.content.push({ date, text });\n      });\n    },\n\n    // delete selected content at Yorkie's database\n    deleteContent(date: string) {\n      doc.update((root) => {\n        let target;\n        for (const item of root.content) {\n          if (item.date === date) {\n            target = item as any;\n            break;\n          }\n        }\n\n        if (target) {\n          root.content.deleteByID!(target.getID());\n        }\n      });\n    },\n\n    // edit selected content at Yorkie's database\n    updateContent(date: string, text: string) {\n      doc.update((root) => {\n        let target;\n        for (const item of root.content) {\n          if (item.date === date) {\n            target = item;\n            break;\n          }\n        }\n\n        if (target) {\n          target.text = text;\n        }\n      });\n    },\n  };\n\n  useEffect(() => {\n    // create Yorkie Client at client-side\n    const client = new yorkie.Client(ENV.url, {\n      apiKey: ENV.apiKey,\n    });\n\n    // subscribe document event of \"PresenceChanged\"(=\"peers-changed\")\n    doc.subscribe('presence', (event) => {\n      if (event.type !== DocEventType.PresenceChanged) {\n        setPeers(displayPeers(doc.getPresences()));\n      }\n    });\n\n    /**\n     * `attachDoc` is a helper function to attach the document into the client.\n     */\n    async function attachDoc(\n      doc: Document<{ content: JSONArray<ContentTypes> }>,\n      callback: (props: any) => void,\n    ) {\n      // 01. activate client\n      await client.activate();\n      // 02. attach the document into the client with presence\n      await client.attach(doc, {\n        initialPresence: {\n          userName: createRandomPeers(),\n        },\n      });\n\n      // 03. create default content if not exists.\n      doc.update((root) => {\n        if (!root.content) {\n          root.content = defaultContent;\n        }\n      }, 'create default content if not exists');\n\n      // 04. subscribe doc's change event from local and remote.\n      doc.subscribe(() => {\n        callback(doc.getRoot().content);\n      });\n\n      // 05. set content to the attached document.\n      callback(doc.getRoot().content);\n    }\n\n    attachDoc(doc, (content) => setContent(content));\n  }, []);\n\n  return (\n    <main className={styles.main}>\n      <p>\n        peers : [\n        {peers.map((man: string, i: number) => {\n          return <span key={i}> {man}, </span>;\n        })}{' '}\n        ]\n      </p>\n      <Scheduler content={content} actions={actions} />\n    </main>\n  );\n}\n",
        },
      ],
    },
    {
      isFile: true,
      isOpen: false,
      language: '',
      name: '.env',
      path: '/.env',
      content: "NEXT_PUBLIC_YORKIE_API_ADDR='http://localhost:8080'\nNEXT_PUBLIC_YORKIE_API_KEY=''\n",
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
      language: 'javascript',
      name: '.eslintrc.js',
      path: '/.eslintrc.js',
      content:
        "module.exports = {\n  extends: ['next', 'plugin:prettier/recommended'],\n  rules: {\n    'prettier/prettier': [\n      'error',\n      {\n        endOfLine: 'auto',\n      },\n    ],\n    '@next/next/no-html-link-for-pages': 'off',\n  },\n};\n",
    },
    {
      isFile: true,
      isOpen: false,
      language: '',
      name: '.gitignore',
      path: '/.gitignore',
      content:
        '# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.\n\n# dependencies\n/node_modules\n/.pnp\n.pnp.js\n\n# testing\n/coverage\n\n# next.js\n/.next/\n/out/\n\n# production\n/build\n\n# misc\n.DS_Store\n*.pem\n\n# debug\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# local env files\n.env*.local\n\n# vercel\n.vercel\n\n# typescript\n*.tsbuildinfo\nnext-env.d.ts\n',
    },
    {
      isFile: true,
      isOpen: false,
      language: 'markdown',
      name: 'README.md',
      path: '/README.md',
      content:
        '# Yorkie Next.js scheduler Example\n\n<p>\n    <a href="https://yorkie.dev/yorkie-js-sdk/examples/nextjs-scheduler/" target="_blank">\n        <img src="https://img.shields.io/badge/preview-message?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuODU3MTcgMi43ODE5OUwxMS4yNzUxIDkuMTI2NzhDMTEuNTU0NCA5LjUyODAxIDEyLjEwNjIgOS42MjY3NiAxMi41MDc0IDkuMzQ3NDRDMTIuNTkzNCA5LjI4NzUgMTIuNjY4MSA5LjIxMjggMTIuNzI4MSA5LjEyNjc4TDE3LjE0NiAyLjc4MTk5QzE3LjcwNDggMS45Nzk1NCAxNy41MDcyIDAuODc2MTMxIDE2LjcwNDggMC4zMTc0OTRDMTYuNDA4IDAuMTEwODM3IDE2LjA1NSAwIDE1LjY5MzIgMEg4LjMxMDAxQzcuMzMyMiAwIDYuNTM5NTUgMC43OTI2NTQgNi41Mzk1NSAxLjc3MDQ2QzYuNTM5NjggMi4xMzIxMSA2LjY1MDUxIDIuNDg1MTEgNi44NTcxNyAyLjc4MTk5WiIgZmlsbD0iIzUxNEM0OSIvPgo8cGF0aCBkPSJNMTMuODA4OSAxNC4yMzg4QzE0LjEyMzEgMTQuNDE4IDE0LjQ4NDcgMTQuNDk2NiAxNC44NDUgMTQuNDY0MkwyMi45MjYgMTMuNzM1QzIzLjU3NTMgMTMuNjc2NSAyNC4wNTQgMTMuMTAyNyAyMy45OTU1IDEyLjQ1MzVDMjMuOTkyNCAxMi40MTkyIDIzLjk4NzggMTIuMzg1MSAyMy45ODE3IDEyLjM1MTNDMjMuNzM4OSAxMC45OTY4IDIzLjI2MTEgOS42OTUyNyAyMi41Njk5IDguNTA1NDZDMjEuODc4NiA3LjMxNTY1IDIwLjk4NDggNi4yNTU3NyAxOS45Mjg2IDUuMzczOTFDMTkuNDI4MiA0Ljk1NjE0IDE4LjY4MzkgNS4wMjMwNyAxOC4yNjYyIDUuNTIzNTZDMTguMjQ0MiA1LjU0OTkgMTguMjIzMyA1LjU3NzI2IDE4LjIwMzYgNS42MDU1MUwxMy41NjcgMTIuMjY0MUMxMy4zNjAzIDEyLjU2MSAxMy4yNDk1IDEyLjkxNCAxMy4yNDk1IDEzLjI3NThWMTMuMjUzN0MxMy4yNDk1IDEzLjQ1NjIgMTMuMzAxNiAxMy42NTU0IDEzLjQwMDggMTMuODMxOUMxMy41MDUgMTQuMDA1NCAxMy42NTIxIDE0LjE0OTMgMTMuODI4MSAxNC4yNDk2IiBmaWxsPSIjRkRDNDMzIi8+CjxwYXRoIGQ9Ik0xMC42NDE2IDEzLjc0MzRDMTAuNTM3NSAxMy45NTU5IDEwLjM3MiAxNC4xMzIyIDEwLjE2NjUgMTQuMjQ5NEwxMC4xOTE1IDE0LjIzNTFDOS44NzczNCAxNC40MTQzIDkuNTE1NjkgMTQuNDkyOSA5LjE1NTQ0IDE0LjQ2MDVMMS4wNzQ0MSAxMy43MzEzQzEuMDQwMTggMTMuNzI4MyAxLjAwNjA3IDEzLjcyMzcgMC45NzIyMjUgMTMuNzE3NkMwLjMzMDYyIDEzLjYwMjUgLTAuMDk2MzExOSAxMi45ODkyIDAuMDE4NzI0MiAxMi4zNDc2QzAuMjYxNTIyIDEwLjk5MyAwLjczOTM1NCA5LjY5MTU2IDEuNDMwNDYgOC41MDE2M0MyLjEyMTU3IDcuMzExNjkgMy4wMTU1MSA2LjI1MjA2IDQuMDcxODQgNS4zNzAwOEM0LjA5ODE4IDUuMzQ4MDYgNC4xMjU1NCA1LjMyNzE5IDQuMTUzNzkgNS4zMDc0N0M0LjY4ODc2IDQuOTM1IDUuNDI0MjcgNS4wNjY3MSA1Ljc5Njg3IDUuNjAxNjhMMTAuNDMzNCAxMi4yNjA0QzEwLjY0MDEgMTIuNTU3MyAxMC43NTA5IDEyLjkxMDMgMTAuNzUwOSAxMy4yNzIxVjEzLjI0MzJDMTAuNzUwOSAxMy40Nzk3IDEwLjY3OTggMTMuNzExIDEwLjU0NjggMTMuOTA2NyIgZmlsbD0iI0ZEQzQzMyIvPgo8L3N2Zz4K&color=FEF3D7" alt="Live Preview" />\n    </a>\n</p>\n\n<img width="500" alt="Next.js scheduler" src="thumbnail.jpg"/>\n\n## How to run demo\n\nAt project root, run below command to start Yorkie server.\n\n```bash\n$ docker compose -f docker/docker-compose.yml up --build -d\n```\n\nThen install dependencies and run the demo.\n\n```bash\n# In the root directory of the repository.\n$ pnpm install\n```\n\nNow you can run the demo.\n\n```bash\n# In the root directory of the repository.\n$ pnpm nextjs-scheduler dev\n\n# Or in the directory of the example.\n$ pnpm dev\n```\n',
    },
    {
      isFile: true,
      isOpen: false,
      language: 'javascript',
      name: 'next.config.js',
      path: '/next.config.js',
      content:
        "/** @type {import('next').NextConfig} */\nconst nextConfig = {\n  output: 'export',\n  distDir: 'dist',\n  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',\n  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',\n  reactStrictMode: false,\n};\n\nmodule.exports = nextConfig;\n",
    },
    {
      isFile: true,
      isOpen: false,
      language: 'json',
      name: 'package.json',
      path: '/package.json',
      content:
        '{\n  "name": "nextjs-scheduler",\n  "version": "0.0.0",\n  "private": true,\n  "scripts": {\n    "dev": "next dev -p 5174",\n    "build": "next build",\n    "start": "next start",\n    "lint": "next lint"\n  },\n  "dependencies": {\n    "next": "14.1.3",\n    "react": "18.2.0",\n    "react-calendar": "^4.6.0",\n    "react-dom": "18.2.0",\n    "yorkie-js-sdk": "^0.6.0"\n  },\n  "devDependencies": {\n    "@types/node": "20.4.2",\n    "@types/react": "18.2.0",\n    "@types/react-dom": "18.2.0",\n    "eslint-config-next": "^14.2.5",\n    "eslint-config-prettier": "^9.1.0",\n    "prettier": "^3.3.3",\n    "typescript": "5.3.3"\n  }\n}\n',
    },
    { isFile: true, isOpen: false, language: 'jpg', name: 'thumbnail.jpg', path: '/thumbnail.jpg', content: '' },
    {
      isFile: true,
      isOpen: false,
      language: 'json',
      name: 'tsconfig.json',
      path: '/tsconfig.json',
      content:
        '{\n  "compilerOptions": {\n    "target": "ESNext",\n    "lib": ["DOM", "DOM.Iterable", "ESNext"],\n    "allowJs": false,\n    "skipLibCheck": true,\n    "strict": false,\n    "forceConsistentCasingInFileNames": true,\n    "noEmit": true,\n    "esModuleInterop": true,\n    "module": "ESNext",\n    "moduleResolution": "Node",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "jsx": "preserve",\n    "incremental": true,\n    "plugins": [\n      {\n        "name": "next"\n      }\n    ],\n    "paths": {\n      "@/*": ["./*"],\n      "@yorkie-js-sdk/src/*": ["../../packages/sdk/src/*"],\n      "react": ["./node_modules/@types/react"]\n    }\n  },\n  "include": [\n    "next-env.d.ts",\n    "**/*.ts",\n    "**/*.tsx",\n    ".next/types/**/*.ts",\n    "dist/types/**/*.ts"\n  ],\n  "exclude": ["node_modules"]\n}\n',
    },
  ],
};
