import type { NextPage } from 'next';
import Head from 'next/head';
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
              <Button as="link" href="/" className="orange_0 btn_start" icon={<Icon type="star" />}>
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
            <h2 className="section_title">
              Turn anything <br />
              into multiplayer.
            </h2>
            <p className="section_desc">
              Yorkie cloud services let you build any multiplayer product without investing time and money in database
              configuration and conflict management tasks.
            </p>
          </div>
          <div className="section_content">
            <strong className="sub_title">Conflict-free state sharing</strong>
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
            <strong className="sub_title">Flexible database</strong>
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
            <strong className="sub_title">Collaboration Awareness</strong>
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
            <strong className="sub_title">More features of Yorkie SDK</strong>
            <ul className="card_list">
              <li className="card_item">
                <strong className="card_title">Size management</strong>
                <p className="card_desc">
                  Yorkie uses ‘Garbage collection’ and ‘Lamport timestamp’ to keep smaller document sizes.
                </p>
              </li>
              <li className="card_item">
                <strong className="card_title">Auth Webhook</strong>
                <p className="card_desc">
                  Check from an external service that the client is authorized to the document.
                </p>
              </li>
              <li className="card_item">
                <strong className="card_title">App &amp; Web SDK</strong>
                <p className="card_desc">Support development for both mobile apps and the web.</p>
              </li>
            </ul>
          </div>
        </section>
        <section className="section">
          <div className="section_title_wrap">
            <h2 className="section_title">
              Real-time monitoring <br />
              anytime, anywhere.
            </h2>
            <p className="section_desc">
              Yorkie House allows project members to browse stored documents and supervise the data warehouse easily.
            </p>
          </div>
          <strong className="sub_big_title">
            <span className="icon">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.373 19.0796C7.92933 11.4871 14.2655 5.50012 22 5.50012C29.1824 5.50012 35.1571 10.6615 36.4205 17.4786C39.8169 19.0993 42.1666 22.565 42.1666 26.5835C42.1666 32.1523 37.6522 36.6668 32.0833 36.6668H11C5.93737 36.6668 1.83331 32.5627 1.83331 27.5001C1.83331 23.7242 4.11503 20.4848 7.373 19.0796ZM22 9.16679C15.9248 9.16679 11 14.0917 11 20.1668C11 20.233 11.0006 20.2991 11.0017 20.365C11.0167 21.2136 10.4472 21.9616 9.62514 22.1729C7.25179 22.783 5.49998 24.9393 5.49998 27.5001C5.49998 30.5377 7.96241 33.0001 11 33.0001H32.0833C35.6271 33.0001 38.5 30.1273 38.5 26.5835C38.5 23.7709 36.6893 21.3765 34.1646 20.5114C33.4913 20.2806 33.0123 19.681 32.9361 18.9733C32.3425 13.4604 27.6714 9.16679 22 9.16679Z"
                  fill="#F27B2F"
                ></path>
              </svg>
            </span>
            Yorkie House Web
          </strong>
          <p className="sub_big_desc">Yorkie House web is available on any device, and no installation is required.</p>
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
            <h2 className="section_title">
              Build your own <br />
              Yorkie
            </h2>
            <p className="section_desc">
              If needed, Yorkie open source packages allow you to build servers and databases locally.
            </p>
          </div>
          <div className="package_group">
            <div className="sub_title_wrap">
              <strong className="sub_big_title">
                <span className="icon">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.2614 2.17258C21.7487 2.07235 22.2514 2.07235 22.7387 2.17258C23.302 2.28844 23.8055 2.57046 24.2058 2.79466C24.2431 2.81554 24.2795 2.83592 24.3149 2.85562L37.8816 10.3927C37.9191 10.4135 37.9577 10.4348 37.9973 10.4566C38.4211 10.69 38.9539 10.9834 39.363 11.4274C39.7168 11.8113 39.9845 12.2663 40.1483 12.7619C40.3377 13.3352 40.3355 13.9435 40.3337 14.4272C40.3335 14.4724 40.3334 14.5166 40.3334 14.5595V29.4408C40.3334 29.4837 40.3335 29.5279 40.3337 29.5731C40.3355 30.0568 40.3377 30.6651 40.1483 31.2384C39.9845 31.734 39.7168 32.189 39.363 32.5729C38.9539 33.0169 38.4211 33.3103 37.9974 33.5437C37.9578 33.5655 37.9191 33.5868 37.8816 33.6077L24.3149 41.1447C24.2795 41.1644 24.2431 41.1848 24.2058 41.2056C23.8055 41.4298 23.302 41.7119 22.7387 41.8277C22.2514 41.9279 21.7487 41.9279 21.2614 41.8277C20.698 41.7119 20.1945 41.4298 19.7942 41.2056C19.757 41.1848 19.7206 41.1644 19.6851 41.1447L6.11846 33.6077C6.08096 33.5868 6.04232 33.5655 6.00272 33.5437C5.57898 33.3103 5.04617 33.0169 4.63701 32.5729C4.28327 32.189 4.01557 31.734 3.8518 31.2384C3.66239 30.6651 3.6646 30.0568 3.66637 29.5731C3.66653 29.5279 3.66669 29.4837 3.66669 29.4408V14.5595C3.66669 14.5166 3.66653 14.4724 3.66637 14.4272C3.6646 13.9435 3.66239 13.3352 3.8518 12.7619C4.01556 12.2663 4.28327 11.8113 4.63701 11.4274C5.04617 10.9835 5.57896 10.69 6.0027 10.4566C6.04231 10.4348 6.08095 10.4135 6.11846 10.3927L19.6851 2.85562C19.7206 2.83592 19.757 2.81555 19.7942 2.79467C20.1945 2.57046 20.698 2.28844 21.2614 2.17258ZM22 5.7733C21.9972 5.77463 21.9943 5.77603 21.9913 5.7775C21.8855 5.82853 21.7436 5.90651 21.4658 6.06086L9.27511 12.8335L22 19.9028L34.7249 12.8334L22.5342 6.06086C22.2564 5.90651 22.1146 5.82852 22.0088 5.7775C22.0058 5.77603 22.0028 5.77463 22 5.7733ZM36.6667 15.9492V29.4408C36.6667 29.7763 36.6659 29.948 36.6584 30.0723C36.6582 30.076 36.658 30.0795 36.6578 30.0828C36.655 30.0847 36.652 30.0866 36.6489 30.0885C36.5439 30.1554 36.3941 30.2395 36.1009 30.4024L23.8334 37.2177L23.8333 23.0788L36.6667 15.9492ZM20.1666 23.0788L7.33336 15.9492V29.4408C7.33336 29.7763 7.33412 29.948 7.34161 30.0723C7.34183 30.076 7.34205 30.0795 7.34227 30.0828C7.34509 30.0847 7.34805 30.0865 7.35115 30.0885C7.45619 30.1554 7.60591 30.2395 7.89915 30.4024L20.1667 37.2177L20.1666 23.0788Z"
                      fill="#F27B2F"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.1474 7.35983C12.6391 6.47472 13.7552 6.15583 14.6403 6.64755L31.1403 15.8142C32.0254 16.3059 32.3443 17.4221 31.8526 18.3072C31.3609 19.1923 30.2447 19.5112 29.3596 19.0195L12.8596 9.85279C11.9745 9.36107 11.6556 8.24493 12.1474 7.35983Z"
                      fill="#F27B2F"
                    ></path>
                  </svg>
                </span>
                Yorkie open source package
              </strong>
            </div>
            <a href="#" className="btn gray800">
              <span className="icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.44105 1.33334L3.76195 1.33334C4.48448 1.33333 5.06725 1.33332 5.53917 1.37188C6.02506 1.41158 6.45186 1.49546 6.84672 1.69665C7.30242 1.92884 7.69622 2.26153 8.00008 2.66667C8.30394 2.26153 8.69774 1.92884 9.15345 1.69665C9.54831 1.49546 9.9751 1.41158 10.461 1.37188C10.9329 1.33332 11.5157 1.33333 12.2382 1.33334L12.5591 1.33334C12.9105 1.33332 13.2137 1.33331 13.4634 1.35372C13.727 1.37525 13.9891 1.42279 14.2414 1.55132C14.6177 1.74307 14.9237 2.04903 15.1154 2.42536C15.244 2.67761 15.2915 2.93975 15.313 3.20332C15.3334 3.45303 15.3334 3.7562 15.3334 4.10763V9.89238C15.3334 10.2438 15.3334 10.547 15.313 10.7967C15.2915 11.0603 15.244 11.3224 15.1154 11.5747C14.9237 11.951 14.6177 12.2569 14.2414 12.4487C13.9891 12.5772 13.727 12.6248 13.4634 12.6463C13.2137 12.6667 12.9106 12.6667 12.5591 12.6667H11.6169C10.7405 12.6667 10.4412 12.6735 10.1794 12.753C9.92782 12.8294 9.69378 12.9546 9.49065 13.1216C9.27927 13.2953 9.10761 13.5406 8.62149 14.2698L8.55478 14.3698C8.43114 14.5553 8.22298 14.6667 8.00008 14.6667C7.77718 14.6667 7.56903 14.5553 7.44538 14.3698L7.37868 14.2698C6.89256 13.5406 6.7209 13.2953 6.50951 13.1216C6.30639 12.9546 6.07234 12.8294 5.82076 12.753C5.55895 12.6735 5.25967 12.6667 4.3833 12.6667H3.44104C3.08961 12.6667 2.78644 12.6667 2.53673 12.6463C2.27317 12.6248 2.01102 12.5772 1.75877 12.4487C1.38244 12.2569 1.07648 11.951 0.884736 11.5747C0.756207 11.3224 0.708663 11.0603 0.687129 10.7967C0.666726 10.547 0.666737 10.2438 0.666749 9.89237V4.10764C0.666737 3.75621 0.666726 3.45303 0.687129 3.20332C0.708663 2.93975 0.756207 2.67761 0.884736 2.42536C1.07648 2.04903 1.38244 1.74307 1.75877 1.55132C2.01102 1.42279 2.27317 1.37525 2.53673 1.35372C2.78645 1.33331 3.08962 1.33332 3.44105 1.33334ZM7.33342 6.26667C7.33342 5.50893 7.3329 4.98072 7.2993 4.5695C7.26634 4.16605 7.20489 3.93426 7.11543 3.75869C6.92368 3.38237 6.61772 3.0764 6.2414 2.88466C6.06583 2.7952 5.83403 2.73375 5.43059 2.70079C5.01936 2.66719 4.49115 2.66667 3.73342 2.66667H3.46675C3.08238 2.66667 2.8342 2.66719 2.64531 2.68262C2.4642 2.69742 2.39705 2.72254 2.36409 2.73933C2.23865 2.80325 2.13666 2.90524 2.07275 3.03068C2.05595 3.06364 2.03083 3.13079 2.01603 3.31189C2.0006 3.50079 2.00008 3.74897 2.00008 4.13334V9.86667C2.00008 10.251 2.0006 10.4992 2.01603 10.6881C2.03083 10.8692 2.05595 10.9364 2.07275 10.9693C2.13666 11.0948 2.23865 11.1968 2.36409 11.2607C2.39705 11.2775 2.4642 11.3026 2.64531 11.3174C2.8342 11.3328 3.08238 11.3333 3.46675 11.3333H4.3833C4.41654 11.3333 4.44934 11.3333 4.48169 11.3333C5.22146 11.333 5.733 11.3329 6.20821 11.4772C6.61817 11.6017 7.00019 11.804 7.33342 12.073V6.26667ZM8.66675 12.073C8.99998 11.804 9.382 11.6017 9.79196 11.4772C10.2672 11.3329 10.7787 11.333 11.5185 11.3333C11.5508 11.3333 11.5836 11.3333 11.6169 11.3333H12.5334C12.9178 11.3333 13.166 11.3328 13.3549 11.3174C13.536 11.3026 13.6031 11.2775 13.6361 11.2607C13.7615 11.1968 13.8635 11.0948 13.9274 10.9693C13.9442 10.9364 13.9693 10.8692 13.9841 10.6881C13.9996 10.4992 14.0001 10.251 14.0001 9.86667V4.13334C14.0001 3.74897 13.9996 3.50079 13.9841 3.31189C13.9693 3.13079 13.9442 3.06364 13.9274 3.03068C13.8635 2.90523 13.7615 2.80325 13.6361 2.73933C13.6031 2.72254 13.536 2.69742 13.3549 2.68262C13.166 2.66719 12.9178 2.66667 12.5334 2.66667H12.2667C11.509 2.66667 10.9808 2.66719 10.5696 2.70079C10.1661 2.73375 9.93434 2.7952 9.75877 2.88466C9.38244 3.0764 9.07648 3.38237 8.88474 3.75869C8.79528 3.93426 8.73383 4.16605 8.70087 4.5695C8.66727 4.98072 8.66675 5.50893 8.66675 6.26667V12.073Z"
                    fill="#F5F3F1"
                  ></path>
                </svg>
              </span>
              <span className="text">How to build a local server</span>
            </a>
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
