'use client';
import { Layout } from '@/components';
import { Button, Box, Icon, Heading, Text, Flex, Accordion, Container, Grid } from 'yorkie-ui';
import { ExampleThumbnailImage } from '@/components/exampleView';
import ExampleBannerSVG from '@/public/assets/images/banner/img_example_banner.svg';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { StarIcon, BookIcon, MessageSquareIcon, TwinkleIcon, SmileIcon } from '@/components/Icons/Icons';

const Examples: NextPage = () => {
  return (
    <Layout className="examples_page">
      <Container
        margin="auto"
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
      >
        <Head>
          <title>Examples · Yorkie</title>
        </Head>
        <Flex marginTop="28" gap="6" alignItems="center">
          <Box>
            <Heading as="h2" fontSize="6xl" fontWeight="600">
              Explore examples <br /> built by Yorkie
            </Heading>
            <Text fontSize="md" fontWeight="semibold" marginBlock="10">
              Explore our examples and see how Yorkie can help you bring your products to the next level of
              collaboration.
            </Text>
            <Button
              as="link"
              href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
              icon={<StarIcon />}
              position="start"
              size="xl"
            >
              Start for free
            </Button>
          </Box>
          <Box>
            <ExampleBannerSVG />
          </Box>
        </Flex>
      </Container>
      <Box borderWidth="1px" borderBottom="1px" marginTop="28" />
      <Container
        margin="auto"
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
      >
        <Flex>
          <Box>
            <Icon type="diamond" />
            All examples
          </Box>
          <Grid>
            <Link href="/examples/profile-stack" className="grid_card">
              <div className="grid_thumbnail">
                <ExampleThumbnailImage fileName="profile-stack.jpg" alt="profile-stack" />
              </div>
              <div className="grid_card_info">
                <strong className="title">Profile Stack</strong>
                <p className="desc">Profile stack shows the list of users currently accessing the Document.</p>
              </div>
            </Link>
          </Grid>
        </Flex>
        <div className="content">
          <div className="content_inner">
            <nav className="navigator">
              <ul className="navigator_list">
                <li className="navigator_group is_active ">
                  <a className="navigator_item add_icon"></a>
                </li>
                {/*
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
                  <Icon type="scenario" />
                  Scenario examples
                </a>
              </li>
                */}
              </ul>
            </nav>
            <div className="filter">
              <ul className="filter_list">
                <li className="filter_item">
                  <button type="button" className="btn btn_small filter_desc">
                    <span className="filter_title">Examples:</span>
                    <span className="text">All examples</span>
                    <Icon type="scenario" className="icon_arrow" />
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
                <Link href="/examples/profile-stack" className="grid_card">
                  <div className="grid_thumbnail">
                    <ExampleThumbnailImage fileName="profile-stack.jpg" alt="profile-stack" />
                  </div>
                  <div className="grid_card_info">
                    <strong className="title">Profile Stack</strong>
                    <p className="desc">Profile stack shows the list of users currently accessing the Document.</p>
                  </div>
                </Link>
              </li>
              <li className="grid_item">
                <Link href="/examples/kanban" className="grid_card">
                  <div className="grid_thumbnail">
                    <ExampleThumbnailImage fileName="vuejs-kanban.jpg" alt="vuejs-kanban" />
                  </div>
                  <div className="grid_card_info">
                    <strong className="title">Kanban Board</strong>
                    <p className="desc">
                      Kanban Board is a tool for managing tasks and workflow. It is a visual way to manage tasks and
                      workflow.
                    </p>
                  </div>
                </Link>
              </li>
              <li className="grid_item">
                <Link href="/examples/todomvc" className="grid_card">
                  <div className="grid_thumbnail">
                    <ExampleThumbnailImage fileName="react-todomvc.jpg" alt="react-todomvc" />
                  </div>
                  <div className="grid_card_info">
                    <strong className="title">TodoMVC</strong>
                    <p className="desc">
                      This is an example of real-time collaborative TodoMVC using CreateReactApp and Yorkie JS SDK.
                    </p>
                  </div>
                </Link>
              </li>
              <li className="grid_item">
                <Link href="/examples/codemirror" className="grid_card">
                  <div className="grid_thumbnail">
                    <ExampleThumbnailImage fileName="vanilla-codemirror6.jpg" alt="vanilla-codemirror6" />
                  </div>
                  <div className="grid_card_info">
                    <strong className="title">CodeMirror</strong>
                    <p className="desc">
                      This is a real-time collaborative version of the CodeMirror editor. It uses the Text, a custom
                      CRDT type from Yorkie.
                    </p>
                  </div>
                </Link>
              </li>
              <li className="grid_item">
                <Link href="/examples/tldraw" className="grid_card">
                  <div className="grid_thumbnail">
                    <ExampleThumbnailImage fileName="react-tldraw.jpg" alt="react-tldraw" />
                  </div>
                  <div className="grid_card_info">
                    <strong className="title">tldraw</strong>
                    <p className="desc">
                      This is a real-time collaboration example of the tldraw whiteboard editor with CreateReactApp and
                      Yorkie JS SDK
                    </p>
                  </div>
                </Link>
              </li>
              <li className="grid_item">
                <Link href="/examples/quill" className="grid_card">
                  <div className="grid_thumbnail">
                    <ExampleThumbnailImage fileName="vanilla-quill.jpg" alt="vanilla-quill" />
                  </div>
                  <div className="grid_card_info">
                    <strong className="title">Quill</strong>
                    <p className="desc">
                      This demo shows the real-time collaborative version of the Quill editor with Yorkie and Vite.
                    </p>
                  </div>
                </Link>
              </li>
              <li className="grid_item">
                <Link href="/examples/calendar" className="grid_card">
                  <div className="grid_thumbnail">
                    <ExampleThumbnailImage fileName="nextjs-scheduler.jpg" alt="nextjs-scheudler" />
                  </div>
                  <div className="grid_card_info">
                    <strong className="title">Calendar</strong>
                    <p className="desc">
                      This demo shows the real-time collaborative version of the Calendar with Yorkie and Next.js.
                    </p>
                  </div>
                </Link>
              </li>
              <li className="grid_item">
                <Link href="/examples/simultaneous-cursors" className="grid_card">
                  <div className="grid_thumbnail">
                    <ExampleThumbnailImage fileName="simultaneous-cursors.jpg" alt="simultaneous-cursors" />
                  </div>
                  <div className="grid_card_info">
                    <strong className="title">Simultaneous Cursors</strong>
                    <p className="desc">
                      This demo shows the real-time collaborative version of simple drawing, cursor animation with
                      Yorkie and React.
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Examples;
