import { useRef } from 'react';
import { useInView } from 'framer-motion';

// Self-hosted Yorkie architecture: SDK clients in your app exchange Changes with the
// Yorkie Server, which persists Changes and Snapshots to MongoDB (or an in-memory DB),
// is managed through the Admin API by the Dashboard and CLI, and can ask your backend
// to authorize requests through the Auth Webhook.
//
// Two drawings share the same content: a wide one for desktop and a stacked one for
// tablet and mobile, so text never shrinks below a legible size.

type Pt = [number, number];
type Hue = 'blue' | 'purple' | 'green';

const PEERS: Array<{ name: string; sdk: string; hue: Hue }> = [
  { name: 'Alice', sdk: 'JS / React SDK', hue: 'blue' },
  // Same peer hues as the other /products illustrations: Alice blue, York purple, Alto green.
  { name: 'York', sdk: 'iOS SDK', hue: 'purple' },
  { name: 'Alto', sdk: 'Android SDK', hue: 'green' },
];

const ARIA_LABEL =
  'Architecture of a self-hosted Yorkie. In your app, clients built with the JS, iOS and Android SDKs each ' +
  'hold a local replica of a document and exchange Changes with the Yorkie Server. The Server hosts projects ' +
  'with documents, presence and in-memory channels, and stores Changes and Snapshots in MongoDB, or an ' +
  'in-memory database for local development. The Dashboard and CLI manage the Server through the Admin API. ' +
  'Optionally, the Server calls an Auth Webhook on your backend to check each request. In cluster mode, ' +
  'several Server nodes run behind a load balancer that routes by document key.';

// Arrowhead for the axis-aligned segment from -> to, with its tip at `to`.
function head(from: Pt, to: Pt) {
  const dx = Math.sign(to[0] - from[0]);
  const dy = Math.sign(to[1] - from[1]);
  const [x, y] = to;
  const bx = x - dx * 8;
  const by = y - dy * 8;
  return `M${x} ${y}L${bx - dy * 4.5} ${by + dx * 4.5}L${bx + dy * 4.5} ${by - dx * 4.5}Z`;
}

function Arrow({ points, both = false }: { points: Pt[]; both?: boolean }) {
  const n = points.length;
  return (
    <g className="ia_arrow">
      <polyline points={points.map((p) => p.join(',')).join(' ')} />
      <path d={head(points[n - 2], points[n - 1])} />
      {both && <path d={head(points[1], points[0])} />}
    </g>
  );
}

function Label({ x, y, children, anchor = 'middle' }: { x: number; y: number; children: string; anchor?: string }) {
  return (
    <text x={x} y={y} className="ia_label" textAnchor={anchor}>
      {children}
    </text>
  );
}

function Avatars({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {PEERS.map((peer, i) => (
        <circle key={peer.name} cx={x + i * 13} cy={y} r={6} className={`ia_avatar ia_hue_${peer.hue}`} />
      ))}
    </g>
  );
}

