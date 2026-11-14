import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';

export type ChannelMotionType = 'presence' | 'broadcast';

type Peer = 'Alice' | 'York' | 'Alto' | 'Tim';

const PEERS: Peer[] = ['Alice', 'York', 'Alto', 'Tim'];
// Peer hues shared by every illustration on /products: Alice blue, York purple, Alto green, Tim red.
const HUE: Record<Peer, string> = { Alice: 'blue', York: 'purple', Alto: 'green', Tim: 'red' };
const EASE = [0.22, 1, 0.36, 1] as const;

// Layout (viewBox 336x280): clients in rows on the left, the channel on the right.
const ROW_Y = [60, 106, 152, 198];
const ROOM = { x: 236, y: 78, w: 88, h: 122 };
const LINE_START = 206;
const portY = (i: number) => ROOM.y + 26 + i * 23;
// Curved link from a client row to its port on the channel box.
const linkPath = (i: number) => {
  const mid = (LINE_START + ROOM.x) / 2;
  return `M${LINE_START} ${ROW_Y[i]} C${mid} ${ROW_Y[i]} ${mid} ${portY(i)} ${ROOM.x} ${portY(i)}`;
};
// The same link drawn from the channel back to the client.
const linkPathReverse = (i: number) => {
  const mid = (LINE_START + ROOM.x) / 2;
  return `M${ROOM.x} ${portY(i)} C${mid} ${portY(i)} ${mid} ${ROW_Y[i]} ${LINE_START} ${ROW_Y[i]}`;
};

/**
 * `useTick` advances a counter on a timer while `running` is true. The counter
 * only grows, so callers derive the loop step with `tick % length` and can use
 * it as a key for things that should replay.
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

const Header = ({ api, note }: { api: string; note: string }) => (
  <g>
    <text className="illust_channel_mono" x="12" y="21">
      {api}
    </text>
    <text className="illust_channel_note" x="324" y="21" textAnchor="end">
      {note}
    </text>
    <line x1="0" y1="32.5" x2="336" y2="32.5" stroke="var(--gray-400)" />
  </g>
);

const Client = ({ peer, i, dim, reduce }: { peer: Peer; i: number; dim?: boolean; reduce: boolean }) => (
  <motion.g initial={false} animate={{ opacity: dim ? 0.45 : 1 }} transition={{ duration: reduce ? 0 : 0.5 }}>
    <circle cx="28" cy={ROW_Y[i]} r="12" fill={`var(--${HUE[peer]}-alpha-light)`} stroke={`var(--${HUE[peer]}-0)`} />
    <text className="illust_channel_initial" x="28" y={ROW_Y[i] + 4} textAnchor="middle">
      {peer[0]}
    </text>
    <text className="illust_channel_label" x="48" y={ROW_Y[i] + 4}>
      {peer}
    </text>
  </motion.g>
);

const RoomBox = ({ flash }: { flash?: string }) => (
  <g>
    <rect
      x={ROOM.x + 0.5}
      y={ROOM.y + 0.5}
      width={ROOM.w - 1}
      height={ROOM.h - 1}
      rx="8"
      fill="var(--gray-50)"
      stroke="var(--gray-400)"
    />
    {flash && (
      <rect
        key={flash}
        className="illust_channel_flash"
        x={ROOM.x + 0.5}
        y={ROOM.y + 0.5}
        width={ROOM.w - 1}
        height={ROOM.h - 1}
        rx="8"
        fill="none"
        stroke="var(--orange-0)"
        strokeWidth="2"
      />
    )}
    <text className="illust_channel_mono" x={ROOM.x + ROOM.w / 2} y={ROOM.y + 22} textAnchor="middle">
      room-123
    </text>
    <line x1={ROOM.x + 10} y1={ROOM.y + 32.5} x2={ROOM.x + ROOM.w - 10} y2={ROOM.y + 32.5} stroke="var(--gray-300)" />
  </g>
);

/* ---------------------------------------------------------------------------
 * Presence: clients attach to and detach from `room-123`; the server keeps a
 * session count in memory and pushes it to every attached client.
 * ------------------------------------------------------------------------- */

