import { useState, useEffect } from 'react';
import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout, Button, Icon, CodeBlock, CodeBlockHeader, Accordion } from '@/components';
import { ExampleThumbnailImage } from '@/components/exampleView';
import { EXAMPLES, type Example } from '@/codes/examples';
import { ChartMotion, StateSharingMotion, ServerMotion, MainBannerMotion } from '@/components/motions';
import UserGroupSVG from '@/public/assets/icons/icon_service_main_users_group.svg';
import CollaboProfileSVG from '@/public/assets/icons/icon_collaborate_profile.svg';
import CollaboCursorSVG from '@/public/assets/icons/icon_collaborate_cursor.svg';
import CollaboSelectionSVG from '@/public/assets/icons/icon_collaborate_selection.svg';
import CollaboEditingSVG from '@/public/assets/icons/icon_collaborate_editing.svg';
import { FEATURES_CODE } from '@/codes/features';

type FeatureType = keyof typeof FEATURES_CODE;
const FEATURED_EXAMPLE_IDS = ['simultaneous-cursors', 'codemirror'];
const FEATURED_EXAMPLES = FEATURED_EXAMPLE_IDS.map((id) => EXAMPLES.find((example) => example.id === id)).filter(
  (example): example is Example => !!example,
);
const Home: NextPage = () => {
  const [bannerActive, setBannerActive] = useState(false);
  const [activeFeatureCard, setActiveFeatureCard] = useState<FeatureType>('profile');
  const [activeFeatureCode, setActiveFeatureCode] = useState({ type: 'js', info: FEATURES_CODE.profile.js });

  useEffect(() => {
    const handleVisualSize = () => {
      const $visual = document.querySelector('.kv_bg svg') as HTMLElement;
      const $hero = document.querySelector('.key_visual');
      if (!$visual || !$hero) return;

      // The artwork is as tall as the hero; scale it up only when that leaves it narrower than the viewport.
      const SVG_ASPECT_RATIO = 1512 / 868;
      const scale = window.innerWidth / ($hero.clientHeight * SVG_ASPECT_RATIO);
      $visual.style.setProperty('--scale', scale < 1 ? '1' : `${scale}`);
    };
    window.addEventListener('resize', handleVisualSize);
    handleVisualSize();

    // The hero can grow with its content (font swap, short viewports) without a window resize.
    const $hero = document.querySelector('.key_visual');
    const observer = typeof ResizeObserver !== 'undefined' && $hero ? new ResizeObserver(handleVisualSize) : null;
    if (observer && $hero) observer.observe($hero);

    return () => {
      window.removeEventListener('resize', handleVisualSize);
      observer?.disconnect();
    };
  }, []);

  return (
    <Layout className="main_page">
      <Head>
        <title>Yorkie · Open-source document store for real-time collaboration</title>
      </Head>
      <div className="content">
        <section className="key_visual">
          <div className="kv_bg" aria-hidden="true">
            <MainBannerMotion bannerActive />
          </div>
          <div className="inner">
            <h2 className="title">
              <span className="text">Bring</span>{' '}
              <span className={classNames('point', { is_hover: bannerActive })}>
                collaboration
                <span className="bg"></span>
              </span>{' '}
              <span className="text">to your app</span>
            </h2>
            <Button.Box>
              <a
                href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
                className="btn orange_0 btn_start"
                onPointerOver={() => setBannerActive(true)}
                onPointerOut={() => setBannerActive(false)}
                onFocus={() => setBannerActive(true)}
                onBlur={() => setBannerActive(false)}
              >
                <span className="bg"></span>
                <Icon type="star" />
                <span className="text">Start for free</span>
              </a>
              <Button as="link" href="/docs" outline className="btn_docs" icon={<Icon type="book" />}>
                Read the docs
              </Button>
            </Button.Box>
            <p className="desc">
              Open-source SDKs, a server, and a dashboard for building real-time collaborative apps. Use the managed
              cloud service or host it yourself.
            </p>
            <a
              href="https://github.com/yorkie-team/yorkie"
              className="link_github"
              target="_blank"
              rel="noreferrer"
            >
              <Icon type="github" />
              Open source on GitHub
            </a>
          </div>
        </section>
        <section className="section section_app">
          <div className="align_box">
            <div className="app_header">
              <p className="tag_name">Extend Your App with Yorkie</p>
              <span className="icon">
                <UserGroupSVG />
              </span>
            </div>
            <div className="app_body">
              <h2 className="section_title">
                Make your product
                <br />
                <span className="point">collaborative</span> in a flash!
              </h2>
              <p className="section_desc">
                Yorkie handles synchronization, conflict resolution, and persistence, so you can focus on your
                product&apos;s features.
              </p>
              <Button.Box>
                <Button as="link" href="/docs/getting-started" className="orange_0" icon={<Icon type="book" />}>
                  Getting Started
                </Button>
              </Button.Box>
            </div>
          </div>
        </section>
        <section className="section">
          <h2 className="section_title">
            Variety of <br className="br_mo" /> collaboration features <br /> for your app
          </h2>
          <p className="section_desc">
            Start from a working pattern. Each feature below comes with the code that builds it.
          </p>
          <div className="section_content">
            <ul
              className="service_card_list"
              onClick={(e) => {
                const target = (e.target as Element).closest('.service_card_menu');
                if (!target) return;

                const featureType = target.getAttribute('data-item') as FeatureType;
                const codeType = FEATURES_CODE[featureType].tabOrder[0];
                setActiveFeatureCard(featureType);
                setActiveFeatureCode({
                  type: codeType,
                  info: (FEATURES_CODE[featureType] as any)[codeType],
                });

                // Below the desktop breakpoint the code sits under the cards; bring it into view once the card has expanded.
                if (window.innerWidth <= 1023) {
                  const $code = e.currentTarget.parentElement?.querySelector('.codeblock_content');
                  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  window.setTimeout(() => {
                    $code?.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
                  }, 400);
                }
              }}
            >
              <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'profile' })}>
                <button
                  type="button"
                  className="service_card_menu"
                  data-item="profile"
                  aria-pressed={activeFeatureCard === 'profile'}
                >
                  <span className="img_box">
                    <CollaboProfileSVG />
                  </span>
                  <strong className="service_card_title">Profile Stack</strong>
                  <span className="service_card_desc">
                    The Profile Stack feature shows the profile of the current users in real-time to announce that
                    multiple users are connected at the same time.
                  </span>
                </button>
              </li>
              <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'cursor' })}>
                <button
                  type="button"
                  className="service_card_menu"
                  data-item="cursor"
                  aria-pressed={activeFeatureCard === 'cursor'}
                >
                  <span className="img_box">
                    <CollaboCursorSVG />
                  </span>
                  <strong className="service_card_title">Multi-Cursor</strong>
                  <span className="service_card_desc">
                    The Multi-Cursor shows the location of the cursor of the users who accessed the same canvas in
                    real-time. Each cursor shows the user&#39;s nickname and role as needed.
                  </span>
                </button>
              </li>
              <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'selection' })}>
                <button
                  type="button"
                  className="service_card_menu"
                  data-item="selection"
                  aria-pressed={activeFeatureCard === 'selection'}
                >
                  <span className="img_box">
                    <CollaboSelectionSVG />
                  </span>
                  <strong className="service_card_title">Live Selection</strong>
                  <span className="service_card_desc">
                    Live Selection shows what each user has selected, such as a range of text or an object on a
                    canvas, so everyone can see what the others are working on in real time.
                  </span>
                </button>
              </li>
              <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'editing' })}>
                <button
                  type="button"
                  className="service_card_menu"
                  data-item="editing"
                  aria-pressed={activeFeatureCard === 'editing'}
                >
                  <span className="img_box">
                    <CollaboEditingSVG />
                  </span>
                  <strong className="service_card_title">Multiplayer Editing</strong>
                  <span className="service_card_desc">
                    Interact in real-time with the presence of others and edit material together. Any real-time
                    interaction, such as texting, drawing, commenting, or expressing emotion, could be shared with
                    Yorkie.
                  </span>
                </button>
              </li>
            </ul>
            <CodeBlock.Wrapper>
              <CodeBlockHeader>
                <CodeBlockHeader.LeftBox>
                  {FEATURES_CODE[activeFeatureCard].tabOrder.map((codeType) => (
                    <button
                      type="button"
                      key={codeType}
                      className={classNames('btn_item', { is_active: activeFeatureCode.type === codeType })}
                      aria-pressed={activeFeatureCode.type === codeType}
                      onClick={() =>
                        setActiveFeatureCode({
                          type: codeType,
                          info: (FEATURES_CODE[activeFeatureCard] as any)[codeType],
                        })
                      }
                    >
                      {(FEATURES_CODE[activeFeatureCard] as any)[codeType].title}
                    </button>
                  ))}
                </CodeBlockHeader.LeftBox>
                <CodeBlockHeader.RightBox>
                  <CodeBlockHeader.CopyButton value={activeFeatureCode.info.code} />
                </CodeBlockHeader.RightBox>
              </CodeBlockHeader>
              <CodeBlock
                code={activeFeatureCode.info.code}
                language={activeFeatureCode.info.language as any}
                withLineNumbers
              />
            </CodeBlock.Wrapper>
          </div>
        </section>
        <section className="section">
          <h2 className="section_title">
            What experiences <br />
            can you create
            <br className="br_mo_xs" /> with Yorkie?
          </h2>
          <p className="section_desc">
            Open an example in two tabs and watch the changes sync. Each one comes with its source code.
          </p>
          <div className="section_content">
            <ul className="grid_list">
              {FEATURED_EXAMPLES.map(({ id, title, desc, thumbnail }) => (
                <li key={id} className="grid_item">
                  <Link href={`/examples/${id}`} className="grid_card">
                    <div className="grid_thumbnail">
                      <ExampleThumbnailImage fileName={thumbnail} alt="" />
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
          <Button.Box>
            <Button as="link" href="/examples" className="orange_0" icon={<Icon type="bulb" />}>
              View all examples
            </Button>
          </Button.Box>
        </section>
        <section className="section">
          <h2 className="section_title">
            Stable.
            <br />
            Reliable.
            <br />
            Manageable.
          </h2>
          <div className="section_content">
            <ul className="horizon_list">
              <li className="horizon_item">
                <div className="img_box">
                  <StateSharingMotion />
                </div>
                <div className="text_box">
                  <strong className="title">Document and Presence</strong>
                  <p className="desc">
                    Documents are stored as conflict-free replicated data types (CRDTs), so multiple users can edit
                    the same data at the same time without conflicts. Presence shares each user&apos;s state, such as
                    their cursor position and selection, so you can show who is online.
                  </p>
                  <Button
                    as="link"
                    href="/products#document-and-presence"
                    className="gray800"
                    icon={<Icon type="book" />}
                  >
                    Learn more about Document and Presence
                  </Button>
                </div>
              </li>
              <li className="horizon_item">
                <div className="img_box">
                  <ChartMotion />
                </div>
                <div className="text_box">
                  <strong className="title">Document Management with Dashboard</strong>
                  <p className="desc">
                    Dashboard lets project members browse the documents stored in a project and monitor them in real
                    time.
                  </p>
                  <Button as="link" href="/products#dashboard" className="gray800" icon={<Icon type="book" />}>
                    Learn more about Dashboard
                  </Button>
                </div>
              </li>
              <li className="horizon_item">
                <div className="img_box">
                  <ServerMotion />
                </div>
                <div className="text_box">
                  <strong className="title">Cloud or Self-Hosted Server</strong>
                  <p className="desc">
                    Start on the managed cloud service without setting up any infrastructure, or run the open-source
                    server on your own machines when you need control over your data.
                  </p>
                  <Button as="link" href="/products#self-hosted-server" className="gray800" icon={<Icon type="book" />}>
                    Learn more about Self-Hosted Server
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="section section_faq">
          <h2 className="section_title">FAQ</h2>
          <div className="section_content">
            <Accordion defaultValue={[]} multiple>
              <Accordion.Item value="faq1">
                <Accordion.Control>
                  <Icon type="messageSquare" />
                  Can I use Yorkie for free?
                </Accordion.Control>
                <Accordion.Panel>
                  Yes, Yorkie is free to use. <br />
                  <br />
                  You can access it at no cost.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="faq2">
                <Accordion.Control>
                  <Icon type="messageSquare" />
                  Is Yorkie production ready?
                </Accordion.Control>
                <Accordion.Panel>
                  Yes, Yorkie is ready to use in production. <br />
                  <br />
                  Yorkie has achieved production-ready status and is currently operating as a stable and reliable
                  service. Its robustness has been thoroughly validated through extensive testing at NAVER, establishing
                  it as a dependable solution for production environments. If you encounter any problems while using
                  Yorkie, please report them to the Yorkie community so that they can be addressed as quickly as
                  possible.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="faq3">
                <Accordion.Control>
                  <Icon type="messageSquare" />
                  How can I contribute to the Yorkie project?
                </Accordion.Control>
                <Accordion.Panel>
                  Yorkie is an open source project, so there are many ways to contribute to its development. <br />
                  <br />
                  One way to contribute is by reporting any bugs you encounter while using the service. You can also
                  submit pull requests with improvements or new features that you have developed. If you plan to use
                  Yorkie in your company, you can also consider donating to the Yorkie community to support its
                  continued development. You can learn more about how to contribute to the Yorkie project on its website
                  or by visiting our{' '}
                  <u>
                    <a href="https://discord.gg/MVEAwz9sBy">Discord</a>
                  </u>
                  .
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
          <Button.Box>
            <Button
              as="a"
              href="https://discord.gg/MVEAwz9sBy"
              outline
              icon={<Icon type="smile" />}
              target="_blank"
              rel="noreferrer"
            >
              Ask on Discord
            </Button>
            <Button
              as="a"
              href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
              className="orange_0 btn_start"
              icon={<Icon type="twinkle" />}
            >
              Start for free
            </Button>
          </Button.Box>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
