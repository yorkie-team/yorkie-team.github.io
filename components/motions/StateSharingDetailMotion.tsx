import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Sequence steps:
// 0 base: both clients hold the same two-item list
// 1 edit: Alice adds an item while York checks another one, concurrently
// 2 send: each client pushes its change to the Yorkie Server
// 3 relay: the server delivers each change to the other client
// 4 synced: both replicas show the same merged list (held, then loops)
const STEP_DURATIONS = [900, 2400, 1500, 1400, 4800];
const FINAL_STEP = 4;

type PeerId = 'alice' | 'york';

const PEERS: Record<PeerId, { name: string; code: string }> = {
  alice: { name: 'Alice', code: "root.todos.push({ text: 'Ship v1' })" },
  york: { name: 'York', code: 'root.todos[0].done = true' },
};

function CheckIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 6.25 4.9 8.5 9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Author({ peer }: { peer: PeerId }) {
  return (
    <span className={`iss_author iss_author--${peer}`}>
      <span className="iss_author_dot" />
      {PEERS[peer].name}
    </span>
  );
}

function ClientWindow({ peer }: { peer: PeerId }) {
  return (
    <div className={`iss_window iss_window--${peer}`}>
      <div className="iss_titlebar">
        <span className="iss_avatar">{PEERS[peer].name[0]}</span>
        <span className="iss_name">{PEERS[peer].name}</span>
        <span className="iss_status">
          <span className="iss_status_item iss_status--local">1 local change</span>
          <span className="iss_status_item iss_status--syncing">Syncing</span>
          <span className="iss_status_item iss_status--synced">
            <CheckIcon className="iss_icon" />
            Synced
          </span>
        </span>
      </div>
      <ul className="iss_list">
        <li className="iss_row iss_row--spec">
          <span className="iss_box">
            <CheckIcon className="iss_icon" />
          </span>
          <span className="iss_text">Write spec</span>
          <Author peer="york" />
        </li>
        <li className="iss_row">
          <span className="iss_box" />
          <span className="iss_text">Review PR</span>
        </li>
        <li className="iss_row iss_row--ship">
          <span className="iss_box" />
          <span className="iss_text">Ship v1</span>
          <Author peer="alice" />
        </li>
      </ul>
      <code className="iss_code">{PEERS[peer].code}</code>
    </div>
  );
}

function Track({ side }: { side: 'left' | 'right' }) {
  // Left track: Alice's change goes out (step 2), York's change comes back (step 3).
  // Right track: York's change goes out (step 2), Alice's change comes back (step 3).
  const out: PeerId = side === 'left' ? 'alice' : 'york';
  const back: PeerId = side === 'left' ? 'york' : 'alice';
  return (
    <div className={`iss_track iss_track--${side}`}>
      <span className="iss_line" />
      <span className={`iss_runner iss_runner--out iss_runner--${out}`}>
        <span className="iss_packet" />
      </span>
      <span className={`iss_runner iss_runner--back iss_runner--${back}`}>
        <span className="iss_packet" />
      </span>
    </div>
  );
}

const STEPS = ['Alice and York edit at the same time', 'Changes sync through the server', 'Both reach the same state'];

export const StateSharingDetailMotion = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStep(FINAL_STEP);
      return;
    }
    if (!inView) return;

    let current = 0;
    let timer: ReturnType<typeof setTimeout>;
    setStep(0);
    const advance = () => {
      timer = setTimeout(() => {
        current = (current + 1) % STEP_DURATIONS.length;
        setStep(current);
        advance();
      }, STEP_DURATIONS[current]);
    };
    advance();
    return () => clearTimeout(timer);
  }, [inView, reduceMotion]);

  const classes = ['illust_state_sharing', `is-step${step}`];
  for (let i = 1; i <= step; i++) classes.push(`is-from${i}`);
  if (reduceMotion) classes.push('is-static');
  const activeCaption = step === 0 ? -1 : step === FINAL_STEP ? 2 : step === 1 ? 0 : 1;

  return (
    <div
      ref={ref}
      className={classes.join(' ')}
      role="img"
      aria-label="Alice adds a todo item while York checks off another item at the same time. Both changes travel through the Yorkie Server to the other client, and the two lists converge to the same state with both edits kept."
    >
      <div className="iss_stage" aria-hidden="true">
        <ClientWindow peer="alice" />
        <Track side="left" />
        <div className="iss_server">
          <span className="iss_server_title">Yorkie Server</span>
          <span className="iss_server_doc">
            Document <code>todos</code>
          </span>
          <ul className="iss_log">
            <li className="iss_log_item iss_log_item--alice">
              <Author peer="alice" />
              <span className="iss_log_op">added an item</span>
            </li>
            <li className="iss_log_item iss_log_item--york">
              <Author peer="york" />
              <span className="iss_log_op">checked an item</span>
            </li>
          </ul>
        </div>
        <Track side="right" />
        <ClientWindow peer="york" />
      </div>
      <ol className="iss_steps" aria-hidden="true">
        {STEPS.map((label, i) => (
          <li key={label} className={`iss_step${i === activeCaption ? ' is-active' : ''}`}>
            <span className="iss_step_num">{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
};
