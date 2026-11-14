import type { ReactNode } from 'react';
import classNames from 'classnames';
import LogoSVG from '@/public/assets/icons/logo_no_text.svg';

// A coded miniature of the Dashboard's document detail screen
// (`/projects/:projectName/documents/:documentKey`), shown in a desktop browser and on a phone.
// Labels, tabs and the root/presence toggle mirror the real Dashboard; the data is sample data.

// Icon paths copied from the Dashboard's own icon set (dashboard/src/assets/icons).
const ICON_PATHS = {
  search:
    'M7.3335 2.66659C4.75617 2.66659 2.66683 4.75592 2.66683 7.33325C2.66683 9.91058 4.75617 11.9999 7.3335 11.9999C8.59079 11.9999 9.73196 11.5027 10.5711 10.6942C10.5886 10.6714 10.6079 10.6494 10.6288 10.6285C10.6497 10.6076 10.6716 10.5884 10.6944 10.5708C11.5029 9.73172 12.0002 8.59055 12.0002 7.33325C12.0002 4.75592 9.91083 2.66659 7.3335 2.66659ZM12.0214 11.0784C12.8425 10.0519 13.3335 8.74993 13.3335 7.33325C13.3335 4.01954 10.6472 1.33325 7.3335 1.33325C4.01979 1.33325 1.3335 4.01954 1.3335 7.33325C1.3335 10.647 4.01979 13.3333 7.3335 13.3333C8.75017 13.3333 10.0522 12.8423 11.0786 12.0212L13.5288 14.4713C13.7891 14.7317 14.2112 14.7317 14.4716 14.4713C14.7319 14.211 14.7319 13.7889 14.4716 13.5285L12.0214 11.0784Z',
  back: 'M12.7071 4.29289C13.0976 4.68342 13.0976 5.31658 12.7071 5.70711L7.41421 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H7.41421L12.7071 18.2929C13.0976 18.6834 13.0976 19.3166 12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289Z',
  branch:
    'M2.00001 1.33325C2.3682 1.33325 2.66668 1.63173 2.66668 1.99992V4.66659L9.41736 4.66659C9.71338 3.51643 10.7574 2.66659 12 2.66659C13.4728 2.66659 14.6667 3.86049 14.6667 5.33325C14.6667 6.80601 13.4728 7.99992 12 7.99992C10.7575 7.99992 9.71338 7.15007 9.41736 5.99992L2.66668 5.99992V8.79992C2.66668 9.37097 2.6672 9.75917 2.69171 10.0592C2.71559 10.3515 2.75888 10.501 2.812 10.6052C2.93983 10.8561 3.14381 11.0601 3.39469 11.1879C3.49896 11.2411 3.64843 11.2843 3.9407 11.3082C4.24076 11.3327 4.62896 11.3333 5.20001 11.3333H9.41736C9.71338 10.1831 10.7575 9.33325 12 9.33325C13.4728 9.33325 14.6667 10.5272 14.6667 11.9999C14.6667 13.4727 13.4728 14.6666 12 14.6666C10.7575 14.6666 9.71338 13.8167 9.41736 12.6666H5.17246C4.63582 12.6666 4.19292 12.6666 3.83213 12.6371C3.4574 12.6065 3.11293 12.5408 2.78937 12.3759C2.2876 12.1203 1.87966 11.7123 1.62399 11.2106C1.45913 10.887 1.39342 10.5425 1.36281 10.1678C1.33333 9.80701 1.33334 9.3641 1.33334 8.82745L1.33334 1.99992C1.33334 1.63173 1.63182 1.33325 2.00001 1.33325ZM12 3.99992C11.2636 3.99992 10.6667 4.59687 10.6667 5.33325C10.6667 6.06963 11.2636 6.66659 12 6.66659C12.7364 6.66659 13.3333 6.06963 13.3333 5.33325C13.3333 4.59687 12.7364 3.99992 12 3.99992ZM12 10.6666C11.2636 10.6666 10.6667 11.2635 10.6667 11.9999C10.6667 12.7363 11.2636 13.3333 12 13.3333C12.7364 13.3333 13.3333 12.7363 13.3333 11.9999C13.3333 11.2635 12.7364 10.6666 12 10.6666Z',
  // addMember is drawn on a 48px grid in the Dashboard; scaled to 16px by its viewBox below.
  member:
    'M20.0002 8C16.1342 8 13.0002 11.134 13.0002 15C13.0002 18.866 16.1342 22 20.0002 22C23.8662 22 27.0002 18.866 27.0002 15C27.0002 11.134 23.8662 8 20.0002 8ZM9.00017 15C9.00017 8.92487 13.925 4 20.0002 4C26.0753 4 31.0002 8.92487 31.0002 15C31.0002 21.0751 26.0753 26 20.0002 26C13.925 26 9.00017 21.0751 9.00017 15ZM38.0002 28C39.1047 28 40.0002 28.8954 40.0002 30V34H44.0002C45.1047 34 46.0002 34.8954 46.0002 36C46.0002 37.1046 45.1047 38 44.0002 38H40.0002V42C40.0002 43.1046 39.1047 44 38.0002 44C36.8956 44 36.0002 43.1046 36.0002 42V38H32.0002C30.8956 38 30.0002 37.1046 30.0002 36C30.0002 34.8954 30.8956 34 32.0002 34H36.0002V30C36.0002 28.8954 36.8956 28 38.0002 28ZM14.6527 28.9999C14.7668 29 14.8826 29 15.0002 29H24.0002C25.1047 29 26.0002 29.8954 26.0002 31C26.0002 32.1046 25.1047 33 24.0002 33H15.0002C12.0635 33 11.0386 33.0217 10.2585 33.2584C8.34085 33.8401 6.84023 35.3407 6.25853 37.2583C6.02187 38.0384 6.00017 39.0634 6.00017 42C6.00017 43.1046 5.10474 44 4.00017 44C2.8956 44 2.00017 43.1046 2.00017 42C2.00017 41.8825 2.00012 41.7667 2.00008 41.6525C1.99917 39.198 1.99855 37.522 2.43077 36.0971C3.40027 32.9011 5.9013 30.4001 9.09731 29.4306C10.5221 28.9984 12.1982 28.999 14.6527 28.9999Z',
  play: 'M3.87935 1H8.12065C8.52313 1 8.85532 1 9.12591 1.0221C9.40696 1.04506 9.66531 1.09434 9.90798 1.21799C10.2843 1.40973 10.5903 1.7157 10.782 2.09202C10.9057 2.33469 10.9549 2.59304 10.9779 2.87409C11 3.14468 11 3.47686 11 3.87934V8.12066C11 8.52314 11 8.85532 10.9779 9.12591C10.9549 9.40696 10.9057 9.66531 10.782 9.90798C10.5903 10.2843 10.2843 10.5903 9.90798 10.782C9.66531 10.9057 9.40696 10.9549 9.12591 10.9779C8.85532 11 8.52314 11 8.12066 11H3.87934C3.47686 11 3.14468 11 2.87409 10.9779C2.59304 10.9549 2.33469 10.9057 2.09202 10.782C1.7157 10.5903 1.40973 10.2843 1.21799 9.90798C1.09434 9.66531 1.04506 9.40696 1.0221 9.12591C1 8.85531 1 8.52313 1 8.12065V3.87935C1 3.47687 1 3.14468 1.0221 2.87409C1.04506 2.59304 1.09434 2.33469 1.21799 2.09202C1.40973 1.7157 1.7157 1.40973 2.09202 1.21799C2.33469 1.09434 2.59304 1.04506 2.87409 1.0221C3.14468 1 3.47687 1 3.87935 1ZM2.95552 2.01878C2.73631 2.03669 2.62421 2.06915 2.54601 2.10899C2.35785 2.20487 2.20487 2.35785 2.10899 2.54601C2.06915 2.62421 2.03669 2.73631 2.01878 2.95552C2.00039 3.18056 2 3.47171 2 3.9V8.1C2 8.52829 2.00039 8.81944 2.01878 9.04448C2.03669 9.26369 2.06915 9.37579 2.10899 9.45399C2.20487 9.64215 2.35785 9.79513 2.54601 9.89101C2.62421 9.93085 2.73631 9.96331 2.95552 9.98122C3.18056 9.99961 3.47171 10 3.9 10H8.1C8.52829 10 8.81944 9.99961 9.04448 9.98122C9.26369 9.96331 9.37579 9.93085 9.45399 9.89101C9.64215 9.79513 9.79513 9.64215 9.89101 9.45399C9.93085 9.37579 9.96331 9.26369 9.98122 9.04448C9.99961 8.81944 10 8.52829 10 8.1V3.9C10 3.47171 9.99961 3.18056 9.98122 2.95552C9.96331 2.73631 9.93085 2.62421 9.89101 2.54601C9.79513 2.35785 9.64215 2.20487 9.45399 2.10899C9.37579 2.06915 9.26369 2.03669 9.04448 2.01878C8.81944 2.00039 8.52829 2 8.1 2H3.9C3.47171 2 3.18056 2.00039 2.95552 2.01878ZM5.62255 3.71652L7.99698 5.24294C8.08552 5.29982 8.16806 5.35285 8.23381 5.40413C8.30355 5.45852 8.41363 5.55446 8.47854 5.70809C8.5574 5.89471 8.5574 6.10529 8.47854 6.29191C8.41363 6.44554 8.30355 6.54148 8.23381 6.59587C8.16805 6.64715 8.08551 6.70018 7.99698 6.75706L5.62255 8.28348C5.53469 8.34 5.4423 8.39941 5.36094 8.44176C5.27909 8.48436 5.13056 8.55332 4.94657 8.54018C4.72957 8.52468 4.52999 8.41572 4.39961 8.24157C4.28907 8.09391 4.26675 7.93167 4.25832 7.83979C4.24995 7.74844 4.25 7.6386 4.25 7.53413V4.46586C4.25 4.3614 4.24995 4.25156 4.25832 4.16021C4.26675 4.06833 4.28907 3.90609 4.39961 3.75843C4.52999 3.58428 4.72957 3.47532 4.94657 3.45982C5.13056 3.44668 5.27909 3.51564 5.36094 3.55824C5.4423 3.60059 5.53469 3.66 5.62255 3.71652ZM5.25 4.66583V7.33417L7.32537 6L5.25 4.66583Z',
};

