const PROFILE_JS = `
import yorkie from 'yorkie-js-sdk';

async function main() {
  const client = new yorkie.Client('${process.env.NEXT_PUBLIC_API_ADDR}', {
    apiKey: 'MY_API_KEY',
    // set the client's name and color to presence.
    presence: {
      name: getRandomName(),
      color: getRandomColor(),
    },
  });
  await client.activate();

  const doc = new yorkie.Document('example-profile');
  await client.attach(doc);

  client.subscribe((event) => {
    if (event.type === 'peers-changed') {
      // get presence of all clients connected to the Document. 
      // {<clientID>: {name: string, color: string}}
      const peers = event.value[doc.getKey()];
      
      // show peer list
      updatePeerList(peers);
    }
  });
}
main();
`;

const CURSOR_JS = ` 
import yorkie from 'yorkie-js-sdk';

async function main() {
  const client = new yorkie.Client('${process.env.NEXT_PUBLIC_API_ADDR}', {
    apiKey: 'MY_API_KEY',
  });
  await client.activate();

  const doc = new yorkie.Document('my-first-document');
  await client.attach(doc);

  client.subscribe((event) => {
    if (event.type === 'peers-changed') {
      // get presence of all clients connected to the Document. 
      // {<clientID>: {cursor: {x: number, y: number}}}
      const peers = event.value[doc.getKey()];
      
      // show peer cursors
      updatePeerCursors(peers);
    }
  });

  document.body.addEventListener('mousemove', (e) => {
    // set the cursor position to presence.
    // Presence will be shared with other clients.
    client.updatePresence('cursor', {
      x: e.clientX,
      y: e.clientY,
    })
  });
}
main();
`;

const SELECTION_JS = ` 
// js
`;

const EDITING_JS = ` 
// js
`;

const EDITING_ANDROID = ` 
// android
`;

const EDITING_IOS = ` 
// ios
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
