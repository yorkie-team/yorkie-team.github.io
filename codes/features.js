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

const PROFILE_ANDROID = `
val client = Client(
    host = "${process.env.NEXT_PUBLIC_API_ADDR}",
    options = Client.Options(apiKey = "MY_API_KEY"),
)
val document = Document("profile-stack")
val gson = Gson()

scope.launch {
    client.activateAsync().await()
    client.attachDocument(
        document,
        // set the initial presence. Values are stored as JSON strings.
        initialPresence = mapOf(
            "name" to gson.toJson(getRandomName()),
            "color" to gson.toJson(getRandomColor()),
        ),
    ).await()

    // get all users connected to the Document.
    // {clientID: {"name": "\\"...\\"", "color": "\\"...\\""}, ...}
    document.presences.collect { users ->
        // show user list
        updateUserList(users)
    }
}
`;

const PROFILE_IOS = `
let client = Client("${process.env.NEXT_PUBLIC_API_ADDR}", ClientOptions(
    apiKey: "MY_API_KEY"
))
try await client.activate()

let doc = Document(key: "profile-stack")
await doc.subscribePresence { event, doc in
    if !(event is PresenceChangedEvent) { // initialized, watched, unwatched event
        // get all users connected to the Document.
        // [(clientID: ActorID, presence: ["name": String, "color": String]), ...]
        let users = doc.getPresences()

        // show user list
        updateUserList(users)
    }
}
// set the initial presence.
try await client.attach(doc, [
    "name": getRandomName(),
    "color": getRandomColor(),
])
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

const CURSOR_ANDROID = `
val client = Client(
    host = "${process.env.NEXT_PUBLIC_API_ADDR}",
    options = Client.Options(apiKey = "MY_API_KEY"),
)
val document = Document("multi-cursor")
val gson = Gson()

scope.launch {
    client.activateAsync().await()
    client.attachDocument(
        document,
        initialPresence = mapOf("cursor" to "null"),
    ).await()

    document.events
        .filterIsInstance<Document.Event.PresenceChanged.Others.PresenceChanged>()
        .collect { event ->
            // {actorID: String, presence: {"cursor": "{\\"x\\":0.0,\\"y\\":0.0}"}}
            updatePeerCursor(event.changed)
        }
}

// call this when the user moves the pointer.
fun onPointerMove(x: Float, y: Float) {
    scope.launch {
        // set the cursor position to presence.
        // Presence will be shared with other clients.
        document.updateAsync { _, presence ->
            presence.put(mapOf("cursor" to gson.toJson(mapOf("x" to x, "y" to y))))
        }.await()
    }
}
`;

const CURSOR_IOS = `
let client = Client("${process.env.NEXT_PUBLIC_API_ADDR}", ClientOptions(
    apiKey: "MY_API_KEY"
))
try await client.activate()

let doc = Document(key: "multi-cursor")
await doc.subscribePresence(.others) { event, _ in
    if let event = event as? PresenceChangedEvent {
        // (clientID: ActorID, presence: ["cursor": ["x": Double, "y": Double]])
        updatePeerCursor(event.value)
    }
}
try await client.attach(doc)

// call this when the user moves the pointer.
func onPointerMove(_ location: CGPoint) async throws {
    // set the cursor position to presence.
    // Presence will be shared with other clients.
    try await doc.update { _, presence in
        presence.set([
            "cursor": ["x": location.x, "y": location.y],
        ])
    }
}
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

