const COMMON_CODE = `
// You can use a key-value pair to share data with users.
// The key is a string, and the value should be serializable - objects, arrays, and primitives.
doc.update((root) => {
  root.num = 1;           // {"num":1}
  root.obj = {'str':'a'}; // {"num":1,"obj":{"str":"a"}}
  root.arr = ['1', '2'];  // {"num":1,"obj":{"str":"a"},"arr":[1,2]}
});
`;

const TEXT_CODE = ` 
// Text provides supports for collaborative plain text editing.
doc.update((root) => {
  root.text = new yorkie.Text();  // {"text":""}
  root.text.edit(0, 0, 'hello');  // {"text":"hello"}
  root.text.edit(0, 1, 'H');      // {"text":"Hello"}
});
`;

const RICHTEXT_CODE = `
// RichText is similar to Text except that we can add attributes to contents.
doc.update((root) => {
  root.text = new yorkie.RichText();       // {"text":""}
  root.text.edit(0, 0, 'hello');           // {"text":"hello"}
  root.text.edit(0, 1, 'H');               // {"text":"Hello"}
  root.text.setStyle(0, 1, {bold: true});  // {"text":"<b>H</b>ello"}
});
`;

const COUNTER_CODE = ` 
// Counter supports numeric types that change with addition and subtraction.
doc.update((root) => {
  root.cnt = new yorkie.Counter(yorkie.IntType, 1); // {"cnt":1}
  root.cnt.increase(2);                             // {"cnt":3}
  root.cnt.increase(3);                             // {"cnt":6}
  root.cnt.increase(-4);                            // {"cnt":2}
});
`;

const PRESENCE_WATCH_CODE = `
doc.subscribe('presence', (event) => {
  if (event.type === 'presence-changed') {
    // { clientID: '...', presence: { name: 'Alice' } }
    renderPresences(event.value);
  }
});
`;

const PRESENCE_UPDATE_CODE = `
// Share your presence with other users
client.attach(doc, {
  initialPresence: { name: 'Alice', cursor: { x: 0, y: 0 } },
});

doc.update((root, presence) => {
  presence.set({ cursor: { x: 10, y: 20 } });
});
`;

const CHANNEL_PRESENCE_CODE = `
// Subscribe to a channel and track online users
const channel = client.subscribe('my-channel');

channel.on('presence-changed', (event) => {
  console.log(\`\${event.count} users online\`);
});
`;

const CHANNEL_BROADCAST_CODE = `
// Publish messages to all subscribers
const channel = client.subscribe('my-channel');

channel.publish('chat', { user: 'Alice', message: 'Hello everyone!' });

channel.on('chat', (event) => {
  console.log(event.data.message);
});
`;

export const DOCUMENT_CODE = {
  common: COMMON_CODE,
  text: TEXT_CODE,
  richText: RICHTEXT_CODE,
  counter: COUNTER_CODE,
};

export const PRESENCE_CODE = {
  watch: PRESENCE_WATCH_CODE,
  update: PRESENCE_UPDATE_CODE,
};

export const CHANNEL_CODE = {
  presence: CHANNEL_PRESENCE_CODE,
  broadcast: CHANNEL_BROADCAST_CODE,
};
