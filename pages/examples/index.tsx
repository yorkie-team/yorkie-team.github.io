import { Button, Icon, Layout, Popover } from '@/components';
import { ExampleThumbnailImage } from '@/components/exampleView';
import ExampleBannerSVG from '@/public/assets/images/banner/img_example_banner.svg';
import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CATEGORIES, EXAMPLES, type CategoryType } from '@/codes/examples';

export const CATEGORY_CONFIG = [
  { id: CATEGORIES.ALL, label: 'All examples', icon: 'diamond' },
  { id: CATEGORIES.PRESENCE, label: 'Presence', icon: 'messageSmile' },
  { id: CATEGORIES.EDITOR, label: 'Text Editor', icon: 'textInput' },
  { id: CATEGORIES.CANVAS_TOOL, label: 'Canvas Tool', icon: 'transform' },
  { id: CATEGORIES.PRODUCTIVITY, label: 'Productivity', icon: 'checkCircle' },
  { id: CATEGORIES.REACT, label: 'React Provider', icon: 'reactLogo' },
  { id: CATEGORIES.ANDROID, label: 'Android', icon: 'androidLogo' },
  {id: CATEGORIES.IOS, label: 'iOS', icon: 'appleLogo'},
] as const;

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
            <h1 className="title">
              Explore examples <br /> built by Yorkie
            </h1>
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
          <nav className="navigator" aria-label="Example categories">
            <ul className="navigator_list">
              {CATEGORY_CONFIG.map(({ id, label, icon }) => (
                <li key={id} className="navigator_group">
                  <button
                    type="button"
                    className={`navigator_item add_icon ${id === currentCategory ? 'is_active' : ''}`}
                    aria-pressed={id === currentCategory}
                    onClick={() => handleCategoryChange(id)}
                  >
                    <Icon type={icon} />
                    {label}
                  </button>
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
                            <button
                              type="button"
                              className="dropdown_menu"
                              aria-pressed={id === currentCategory}
                              onClick={() => {
                                handleCategoryChange(id);
                                setMobileFilterOpened(false);
                              }}
                            >
                              <span className={`icon orange_0 ${id === currentCategory ? 'with-check' : ''}`}>
                                {id === currentCategory && <Icon type="check" />}
                              </span>
                              <span className="dropdown_text">{label}</span>
                            </button>
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
