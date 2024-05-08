'use client';

import { useState, useEffect } from 'react';
import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout, Button, Icon, CodeBlock, CodeBlockHeader, Accordion } from '@/components';
import { ChartMotion, StateSharingMotion, ServerMotion, MainBannerMotion } from '@/components/motions';
import UserGroupSVG from '@/public/assets/icons/icon_service_main_users_group.svg';
import CollaboProfileSVG from '@/public/assets/icons/icon_collaborate_profile.svg';
import CollaboCursorSVG from '@/public/assets/icons/icon_collaborate_cursor.svg';
import CollaboSelectionSVG from '@/public/assets/icons/icon_collaborate_selection.svg';
import CollaboEditingSVG from '@/public/assets/icons/icon_collaborate_editing.svg';
import { FEATURES_CODE } from '@/codes/features';

type FeatureType = keyof typeof FEATURES_CODE;
const Home: NextPage = () => {
  const [bannerActive, setBannerActive] = useState(false);
  const [activeFeatureCard, setActiveFeatureCard] = useState<FeatureType>('profile');
  const [activeFeatureCode, setActiveFeatureCode] = useState({ type: 'js', info: FEATURES_CODE.profile.js });

  useEffect(() => {
    const handleVisualSize = () => {
      const $visual = document.querySelector('.kv_bg svg') as HTMLElement;
      if (!$visual) return;

      const SVG_ASPECT_RATIO = 1512 / 868;
      const HEADER_HEIGHT = 64;
      const scale = window.innerWidth / ((window.innerHeight - HEADER_HEIGHT) * SVG_ASPECT_RATIO);
      $visual.style.setProperty('--scale', scale < 1 ? '1' : `${scale}`);
    };
    window.addEventListener('resize', handleVisualSize);
    handleVisualSize();

    return () => {
      window.removeEventListener('resize', handleVisualSize);
    };
  }, []);

  // TODO(hackerwins): Remove examples condition when examples are ready.
  return (
    <Layout className="main_page">
      <Head>
        <title>Yorkie</title>
      </Head>
      <div className="content">
        <section className="key_visual">
          <div className="kv_bg">
            <MainBannerMotion bannerActive={bannerActive} />
          </div>
          <div className="inner">
            <h2 className="title">
              <span className="text">Bring</span>
              <span className={classNames('point', { is_hover: bannerActive })}>
                collaboration
                <span className="bg"></span>
              </span>
              <span className="text">to your app</span>
            </h2>
            <Button.Box>
              <a
                href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
                className="btn orange_0 btn_start"
                onPointerOver={() => setBannerActive(true)}
                onPointerOut={() => setBannerActive(false)}
              >
                <span className="bg"></span>
                <Icon type="star" />
                <span className="text">Start for free</span>
              </a>
            </Button.Box>
            <p className="desc">
              Unlock the full potential of real-time collaboration with open-source SDKs and API package.
            </p>
          </div>
        </section>
        <section className="section section_app">
          <div className="align_box">
            <div className="app_header">
              <h2 className="tag_name">Extend Your App with Yorkie</h2>
              <span className="icon">
                <UserGroupSVG />
              </span>
            </div>
            <div className="app_body">
              <strong className="section_title">
                Make your product
                <br />
                <span className="point">collaborative</span> in a flash!
              </strong>
              <p className="section_desc">
                Easily add collaboration to your apps with our API-based services. <br /> Sign up now and start building
                powerful, high-performance collaborative features in no time.
              </p>
              <Button.Box>
                <Button as="link" href="/docs/getting-started" className="orange_0" icon={<Icon type="book" />}>
                  Getting Started
                </Button>
                <Button as="link" href="/docs" outline icon={<Icon type="book" />}>
                  Read documentation
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
            Easily add stable and diverse collaborative features <br className="br_mo" />
            to your product with Yorkie. <br />
            Transform your local-based product into a <br className="br_mo" /> collaborative online experience with our
            powerful tools. <br />
            Sign up now and start providing your users <br className="br_mo" /> with a completely new real-time
            experience.
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
              }}
            >
              <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'profile' })}>
                <button type="button" className="service_card_menu" data-item="profile">
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
                <button type="button" className="service_card_menu" data-item="cursor">
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
              {process.env.NODE_ENV === 'development' && (
                <>
                  <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'selection' })}>
                    <button type="button" className="service_card_menu" data-item="selection">
                      <span className="img_box">
                        <CollaboSelectionSVG />
                      </span>
                      <strong className="service_card_title">Live Selection</strong>
                      <span className="service_card_desc">
                        Live Selection displays the object selected by each user who accesses the same canvas. Users can
                        see what each other is doing in real-time.
                      </span>
                    </button>
                  </li>
                  <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'editing' })}>
                    <button type="button" className="service_card_menu" data-item="editing">
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
                </>
              )}
            </ul>
            <CodeBlock.Wrapper>
              <CodeBlockHeader>
                <CodeBlockHeader.LeftBox>
                  {FEATURES_CODE[activeFeatureCard].tabOrder.map((codeType) => (
                    <button
                      type="button"
                      key={codeType}
                      className={classNames('btn_item', { is_active: activeFeatureCode.type === codeType })}
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
        {process.env.NODE_ENV === 'development' && (
          <section className="section">
            <h2 className="section_title">
              What experiences <br />
              can you create
              <br className="br_mo_xs" /> with Yorkie?
            </h2>
            <p className="section_desc">Test our examples to add diverse collaborative features to your product.</p>
            <div className="section_content draw">
              <div className="draw_box"></div>
              <div className="draw_box"></div>
            </div>
            <Button.Box>
              <Button as="link" href="/examples" className="orange_0" icon={<Icon type="bulb" />}>
                View all examples
              </Button>
            </Button.Box>
          </section>
        )}
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
                    Document is stored using conflict-free replicated data types(CRDTs), which ensures that multiple
                    users can edit the same data concurrently without encountering conflicts. Presence represents a
                    peer&apos;s awareness of the data being edited. It is used to track which users are currently
                    editing the document.
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
                  <strong className="title">Data Warehouse with Dashboard</strong>
                  <p className="desc">
                    Dashboard allows users to easily browse stored documents and monitor the data warehouse in
                    real-time. With Dashboard, users can quickly and easily supervise the data warehouse and ensure that
                    it is functioning properly.
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
                    Yorkie offers flexible deployment options, allowing user to use a cloud or host the server on your
                    own premises. Whether you want the convenience of cloud or the control of a self-hosted server,
                    Yorkie has you covered.
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
            <Accordion defaultValue={[]} multiple icon={null}>
              <Accordion.Item value="faq1">
                <Accordion.Control>
                  <Icon type="messageSquare" />
                  Can we use the Yorkie for free?
                </Accordion.Control>
                <Accordion.Panel>
                  Yes, Yorkie is free to use. <br />
                  <br />
                  You can access it at no cost. Please note that the availability of the service and any associated
                  features may be subject to change without notice. It is always a good idea to check the latest
                  information on the service&apos;s website to ensure that it is still available and meets your needs.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="faq2">
                <Accordion.Control>
                  <Icon type="messageSquare" />
                  Is the Yorkie production ready?
                </Accordion.Control>
                <Accordion.Panel>
                  No, Yorkie is not yet production ready. <br />
                  <br />
                  While the CRDT algorithm has been verified, not all of the code has been fully battle-tested. The
                  developers of the service currently estimate that the right time to use it in a production environment
                  will be <b>around summer of &apos;24</b>. Until then, it is recommended to carefully evaluate the
                  service&apos;s capabilities and reliability before using it in a production setting. It is also
                  important to note that the availability and features of the service may change without notice, so it
                  is always best to check the latest information on the service&apos;s website before using it.
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
                    <a href="https://discord.com/invite/MVEAwz9sBy">Discord</a>
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
              Contact
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