// Each step changes exactly one attachment, and the last step leads back to the first.
const PRESENCE_STATES: Peer[][] = [
  ['Alice', 'York'],
  ['Alice', 'York', 'Alto'],
  ['Alice', 'York', 'Alto', 'Tim'],
  ['Alice', 'Alto', 'Tim'],
  ['Alice', 'Alto'],
  ['Alice', 'York', 'Alto'],
];
const PRESENCE_DURATIONS = PRESENCE_STATES.map(() => 1800);

const PresenceScene = ({ running, reduce }: { running: boolean; reduce: boolean }) => {
  const tick = useTick(PRESENCE_DURATIONS, running && !reduce);
  const step = reduce ? 1 : tick % PRESENCE_STATES.length;
  const attached = PRESENCE_STATES[step];
  const count = attached.length;
  const draw = reduce ? { duration: 0 } : { duration: 0.7, ease: EASE };

  return (
    <>
      <Header api="channel.subscribe('presence')" note="memory only" />
      {PEERS.map((peer, i) => {
        const on = attached.includes(peer);
        return (
          <g key={peer}>
            <Client peer={peer} i={i} dim={!on} reduce={reduce} />
            <rect
              x="88.5"
              y={ROW_Y[i] - 11.5}
              width="110"
              height="23"
              rx="11.5"
              fill={on ? 'var(--gray-000)' : 'none'}
              stroke={on ? 'var(--gray-400)' : 'var(--gray-300)'}
              strokeDasharray={on ? undefined : '3 3'}
            />
            <text className="illust_channel_mono illust_channel_state" x="143.5" y={ROW_Y[i] + 4} textAnchor="middle">
              {on ? 'attached' : 'detached'}
            </text>
            <path d={linkPath(i)} fill="none" stroke="var(--gray-300)" strokeDasharray="3 3" />
            <motion.path
              d={linkPath(i)}
              fill="none"
              stroke={`var(--${HUE[peer]}-0)`}
              strokeWidth="1.5"
              initial={false}
              animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
              transition={draw}
            />
          </g>
        );
      })}
      <RoomBox flash={reduce ? undefined : `count-${tick}`} />
      <text
        key={`count-${tick}`}
        className={reduce ? 'illust_channel_count' : 'illust_channel_count illust_channel_tick'}
        x={ROOM.x + ROOM.w / 2}
        y={ROOM.y + 76}
        textAnchor="middle"
      >
        {count}
      </text>
      <text className="illust_channel_note" x={ROOM.x + ROOM.w / 2} y={ROOM.y + 98} textAnchor="middle">
        online
      </text>

      {/* What the subscriber logs on every count change. */}
      <rect x="12.5" y="226.5" width="311" height="41" rx="6" fill="var(--gray-100)" stroke="var(--gray-300)" />
      <text className="illust_channel_note" x="24" y="251">
        console
      </text>
      <text key={`log-${tick}`} className="illust_channel_mono illust_channel_log" x="84" y="251">
        {`${count} users online`}
      </text>
    </>
  );
};

/* ---------------------------------------------------------------------------
 * Broadcast: Alice broadcasts on topic `chat`; the server fans the message out
 * to every other attached client at once and keeps nothing.
 * ------------------------------------------------------------------------- */

// idle, send, fan out, received, fade
const BROADCAST_DURATIONS = [900, 900, 900, 2000, 1000];
const RECEIVED = 3;
const MESSAGE = 'Hello everyone!';

const Bubble = ({ i, outgoing }: { i: number; outgoing?: boolean }) => (
  <g>
    <rect
      x="88.5"
      y={ROW_Y[i] - 11.5}
      width="110"
      height="23"
      rx="11.5"
      fill={outgoing ? 'var(--blue-alpha-light)' : 'var(--gray-000)'}
      stroke={outgoing ? 'var(--blue-0)' : 'var(--gray-400)'}
    />
    <text className="illust_channel_label" x="143.5" y={ROW_Y[i] + 4} textAnchor="middle">
      {MESSAGE}
    </text>
  </g>
);

