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
