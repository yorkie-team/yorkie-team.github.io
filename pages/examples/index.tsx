import { Button, Icon, Layout, Popover } from '@/components';
import { ExampleThumbnailImage } from '@/components/exampleView';
import ExampleBannerSVG from '@/public/assets/images/banner/img_example_banner.svg';
import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CATEGORIES = {
  ALL: 'all',
  PRESENCE: 'presence',
  EDITOR: 'text-editor',
  CANVAS_TOOL: 'canvas-tool',
  PRODUCTIVITY: 'productivity',
  REACT: 'react-provider',
} as const;
export const CATEGORY_CONFIG = [
  { id: CATEGORIES.ALL, label: 'All examples', icon: 'diamond' },
  { id: CATEGORIES.PRESENCE, label: 'Presence', icon: 'messageSmile' },
  { id: CATEGORIES.EDITOR, label: 'Text Editor', icon: 'textInput' },
  { id: CATEGORIES.CANVAS_TOOL, label: 'Canvas Tool', icon: 'transform' },
  { id: CATEGORIES.PRODUCTIVITY, label: 'Productivity', icon: 'checkCircle' },
  { id: CATEGORIES.REACT, label: 'React Provider', icon: 'reactLogo' },
] as const;
type CategoryType = (typeof CATEGORIES)[keyof typeof CATEGORIES];
type Example = {
  id: string;
  title: string;
  desc: string;
  thumbnail: string;
  category: CategoryType[];
};
const EXAMPLES: Example[] = [
  {
    id: 'profile-stack',
    title: 'Profile Stack',
    desc: 'Profile stack shows the list of users currently accessing the Document.',
    thumbnail: 'profile-stack.jpg',
    category: [CATEGORIES.PRESENCE],
  },
  {
    id: 'simultaneous-cursors',
    title: 'Simultaneous Cursors',
    desc: 'This demo shows the real-time collaborative version of simple drawing, cursor animation with Yorkie and React.',
    thumbnail: 'simultaneous-cursors.png',
    category: [CATEGORIES.PRESENCE, CATEGORIES.REACT],
  },
  {
    id: 'kanban',
    title: 'Kanban Board',
    desc: 'Kanban Board is a tool for managing tasks and workflow. It is a visual way to manage tasks and workflow.',
    thumbnail: 'vuejs-kanban.jpg',
    category: [CATEGORIES.PRODUCTIVITY],
  },
  {
    id: 'todomvc',
    title: 'TodoMVC',
    desc: 'This is an example of real-time collaborative TodoMVC using Yorkie React.',
    thumbnail: 'react-todomvc.jpg',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.REACT],
  },
  {
    id: 'todolist',
    title: 'Todo List',
    desc: 'This is an example of real-time collaborative todo list using Yorkie React.',
    thumbnail: 'nextjs-todolist.jpg',
    category: [CATEGORIES.PRODUCTIVITY, CATEGORIES.REACT],
  },
  {
    id: 'react-flow',
    title: 'React Flow',
    desc: 'This is an example of real-time collaborative React Flow using Yorkie React.',
    thumbnail: 'react-flow.png',
    category: [CATEGORIES.CANVAS_TOOL, CATEGORIES.REACT],
  },
  {
    id: 'codemirror',
    title: 'CodeMirror',
    desc: 'This is a real-time collaborative version of the CodeMirror editor. It uses the Text, a custom CRDT type from Yorkie.',
    thumbnail: 'vanilla-codemirror6.jpg',
    category: [CATEGORIES.EDITOR],
  },
  {
    id: 'tldraw',
    title: 'tldraw',
    desc: 'This is a real-time collaboration example of the tldraw whiteboard editor with Yorkie.',
    thumbnail: 'react-tldraw.jpg',
    category: [CATEGORIES.CANVAS_TOOL],
  },
  {
    id: 'quill',
    title: 'Quill',
    desc: 'This demo shows the real-time collaborative version of the Quill editor with Yorkie and Vite.',
    thumbnail: 'vanilla-quill.png',
    category: [CATEGORIES.EDITOR],
  },
  {
    id: 'calendar',
    title: 'Calendar',
    desc: 'This demo shows the real-time collaborative version of the Calendar with Yorkie and Next.js.',
    thumbnail: 'nextjs-scheduler.png',
    category: [CATEGORIES.PRODUCTIVITY],
  },
];

const Examples: NextPage = () => {
  const [mobileFilterOpened, setMobileFilterOpened] = useState(false);
  const router = useRouter();
  const currentCategory = (router.query.category as CategoryType) || CATEGORIES.ALL;

  const filteredExamples =
    currentCategory === CATEGORIES.ALL
      ? EXAMPLES
      : EXAMPLES.filter((example) => example.category.includes(currentCategory));

  const handleCategoryChange = (category: string) => {
    router.push(
      {
        pathname: '/examples',
        query: { category },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <Layout className="examples_page">
      <Head>
        <title>Examples · Yorkie</title>
      </Head>
      <div className="top_banner">
        <div className="top_banner_inner">
          <div className="title_group">
            <h2 className="title">
              Explore examples <br /> built by Yorkie
            </h2>
            <p className="desc">
              Explore our examples and see how Yorkie can help you bring your products to the next level of
              collaboration.
            </p>
            <Button.Box>
              <Button
                as="a"
                href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
                className="orange_0 btn_start"
                icon={<Icon type="star" />}
              >
                Start for free
              </Button>
            </Button.Box>
          </div>
          <div className="img_box">
            <ExampleBannerSVG />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content_inner">
          <nav className="navigator">
            <ul className="navigator_list">
              {CATEGORY_CONFIG.map(({ id, label, icon }) => (
                <li key={id} className="navigator_group">
                  <a
                    className={`navigator_item add_icon ${id === currentCategory ? 'is_active' : ''}`}
                    onClick={() => handleCategoryChange(id)}
                  >
                    <Icon type={icon} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="filter">
            <Popover opened={mobileFilterOpened} onChange={setMobileFilterOpened}>
              <ul className="filter_list">
                <li className="filter_item">
                  <Popover.Target>
                    <button type="button" className="btn btn_small filter_desc">
                      <span className="filter_title">Examples:</span>
                      <span className="text">{CATEGORY_CONFIG.find((c) => c.id === currentCategory)?.label}</span>
                      <Icon type="arrow" className="icon_arrow" />
                    </button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <div className="dropdown">
                      <ul className="dropdown_list">
                        {CATEGORY_CONFIG.map(({ id, label }) => (
                          <li key={id} className="dropdown_item">
                            <a
                              className="dropdown_menu"
                              onClick={() => {
                                handleCategoryChange(id);
                                setMobileFilterOpened(false);
                              }}
                            >
                              <span className={`icon orange_0 ${id === currentCategory ? 'with-check' : ''}`}>
                                {id === currentCategory && <Icon type="check" />}
                              </span>
                              <span className="dropdown_text">{label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Popover.Dropdown>
                </li>
              </ul>
            </Popover>
          </div>
          <ul className="grid_list">
            {filteredExamples.map(({ id, title, desc, thumbnail }) => (
              <li key={id} className="grid_item">
                <Link href={`/examples/${id}`} className="grid_card">
                  <div className="grid_thumbnail">
                    <ExampleThumbnailImage fileName={thumbnail} alt={id} />
                  </div>
                  <div className="grid_card_info">
                    <strong className="title">{title}</strong>
                    <p className="desc">{desc}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Examples;
