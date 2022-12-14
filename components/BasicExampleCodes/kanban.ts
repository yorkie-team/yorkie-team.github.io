import { ProjectStructure } from '.';

export const KanbanProject: ProjectStructure = {
  src: {
    assets: {
      'main.css': {
        type: 'css',
        name: 'main.css',
        content: `html,
            body {
              margin: 0;
              padding: 0;
            }
            .kanban {
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              /* margin-bottom: 10px; */
              background: #807b77;
              /* border: 1px solid #ccc; */
              height: 450px;
              align-items: flex-start;
              overflow: auto;
              min-height: 100vh;
              user-select: none;
            }
            
            .kanban .add-list {
              padding: 10px;
              color: #fff;
              cursor: pointer;
              background: #ffffff3d;
              margin: 10px 0 10px 10px;
              width: 260px;
              border-radius: 3px;
              flex-shrink: 0;
            }
            
            .kanban .add-list:hover {
              background: #ffffff52;
            }
            
            .kaban .add-list-opener::before {
              content: "＋ ";
            }
            
            .delete {
              position: absolute;
              cursor: pointer;
              top: 2px;
              right: 2px;
              display: none;
            }
            
            .add-form {
              display: flex;
              flex-direction: column;
            }
            
            .add-form input[type="text"] {
              border: none;
              overflow: auto;
              outline: none;
            
              font-size: 1em;
            
              margin: 5px 0;
              padding: 5px;
              background: #fff;
              border-radius: 3px;
              box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
              position: relative;
              word-break: break-word;
            }
            
            .add-form input[type="button"] {
              font-size: 1em;
              padding: 5px;
            }
            
            .add-form input[type="button"].pull-right {
              float: right;
            }
            
            .list {
              background: #ebecf0;
              margin: 10px 0 10px 10px;
              border-radius: 3px;
              padding: 10px;
              width: 260px;
              display: flex;
              flex-direction: column;
              flex-shrink: 0;
              position: relative;
            }
            
            .list:hover > .delete {
              display: inherit;
            }
            
            .list .title {
              font-weight: bold;
              padding: 3px;
            }
            
            .list .card {
              font-size: 1em;
            
              margin: 5px 0;
              padding: 5px;
              background: #fff;
              border-radius: 3px;
              box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
              position: relative;
              word-break: break-word;
            }
            
            .list .card:hover {
              background: #091e4214;
            }
            
            .list .card:hover .delete {
              display: inherit;
            }
            
            .add-card-opener {
              margin: 5px 0;
              padding: 5px;
              color: #444;
              font-size: 0.9em;
              cursor: pointer;
            }
            
            .add-card-opener:hover {
              background: #091e4214;
            }
            
            .add-card-opener::before {
              content: "＋ ";
            }
            `,
      },
    },
    'App.vue': {
      type: 'vue',
      name: 'App.vue',
      content: `<script>
        import yorkie from "yorkie-js-sdk";
        
        const defaultLists = [
          {
            title: "Todo",
            cards: [
              {
                title: "Pruning document",
              },
              {
                title: "Clean up codes",
              },
              {
                title: "Add a new feature",
              },
            ],
          },
          {
            title: "Doing",
            cards: [
              {
                title: "Array operations",
              },
            ],
          },
          {
            title: "Done",
            cards: [
              {
                title: "Create a sample page",
              },
              {
                title: "Launch demo site",
              },
            ],
          },
        ];
        
        console.log(process.env.NODE_ENV, "node env");
        
        const client = new yorkie.Client("https://api.yorkie.dev");
        const doc = new yorkie.Document("vuejs-kanban");
        
        export default {
          data() {
            return {
              lists: [],
              title: "",
              opened: null,
            };
          },
          created() {
            this.fetchDoc();
          },
          watch: {
            opened(index) {
              this.$nextTick(function () {
                if (index === 0) {
                  // Open add list form
                  this.$refs["addListForm"].querySelector("input").focus();
                } else {
                  // Or open add card form
                  this.$refs["addCardForm"][index - 1].querySelector("input").focus();
                }
              });
            },
          },
          methods: {
            async fetchDoc() {
              await client.activate();
              await client.attach(doc);
        
              doc.update((root) => {
                if (!root.lists) {
                  root.lists = defaultLists;
                }
              }, "create default list if not exists");
        
              doc.subscribe((event) => {
                this.lists = doc.getRoot().lists;
              });
              await client.sync();
        
              this.lists = doc.getRoot().lists;
            },
        
            isOpened(index) {
              return this.opened === index;
            },
        
            openForm(index) {
              this.opened = index;
            },
        
            closeForm() {
              this.opened = null;
            },
        
            addCard(list) {
              if (this.title === "") return;
        
              doc.update((root) => {
                root.lists.getElementByID(list.getID()).cards.push({
                  title: this.title,
                });
                this.title = "";
              }, \`add new card by \${client.getID()}\`);
            },
        
            deleteCard(list, card) {
              doc.update((root) => {
                root.lists.getElementByID(list.getID()).cards.deleteByID(card.getID());
              }, \`delete a card by \${client.getID()}\`);
            },
        
            addList() {
              if (this.title === "") return;
        
              doc.update((root) => {
                root.lists.push({
                  title: this.title,
                  cards: [],
                });
                this.title = "";
              }, \`add new list by \${client.getID()}\`);
            },
        
            deleteList(list) {
              doc.update((root) => {
                root.lists.deleteByID(list.getID());
              }, \`delete a list by \${client.getID()}\`);
            },
          },
        };
        </script>
        
        <template>
          <div v-cloak class="list" v-for="(list, index) in lists">
            <span class="delete" v-on:click="deleteList(list)">❌</span>
            <div class="title">{{ list.title }}</div>
            <div class="card" v-for="card in list.cards">
              <span class="delete" v-on:click="deleteCard(list, card)">❌</span>
              {{ card.title }}
            </div>
            <div class="add-card" ref="addCardForm">
              <div v-if="isOpened(index + 1)" class="add-form">
                <input
                  type="text"
                  placeholder="Enter card title"
                  v-model="title"
                  v-on:keyup.enter="addCard(list)"
                  v-on:keyup.esc="closeForm()"
                />
                <div class="buttons">
                  <input type="button" value="Add" v-on:click="addCard(list)" />
                  <input
                    type="button"
                    value="Close"
                    class="pull-right"
                    v-on:click="closeForm()"
                  />
                </div>
              </div>
              <div v-else class="add-card-opener" v-on:click="openForm(index + 1)">
                Add another card
              </div>
            </div>
          </div>
          <div class="add-list" ref="addListForm">
            <div v-if="isOpened(0)" class="add-form">
              <input
                type="text"
                placeholder="Enter list title"
                v-model="title"
                v-on:keyup.enter="addList()"
                v-on:keyup.esc="closeForm()"
              />
              <div class="buttons">
                <input type="button" value="Add" v-on:click="addList()" />
                <input
                  type="button"
                  value="Close"
                  class="pull-right"
                  v-on:click="closeForm()"
                />
              </div>
            </div>
            <div v-else class="add-list-opener" v-on:click="openForm(0)">
              Add another list
            </div>
          </div>
        </template>
        `,
    },
    'main.js': {
      type: 'javascript',
      name: 'main.js',
      content: `import { createApp } from 'vue'
        import App from './App.vue'
        
        import './assets/main.css'
        
        createApp(App).mount('#app')
        `,
    },
  },
  'index.html': {
    type: 'html',
    name: 'index.html',
    content: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>vuejs-kanban-yorkie</title>
      </head>
    
      <body>
        <div id="app" class="kanban"></div>
        <script type="module" src="/src/main.js"></script>
      </body>
    </html>
    `,
  },
  'package.json': {
    type: 'json',
    name: 'package.json',
    content: `{
        "name": "vuejs-kanban-yorkie",
        "version": "0.0.0",
        "homepage": "https://hunkim98.github.io/vuejs-kanban-yorkie",
        "scripts": {
          "dev": "vite",
          "build": "vite build",
          "preview": "vite preview"
        },
        "dependencies": {
          "vue": "^3.2.41",
          "yorkie-js-sdk": "^0.2.19"
        },
        "devDependencies": {
          "@vitejs/plugin-vue": "^3.1.2",
          "vite": "^3.1.8"
        }
      }
      `,
  },
  'vite.config.js': {
    type: 'javascript',
    name: 'vite.config.js',
    content: `import { fileURLToPath, URL } from "node:url";

    import { defineConfig } from "vite";
    import vue from "@vitejs/plugin-vue";
    
    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [vue()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
      //https://stackoverflow.com/questions/68380194/tranform-vue-config-js-to-vite-config-js-build-path
      base:
        process.env.NODE_ENV === "production"
          ? "/vuejs-kanban-yorkie/" // prod
          : "/", // dev
    });
    `,
  },
};
