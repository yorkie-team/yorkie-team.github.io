const COMMON_CODE = `
// You can use a key-value pair to share data with peers.
// The key is a string, and the value should be serializable - objects, arrays, and primitives.
doc.update((root) => {
  root.num = 1;           // {"num":1}
  root.obj = {'str':'a'}; // {"num":1,"obj":{"str":"a"}}
  root.arr = ['1', '2'];  // {"num":1,"obj":{"str":"a"},"arr":[1,2]}
});
`;

const TEXT_CODE = ` 
// Text provides supports for collaborative plain text editing.
// It also has selection information for sharing the cursor position.
doc.update((root) => {
  root.text = new yorkie.Text();  // {"text":""}
  root.text.edit(0, 0, 'hello');  // {"text":"hello"}
  root.text.edit(0, 1, 'H');      // {"text":"Hello"}
  root.text.select(0, 1);         // {"text":"^H^ello"}
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
  root.counter = new yorkie.Counter(1);  // {"counter":1}
  root.counter.increase(2);              // {"counter":3}
  root.counter.increase(3.5);            // {"counter":6.5}
  root.counter.increase(-3.5);           // {"counter":3}
});
`;

export const DOCUMENT_CODE = {
  common: COMMON_CODE,
  text: TEXT_CODE,
  richText: RICHTEXT_CODE,
  counter: COUNTER_CODE,
};
