import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';

export type PresenceMotionType = 'update' | 'watch';

type Peer = 'Alice' | 'York' | 'Alto' | 'Tim';
type Point = { x: number; y: number };

// Peer hues shared by every illustration on /products: Alice blue, York purple, Alto green, Tim red.
const HUE: Record<Peer, string> = { Alice: 'blue', York: 'purple', Alto: 'green', Tim: 'red' };
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * `useTick` advances a counter on a timer while `running` is true. The counter
 * only grows, so callers derive the loop step with `tick % length` and can use
 * it as a stable key for things that should replay.
 */
function useTick(durations: readonly number[], running: boolean) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!running) return undefined;
    const id = window.setTimeout(() => setTick((t) => t + 1), durations[tick % durations.length]);
    return () => window.clearTimeout(id);
  }, [durations, running, tick]);
  return tick;
}

/** Hydration-safe reduced-motion flag: always false on the first render. */
function useReduce() {
  const prefers = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(!!prefers), [prefers]);
  return reduce;
}

/** An authored arrow pointer, tip at (0, 0). */
const Cursor = ({ peer }: { peer: Peer }) => (
  <path
    d="M0 0 L0 15.5 L4.2 11.7 L7 17.6 L9.7 16.4 L7 10.6 L12.4 10.4 Z"
    fill={`var(--${HUE[peer]}-0)`}
    stroke="var(--gray-000)"
    strokeWidth="1"
    strokeLinejoin="round"
  />
);

/** Name tag that remote peers see next to a cursor. */
const NameTag = ({ peer }: { peer: Peer }) => {
  const width = peer.length * 7 + 14;
  return (
    <g transform="translate(11 12)">
      <rect
        width={width}
        height="18"
        rx="4"
        fill={`var(--${HUE[peer]}-alpha-light)`}
        stroke={`var(--${HUE[peer]}-0)`}
      />
      <text className="illust_presence_tag" x={width / 2} y="13" textAnchor="middle">
        {peer}
      </text>
    </g>
  );
};

const Header = ({ api, note }: { api: string; note: string }) => (
  <g>
    <text className="illust_presence_mono" x="12" y="21">
      {api}
    </text>
    <text className="illust_presence_note" x="324" y="21" textAnchor="end">
      {note}
    </text>
    <line x1="0" y1="32.5" x2="336" y2="32.5" stroke="var(--gray-400)" />
  </g>
);

/* ---------------------------------------------------------------------------
 * Update: Alice moves her cursor, `presence.set()` updates her presence object,
 * and York sees her cursor follow a moment later.
 * ------------------------------------------------------------------------- */

// Cursor positions in Alice's presence. The first one matches the code sample.
const UPDATE_PATH: Point[] = [
  { x: 10, y: 20 },
  { x: 62, y: 8 },
  { x: 84, y: 38 },
  { x: 46, y: 48 },
  { x: 20, y: 36 },
];
const UPDATE_DURATIONS = UPDATE_PATH.map(() => 1400);
// Origin of the cursor area inside each pane.
const PANE_ORIGIN = { x: 8, y: 30 };

const Pane = ({ x, label, peer }: { x: number; label: string; peer: Peer }) => (
  <g transform={`translate(${x} 44)`}>
    <rect x="0.5" y="0.5" width="145" height="107" rx="6" fill="var(--gray-50)" stroke="var(--gray-300)" />
    <circle cx="14" cy="15" r="4" fill={`var(--${HUE[peer]}-0)`} />
    <text className="illust_presence_label" x="24" y="19">
      {label}
    </text>
    <line x1="1" y1="26.5" x2="145" y2="26.5" stroke="var(--gray-300)" />
  </g>
);

