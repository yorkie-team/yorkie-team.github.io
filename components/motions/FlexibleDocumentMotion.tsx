import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import classNames from 'classnames';

export type FlexibleDocumentMotionType = 'common' | 'text' | 'counter';

type PeerId = 'alice' | 'york' | 'tim';

// Peer hues shared by every illustration on /products: Alice blue, York purple, Tim red.
const PEERS: Record<PeerId, { name: string; hue: 'blue' | 'purple' | 'red' }> = {
  alice: { name: 'Alice', hue: 'blue' },
  york: { name: 'York', hue: 'purple' },
  tim: { name: 'Tim', hue: 'red' },
};

type Tok = {
  text: string;
  kind: 'key' | 'str' | 'num' | 'punc' | 'caret';
  // 'flash' briefly highlights a change; 'select' is a persistent selection.
  mark?: 'flash' | 'select';
  peer?: PeerId;
};

type Entry = {
  id: string;
  key: string;
  value: Array<Tok>;
  // Highlight the key too (the key was just added).
  isNew?: boolean;
  // Peer whose cursor tag sits at the end of the row.
  tag?: PeerId;
  // Counter increment shown next to the value.
  delta?: { text: string; peer: PeerId };
};

type Frame = {
  // Index of the `doc.update` line being applied; -1 before the first line.
  step: number;
  peer: PeerId | null;
  code: string;
  entries: Array<Entry>;
  hold: number;
};

const IDLE_CODE = 'doc.update((root) => { ... })';

const str = (text: string, mark?: Tok['mark'], peer?: PeerId): Tok => ({ text, kind: 'str', mark, peer });
const num = (text: string, mark?: Tok['mark'], peer?: PeerId): Tok => ({ text, kind: 'num', mark, peer });
const punc = (text: string, mark?: Tok['mark'], peer?: PeerId): Tok => ({ text, kind: 'punc', mark, peer });
const caret = (peer: PeerId): Tok => ({ text: '', kind: 'caret', peer });
const flashAll = (toks: Array<Tok>, peer: PeerId): Array<Tok> =>
  toks.map((t) => (t.kind === 'caret' ? t : { ...t, mark: 'flash', peer }));

const idle = (hold = 1400): Frame => ({ step: -1, peer: null, code: IDLE_CODE, entries: [], hold });

// Mirrors COMMON_CODE in codes/document.js.
const numValue = (): Array<Tok> => [num('1')];
const objValue = (): Array<Tok> => [punc('{ '), { text: '"str"', kind: 'key' }, punc(': '), str('"a"'), punc(' }')];
const arrValue = (): Array<Tok> => [punc('['), str('"1"'), punc(', '), str('"2"'), punc(']')];

const COMMON_FRAMES: Array<Frame> = [
  idle(),
  {
    step: 0,
    peer: 'alice',
    code: 'root.num = 1',
    entries: [{ id: 'num', key: 'num', value: flashAll(numValue(), 'alice'), isNew: true, tag: 'alice' }],
    hold: 2000,
  },
  {
    step: 1,
    peer: 'york',
    code: "root.obj = {'str':'a'}",
    entries: [
      { id: 'num', key: 'num', value: numValue() },
      { id: 'obj', key: 'obj', value: flashAll(objValue(), 'york'), isNew: true, tag: 'york' },
    ],
    hold: 2000,
  },
  {
    step: 2,
    peer: 'tim',
    code: "root.arr = ['1', '2']",
    entries: [
      { id: 'num', key: 'num', value: numValue() },
      { id: 'obj', key: 'obj', value: objValue() },
      { id: 'arr', key: 'arr', value: flashAll(arrValue(), 'tim'), isNew: true, tag: 'tim' },
    ],
    hold: 3200,
  },
];