// Server card internals shared by both layouts. (x, y) is the server's top-left corner.
function ServerBody({ x, y, w, compact }: { x: number; y: number; w: number; compact: boolean }) {
  const px = x + 16;
  const pw = w - 32;
  const cx = px + 12;
  const cw = pw - 24;
  const docH = compact ? 100 : 120;
  const doc1Y = y + 102;
  const doc2Y = doc1Y + docH + 10;
  const doc2H = compact ? 48 : 60;
  const chY = doc2Y + doc2H + 10;
  const chH = compact ? 70 : 88;
  const projectH = chY + chH + 12 - (y + 60);

  return (
    <g>
      <circle cx={x + 21} cy={y + 23} r={5} className="ia_brand" />
      <text x={x + 34} y={y + 28} className="ia_title">
        Yorkie Server
      </text>
      <text x={x + w - 16} y={y + 28} className="ia_code ia_muted" textAnchor="end">
        :8080
      </text>
      <line x1={x} x2={x + w} y1={y + 44} y2={y + 44} className="ia_rule" />

      <rect x={px} y={y + 60} width={pw} height={projectH} rx={8} className="ia_project" />
      <text x={px + 12} y={y + 82} className="ia_text">
        <tspan className="ia_muted">Project </tspan>
        <tspan className="ia_strong">my-project</tspan>
      </text>

      {/* doc-1: the document every client in this picture has attached */}
      <rect x={cx} y={doc1Y} width={cw} height={docH} rx={8} className="ia_card" />
      <text x={cx + 12} y={doc1Y + 22} className="ia_text">
        <tspan className="ia_muted">Document </tspan>
        <tspan className="ia_strong">doc-1</tspan>
      </text>
      {compact ? (
        <text x={cx + 12} y={doc1Y + 44} className="ia_code">
          {'{ title: "Plan", likes: 2 }'}
        </text>
      ) : (
        <>
          <text x={cx + 12} y={doc1Y + 46} className="ia_code">
            {'{ title: "Plan",'}
          </text>
          <text x={cx + 12} y={doc1Y + 64} className="ia_code">
            {'  likes: 2 }'}
          </text>
        </>
      )}
      <line x1={cx} x2={cx + cw} y1={doc1Y + docH - 40} y2={doc1Y + docH - 40} className="ia_rule" />
      <text x={cx + 12} y={doc1Y + docH - 15} className="ia_text ia_muted">
        Presence
      </text>
      <Avatars x={cx + 76} y={doc1Y + docH - 19} />
      <text x={cx + 116} y={doc1Y + docH - 15} className="ia_text">
        Alice, York, Alto
      </text>

      <rect x={cx} y={doc2Y} width={cw} height={doc2H} rx={8} className="ia_card" />
      <text x={cx + 12} y={doc2Y + (compact ? 29 : 24)} className="ia_text">
        <tspan className="ia_muted">Document </tspan>
        <tspan className="ia_strong">doc-2</tspan>
      </text>
      <text
        x={compact ? cx + cw - 12 : cx + 12}
        y={doc2Y + (compact ? 29 : 46)}
        className="ia_code ia_muted"
        textAnchor={compact ? 'end' : 'start'}
      >
        {compact ? '{ … }' : '{ title: "Notes" }'}
      </text>

      <rect x={cx} y={chY} width={cw} height={chH} rx={8} className="ia_card" />
      <text x={cx + 12} y={chY + 24} className="ia_text">
        <tspan className="ia_muted">Channel </tspan>
        <tspan className="ia_strong">lobby</tspan>
      </text>
      <rect x={cx + cw - 82} y={chY + 10} width={70} height={20} rx={4} className="ia_tag" />
      <text x={cx + cw - 47} y={chY + 24} className="ia_text ia_small" textAnchor="middle">
        in memory
      </text>
      {compact ? (
        <text x={cx + 12} y={chY + 50} className="ia_text">
          Presence count · Broadcast
        </text>
      ) : (
        <>
          <text x={cx + 12} y={chY + 50} className="ia_text">
            Presence count
          </text>
          <text x={cx + 12} y={chY + 72} className="ia_text">
            Broadcast messages
          </text>
        </>
      )}
    </g>
  );
}

// Back cards peeking out below the server, standing for more nodes in cluster mode.
function ServerStack({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x + 16} y={y + 16} width={w - 32} height={h} rx={16} className="ia_node" />
      <rect x={x + 8} y={y + 8} width={w - 16} height={h} rx={16} className="ia_node" />
      <rect x={x} y={y} width={w} height={h} rx={16} className="ia_server" />
    </g>
  );
}

function Database({ cx, top, rx, compact }: { cx: number; top: number; rx: number; compact: boolean }) {
  const ry = compact ? 12 : 14;
  const h = compact ? 118 : 150;
  const chipW = compact ? 96 : 112;
  const chipH = compact ? 24 : 28;
  const titleY = top + (compact ? 40 : 52);
  const chip1 = titleY + (compact ? 12 : 18);
  const chip2 = chip1 + chipH + 8;
  return (
    <g>
      <path d={`M${cx - rx} ${top}V${top + h}A${rx} ${ry} 0 0 0 ${cx + rx} ${top + h}V${top}`} className="ia_db" />
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} className="ia_db" />
      <text x={cx} y={titleY} className="ia_title" textAnchor="middle">
        MongoDB
      </text>
      {['Changes', 'Snapshots'].map((name, i) => (
        <g key={name}>
          <rect x={cx - chipW / 2} y={i ? chip2 : chip1} width={chipW} height={chipH} rx={4} className="ia_card" />
          <text x={cx} y={(i ? chip2 : chip1) + chipH / 2 + 4.5} className="ia_text" textAnchor="middle">
            {name}
          </text>
        </g>
      ))}
      <text x={cx} y={top + h + ry + 26} className="ia_text ia_muted" textAnchor="middle">
        or in-memory DB
      </text>
      <text x={cx} y={top + h + ry + 44} className="ia_text ia_muted" textAnchor="middle">
        for local development
      </text>
    </g>
  );
}

