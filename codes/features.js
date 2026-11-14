const PROFILE_JS = `
import yorkie from '@yorkie-js/sdk';

async function main() {
  const client = new yorkie.Client({
    rpcAddr: '${process.env.NEXT_PUBLIC_API_ADDR}',
    apiKey: 'MY_API_KEY',
  });
  await client.activate();

  const doc = new yorkie.Document('profile-stack');
  doc.subscribe('presence', (event) => {
    if (event.type !== 'presence-changed') { // initialized, watched, unwatched event
      // get all users connected to the Document.
      // [ {clientID: string, presence: {name: string, color: string}}, ... ]
      const users = doc.getPresences();
      
      // show user list
      updateUserList(users);
    }
  });
  await client.attach(doc, {
    // set the initial presence.
    initialPresence: {
      name: getRandomName(),
      color: getRandomColor(),
    },
  });
}
main();
`;

const CURSOR_JS = ` 
import yorkie from '@yorkie-js/sdk';

async function main() {
  const client = new yorkie.Client({
    rpcAddr: '${process.env.NEXT_PUBLIC_API_ADDR}',
    apiKey: 'MY_API_KEY',
  });
  await client.activate();

  const doc = new yorkie.Document('multi-cursor');
  doc.subscribe('others', (event) => {
    if (event.type === 'presence-changed') {
      updatePeerCursor(event.value); // {clientID: string, presence: {cursor: {x: number, y: number}}}
    }
  });
  await client.attach(doc, {
    initialPresence: {
      cursor: null,
    },
  });

  document.body.addEventListener('mousemove', (e) => {
    // set the cursor position to presence.
    // Presence will be shared with other clients.
    doc.update((root, presence) => {
      presence.set({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    });
  });
}
main();
`;

const SELECTION_JS = `
import yorkie from '@yorkie-js/sdk';

async function main() {
  const client = new yorkie.Client({
    rpcAddr: '${process.env.NEXT_PUBLIC_API_ADDR}',
    apiKey: 'MY_API_KEY',
  });
  await client.activate();

  const doc = new yorkie.Document('live-selection');
  doc.subscribe('others', (event) => {
    if (event.type === 'presence-changed') {
      // convert the peer's selection back to an index range and draw it.
      const { clientID, presence } = event.value;
      if (!presence.selection) return;
      const range = doc.getRoot().content.posRangeToIndexRange(presence.selection);
      updatePeerSelection(clientID, range);
    }
  });
  await client.attach(doc, {
    initialPresence: {
      selection: null,
    },
  });

  // create the shared text once.
  doc.update((root) => {
    if (!root.content) {
      root.content = new yorkie.Text();
    }
  });

  // call this when the user moves the selection in your editor.
  function onSelectionChange(fromIdx, toIdx) {
    // Selection is stored as a position range so that it stays in place
    // while other users edit the text.
    doc.update((root, presence) => {
      presence.set({
        selection: root.content.indexRangeToPosRange([fromIdx, toIdx]),
      });
    });
  }
}
main();
`;

const EDITING_JS = `
import yorkie from '@yorkie-js/sdk';

async function main() {
  const client = new yorkie.Client({
    rpcAddr: '${process.env.NEXT_PUBLIC_API_ADDR}',
    apiKey: 'MY_API_KEY',
  });
  await client.activate();

  const doc = new yorkie.Document('multiplayer-editing');
  await client.attach(doc);

  // create the shared text once.
  doc.update((root) => {
    if (!root.content) {
      root.content = new yorkie.Text();
    }
  });

  doc.subscribe((event) => {
    if (event.type === 'remote-change') {
      // another user edited the text. Update the editor.
      updateEditor(doc.getRoot().content.toString());
    }
  });

  // call this when the user types in your editor.
  // Concurrent edits from other users are merged without conflicts.
  function onLocalEdit(from, to, content) {
    doc.update((root) => {
      root.content.edit(from, to, content);
    });
  }
}
main();
`;

const EDITING_ANDROID = `
val client = Client(
    host = "${process.env.NEXT_PUBLIC_API_ADDR}",
    options = Client.Options(apiKey = "MY_API_KEY"),
)
val document = Document("multiplayer-editing")

scope.launch {
    client.activateAsync().await()
    client.attachDocument(document).await()

    // create the shared text once.
    document.updateAsync { root, _ ->
        if (root.getOrNull("content") == null) {
            root.setNewText("content")
        }
    }.await()

    document.events.collect { event ->
        if (event is Document.Event.RemoteChange) {
            // another user edited the text. Update the editor.
            updateEditor()
        }
    }
}

// call this when the user types in your editor.
// Concurrent edits from other users are merged without conflicts.
fun onLocalEdit(from: Int, to: Int, content: String) {
    scope.launch {
        document.updateAsync { root, _ ->
            root.getAs<JsonText>("content").edit(from, to, content)
        }.await()
    }
}
`;

const EDITING_IOS = `
let client = Client("${process.env.NEXT_PUBLIC_API_ADDR}", ClientOptions(
    apiKey: "MY_API_KEY"
))
try await client.activate()

let doc = Document(key: "multiplayer-editing")
try await client.attach(doc)

// create the shared text once.
try await doc.update { root, _ in
    if root.content as? JSONText == nil {
        root.content = JSONText()
    }
}

await doc.subscribe { event, _ in
    if event is RemoteChangeEvent {
        // another user edited the text. Update the editor.
        updateEditor()
    }
}

// call this when the user types in your editor.
// Concurrent edits from other users are merged without conflicts.
func onLocalEdit(from: Int, to: Int, content: String) async throws {
    try await doc.update { root, _ in
        (root.content as? JSONText)?.edit(from, to, content)
    }
}
`;

export const FEATURES_CODE = {
  profile: {
    tabOrder: ['js'],
    js: { title: 'JS SDK', code: PROFILE_JS, language: 'javascript' },
  },
  cursor: {
    tabOrder: ['js'],
    js: { title: 'JS SDK', code: CURSOR_JS, language: 'javascript' },
  },
  selection: {
    tabOrder: ['js'],
    js: { title: 'JS SDK', code: SELECTION_JS, language: 'javascript' },
  },
  editing: {
    tabOrder: ['js', 'android', 'ios'],
    js: { title: 'JS SDK', code: EDITING_JS, language: 'javascript' },
    android: { title: 'Android SDK', code: EDITING_ANDROID, language: 'kotlin' },
    ios: { title: 'iOS SDK', code: EDITING_IOS, language: 'swift' },
  },
};
