import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Icon, CodeBlock, Accordion } from '@/components';
import { ProjectStructure } from '../BasicExampleCodes';

export function Sidebar({
  defaultOpened = true,
  title,
  description,
  code,
}: {
  defaultOpened?: boolean;
  title: string;
  description: string;
  code: ProjectStructure;
}) {
  const [viewType, setViewType] = useState<'code' | 'documentStructure'>('code');
  const [isOpened, setIsOpened] = useState<boolean>(defaultOpened);

  useEffect(() => {
    setIsOpened(defaultOpened);
  }, [defaultOpened]);

  return (
    <div
      className={classNames('sidebar', { type_shadow: !defaultOpened }, { is_hide: !isOpened })}
      style={{ width: isOpened ? '50%' : undefined, minHeight: '100%' }}
    >
      <div className="sidebar_top">
        <div className="codeblock_navigator">
          <button
            type="button"
            onClick={() => {
              setViewType('code');
            }}
            className={classNames('item', { is_active: viewType === 'code' })}
          >
            Code
          </button>
          <button
            type="button"
            onClick={() => {
              setViewType('documentStructure');
            }}
            className={classNames('item', { is_active: viewType === 'documentStructure' })}
          >
            Document Structure
          </button>
        </div>
        <button type="button" className="btn btn_toggle" onClick={() => setIsOpened(!isOpened)}>
          <Icon type="arrow" />
          <span className="blind">Close sidebar</span>
        </button>
      </div>
      {viewType === 'code' && (
        <>
          <div className="guide_box" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className="guide_title">{title}</h2>
            <p className="guide_desc">{description}</p>
            <div
              style={{
                display: isOpened ? 'block' : 'none',
                borderRadius: 'none',
                marginBottom: -31,
                marginLeft: -31,
                marginRight: -31,
                backgroundColor: '#514C48',
                color: 'white',
                overflowY: 'auto',
                padding: 0,
                zIndex: 5,
                boxSizing: 'border-box',
              }}
            >
              {`<script>
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
`}
            </div>
          </div>
        </>
      )}
      {viewType === 'documentStructure' && <div></div>}
      <div className="sidebar_bottom" style={{ zIndex: 0 }}>
        <div className="btn_box full_width">
          <a href="#" className="btn gray600 ">
            Github
          </a>
          <a href="#" className="btn gray900 btn_share">
            Share to invite other
          </a>
        </div>
        <p className="guide_desc">Last updated 4 days ago</p>
      </div>
    </div>
  );
}