function Backend({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={92} rx={8} className="ia_card" />
      <text x={x + 16} y={y + 26} className="ia_title">
        Your backend
      </text>
      <text x={x + 16} y={y + 50} className="ia_text ia_muted">
        Gets token, document key, verb
      </text>
      <text x={x + 16} y={y + 74} className="ia_code">
        {'→ { "allowed": true }'}
      </text>
    </g>
  );
}

function WideDiagram() {
  const clientX = 24;
  const clientW = 264;
  const serverX = 432;
  const serverW = 280;
  const serverH = 436;
  const rows = [60, 180, 300];

  return (
    <svg className="ia_wide" viewBox="0 0 1040 592" aria-hidden="true" focusable="false">
      <text x={clientX} y={36} className="ia_zone">
        Your app <tspan className="ia_muted">· built with Yorkie SDKs</tspan>
      </text>
      <rect x={328} y={12} width={700} height={568} rx={16} className="ia_boundary" />
      <text x={352} y={40} className="ia_zone">
        Self-hosted Yorkie <tspan className="ia_muted">· open-source package</tspan>
      </text>

      {PEERS.map((peer, i) => {
        const y = rows[i];
        return (
          <g key={peer.name}>
            <rect x={clientX} y={y} width={clientW} height={104} rx={8} className="ia_card" />
            <path
              d={`M${clientX + 8} ${y}H${clientX + clientW - 8}A8 8 0 0 1 ${clientX + clientW} ${y + 8}V${y + 30}H${clientX}V${y + 8}A8 8 0 0 1 ${clientX + 8} ${y}Z`}
              className={`ia_bar ia_hue_${peer.hue}`}
            />
            <circle cx={clientX + 18} cy={y + 15} r={6} className={`ia_avatar ia_hue_${peer.hue}`} />
            <text x={clientX + 32} y={y + 20} className="ia_strong ia_text">
              {peer.name}
            </text>
            <text x={clientX + clientW - 14} y={y + 20} className="ia_text" textAnchor="end">
              {peer.sdk}
            </text>
            <text x={clientX + 16} y={y + 56} className="ia_text">
              <tspan className="ia_muted">Document </tspan>
              <tspan className="ia_strong">doc-1</tspan>
              <tspan className="ia_muted"> · local replica</tspan>
            </text>
            <text x={clientX + 16} y={y + 82} className="ia_code">
              {'{ title: "Plan", likes: 2 }'}
            </text>
            <Arrow
              points={[
                [clientX + clientW, y + 52],
                [serverX, y + 52],
              ]}
              both
            />
            <Label x={380} y={y + 44}>
              Changes
            </Label>
          </g>
        );
      })}

      <Backend x={clientX} y={428} w={clientW} />
      <Arrow
        points={[
          [serverX, 474],
          [clientX + clientW, 474],
        ]}
      />
      <Label x={380} y={466}>
        Auth webhook
      </Label>
      <text x={380} y={492} className="ia_text ia_muted ia_small" textAnchor="middle">
        optional
      </text>

      <ServerStack x={serverX} y={60} w={serverW} h={serverH} />
      <ServerBody x={serverX} y={60} w={serverW} compact={false} />
      <text x={serverX} y={540} className="ia_text ia_muted">
        Cluster mode: more Server nodes behind a
      </text>
      <text x={serverX} y={558} className="ia_text ia_muted">
        load balancer that routes by document key
      </text>

      <Arrow
        points={[
          [serverX + serverW, 186],
          [824, 186],
        ]}
        both
      />
      <Label x={768} y={160}>
        Changes,
      </Label>
      <Label x={768} y={176}>
        Snapshots
      </Label>
      <Database cx={904} top={98} rx={80} compact={false} />

      {[
        { y: 372, title: 'Dashboard', body: 'Projects, documents, keys', code: false },
        { y: 452, title: 'CLI', body: '$ yorkie project ls', code: true },
      ].map((tool) => (
        <g key={tool.title}>
          <rect x={808} y={tool.y} width={196} height={64} rx={8} className="ia_card" />
          <text x={824} y={tool.y + 26} className="ia_title">
            {tool.title}
          </text>
          <text x={824} y={tool.y + 48} className={tool.code ? 'ia_code ia_small' : 'ia_text ia_muted'}>
            {tool.body}
          </text>
        </g>
      ))}
      <g className="ia_arrow">
        <polyline points="808,404 784,404 784,484 808,484" />
      </g>
      <Arrow
        points={[
          [784, 444],
          [serverX + serverW, 444],
        ]}
      />
      <Label x={748} y={436}>
        Admin API
      </Label>

      {/* A change from Alice reaches the Server, then the database and the other replicas. */}
      <circle cx={clientX + clientW} cy={112} r={5} className="ia_dot ia_hue_blue ia_w_up" />
      <circle cx={serverX + serverW} cy={186} r={5} className="ia_dot ia_hue_blue ia_w_db" />
      <circle cx={serverX} cy={232} r={5} className="ia_dot ia_hue_blue ia_w_down" />
      <circle cx={serverX} cy={352} r={5} className="ia_dot ia_hue_blue ia_w_down" />
    </svg>
  );
}

