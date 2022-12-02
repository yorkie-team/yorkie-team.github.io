import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Icon, Layout } from '@/components';
import ExampleBannerSVG from '@/public/assets/images/banner/img_example_banner.svg';
import ExampleMultiCursorSVG from '@/public/assets/images/@tmp/example_multi_cursor_mo.svg';
import ExampleSelectionSVG from '@/public/assets/images/@tmp/example_selection_mo.svg';
import ExampleStatusSVG from '@/public/assets/images/@tmp/example_status_mo.svg';
import ExampleDrawingSVG from '@/public/assets/images/@tmp/example_drawing_mo.svg';
import ExampleCursorChatSVG from '@/public/assets/images/@tmp/example_cursor_chat_mo.svg';
import ExampleMessageSVG from '@/public/assets/images/@tmp/example_message_mo.svg';
import ExampleSplitViewSVG from '@/public/assets/images/@tmp/example_split_view_mo.svg';
import ExamplePortalSVG from '@/public/assets/images/@tmp/example_portal_mo.svg';
import ExampleToDoSVG from '@/public/assets/images/@tmp/example_to_do_mo.svg';
import ExampleDataDropSVG from '@/public/assets/images/@tmp/example_data_drop_mo.svg';
import ExampleLeaderBoardSVG from '@/public/assets/images/@tmp/example_leader_board_mo.svg';
import ExampleCreatingSVG from '@/public/assets/images/@tmp/example_creating_mo.svg';
import ExampleTextEditingSVG from '@/public/assets/images/@tmp/example_text_editing_mo.svg';
import ExampleOrderingSVG from '@/public/assets/images/@tmp/example_ordering_mo.svg';

const Examples: NextPage = () => {
  return (
    <Layout className="examples_page">
      <Head>
        <title>Examples · Yorkie</title>
      </Head>
      <div className="top_banner">
        <div className="top_banner_inner">
          <div className="title_group">
            <h2 className="title">
              Collaboration tools <br /> built by Yorkie
            </h2>
            <p className="desc">
              Here you can discover open source examples built by Yorkie.
              <br />
              Yorkie tools can be easily integrated to make products collaborative.
            </p>
            <Button.Box>
              <Button as="link" href="/" className="orange_0 btn_start" icon={<Icon type="star" />}>
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
              <li className="navigator_group is_active ">
                <a className="navigator_item add_icon">
                  <Icon type="diamond" />
                  All examples
                </a>
              </li>
              <li className="navigator_group  ">
                <a className="navigator_item add_icon">
                  <Icon type="tool" />
                  Basic tools
                </a>
              </li>
              <li className="navigator_group  ">
                <a className="navigator_item add_icon">
                  <Icon type="messageSmile" />
                  Communication
                </a>
              </li>
              <li className="navigator_group  ">
                <a className="navigator_item add_icon">
                  <Icon type="checkCircle" />
                  Productivity
                </a>
              </li>
              <li className="navigator_group  ">
                <a className="navigator_item add_icon">
                  <Icon type="secenario" />
                  Scenario examples
                </a>
              </li>
            </ul>
          </nav>
          <div className="filter">
            <ul className="filter_list">
              <li className="filter_item">
                <button type="button" className="btn btn_small filter_desc">
                  <span className="filter_title">Examples:</span>
                  <span className="text">All examples</span>
                  <Icon type="secenario" className="icon_arrow" />
                </button>
                <div className="dropdown " style={{ display: 'none' }}>
                  <ul className="dropdown_list">
                    <li className="dropdown_item">
                      <a href="#" className="dropdown_menu">
                        <span className="icon orange_0">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.3536 2.64645C10.5488 2.84171 10.5488 3.15829 10.3536 3.35355L4.85355 8.85355C4.65829 9.04882 4.34171 9.04882 4.14645 8.85355L1.64645 6.35355C1.45118 6.15829 1.45118 5.84171 1.64645 5.64645C1.84171 5.45118 2.15829 5.45118 2.35355 5.64645L4.5 7.79289L9.64645 2.64645C9.84171 2.45118 10.1583 2.45118 10.3536 2.64645Z"
                              fill="#23C176"
                            ></path>
                          </svg>
                        </span>
                        <span className="dropdown_text">All examples</span>
                      </a>
                    </li>
                    <li className="dropdown_item">
                      <a href="#" className="dropdown_menu">
                        <span className="icon orange_0"></span>
                        <span className="dropdown_text">Basic tools</span>
                      </a>
                    </li>
                    <li className="dropdown_item">
                      <a href="#" className="dropdown_menu">
                        <span className="icon orange_0"></span>
                        <span className="dropdown_text">Communication</span>
                      </a>
                    </li>
                    <li className="dropdown_item">
                      <a href="#" className="dropdown_menu">
                        <span className="icon orange_0"></span>
                        <span className="dropdown_text">Productivity</span>
                      </a>
                    </li>
                    <li className="dropdown_item">
                      <a href="#" className="dropdown_menu">
                        <span className="icon orange_0"></span>
                        <span className="dropdown_text">Scenario examples</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <ul className="grid_list">
            <li className="grid_item">
              <Link href="/examples/multi-cursor" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleMultiCursorSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Multi Cursor</strong>
                  <p className="desc">Multi cursor displays different users’ cursors in real time for collaboration.</p>
                </div>
              </Link>
            </li>
            <li className="grid_item">
              <Link href="/examples/webtoons" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleCreatingSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Creating Webtoons</strong>
                  <p className="desc">
                    Creating webtoon scenario includes the ability to assist in effective communication of webtoon
                    related tasks.
                  </p>
                </div>
              </Link>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleSelectionSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Selection</strong>
                  <p className="desc">Selection feature showes selected components of other users in real time.</p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleStatusSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Profile and Status Display</strong>
                  <p className="desc">
                    Profile status display indicates other collaborators’ current task with a status icon.
                  </p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleDrawingSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Drawing Comment</strong>
                  <p className="desc">
                    Drawing comment allows users to leave comments as free-form drawings as well as texts.
                  </p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleCursorChatSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Cursor Interaction</strong>
                  <p className="desc">
                    Cursor interactions is a location-based chat feature that enables users to chat based on cursor
                    position.
                  </p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleMessageSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Instant Messaging</strong>
                  <p className="desc">
                    Instant messaging allowes users to send instant messages through profile stack.
                  </p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleSplitViewSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Whiteboard Split View</strong>
                  <p className="desc">
                    Split view enables screen segmentation, and to easily move data between the divided screens.
                  </p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExamplePortalSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Portal</strong>
                  <p className="desc">
                    Portal feature provides shortcuts to components and locations for quick operation.
                  </p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleToDoSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">To-do List</strong>
                  <p className="desc">To-do list manages and lists tasks for collaborative situations.</p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleDataDropSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Data Drop</strong>
                  <p className="desc">
                    Data drop function can immediately send material to others within a collaborative space.
                  </p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleLeaderBoardSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Leader Board</strong>
                  <p className="desc">
                    The leader board system ranks users activities within the whiteboardby their activities and
                    contribution.
                  </p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleTextEditingSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Text Co-editing</strong>
                  <p className="desc">
                    Text co-editing fuction alleviate existing problems when multiple users edit text at the same time.
                  </p>
                </div>
              </a>
            </li>
            <li className="grid_item">
              <a href="#" className="grid_card">
                <div className="grid_thumbnail">
                  <ExampleOrderingSVG />
                </div>
                <div className="grid_card_info">
                  <strong className="title">Ordering Delivery Food</strong>
                  <p className="desc">
                    Ordering scenario include features that allow orders to be placed together in an existing delivery
                    service app.
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Examples;
