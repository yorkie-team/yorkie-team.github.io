import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';
import { Button, Icon, Layout, CodeBlock, CodeBlockHeader } from '@/components';
import { StateSharingDetailMotion, FlexibleDocumentMotion, PresenceMotion } from '@/components/motions';
import ProductBannerSVG from '@/public/assets/images/banner/img_product_banner.svg';
import ProductPCSVG from '@/public/assets/images/banner/img_product_pc.svg';
import ProductMobileSVG from '@/public/assets/images/banner/img_product_mobile.svg';
import ProductPackageSVG from '@/public/assets/images/banner/img_product_package.svg';
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
            <h2 className="title">
              Ship faster,
              <br />
              Stay in control
            </h2>
            <p className="desc">
              Yorkie provides synchronization primitives such as JSON-like document <br className="br_pc" />
              and Peer Awareness API. Dashboard allows for efficient management of documents <br className="br_pc" />
              as a document store.
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
              Yorkie allow you to build multiplayer products without the need for database configuration and conflict
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
              <Link href="/docs/js-sdk#document" className="link">
                Document
              </Link>{' '}
              to enable complex application models while some CRDT libraries that only offer basic data types.
            </p>
            <div className="db_content">
              <CodeBlock.Wrapper>
                <CodeBlockHeader>
                  <CodeBlockHeader.LeftBox>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: documentType === 'common' })}
                      onClick={() => {
                        setDocumentType('common');
                      }}
                    >
                      Common
                    </button>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: documentType === 'text' })}
                      onClick={() => {
                        setDocumentType('text');
                      }}
                    >
                      Text
                    </button>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: documentType === 'counter' })}
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
                <FlexibleDocumentMotion />
              </div>
            </div>
          </div>
          <div className="section_content">
            <strong className="sub_title" id="collaboration-awareness">
              <a href="#collaboration-awareness">Presence</a>
            </strong>
            <p className="sub_desc">
              You can build a sense of presence by tracking the status of users who are editing the same document with{' '}
              <Link href="/docs/js-sdk#getting-presence" className="link">
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
                      onClick={() => {
                        setPresenceType('update');
                      }}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className={classNames('btn_item', { is_active: presenceType === 'watch' })}
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
                <PresenceMotion />
              </div>
            </div>
          </div>
          <div className="section_content">
            <strong className="sub_title" id="channel">
              <a href="#channel">Channel</a>
            </strong>
            <p className="sub_desc">
              <Link href="/docs/js-sdk#channel" className="link">
                Channel
              </Link>{' '}
              provides lightweight real-time communication without database persistence. Perfect for tracking online
              users, broadcasting messages, and handling ephemeral real-time data like chat messages or live
              notifications.
            </p>
            <CodeBlock.Wrapper>
              <CodeBlockHeader>
                <CodeBlockHeader.LeftBox>
                  <button
                    type="button"
                    className={classNames('btn_item', { is_active: channelType === 'presence' })}
                    onClick={() => {
                      setChannelType('presence');
                    }}
                  >
                    Presence
                  </button>
                  <button
                    type="button"
                    className={classNames('btn_item', { is_active: channelType === 'broadcast' })}
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
                  <Link href="/docs/ios-sdk" className="link">
                    iOS
                  </Link>
                  ,{' '}
                  <Link href="/docs/android-sdk" className="link">
                    Android
                  </Link>{' '}
                  and{' '}
                  <Link href="/docs/js-sdk" className="link">
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
                    href="https://github.com/yorkie-team/yorkie/blob/main/design/garbage-collection.md"
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
                  <Link href="/docs/security#auth-webhook" className="link">
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
              Dashboard allows project members to browse stored documents and supervise the data warehouse easily.
            </p>
          </div>
          <strong className="sub_big_title">
            <Icon type="cloud" />
            Dashboard
          </strong>
          <p className="sub_big_desc">
            Dashboard in Cloud is accessible from any device without the need for installation.
          </p>
          <div className="house_content">
            <div className="img_box shadow_l img_pc">
              <ProductPCSVG />
            </div>
            <div className="img_box shadow_l img_mobile">
              <ProductMobileSVG />
            </div>
          </div>
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
              <ProductPackageSVG />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Products;