const UpdateScene = ({ running, reduce }: { running: boolean; reduce: boolean }) => {
  const tick = useTick(UPDATE_DURATIONS, running && !reduce);
  const step = reduce ? 2 : tick % UPDATE_PATH.length;
  const pos = UPDATE_PATH[step];
  const move = reduce ? { duration: 0 } : { duration: 0.7, ease: EASE };
  const remote = reduce ? { duration: 0 } : { duration: 0.7, ease: EASE, delay: 0.35 };

  return (
    <>
      <Header api="presence.set()" note="synced to peers" />
      <Pane x={12} label="Alice (you)" peer="Alice" />
      <Pane x={178} label="York's screen" peer="York" />
      {/* Sync arrow between the two screens; it lights up on every update. */}
      <path
        key={`sync-${tick}`}
        className={reduce ? undefined : 'illust_presence_sync'}
        d="M162 98 H174 M170 94 L174 98 L170 102"
        fill="none"
        stroke="var(--gray-500)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.g
        initial={false}
        animate={{ x: 12 + PANE_ORIGIN.x + pos.x, y: 44 + PANE_ORIGIN.y + pos.y }}
        transition={move}
      >
        <Cursor peer="Alice" />
      </motion.g>
      <motion.g
        initial={false}
        animate={{ x: 178 + PANE_ORIGIN.x + pos.x, y: 44 + PANE_ORIGIN.y + pos.y }}
        transition={remote}
      >
        <Cursor peer="Alice" />
        <NameTag peer="Alice" />
      </motion.g>

      {/* Alice's presence object, updated by presence.set(). */}
      <rect x="12.5" y="164.5" width="311" height="103" rx="6" fill="var(--gray-100)" stroke="var(--gray-300)" />
      <g className="illust_presence_mono">
        <text x="24" y="188">
          {'{'}
          <tspan className="illust_presence_comment" dx="8">
            {'// my presence'}
          </tspan>
        </text>
        <text x="40" y="210">
          <tspan className="illust_presence_key">name</tspan>:{' '}
          <tspan className="illust_presence_str">{"'Alice'"}</tspan>,
        </text>
        <text x="40" y="232">
          <tspan className="illust_presence_key">cursor</tspan>
          {': { '}
          <tspan className="illust_presence_key">x</tspan>
          {': '}
          <tspan key={`x-${tick}`} className={reduce ? undefined : 'illust_presence_tick'}>
            {pos.x}
          </tspan>
          {', '}
          <tspan className="illust_presence_key">y</tspan>
          {': '}
          <tspan key={`y-${tick}`} className={reduce ? undefined : 'illust_presence_tick'}>
            {pos.y}
          </tspan>
          {' }'}
        </text>
        <text x="24" y="254">
          {'}'}
        </text>
      </g>
    </>
  );
};

/* ---------------------------------------------------------------------------
 * Watch: Alice receives presence events from the other peers and renders
 * their cursors. Joining and leaving arrive as `watched` / `unwatched`.
 * ------------------------------------------------------------------------- */

type WatchEvent = { type: 'presence-changed' | 'watched' | 'unwatched'; peer: Peer; to?: Point };

const OTHERS: Peer[] = ['York', 'Alto', 'Tim'];
const WATCH_START: Partial<Record<Peer, Point>> = { York: { x: 36, y: 14 }, Alto: { x: 176, y: 40 } };
// One loop: the state after the last event equals WATCH_START.
const WATCH_EVENTS: WatchEvent[] = [
  { type: 'presence-changed', peer: 'York', to: { x: 96, y: 30 } },
  { type: 'presence-changed', peer: 'Alto', to: { x: 170, y: 6 } },
  { type: 'watched', peer: 'Tim', to: { x: 20, y: 40 } },
  { type: 'presence-changed', peer: 'Tim', to: { x: 30, y: 4 } },
  { type: 'presence-changed', peer: 'York', to: { x: 116, y: 4 } },
  { type: 'presence-changed', peer: 'Alto', to: { x: 176, y: 40 } },
  { type: 'unwatched', peer: 'Tim' },
  { type: 'presence-changed', peer: 'York', to: { x: 36, y: 14 } },
];
const WATCH_DURATIONS = WATCH_EVENTS.map(() => 1300);
// Online peers and their cursors after each event index.
const WATCH_STATES = WATCH_EVENTS.reduce<Array<Partial<Record<Peer, Point>>>>((acc, event, i) => {
  const next = { ...(i === 0 ? WATCH_START : acc[i - 1]) };
  if (event.type === 'unwatched') delete next[event.peer];
  else next[event.peer] = event.to;
  acc.push(next);
  return acc;
}, []);
const CANVAS = { x: 12, y: 74, w: 312, h: 90 };
const ROW_GAP = 22;

