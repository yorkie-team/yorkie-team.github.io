import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Icon, Layout, CodeBlock, CodeBlockHeader } from '@/components';
import { StateSharingDetailMotion, FlexibleDocumentMotion } from '@/components/motions';
import ProductBannerSVG from '@/public/assets/images/banner/img_product_banner.svg';
import ProductAwarenessLeftSVG from '@/public/assets/images/banner/img_product_awareness_left.svg';
import ProductAwarenessRightSVG from '@/public/assets/images/banner/img_product_awareness_right.svg';
import ProductPCSVG from '@/public/assets/images/banner/img_product_pc.svg';
import ProductMobileSVG from '@/public/assets/images/banner/img_product_mobile.svg';
import ProductPackageSVG from '@/public/assets/images/banner/img_product_package.svg';

const sampleCode = `// Text provides supports for collaborative plain text editing.
// It also has selection information for sharing the cursor position.
doc.update((root) => {
  root.text = new yorkie.Text();  // {"text":""}
  root.text.edit(0, 0, 'hello');  // {"text":"hello"}
  root.text.edit(0, 1, 'H');      // {"text":"Hello"}
  root.text.select(0, 1);         // {"text":"^H^ello"}
});

// Counter supports numeric types that change with addition and subtraction.
doc.update((root) => {
  root.counter = new yorkie.Counter(1);     // {"counter":1}
  root.counter.increase(2);                 // {"counter":3}
  root.counter.increase(3.5);               // {"counter":6.5}
  root.counter.increase(-3.5);              // {"counter":3}
});`;

const Products: NextPage = () => {
  return (
    <Layout className="product_page">
      <Head>
        <title>Products · Yorkie</title>
      </Head>
      <div className="top_banner">
        <div className="top_banner_inner">
          <div className="title_group">
            <h2 className="title">
              Easy integration,
              <br />
              continuous
              <br className="br_mo" /> management
            </h2>
            <p className="desc">
              Yorkie provides synchronization primitives such as JSON-like document and Peer
              <br className="br_pc" /> Awareness API.
              <br className="br_tablet" /> It also provides Admin API to manage documents as a document
              <br className="br_pc" /> store.
            </p>
            <Button.Box>
              <Button as="a" href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`} className="orange_0 btn_start" icon={<Icon type="star" />}>
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
            <h2 className="section_title" id="multiplayer">
              <a href="#multiplayer">
                Turn anything <br />
                into multiplayer.
              </a>
            </h2>
            <p className="section_desc">
              Yorkie cloud services let you build any multiplayer product without investing time and money in database
              configuration and conflict management tasks.
            </p>
          </div>
          <div className="section_content">
            <strong className="sub_title" id="conflict-free-state-sharing">
              <a href="#conflict-free-state-sharing">Conflict-free state sharing</a>
            </strong>
            <p className="sub_desc">
              Yorkie implements real-time collaboration based on the CRDT algorithm. CRDT is formed in solid and clean
              architecture, effectively resolving conflicts when editing multiple concurrent data, much better than
              Operational Transformation(OT). It has been known that some OT algorithms are more complex than CRDT and
              cannot satisfy the convergence after publication. which would be difficult to use. Yorkie uses the
              well-proven CRDT algorithm to achieve reliable services.
            </p>
            <div className="img_box">
              <StateSharingDetailMotion />
            </div>
          </div>
          <div className="section_content">
            <strong className="sub_title" id="flexible-database">
              <a href="#flexible-database">Flexible database</a>
            </strong>
            <p className="sub_desc">
              While some CRDT libraries only provide basic datatypes which is very difficult to represent complex models
              of applications, Yorkie provides a general purpose JSON-like documents to unleash the limitation.
            </p>
            <div className="db_content">
              <CodeBlock.Wrapper>
                <CodeBlockHeader>
                  <CodeBlockHeader.LeftBox>
                    <button type="button" className="btn_item is_active">
                      Text
                    </button>
                    <button type="button" className="btn_item">
                      Board
                    </button>
                  </CodeBlockHeader.LeftBox>
                  <CodeBlockHeader.RightBox>
                    <CodeBlockHeader.CopyButton value={sampleCode} />
                  </CodeBlockHeader.RightBox>
                </CodeBlockHeader>
                <CodeBlock code={sampleCode} language="javascript" withLineNumbers />
              </CodeBlock.Wrapper>
              <div className="img_box">
                <FlexibleDocumentMotion />
              </div>
            </div>
          </div>
          <div className="section_content">
            <strong className="sub_title" id="collaboration-awareness">
              <a href="#collaboration-awareness">Collaboration Awareness</a>
            </strong>
            <p className="sub_desc">
              Yorkie recognizes all users as soon as they log in and tracks their availability and behavior. Make your
              users feel like they&apos;re together.
            </p>
            <div className="img_group">
              <div className="img_box">
                <ProductAwarenessLeftSVG />
              </div>
              <div className="img_box">
                <ProductAwarenessRightSVG />
              </div>
            </div>
          </div>
          <div className="section_content">
            <strong className="sub_title" id="more-features">
              <a href="#more-features">More features of Yorkie SDK</a>
            </strong>
            <ul className="product_card_list">
              <li className="product_card_item">
                <strong className="product_card_title">Size management</strong>
                <p className="product_card_desc">
                  Yorkie uses ‘Garbage collection’ and ‘Lamport timestamp’ to keep smaller document sizes.
                </p>
              </li>
              <li className="product_card_item">
                <strong className="product_card_title">Auth Webhook</strong>
                <p className="product_card_desc">
                  Check from an external service that the client is authorized to the document.
                </p>
              </li>
              <li className="product_card_item">
                <strong className="product_card_title">App &amp; Web SDK</strong>
                <p className="product_card_desc">Support development for both mobile apps and the web.</p>
              </li>
            </ul>
          </div>
        </section>
        <section className="section">
          <div className="section_title_wrap">
            <h2 className="section_title" id="real-time-monitoring">
              <a href="#real-time-monitoring">
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
          <p className="sub_big_desc">Dashboard is available on any device, and no installation is required.</p>
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
              <a href="#build-local-server">
                Build your own
                <br />
                Yorkie
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
                Yorkie open source package
              </strong>
            </div>
            <Link href="/docs/server" className="btn gray800">
              <Icon type="book" />
              <span className="text">How to build self-hosted server</span>
            </Link>
            <p className="sub_big_desc">
              Yorkie open source package contains SDKs, a server, and a DB, enabling the implementation of the
              co-editing feature with less effort.
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
