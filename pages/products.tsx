import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';
import { Button, Icon, Layout, CodeBlock, CodeBlockHeader } from '@/components';
import { StateSharingDetailMotion, FlexibleDocumentMotion, PresenceMotion, ChannelMotion } from '@/components/motions';
import { ArchitectureDiagram, DashboardShowcase } from '@/components/illustrations';
import ProductBannerSVG from '@/public/assets/images/banner/img_product_banner.svg';
import { DOCUMENT_CODE, PRESENCE_CODE, CHANNEL_CODE } from '@/codes/document';

const Products: NextPage = () => {
  const [documentType, setDocumentType] = useState<keyof typeof DOCUMENT_CODE>('common');
  const [presenceType, setPresenceType] = useState<keyof typeof PRESENCE_CODE>('update');
  const [channelType, setChannelType] = useState<keyof typeof CHANNEL_CODE>('presence');
  return (
    <Layout className="product_page">
      <Head>
        <title>Products · Yorkie</title>
      </Head>
      <div className="top_banner">
        <div className="top_banner_inner">
          <div className="title_group">
            <h1 className="title">
              Ship faster,
              <br />
              Stay in control
            </h1>
            <p className="desc">
              Yorkie provides synchronization primitives: a JSON-like Document, <br className="br_pc" />
              Presence, and Channel. Dashboard lets you manage the documents <br className="br_pc" />
              stored in each project.
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
            <ProductBannerSVG />
          </div>
        </div>
      </div>
      <div className="content">
        <section className="section">
          <div className="section_title_wrap">
            <h2 className="section_title" id="document-and-presence">
              <a href="#document-and-presence">
                Turn anything <br />
                into multiplayer.
              </a>
            </h2>
            <p className="section_desc">
              Yorkie allows you to build multiplayer products without the need for database configuration and conflict
              management. This saves time and money.
            </p>
          </div>
          <div className="section_content conflict_free">
            <strong className="sub_title" id="conflict-free-state-sharing">
              Conflict-free state sharing
            </strong>
            <p className="sub_desc">
              Yorkie implements real-time collaboration based on the Conflict-free Replicated Data Type(CRDT) algorithm.
              CRDTs offer a clean and reliable way to resolve conflicts when editing concurrent data, unlike Operational
              Transformation(OT) algorithms which can be complex and may not always ensure convergence. Yorkie&apos;s
              use of the well-proven CRDT algorithm ensures reliable services.
            </p>
            <div className="img_box">
              <StateSharingDetailMotion />
            </div>
          </div>
          <div className="section_content">
            <strong className="sub_title" id="flexible-database">
              <a href="#flexible-database">Document</a>
            </strong>
            <p className="sub_desc">
              Yorkie provides a general-purpose JSON-like{' '}
              <Link href="/docs/sdks/js-sdk#document" className="link">
                Document
              </Link>{' '}
              to enable complex application models, while some CRDT libraries only offer basic data types.
            </p>
            <div className="db_content">
              <CodeBlock.Wrapper>
                <CodeBlockHeader>
                  <CodeBlockHeader.LeftBox>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: documentType === 'common' })}
                      aria-pressed={documentType === 'common'}
                      onClick={() => {
                        setDocumentType('common');
                      }}
                    >
                      Common
                    </button>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: documentType === 'text' })}
                      aria-pressed={documentType === 'text'}
                      onClick={() => {
                        setDocumentType('text');
                      }}
                    >
                      Text
                    </button>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: documentType === 'counter' })}
                      aria-pressed={documentType === 'counter'}
                      onClick={() => {
                        setDocumentType('counter');
                      }}
                    >
                      Counter
                    </button>
                  </CodeBlockHeader.LeftBox>
                  <CodeBlockHeader.RightBox>
                    <CodeBlockHeader.CopyButton value={DOCUMENT_CODE[documentType]} />
                  </CodeBlockHeader.RightBox>
                </CodeBlockHeader>
                <CodeBlock code={DOCUMENT_CODE[documentType]} language="javascript" withLineNumbers />
              </CodeBlock.Wrapper>
              <div className="img_box">
                <FlexibleDocumentMotion type={documentType} />
              </div>
            </div>
          </div>
          <div className="section_content">
            <strong className="sub_title" id="collaboration-awareness">
              <a href="#collaboration-awareness">Presence</a>
            </strong>
            <p className="sub_desc">
              You can build a sense of presence by tracking the status of users who are editing the same document with{' '}
              <Link href="/docs/sdks/js-sdk#presence" className="link">
                Presence
              </Link>
              .
            </p>
            <div className="db_content">
              <CodeBlock.Wrapper>
                <CodeBlockHeader>
                  <CodeBlockHeader.LeftBox>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: presenceType === 'update' })}
                      aria-pressed={presenceType === 'update'}
                      onClick={() => {
                        setPresenceType('update');
                      }}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: presenceType === 'watch' })}
                      aria-pressed={presenceType === 'watch'}
                      onClick={() => {
                        setPresenceType('watch');
                      }}
                    >
                      Watch
                    </button>
                  </CodeBlockHeader.LeftBox>
                  <CodeBlockHeader.RightBox>
                    <CodeBlockHeader.CopyButton value={PRESENCE_CODE[presenceType]} />
                  </CodeBlockHeader.RightBox>
                </CodeBlockHeader>
                <CodeBlock code={PRESENCE_CODE[presenceType]} language="javascript" withLineNumbers />
              </CodeBlock.Wrapper>
              <div className="img_box">
                <PresenceMotion type={presenceType} />
              </div>
            </div>
          </div>
          <div className="section_content">
            <strong className="sub_title" id="channel">
              <a href="#channel">Channel</a>
            </strong>
            <p className="sub_desc">
              <Link href="/docs/sdks/js-sdk#channel" className="link">
                Channel
              </Link>{' '}
              provides lightweight real-time communication without database persistence. Perfect for tracking online
              users, broadcasting messages, and handling ephemeral real-time data like chat messages or live
              notifications.
            </p>
            <div className="db_content">
              <CodeBlock.Wrapper>
                <CodeBlockHeader>
                  <CodeBlockHeader.LeftBox>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: channelType === 'presence' })}
                      aria-pressed={channelType === 'presence'}
                      onClick={() => {
                        setChannelType('presence');
                      }}
                    >
                      Presence
                    </button>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: channelType === 'broadcast' })}
                      aria-pressed={channelType === 'broadcast'}
                      onClick={() => {
                        setChannelType('broadcast');
                      }}
                    >
                      Broadcast
                    </button>
                  </CodeBlockHeader.LeftBox>
                  <CodeBlockHeader.RightBox>
                    <CodeBlockHeader.CopyButton value={CHANNEL_CODE[channelType]} />
                  </CodeBlockHeader.RightBox>
                </CodeBlockHeader>
                <CodeBlock code={CHANNEL_CODE[channelType]} language="javascript" withLineNumbers />
              </CodeBlock.Wrapper>
              <div className="img_box">
                <ChannelMotion type={channelType} />
              </div>
            </div>
          </div>
          <div className="section_content">
            <strong className="sub_title" id="more-features">
              <a href="#more-features">More features of Yorkie SDK</a>
            </strong>
            <ul className="product_card_list">
              <li className="product_card_item">
                <strong className="product_card_title">SDKs for Mobile &amp; Web</strong>
                <p className="product_card_desc">
                  Yorkie SDKs support development for{' '}
                  <Link href="/docs/sdks/ios-sdk" className="link">
                    iOS
                  </Link>
                  ,{' '}
                  <Link href="/docs/sdks/android-sdk" className="link">
                    Android
                  </Link>{' '}
                  and{' '}
                  <Link href="/docs/sdks/js-sdk" className="link">
                    Web
                  </Link>{' '}
                  applications.
                </p>
              </li>
              <li className="product_card_item">
                <strong className="product_card_title">Size optimization</strong>
                <p className="product_card_desc">
                  Yorkie uses{' '}
                  <a
                    href="https://github.com/yorkie-team/yorkie/blob/main/docs/design/garbage-collection.md"
                    className="link"
                  >
                    Garbage Collection
                  </a>{' '}
                  and{' '}
                  <a href="https://en.wikipedia.org/wiki/Lamport_timestamp" className="link">
                    Lamport timestamps
                  </a>{' '}
                  to reduce the size of documents.
                </p>
              </li>
              <li className="product_card_item">
                <strong className="product_card_title">Security</strong>
                <p className="product_card_desc">
                  <Link href="/docs/advanced/security#auth-webhook" className="link">
                    Auth Webhook
                  </Link>{' '}
                  allows users to verify the authorization of clients to access documents from an external service.
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section className="section">
          <div className="section_title_wrap">
            <h2 className="section_title" id="dashboard">
              <a href="#dashboard">
                Real-time monitoring
                <br />
                anytime, anywhere.
              </a>
            </h2>
            <p className="section_desc">
              Dashboard lets project members browse the documents stored in a project and monitor them in real time.
            </p>
          </div>
          <strong className="sub_big_title">
            <Icon type="cloud" />
            Dashboard
          </strong>
          <p className="sub_big_desc">
            Dashboard in Cloud is accessible from any device without the need for installation.
          </p>
          <DashboardShowcase />
        </section>
        <section className="section">
          <div className="section_title_wrap">
            <h2 className="section_title" id="self-hosted-server">
              <a href="#self-hosted-server">
                Build your own
                <br />
                Cluster
              </a>
            </h2>
            <p className="section_desc">
              If needed, Yorkie open source packages allow you to build self-hosted server locally.
            </p>
          </div>
          <div className="package_group">
            <div className="sub_title_wrap">
              <strong className="sub_big_title">
                <Icon type="package" />
                Yorkie open-source package
              </strong>
            </div>
            <Link href="/docs/self-hosted-server" className="btn gray800">
              <Icon type="book" />
              <span className="text">How to build self-hosted server</span>
            </Link>
            <p className="sub_big_desc">
              Yorkie open-source package includes SDKs, a server, and a database, making it easy to implement the
              co-editing feature.
            </p>
            <div className="img_box">
              <ArchitectureDiagram />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Products;