const WatchScene = ({ running, reduce }: { running: boolean; reduce: boolean }) => {
  const ticked = useTick(WATCH_DURATIONS, running && !reduce);
  const tick = reduce ? 3 : ticked;
  const state = WATCH_STATES[tick % WATCH_EVENTS.length];
  const online = OTHERS.filter((p) => state[p]);
  const rows = [0, 1, 2, 3].map((i) => tick - i).filter((k) => k >= 0);
  const move = reduce ? { duration: 0 } : { duration: 0.8, ease: EASE };
  const fade = reduce ? { duration: 0 } : { duration: 0.4, ease: EASE };

  return (
    <>
      <Header api="doc.subscribe('presence')" note="Alice's view" />
      <text className="illust_presence_note" x="12" y="58">
        Online
      </text>
      {OTHERS.map((peer, i) => (
        <motion.g
          key={peer}
          initial={false}
          animate={{ opacity: state[peer] ? 1 : 0, y: state[peer] ? 0 : 4 }}
          transition={fade}
        >
          <rect
            x={60.5 + i * 64}
            y="42.5"
            width="58"
            height="23"
            rx="11.5"
            fill={`var(--${HUE[peer]}-alpha-0)`}
            stroke={`var(--${HUE[peer]}-0)`}
          />
          <text className="illust_presence_label" x={89.5 + i * 64} y="58" textAnchor="middle">
            {peer}
          </text>
        </motion.g>
      ))}

      <rect
        x={CANVAS.x + 0.5}
        y={CANVAS.y + 0.5}
        width={CANVAS.w - 1}
        height={CANVAS.h - 1}
        rx="6"
        fill="var(--gray-50)"
        stroke="var(--gray-300)"
      />
      <AnimatePresence initial={false}>
        {online.map((peer) => {
          const p = state[peer] as Point;
          return (
            <motion.g
              key={peer}
              initial={{ opacity: 0, x: CANVAS.x + 8 + p.x, y: CANVAS.y + 8 + p.y }}
              animate={{ opacity: 1, x: CANVAS.x + 8 + p.x, y: CANVAS.y + 8 + p.y }}
              exit={{ opacity: 0 }}
              transition={move}
            >
              <Cursor peer={peer} />
              <NameTag peer={peer} />
            </motion.g>
          );
        })}
      </AnimatePresence>

      {/* Event stream, newest on top. */}
      <line x1="12" y1="176.5" x2="324" y2="176.5" stroke="var(--gray-300)" />
      <AnimatePresence initial={false}>
        {rows.map((k, i) => {
          const event = WATCH_EVENTS[k % WATCH_EVENTS.length];
          return (
            <motion.g
              key={k}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: i * ROW_GAP }}
              exit={{ opacity: 0 }}
              transition={fade}
            >
              {/* The newest event is briefly highlighted as it arrives. */}
              {!reduce && <rect className="illust_presence_arrive" x="6" y="181" width="324" height="21" rx="4" />}
              <text className="illust_presence_mono" x="12" y="196">
                {event.type}
              </text>
              <circle cx="146" cy="191.5" r="4" fill={`var(--${HUE[event.peer]}-0)`} />
              <text className="illust_presence_label" x="155" y="196">
                {event.peer}
              </text>
              <text className="illust_presence_mono illust_presence_value" x="196" y="196">
                {event.type === 'presence-changed' && event.to
                  ? `x: ${event.to.x}, y: ${event.to.y}`
                  : event.type === 'watched'
                    ? 'joined'
                    : 'left'}
              </text>
            </motion.g>
          );
        })}
      </AnimatePresence>
    </>
  );
};

const LABELS: Record<PresenceMotionType, string> = {
  update:
    "Alice moves her cursor; presence.set() updates her presence object { name: 'Alice', cursor: { x, y } } and York sees her cursor follow on his screen.",
  watch:
    "Alice's view: the online peers York, Alto and Tim, their cursors, and a stream of presence events (presence-changed, watched, unwatched) as they move, join and leave.",
};

export const PresenceMotion = ({ type }: { type: PresenceMotionType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReduce();

  return (
    <div ref={ref} className="illust_presence" role="img" aria-label={LABELS[type]}>
      <svg viewBox="0 0 336 280" aria-hidden="true">
        {type === 'update' ? (
          <UpdateScene key="update" running={inView} reduce={reduce} />
        ) : (
          <WatchScene key="watch" running={inView} reduce={reduce} />
        )}
      </svg>
    </div>
  );
};