const ICON_VIEWBOX: Record<keyof typeof ICON_PATHS, string> = {
  search: '0 0 16 16',
  back: '0 0 24 24',
  branch: '0 0 16 16',
  member: '0 0 48 48',
  play: '0 0 12 12',
};

const DashIcon = ({ type }: { type: keyof typeof ICON_PATHS }) => (
  <svg className="dash_icon" viewBox={ICON_VIEWBOX[type]} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d={ICON_PATHS[type]} fill="currentColor" />
  </svg>
);

const TABS = ['Overview', 'Quick Start', 'Documents', 'Schemas', 'Channels', 'API Keys', 'Settings'];
const DOCUMENT_KEYS = ['todo-1', 'meeting-notes', 'todo-2', 'whiteboard'];

type Line = { id: string; indent: number; content: ReactNode };

const k = (key: string) => <span className="tk_key">&quot;{key}&quot;</span>;
const s = (value: string) => <span className="tk_str">&quot;{value}&quot;</span>;
const b = (value: boolean) => <span className="tk_bool">{String(value)}</span>;
const p = (mark: string) => <span className="tk_punc">{mark}</span>;

const todoLine = (text: string, done: boolean, last: boolean) => (
  <>
    {p('{ ')}
    {k('text')}
    {p(': ')}
    {s(text)}
    {p(', ')}
    {k('done')}
    {p(': ')}
    {b(done)}
    {p(last ? ' }' : ' },')}
  </>
);

