import { DirectoryInfo } from '@/utils/exampleFileUtils';
export const FILE_INFO: DirectoryInfo = {
  isFile: false,
  name: 'vuejs-kanban',
  path: '/',
  children: [
    {
      isFile: false,
      name: 'src',
      path: '/src',
      children: [
        {
          isFile: false,
          name: 'assets',
          path: '/src/assets',
          children: [
            {
              isFile: true,
              isOpen: false,
              language: 'css',
              name: 'main.css',
              path: '/src/assets/main.css',
              content:
                "body {\n  margin: 0;\n  padding: 0;\n  background: #807b77;\n}\n\n.kanban {\n  margin: 20px;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: flex-start;\n  user-select: none;\n}\n\n.kanban .add-list {\n  padding: 10px;\n  color: #fff;\n  cursor: pointer;\n  background: #ffffff3d;\n  margin-right: 10px;\n  width: 260px;\n  border-radius: 3px;\n  flex-shrink: 0;\n}\n\n.kanban .add-list:hover {\n  background: #ffffff52;\n}\n\n.kaban .add-list-opener::before {\n  content: '＋ ';\n}\n\n.delete {\n  position: absolute;\n  cursor: pointer;\n  top: 2px;\n  right: 2px;\n  display: none;\n}\n\n.add-form {\n  display: flex;\n  flex-direction: column;\n}\n\n.add-form input[type='text'] {\n  border: none;\n  overflow: auto;\n  outline: none;\n\n  font-size: 1em;\n\n  margin: 5px 0;\n  padding: 5px;\n  background: #fff;\n  border-radius: 3px;\n  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);\n  position: relative;\n  word-break: break-word;\n}\n\n.add-form input[type='button'] {\n  font-size: 1em;\n  padding: 5px;\n}\n\n.add-form input[type='button'].pull-right {\n  float: right;\n}\n\n.list {\n  background: #ebecf0;\n  margin-right: 10px;\n  border-radius: 3px;\n  padding: 10px;\n  width: 260px;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  position: relative;\n}\n\n.list:hover > .delete {\n  display: inherit;\n}\n\n.list .title {\n  font-weight: bold;\n  padding: 3px;\n}\n\n.list .card {\n  margin: 5px 0;\n  padding: 5px;\n  background: #fff;\n  border-radius: 3px;\n  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);\n  position: relative;\n  word-break: break-word;\n  font-size: 1em;\n}\n\n.list .card:hover {\n  background: #091e4214;\n}\n\n.list .card:hover .delete {\n  display: inherit;\n}\n\n.add-card-opener {\n  margin: 5px 0;\n  padding: 5px;\n  color: #444;\n  font-size: 0.9em;\n  cursor: pointer;\n}\n\n.add-card-opener:hover {\n  background: #091e4214;\n}\n\n.add-card-opener::before {\n  content: '＋ ';\n}\n",
            },
          ],
        },
        {
          isFile: true,
          isOpen: false,
          language: 'javascript',
          name: 'App.vue',
          path: '/src/App.vue',
          content:
            '<script>\nimport yorkie from \'@yorkie-js/sdk\';\n\nconst defaultLists = [\n  {\n    title: \'Todo\',\n    cards: [\n      {\n        title: \'Pruning document\',\n      },\n      {\n        title: \'Clean up codes\',\n      },\n    ],\n  },\n  {\n    title: \'Doing\',\n    cards: [\n      {\n        title: \'Array operations\',\n      },\n    ],\n  },\n  {\n    title: \'Done\',\n    cards: [\n      {\n        title: \'Create a sample page\',\n      },\n      {\n        title: \'Launch demo site\',\n      },\n    ],\n  },\n];\n\nconst client = new yorkie.Client(import.meta.env.VITE_YORKIE_API_ADDR, {\n  apiKey: import.meta.env.VITE_YORKIE_API_KEY,\n});\nconst doc = new yorkie.Document(\n  `vuejs-kanban-${new Date().toISOString().substring(0, 10).replace(/-/g, \'\')}`,\n  { enableDevtools: true },\n);\n\nexport default {\n  data() {\n    return {\n      lists: [],\n      title: \'\',\n      opened: null,\n    };\n  },\n  created() {\n    this.fetchDoc();\n  },\n  beforeUnmount() {\n    this.disconnect();\n  },\n  watch: {\n    opened(index) {\n      this.$nextTick(function () {\n        if (index === 0) {\n          // Open add list form\n          this.$refs[\'addListForm\'].querySelector(\'input\').focus();\n        } else if (index) {\n          // Or open add card form\n          this.$refs[\'addCardForm\'][index - 1].querySelector(\'input\').focus();\n        }\n        this.title = \'\';\n      });\n    },\n  },\n  methods: {\n    async fetchDoc() {\n      await client.activate();\n      await client.attach(doc);\n\n      doc.update((root) => {\n        if (!root.lists) {\n          root.lists = defaultLists;\n        }\n      }, \'create default list if not exists\');\n\n      doc.subscribe((event) => {\n        this.lists = doc.getRoot().lists;\n      });\n      await client.sync();\n\n      this.lists = doc.getRoot().lists;\n    },\n\n    async disconnect() {\n      await client.deactivate();\n    },\n\n    isOpened(index) {\n      return this.opened === index;\n    },\n\n    openForm(index) {\n      this.opened = index;\n    },\n\n    closeForm() {\n      this.opened = null;\n    },\n\n    addCard(list) {\n      if (this.title === \'\') return;\n\n      doc.update((root) => {\n        root.lists.getElementByID(list.getID()).cards.push({\n          title: this.title,\n        });\n        this.title = \'\';\n      }, `add new card by ${client.getID()}`);\n    },\n\n    deleteCard(list, card) {\n      doc.update((root) => {\n        root.lists.getElementByID(list.getID()).cards.deleteByID(card.getID());\n      }, `delete a card by ${client.getID()}`);\n    },\n\n    addList() {\n      if (this.title === \'\') return;\n\n      doc.update((root) => {\n        root.lists.push({\n          title: this.title,\n          cards: [],\n        });\n        this.title = \'\';\n      }, `add new list by ${client.getID()}`);\n    },\n\n    deleteList(list) {\n      doc.update((root) => {\n        root.lists.deleteByID(list.getID());\n      }, `delete a list by ${client.getID()}`);\n    },\n  },\n};\n</script>\n\n<template>\n  <div v-cloak class="list" v-for="(list, index) in lists">\n    <span class="delete" v-on:click="deleteList(list)">❌</span>\n    <div class="title">{{ list.title }}</div>\n    <div class="card" v-for="card in list.cards">\n      <span class="delete" v-on:click="deleteCard(list, card)">❌</span>\n      {{ card.title }}\n    </div>\n    <div class="add-card" ref="addCardForm">\n      <div v-if="isOpened(index + 1)" class="add-form">\n        <input\n          type="text"\n          placeholder="Enter card title"\n          v-model="title"\n          v-on:keyup.enter="addCard(list)"\n          v-on:keyup.esc="closeForm()"\n        />\n        <div class="buttons">\n          <input type="button" value="Add" v-on:click="addCard(list)" />\n          <input\n            type="button"\n            value="Close"\n            class="pull-right"\n            v-on:click="closeForm()"\n          />\n        </div>\n      </div>\n      <div v-else class="add-card-opener" v-on:click="openForm(index + 1)">\n        Add another card\n      </div>\n    </div>\n  </div>\n  <div class="add-list" ref="addListForm">\n    <div v-if="isOpened(0)" class="add-form">\n      <input\n        type="text"\n        placeholder="Enter list title"\n        v-model="title"\n        v-on:keyup.enter="addList()"\n        v-on:keyup.esc="closeForm()"\n      />\n      <div class="buttons">\n        <input type="button" value="Add" v-on:click="addList()" />\n        <input\n          type="button"\n          value="Close"\n          class="pull-right"\n          v-on:click="closeForm()"\n        />\n      </div>\n    </div>\n    <div v-else class="add-list-opener" v-on:click="openForm(0)">\n      Add another list\n    </div>\n  </div>\n</template>\n',
        },
        {
          isFile: true,
          isOpen: false,
          language: 'javascript',
          name: 'main.js',
          path: '/src/main.js',
          content:
            "import { createApp } from 'vue'\nimport App from './App.vue'\n\nimport './assets/main.css'\n\ncreateApp(App).mount('#app')\n",
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
        '# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\n.DS_Store\ndist\ndist-ssr\ncoverage\n*.local\n\n/cypress/videos/\n/cypress/screenshots/\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n',
    },
    {
      isFile: true,
      isOpen: false,
      language: 'markdown',
      name: 'README.md',
      path: '/README.md',
      content:
        '# Yorkie Vue Kanban Example\n\n<p>\n    <a href="https://yorkie.dev/yorkie-js-sdk/examples/vuejs-kanban/" target="_blank">\n        <img src="https://img.shields.io/badge/preview-message?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuODU3MTcgMi43ODE5OUwxMS4yNzUxIDkuMTI2NzhDMTEuNTU0NCA5LjUyODAxIDEyLjEwNjIgOS42MjY3NiAxMi41MDc0IDkuMzQ3NDRDMTIuNTkzNCA5LjI4NzUgMTIuNjY4MSA5LjIxMjggMTIuNzI4MSA5LjEyNjc4TDE3LjE0NiAyLjc4MTk5QzE3LjcwNDggMS45Nzk1NCAxNy41MDcyIDAuODc2MTMxIDE2LjcwNDggMC4zMTc0OTRDMTYuNDA4IDAuMTEwODM3IDE2LjA1NSAwIDE1LjY5MzIgMEg4LjMxMDAxQzcuMzMyMiAwIDYuNTM5NTUgMC43OTI2NTQgNi41Mzk1NSAxLjc3MDQ2QzYuNTM5NjggMi4xMzIxMSA2LjY1MDUxIDIuNDg1MTEgNi44NTcxNyAyLjc4MTk5WiIgZmlsbD0iIzUxNEM0OSIvPgo8cGF0aCBkPSJNMTMuODA4OSAxNC4yMzg4QzE0LjEyMzEgMTQuNDE4IDE0LjQ4NDcgMTQuNDk2NiAxNC44NDUgMTQuNDY0MkwyMi45MjYgMTMuNzM1QzIzLjU3NTMgMTMuNjc2NSAyNC4wNTQgMTMuMTAyNyAyMy45OTU1IDEyLjQ1MzVDMjMuOTkyNCAxMi40MTkyIDIzLjk4NzggMTIuMzg1MSAyMy45ODE3IDEyLjM1MTNDMjMuNzM4OSAxMC45OTY4IDIzLjI2MTEgOS42OTUyNyAyMi41Njk5IDguNTA1NDZDMjEuODc4NiA3LjMxNTY1IDIwLjk4NDggNi4yNTU3NyAxOS45Mjg2IDUuMzczOTFDMTkuNDI4MiA0Ljk1NjE0IDE4LjY4MzkgNS4wMjMwNyAxOC4yNjYyIDUuNTIzNTZDMTguMjQ0MiA1LjU0OTkgMTguMjIzMyA1LjU3NzI2IDE4LjIwMzYgNS42MDU1MUwxMy41NjcgMTIuMjY0MUMxMy4zNjAzIDEyLjU2MSAxMy4yNDk1IDEyLjkxNCAxMy4yNDk1IDEzLjI3NThWMTMuMjUzN0MxMy4yNDk1IDEzLjQ1NjIgMTMuMzAxNiAxMy42NTU0IDEzLjQwMDggMTMuODMxOUMxMy41MDUgMTQuMDA1NCAxMy42NTIxIDE0LjE0OTMgMTMuODI4MSAxNC4yNDk2IiBmaWxsPSIjRkRDNDMzIi8+CjxwYXRoIGQ9Ik0xMC42NDE2IDEzLjc0MzRDMTAuNTM3NSAxMy45NTU5IDEwLjM3MiAxNC4xMzIyIDEwLjE2NjUgMTQuMjQ5NEwxMC4xOTE1IDE0LjIzNTFDOS44NzczNCAxNC40MTQzIDkuNTE1NjkgMTQuNDkyOSA5LjE1NTQ0IDE0LjQ2MDVMMS4wNzQ0MSAxMy43MzEzQzEuMDQwMTggMTMuNzI4MyAxLjAwNjA3IDEzLjcyMzcgMC45NzIyMjUgMTMuNzE3NkMwLjMzMDYyIDEzLjYwMjUgLTAuMDk2MzExOSAxMi45ODkyIDAuMDE4NzI0MiAxMi4zNDc2QzAuMjYxNTIyIDEwLjk5MyAwLjczOTM1NCA5LjY5MTU2IDEuNDMwNDYgOC41MDE2M0MyLjEyMTU3IDcuMzExNjkgMy4wMTU1MSA2LjI1MjA2IDQuMDcxODQgNS4zNzAwOEM0LjA5ODE4IDUuMzQ4MDYgNC4xMjU1NCA1LjMyNzE5IDQuMTUzNzkgNS4zMDc0N0M0LjY4ODc2IDQuOTM1IDUuNDI0MjcgNS4wNjY3MSA1Ljc5Njg3IDUuNjAxNjhMMTAuNDMzNCAxMi4yNjA0QzEwLjY0MDEgMTIuNTU3MyAxMC43NTA5IDEyLjkxMDMgMTAuNzUwOSAxMy4yNzIxVjEzLjI0MzJDMTAuNzUwOSAxMy40Nzk3IDEwLjY3OTggMTMuNzExIDEwLjU0NjggMTMuOTA2NyIgZmlsbD0iI0ZEQzQzMyIvPgo8L3N2Zz4K&color=FEF3D7" alt="Live Preview" />\n    </a>\n</p>\n\n<img width="500" alt="Vue Kanban" src="thumbnail.jpg"/>\n\n## How to run demo\n\nAt project root, run below command to start Yorkie server.\n\n```bash\n$ docker compose -f docker/docker-compose.yml up --build -d\n```\n\nInstall dependencies\n\n```bash\n# In the root directory of the repository.\n$ pnpm install\n```\n\nStart demo project\n\n```bash\n# In the root directory of the repository.\n$ pnpm vuejs-kanban dev\n\n# Or in the directory of the example.\n$ pnpm dev\n```\n',
    },
    {
      isFile: true,
      isOpen: false,
      language: 'markup',
      name: 'index.html',
      path: '/index.html',
      content:
        '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="UTF-8">\n  <link rel="icon" href="/favicon.ico">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Vite App</title>\n</head>\n\n<body>\n  <div id="app" class="kanban"></div>\n  <script type="module" src="/src/main.js"></script>\n</body>\n\n</html>\n',
    },
    {
      isFile: true,
      isOpen: false,
      language: 'json',
      name: 'package.json',
      path: '/package.json',
      content:
        '{\n  "name": "vuejs-kanban",\n  "version": "0.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "vue": "^3.2.41",\n    "yorkie-js-sdk": "^0.6.0"\n  },\n  "devDependencies": {\n    "@vitejs/plugin-vue": "^5.0.3",\n    "vite": "^5.0.12"\n  }\n}\n',
    },
    { isFile: true, isOpen: false, language: 'jpg', name: 'thumbnail.jpg', path: '/thumbnail.jpg', content: '' },
    {
      isFile: true,
      isOpen: false,
      language: 'javascript',
      name: 'vite.config.js',
      path: '/vite.config.js',
      content:
        "import { fileURLToPath, URL } from 'node:url';\n\nimport { defineConfig } from 'vite';\nimport vue from '@vitejs/plugin-vue';\nimport path from 'path';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  base: '',\n  plugins: [vue()],\n  resolve: {\n    alias: [\n      {\n        find: '@yorkie-js-sdk/src',\n        replacement: path.resolve(__dirname, '../../packages/sdk/src'),\n      },\n      {\n        find: '@',\n        replacement: fileURLToPath(new URL('./src', import.meta.url)),\n      },\n    ],\n  },\n});\n",
    },
  ],
};