const BroadcastScene = ({ running, reduce }: { running: boolean; reduce: boolean }) => {
  const tick = useTick(BROADCAST_DURATIONS, running && !reduce);
  const phase = reduce ? RECEIVED : tick % BROADCAST_DURATIONS.length;
  const sending = phase >= 1 && phase <= RECEIVED;
  const fanned = phase >= 2 && phase <= RECEIVED;
  const received = phase === RECEIVED;
  const t = (target: number, duration: number, delay = 0) =>
    reduce || target === 0 ? { duration: reduce ? 0 : 0.5 } : { duration, delay, ease: EASE };

  return (
    <>
      <Header api="channel.broadcast('chat', …)" note="not stored" />
      {PEERS.map((peer, i) => {
        const lit = i === 0 ? sending : fanned;
        return (
          <g key={peer}>
            <Client peer={peer} i={i} reduce={reduce} />
            <path d={linkPath(i)} fill="none" stroke="var(--gray-400)" />
            <motion.path
              d={i === 0 ? linkPath(i) : linkPathReverse(i)}
              fill="none"
              stroke="var(--blue-0)"
              strokeWidth="2"
              initial={false}
              animate={{ pathLength: lit ? 1 : 0, opacity: lit ? 1 : 0 }}
              transition={{ pathLength: t(lit ? 1 : 0, 0.6), opacity: t(lit ? 1 : 0, 0.2) }}
            />
          </g>
        );
      })}

      <AnimatePresence initial={false}>
        {sending && (
          <motion.g
            key="out"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
          >
            <Bubble i={0} outgoing />
          </motion.g>
        )}
        {received &&
          [1, 2, 3].map((i) => (
            <motion.g
              key={`in-${i}`}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.8 } }}
              transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
            >
              <Bubble i={i} />
            </motion.g>
          ))}
      </AnimatePresence>

      <RoomBox flash={!reduce && phase === 2 ? `fan-${tick}` : undefined} />
      <text className="illust_channel_note" x={ROOM.x + ROOM.w / 2} y={ROOM.y + 58} textAnchor="middle">
        topic
      </text>
      <text
        className="illust_channel_mono illust_channel_topic"
        x={ROOM.x + ROOM.w / 2}
        y={ROOM.y + 78}
        textAnchor="middle"
      >
        chat
      </text>

      {/* The payload Alice sends; receivers log payload.message. */}
      <rect x="12.5" y="222.5" width="311" height="45" rx="6" fill="var(--gray-100)" stroke="var(--gray-300)" />
      <text className="illust_channel_note" x="24" y="241">
        payload
      </text>
      <text className="illust_channel_mono" x="84" y="241">
        {"{ user: 'Alice',"}
      </text>
      <text className="illust_channel_mono" x="98" y="259">
        {"message: 'Hello everyone!' }"}
      </text>
    </>
  );
};

const LABELS: Record<ChannelMotionType, string> = {
  presence:
    'Clients Alice, York, Alto and Tim attach to and detach from the channel room-123, and the online count it reports goes up and down. The count lives in server memory and is not stored.',
  broadcast:
    "Alice broadcasts { user: 'Alice', message: 'Hello everyone!' } on topic chat in room-123, and it reaches York, Alto and Tim at once, then disappears. Nothing is stored.",
};

export const ChannelMotion = ({ type }: { type: ChannelMotionType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReduce();

  return (
    <div ref={ref} className="illust_channel" role="img" aria-label={LABELS[type]}>
      <svg viewBox="0 0 336 280" aria-hidden="true">
        {type === 'presence' ? (
          <PresenceScene key="presence" running={inView} reduce={reduce} />
        ) : (
          <BroadcastScene key="broadcast" running={inView} reduce={reduce} />
        )}
      </svg>
    </div>
  );
};
