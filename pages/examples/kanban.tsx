import { ExampleLayout } from '@/components';
import { FullView, Sidebar } from '@/components/exampleView';
import { SimpleDualView } from '@/components/exampleView/SimpleDualView';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const sampleCode = `<script>
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
`;

export interface DocChangeInfo {
  type: 'modification' | 'initialize';
  path: string;
}

const KanbanExampleView: NextPage = () => {
  const [docChangeInfos, setDocChangeInfos] = useState<DocChangeInfo[]>([]);
  useEffect(() => {
    const activate = async () => {
      const yorkie = await import('yorkie-js-sdk');
      const client = new yorkie.Client('https://api.yorkie.dev');
      await client.activate();
      const doc = new yorkie.Document('vuejs-kanban');
      await client.attach(doc);
      setDocChangeInfos((prev) => [...prev, { type: 'initialize', path: 'Connection has been established!' }]);
      doc.subscribe((event) => {
        if (event.type === 'remote-change') {
          for (const changeInfo of event.value) {
            for (const path of changeInfo.paths) {
              setDocChangeInfos((prev) => [...prev, { type: 'modification', path }]);
            }
          }
        }
      });
    };
    activate();
  }, []);
  return (
    <ExampleLayout breadcrumbTitle="Kanban Board" defaultViewType="split">
      {({ viewType }) => (
        <>
          <Head>
            <title>Kanban Board · Yorkie Examples</title>
          </Head>
          <Sidebar
            defaultOpened={viewType !== 'full'}
            title="Kanban Board"
            description="Kanban Board is a tool for managing tasks and workflow. It is a visual way to manage tasks and workflow."
            features={[
              {
                title: '1. Add a new task',
                description:
                  'Try adding a new task to the board. You can see the task added by other users in real time.',
              },
              {
                title: '2. Move the task to another column',
                description: 'Try moving the task to another column.',
              },
              {
                title: '3. Delete the task',
                description: 'Try deleting the task.',
              },
              {
                title: '4. Edit the task',
                description: 'Try editing the task.',
              },
            ]}
            code={sampleCode}
          />
          <SimpleDualView
            iframeUrl={'https://hunkim98.github.io/vuejs-kanban-yorkie/'}
            docChangeInfos={docChangeInfos}
            projectName={'kanban'}
          />
        </>
      )}
    </ExampleLayout>
  );
};

export default KanbanExampleView;