function StackedDiagram() {
  const cols = [16, 128, 240];
  const serverX = 28;
  const serverW = 304;
  const serverY = 176;
  const serverH = 360;

  return (
    <svg className="ia_stack" viewBox="0 0 360 1028" aria-hidden="true" focusable="false">
      <text x={16} y={22} className="ia_zone">
        Your app <tspan className="ia_muted">· Yorkie SDKs</tspan>
      </text>

      {PEERS.map((peer, i) => {
        const x = cols[i];
        return (
          <g key={peer.name}>
            <rect x={x} y={36} width={104} height={76} rx={8} className="ia_card" />
            <path
              d={`M${x + 8} 36H${x + 96}A8 8 0 0 1 ${x + 104} 44V62H${x}V44A8 8 0 0 1 ${x + 8} 36Z`}
              className={`ia_bar ia_hue_${peer.hue}`}
            />
            <circle cx={x + 14} cy={49} r={5} className={`ia_avatar ia_hue_${peer.hue}`} />
            <text x={x + 25} y={53} className="ia_text ia_strong">
              {peer.name}
            </text>
            <text x={x + 10} y={82} className="ia_text ia_strong">
              {peer.sdk.replace(' / React', '')}
            </text>
            <text x={x + 10} y={100} className="ia_text ia_muted">
              doc-1 replica
            </text>
            <Arrow
              points={[
                [x + 52, 112],
                [x + 52, serverY],
              ]}
              both
            />
          </g>
        );
      })}
      <Label x={70} y={148} anchor="start">
        Changes
      </Label>

      <rect x={4} y={128} width={352} height={768} rx={16} className="ia_boundary" />

      <ServerStack x={serverX} y={serverY} w={serverW} h={serverH} />
      <ServerBody x={serverX} y={serverY} w={serverW} compact />

      <Arrow
        points={[
          [100, serverY + serverH + 16],
          [100, 620],
        ]}
        both
      />
      <Label x={108} y={586} anchor="start">
        Changes,
      </Label>
      <Label x={108} y={602} anchor="start">
        Snapshots
      </Label>
      <Database cx={100} top={632} rx={64} compact />

      <rect x={184} y={620} width={160} height={120} rx={8} className="ia_card" />
      <text x={196} y={644} className="ia_title">
        Dashboard
      </text>
      <text x={196} y={664} className="ia_text ia_muted">
        Projects, documents
      </text>
      <line x1={184} x2={344} y1={680} y2={680} className="ia_rule" />
      <text x={196} y={704} className="ia_title">
        CLI
      </text>
      <text x={196} y={724} className="ia_code ia_small">
        $ yorkie project ls
      </text>
      <Arrow
        points={[
          [264, 620],
          [264, serverY + serverH + 16],
        ]}
      />
      <Label x={256} y={594} anchor="end">
        Admin API
      </Label>

      <text x={36} y={840} className="ia_zone">
        Self-hosted Yorkie <tspan className="ia_muted">· open source</tspan>
      </text>
      <text x={36} y={862} className="ia_text ia_muted">
        Cluster mode: more Server nodes behind a
      </text>
      <text x={36} y={880} className="ia_text ia_muted">
        load balancer that routes by document key
      </text>

      <Arrow
        points={[
          [serverX, serverY + serverH - 24],
          [16, serverY + serverH - 24],
          [16, 928],
        ]}
      />
      <Label x={24} y={918} anchor="start">
        Auth webhook (optional)
      </Label>
      <Backend x={4} y={928} w={352} />

      <circle cx={68} cy={112} r={5} className="ia_dot ia_hue_blue ia_s_up" />
      <circle cx={100} cy={serverY + serverH + 16} r={5} className="ia_dot ia_hue_blue ia_s_db" />
      <circle cx={180} cy={serverY} r={5} className="ia_dot ia_hue_blue ia_s_down" />
      <circle cx={292} cy={serverY} r={5} className="ia_dot ia_hue_blue ia_s_down" />
    </svg>
  );
}

export const ArchitectureDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <div ref={ref} className={`illust_architecture${inView ? ' is_playing' : ''}`} role="img" aria-label={ARIA_LABEL}>
      <WideDiagram />
      <StackedDiagram />
    </div>
  );
};