// Mirrors TEXT_CODE: Alice creates the Text and types 'hello', then York replaces 'h' with 'H'.
const TYPED = 'hello';
const TEXT_FRAMES: Array<Frame> = [
  idle(),
  {
    step: 0,
    peer: 'alice',
    code: 'root.text = new yorkie.Text()',
    entries: [
      {
        id: 'text',
        key: 'text',
        value: [str('"', 'flash', 'alice'), caret('alice'), str('"', 'flash', 'alice')],
        isNew: true,
        tag: 'alice',
      },
    ],
    hold: 1600,
  },
  ...Array.from(TYPED).map((_, i): Frame => ({
    step: 1,
    peer: 'alice',
    code: "root.text.edit(0, 0, 'hello')",
    entries: [
      {
        id: 'text',
        key: 'text',
        value: [str('"'), str(TYPED.slice(0, i + 1), 'flash', 'alice'), caret('alice'), str('"')],
        tag: 'alice',
      },
    ],
    hold: i === TYPED.length - 1 ? 1600 : 160,
  })),
  {
    step: 2,
    peer: 'york',
    code: "root.text.edit(0, 1, 'H')",
    entries: [
      {
        id: 'text',
        key: 'text',
        value: [str('"'), str('h', 'select', 'york'), caret('york'), str('ello'), caret('alice'), str('"')],
        tag: 'york',
      },
    ],
    hold: 900,
  },
  {
    step: 3,
    peer: 'york',
    code: "root.text.edit(0, 1, 'H')",
    entries: [
      {
        id: 'text',
        key: 'text',
        value: [str('"'), str('H', 'flash', 'york'), caret('york'), str('ello'), caret('alice'), str('"')],
        tag: 'york',
      },
    ],
    hold: 3200,
  },
];

// Mirrors COUNTER_CODE: 1 -> 3 -> 6 -> 2, each increment from a different peer.
const counterFrame = (step: number, peer: PeerId, code: string, value: string, delta?: string): Frame => ({
  step,
  peer,
  code,
  entries: [
    {
      id: 'cnt',
      key: 'cnt',
      value: [num(value, 'flash', peer)],
      isNew: step === 0,
      tag: peer,
      delta: delta ? { text: delta, peer } : undefined,
    },
  ],
  hold: step === 3 ? 3200 : 1900,
});

const COUNTER_FRAMES: Array<Frame> = [
  idle(),
  counterFrame(0, 'alice', 'root.cnt = new yorkie.Counter(1)', '1'),
  counterFrame(1, 'york', 'root.cnt.increase(2)', '3', '+2'),
  counterFrame(2, 'tim', 'root.cnt.increase(3)', '6', '+3'),
  counterFrame(3, 'alice', 'root.cnt.increase(-4)', '2', '-4'),
];

const FRAMES: Record<FlexibleDocumentMotionType, Array<Frame>> = {
  common: COMMON_FRAMES,
  text: TEXT_FRAMES,
  counter: COUNTER_FRAMES,
};

const TYPE_PEERS: Record<FlexibleDocumentMotionType, Array<PeerId>> = {
  common: ['alice', 'york', 'tim'],
  text: ['alice', 'york'],
  counter: ['alice', 'york', 'tim'],
};

const LABELS: Record<FlexibleDocumentMotionType, string> = {
  common:
    'A shared Yorkie Document shown as JSON. Alice sets "num" to 1, York adds "obj" with "str": "a", and Tim adds "arr" with ["1", "2"].',
  text: 'A shared Yorkie Document shown as JSON. Alice creates "text" and types "hello", then York replaces "h" with "H", giving "Hello".',
  counter:
    'A shared Yorkie Document shown as JSON. Alice creates the counter "cnt" at 1, York increases it by 2, Tim by 3, and Alice by -4, ending at 2.',
};

const CursorTag = ({ peer }: { peer: PeerId }) => (
  <span className={classNames('illust_document__tag', `is_${PEERS[peer].hue}`)}>
    <svg className="illust_document__arrow" width="12" height="15" viewBox="0 0 12 15" aria-hidden="true">
      <path d="M1.5 1.5L10.5 7.2L6.4 8.2L4.4 13Z" />
    </svg>
    <span className="illust_document__tag_name">{PEERS[peer].name}</span>
  </span>
);

const Token = ({ tok }: { tok: Tok }) => {
  if (tok.kind === 'caret') {
    return <span className={classNames('illust_document__caret', `is_${PEERS[tok.peer!].hue}`)} />;
  }
  return <span className={`illust_document__${tok.kind}`}>{tok.text}</span>;
};