// Sample document `todo-1` after Alice and York have both edited it.
const ROOT_LINES: Line[] = [
  { id: 'open', indent: 0, content: p('{') },
  {
    id: 'todos',
    indent: 1,
    content: (
      <>
        {k('todos')}
        {p(': [')}
      </>
    ),
  },
  { id: 'milk', indent: 2, content: todoLine('Buy milk', true, false) },
  { id: 'tim', indent: 2, content: todoLine('Call Tim', true, false) },
  { id: 'bug', indent: 2, content: todoLine('Fix bug', false, true) },
  { id: 'close_todos', indent: 1, content: p(']') },
  { id: 'close', indent: 0, content: p('}') },
];

// Presences are keyed by client ID; the IDs are shortened sample values.
const presence = (id: string, name: string, last: boolean): Line[] => [
  {
    id: `${id}_open`,
    indent: 1,
    content: (
      <>
        {k(id)}
        {p(': {')}
      </>
    ),
  },
  {
    id: `${id}_name`,
    indent: 2,
    content: (
      <>
        {k('name')}
        {p(': ')}
        {s(name)}
      </>
    ),
  },
  { id: `${id}_close`, indent: 1, content: p(last ? '}' : '},') },
];

const PRESENCE_LINES: Line[] = [
  { id: 'open', indent: 0, content: p('{') },
  ...presence('6f2a01', 'Alice', false),
  ...presence('6f2a07', 'York', true),
  { id: 'close', indent: 0, content: p('}') },
];