const SELECTION_ANDROID = `
val client = Client(
    host = "${process.env.NEXT_PUBLIC_API_ADDR}",
    options = Client.Options(apiKey = "MY_API_KEY"),
)
val document = Document("live-selection")
val gson = Gson()

scope.launch {
    client.activateAsync().await()
    client.attachDocument(
        document,
        initialPresence = mapOf("selection" to "null"),
    ).await()

    // create the shared text once.
    document.updateAsync { root, _ ->
        if (root.getOrNull("content") == null) {
            root.setNewText("content")
        }
    }.await()

    document.events
        .filterIsInstance<Document.Event.PresenceChanged.Others.PresenceChanged>()
        .collect { event ->
            // convert the peer's selection back to an index range and draw it.
            val (actorID, presence) = event.changed
            val selection = gson.fromJson(
                presence["selection"],
                Array<RgaTreeSplitPosStruct>::class.java,
            ) ?: return@collect
            val range = document.getRoot().getAs<JsonText>("content")
                .posRangeToIndexRange(selection[0] to selection[1])
            updatePeerSelection(actorID, range)
        }
}

// call this when the user moves the selection in your editor.
fun onSelectionChange(fromIdx: Int, toIdx: Int) {
    scope.launch {
        // Selection is stored as a position range so that it stays in place
        // while other users edit the text.
        document.updateAsync { root, presence ->
            val range = root.getAs<JsonText>("content").indexRangeToPosRange(fromIdx to toIdx)
            presence.put(mapOf("selection" to gson.toJson(range?.toList())))
        }.await()
    }
}
`;

const SELECTION_IOS = `
let client = Client("${process.env.NEXT_PUBLIC_API_ADDR}", ClientOptions(
    apiKey: "MY_API_KEY"
))
try await client.activate()

let doc = Document(key: "live-selection")
await doc.subscribePresence(.others) { event, doc in
    // convert the peer's selection back to an index range and draw it.
    guard let event = event as? PresenceChangedEvent,
          let selection = event.value.presence["selection"],
          let data = try? JSONSerialization.data(withJSONObject: selection),
          let range = try? JSONDecoder().decode([TextPosStruct].self, from: data),
          range.count == 2,
          let content = doc.getRoot().content as? JSONText,
          let indexRange = try? content.posRangeToIndexRange((range[0], range[1]))
    else { return }

    updatePeerSelection(event.value.clientID, indexRange)
}
try await client.attach(doc)

// create the shared text once.
try await doc.update { root, _ in
    if root.content as? JSONText == nil {
        root.content = JSONText()
    }
}

// call this when the user moves the selection in your editor.
func onSelectionChange(fromIdx: Int, toIdx: Int) async throws {
    // Selection is stored as a position range so that it stays in place
    // while other users edit the text.
    try await doc.update { root, presence in
        if let range = try? (root.content as? JSONText)?.indexRangeToPosRange((fromIdx, toIdx)) {
            presence.set(["selection": [range.0, range.1]])
        }
    }
}
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
    tabOrder: ['js', 'android', 'ios'],
    js: { title: 'JS SDK', code: PROFILE_JS, language: 'javascript' },
    android: { title: 'Android SDK', code: PROFILE_ANDROID, language: 'kotlin' },
    ios: { title: 'iOS SDK', code: PROFILE_IOS, language: 'swift' },
  },
  cursor: {
    tabOrder: ['js', 'android', 'ios'],
    js: { title: 'JS SDK', code: CURSOR_JS, language: 'javascript' },
    android: { title: 'Android SDK', code: CURSOR_ANDROID, language: 'kotlin' },
    ios: { title: 'iOS SDK', code: CURSOR_IOS, language: 'swift' },
  },
  selection: {
    tabOrder: ['js', 'android', 'ios'],
    js: { title: 'JS SDK', code: SELECTION_JS, language: 'javascript' },
    android: { title: 'Android SDK', code: SELECTION_ANDROID, language: 'kotlin' },
    ios: { title: 'iOS SDK', code: SELECTION_IOS, language: 'swift' },
  },
  editing: {
    tabOrder: ['js', 'android', 'ios'],
    js: { title: 'JS SDK', code: EDITING_JS, language: 'javascript' },
    android: { title: 'Android SDK', code: EDITING_ANDROID, language: 'kotlin' },
    ios: { title: 'iOS SDK', code: EDITING_IOS, language: 'swift' },
  },
};
