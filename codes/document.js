const COMMON_CODE = `
// You can use a key-value pair to share data with users.
// The key is a string, and the value should be serializable - objects, arrays, and primitives.
doc.update((root) => {
  root.num = 1;           // {"num":1}
  root.obj = {'str':'a'}; // {"num":1,"obj":{"str":"a"}}
  root.arr = ['1', '2'];  // {"num":1,"obj":{"str":"a"},"arr":["1","2"]}
});
`;

const TEXT_CODE = `
// Text supports collaborative plain text editing.
doc.update((root) => {
  root.text = new yorkie.Text();  // {"text":""}
  root.text.edit(0, 0, 'hello');  // {"text":"hello"}
  root.text.edit(0, 1, 'H');      // {"text":"Hello"}
});
`;

const COUNTER_CODE = `
// Counter supports numeric types that change with addition and subtraction.
doc.update((root) => {
  root.cnt = new yorkie.Counter(1); // {"cnt":1}, use 1n for a Long counter
  root.cnt.increase(2);             // {"cnt":3}
  root.cnt.increase(3);             // {"cnt":6}
  root.cnt.increase(-4);            // {"cnt":2}
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
// Attach to a channel and track how many users are online
const channel = new yorkie.Channel('room-123');
await client.attach(channel);

channel.subscribe('presence', (event) => {
  console.log(\`\${event.count} users online\`);
});

// The current count is also available at any time
console.log(channel.getSessionCount());
`;

const CHANNEL_BROADCAST_CODE = `
// Broadcast messages to all clients attached to the channel
const channel = new yorkie.Channel('room-123');
await client.attach(channel);

channel.subscribe('chat', (event) => {
  console.log(event.payload.message);
});

channel.broadcast('chat', { user: 'Alice', message: 'Hello everyone!' });
`;

export const DOCUMENT_CODE = {
  common: COMMON_CODE,
  text: TEXT_CODE,
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