const CodeLines = ({ lines }: { lines: Line[] }) => (
  <pre className="language-json dash_code">
    {lines.map((line, i) => (
      <span key={line.id} className="code_line">
        <span className="line_num">{i + 1}</span>
        <code className={`indent_${line.indent}`}>{line.content}</code>
      </span>
    ))}
  </pre>
);

const DetailHeader = ({ compact }: { compact?: boolean }) => (
  <div className="dash_doc_header">
    <div className="dash_title_box">
      <span className="dash_back">
        <DashIcon type="back" />
      </span>
      <div className="dash_title_inner">
        <span className="dash_doc_title">todo-1</span>
        <span className="dash_date">Nov 14, 10:43 AM</span>
      </div>
    </div>
    <dl className="dash_info_list">
      <div className="dash_info_item">
        <dt>Clients</dt>
        <dd>2</dd>
      </div>
      {!compact && (
        <div className="dash_info_item">
          <dt>Size</dt>
          <dd>live: 248 B, gc: 16 B</dd>
        </div>
      )}
    </dl>
  </div>
);

const CodeToolbar = ({ view, compact }: { view: 'root' | 'presence'; compact?: boolean }) => (
  <div className="dash_code_toolbar">
    <span className="dash_badge">
      <DashIcon type="play" />
      History
    </span>
    <span className="dash_toggles">
      <span className={classNames('dash_toggle', { is_active: view === 'root' })}>
        <DashIcon type="branch" />
        {!compact && 'Root'}
      </span>
      <span className={classNames('dash_toggle', { is_active: view === 'presence' })}>
        <DashIcon type="member" />
        {!compact && 'Presences'}
      </span>
    </span>
  </div>
);

export const DashboardShowcase = () => {
  // Static on purpose: the Dashboard loads a document when it is opened and does not
  // stream edits, so the showcase does not animate changes arriving.
  return (
    <div
      className="illust_dashboard"
      role="img"
      aria-label="Dashboard in a desktop browser and on a phone. The project my-todo-app lists its documents; the selected document todo-1 shows its JSON root, a todo list with three items and two connected clients, and the phone shows the document's presences, Alice and York."
    >
      <div className="dash_window" aria-hidden="true">
        <div className="dash_browser_bar">
          <span className="dash_dots">
            <i />
            <i />
            <i />
          </span>
          <span className="dash_url">yorkie.dev/dashboard/projects/my-todo-app/documents/todo-1</span>
        </div>
        <div className="dash_app_header">
          <span className="dash_logo">
            <LogoSVG />
          </span>
          <span className="dash_crumb">Dashboard</span>
          <span className="dash_crumb_sep">/</span>
          <span className="dash_crumb is_current">my-todo-app</span>
          <span className="dash_util">
            <span>Docs</span>
            <span>Community</span>
            <span className="dash_avatar" />
          </span>
        </div>
        <div className="dash_project">
          <span className="dash_project_title">my-todo-app</span>
          <div className="dash_tabs">
            {TABS.map((tab) => (
              <span key={tab} className={classNames('dash_tab', { is_active: tab === 'Documents' })}>
                {tab}
              </span>
            ))}
          </div>
        </div>
        <div className="dash_body">
          <div className="dash_sidebar">
            <div className="dash_search">
              <DashIcon type="search" />
              Search Documents
            </div>
            <ul className="dash_doc_list">
              {DOCUMENT_KEYS.map((key) => (
                <li key={key} className={classNames('dash_doc_item', { is_active: key === 'todo-1' })}>
                  {key}
                </li>
              ))}
            </ul>
          </div>
          <div className="dash_detail">
            <DetailHeader />
            <CodeToolbar view="root" />
            <div className="dash_codeblock lines_7">
              <CodeLines lines={ROOT_LINES} />
            </div>
          </div>
        </div>
      </div>
      <div className="dash_phone" aria-hidden="true">
        <div className="dash_phone_screen">
          <div className="dash_app_header">
            <span className="dash_logo">
              <LogoSVG />
            </span>
            <span className="dash_menu">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="dash_project">
            <span className="dash_project_title">my-todo-app</span>
            <div className="dash_tabs">
              {TABS.slice(1, 4).map((tab) => (
                <span key={tab} className={classNames('dash_tab', { is_active: tab === 'Documents' })}>
                  {tab}
                </span>
              ))}
            </div>
          </div>
          <div className="dash_detail">
            <DetailHeader compact />
            <CodeToolbar view="presence" compact />
            <div className="dash_codeblock lines_8">
              <CodeLines lines={PRESENCE_LINES} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