// Renders tokens, wrapping each run of marked tokens from the same peer in one highlight.
const Tokens = ({ toks, stepKey, plain }: { toks: Array<Tok>; stepKey: string; plain?: boolean }) => {
  const groups: Array<{ mark?: Tok['mark']; peer?: PeerId; toks: Array<Tok> }> = [];
  toks.forEach((tok) => {
    const mark = plain || tok.kind === 'caret' ? undefined : tok.mark;
    const last = groups[groups.length - 1];
    if (last && last.mark === mark && (!mark || last.peer === tok.peer)) {
      last.toks.push(tok);
    } else {
      groups.push({ mark, peer: mark ? tok.peer : undefined, toks: [tok] });
    }
  });
  return (
    <>
      {groups.map((group, i) => {
        const children = group.toks.map((tok, j) => <Token key={j} tok={tok} />);
        if (!group.mark) return <span key={i}>{children}</span>;
        return (
          <span
            key={group.mark === 'flash' ? `${stepKey}-${i}` : i}
            className={classNames('illust_document__mark', `is_${group.mark}`, `is_${PEERS[group.peer!].hue}`)}
          >
            {children}
          </span>
        );
      })}
    </>
  );
};

export const FlexibleDocumentMotion = ({ type }: { type: FlexibleDocumentMotionType }) => {
  const frames = FRAMES[type];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();
  // `null` renders the final state: used for SSR and reduced motion.
  const [index, setIndex] = useState<number | null>(null);

  // Restart the sequence whenever the active code tab changes.
  useEffect(() => {
    setIndex(shouldReduceMotion ? null : 0);
  }, [type, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || !isInView || index === null) return;
    const timer = window.setTimeout(() => {
      setIndex((i) => ((i ?? 0) + 1) % frames.length);
    }, frames[index]?.hold ?? 1000);
    return () => window.clearTimeout(timer);
  }, [index, isInView, shouldReduceMotion, frames]);

  const frame = frames[index ?? frames.length - 1] ?? frames[frames.length - 1];
  const stepKey = `${type}-${frame.step}`;

  return (
    <div ref={ref} className="illust_document" role="img" aria-label={LABELS[type]}>
      <div className="illust_document__header" aria-hidden="true">
        <span className="illust_document__title">Document</span>
        <span className="illust_document__peers">
          {TYPE_PEERS[type].map((peer) => (
            <span
              key={peer}
              className={classNames('illust_document__avatar', `is_${PEERS[peer].hue}`, {
                is_active: frame.peer === peer,
              })}
            >
              {PEERS[peer].name[0]}
            </span>
          ))}
        </span>
      </div>
      <div
        className="illust_document__body"
        aria-hidden="true"
        // Vertically centers the final state; rows then grow downward from a fixed top.
        style={{ '--rows': frames[frames.length - 1].entries.length + 2 } as CSSProperties}
      >
        <div className="illust_document__row">
          <span className="illust_document__punc">{'{'}</span>
        </div>
        {frame.entries.map((entry, i) => (
          <div key={entry.id} className="illust_document__row is_entry">
            <span className="illust_document__punc">{'  '}</span>
            {entry.isNew && entry.tag ? (
              <span
                key={stepKey}
                className={classNames('illust_document__mark', 'is_flash', `is_${PEERS[entry.tag].hue}`)}
              >
                <span className="illust_document__key">&quot;{entry.key}&quot;</span>
                <span className="illust_document__punc">: </span>
                <Tokens toks={entry.value} stepKey={stepKey} plain />
              </span>
            ) : (
              <>
                <span className="illust_document__key">&quot;{entry.key}&quot;</span>
                <span className="illust_document__punc">: </span>
                <Tokens toks={entry.value} stepKey={stepKey} />
              </>
            )}
            {i < frame.entries.length - 1 && <span className="illust_document__punc">,</span>}
            {entry.delta && (
              <span key={stepKey} className={classNames('illust_document__delta', `is_${PEERS[entry.delta.peer].hue}`)}>
                {entry.delta.text}
              </span>
            )}
            {entry.tag && <CursorTag key={`${stepKey}-tag`} peer={entry.tag} />}
          </div>
        ))}
        <div className="illust_document__row">
          <span className="illust_document__punc">{'}'}</span>
        </div>
      </div>
      <div className="illust_document__footer" aria-hidden="true">
        <span key={stepKey} className={classNames('illust_document__op', { is_idle: !frame.peer })}>
          {frame.peer && <span className={classNames('illust_document__op_dot', `is_${PEERS[frame.peer].hue}`)} />}
          <code className="illust_document__op_code">{frame.code}</code>
        </span>
      </div>
    </div>
  );
};
