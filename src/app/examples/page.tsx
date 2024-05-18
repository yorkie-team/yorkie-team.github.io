'use client';
import { Layout } from '@/components';
import { Button, Box, Icon, Heading, Text, Flex, Container, Grid, GridItem, Link } from 'yorkie-ui';
import { ExampleThumbnailImage } from '@/components/exampleView';
import ExampleBannerSVG from '@/public/assets/images/banner/img_example_banner.svg';
import type { NextPage } from 'next';
import Head from 'next/head';
import { StarIcon, DiamondIcon } from '@/components/Icons/Icons';
import React from 'react';
import { HoverCardPositioner } from '@ark-ui/react';

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
        <Grid gridTemplateColumns={6} gap={4} marginTop="32">
          <GridItem gridColumnStart={1} gridColumnEnd={3} gridColumn={2} display="grid">
            <Button icon={<DiamondIcon />} position="start" size="lg" variant="ghost" color="black.a9">
              All examples
            </Button>
          </GridItem>
          <GridItem gridColumnStart={3} gridColumnEnd={5} gridColumn={2} display="grid">
            <Link display="block" href="/examples/profile-stack" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <ExampleThumbnailImage fileName="profile-stack.jpg" alt="profile-stack" />
              <Box
                mt="3"
                lineHeight="tight"
                borderWidth="1px"
                borderTop="1px"
                borderCollapse="collapse"
                paddingInline="4"
                paddingBlock="4"
              >
                <Heading as="h3" fontSize="2xl">
                  Profile Stack
                </Heading>
                <Text marginTop="4" fontSize="sm">
                  Profile stack shows the list of users currently accessing the Document.
                </Text>
              </Box>
            </Link>
            <Box marginBlock="4" />
            <Link display="block" href="/examples/todomvc" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <ExampleThumbnailImage fileName="react-todomvc.jpg" alt="react-todomvc" />
              <Box
                mt="3"
                lineHeight="tight"
                borderWidth="1px"
                borderTop="1px"
                borderCollapse="collapse"
                paddingInline="4"
                paddingBlock="4"
              >
                <Heading as="h3" fontSize="2xl">
                  TodoMVC
                </Heading>
                <Text marginTop="4" fontSize="sm">
                  This is an example of real-time collaborative TodoMVC using CreateReactApp and Yorkie JS SDK.
                </Text>
              </Box>
            </Link>
            <Box marginBlock="4" />
            <Link display="block" href="/examples/tldraw" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <ExampleThumbnailImage fileName="react-tldraw.jpg" alt="react-tldraw" />
              <Box
                mt="3"
                lineHeight="tight"
                borderWidth="1px"
                borderTop="1px"
                borderCollapse="collapse"
                paddingInline="4"
                paddingBlock="4"
              >
                <Heading as="h3" fontSize="2xl">
                  tldraw
                </Heading>
                <Text marginTop="4" fontSize="sm">
                  This is a real-time collaboration example of the tldraw whiteboard editor with CreateReactApp and
                  Yorkie JS SDK
                </Text>
              </Box>
            </Link>
            <Box marginBlock="4" />
            <Link display="block" href="/examples/calendar" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <ExampleThumbnailImage fileName="nextjs-scheduler.jpg" alt="nextjs-scheudler" />
              <Box
                mt="3"
                lineHeight="tight"
                borderWidth="1px"
                borderTop="1px"
                borderCollapse="collapse"
                paddingInline="4"
                paddingBlock="4"
              >
                <Heading as="h3" fontSize="2xl">
                  Calendar
                </Heading>
                <Text marginTop="4" fontSize="sm">
                  This demo shows the real-time collaborative version of the Calendar with Yorkie and Next.js.
                </Text>
              </Box>
            </Link>
          </GridItem>
          <GridItem gridColumnStart={5} gridColumnEnd={8} gridColumn={2} display="grid">
            <Link display="block" href="/examples/profile-stack" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <ExampleThumbnailImage fileName="vuejs-kanban.jpg" alt="vuejs-kanban" />
              <Box
                mt="3"
                lineHeight="tight"
                borderWidth="1px"
                borderTop="1px"
                borderCollapse="collapse"
                paddingInline="4"
                paddingBlock="4"
              >
                <Heading as="h3" fontSize="2xl">
                  Kanban Board
                </Heading>
                <Text marginTop="4" fontSize="sm">
                  Kanban Board is a tool for managing tasks and workflow. It is a visual way to manage tasks and
                  workflow.
                </Text>
              </Box>
            </Link>
            <Box marginBlock="4" />
            <Link display="block" href="/examples/codemirror" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <ExampleThumbnailImage fileName="vanilla-codemirror6.jpg" alt="vanilla-codemirror6" />
              <Box
                mt="3"
                lineHeight="tight"
                borderWidth="1px"
                borderTop="1px"
                borderCollapse="collapse"
                paddingInline="4"
                paddingBlock="4"
              >
                <Heading as="h3" fontSize="2xl">
                  CodeMirror
                </Heading>
                <Text marginTop="4" fontSize="sm">
                  This is a real-time collaborative version of the CodeMirror editor. It uses the Text, a custom CRDT
                  type from Yorkie.
                </Text>
              </Box>
            </Link>
            <Box marginBlock="4" />
            <Link display="block" href="/examples/quill" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <ExampleThumbnailImage fileName="vanilla-quill.jpg" alt="vanilla-quill" />
              <Box
                mt="3"
                lineHeight="tight"
                borderWidth="1px"
                borderTop="1px"
                borderCollapse="collapse"
                paddingInline="4"
                paddingBlock="4"
              >
                <Heading as="h3" fontSize="2xl">
                  Quill
                </Heading>
                <Text marginTop="4" fontSize="sm">
                  This demo shows the real-time collaborative version of the Quill editor with Yorkie and Vite.
                </Text>
              </Box>
            </Link>
            <Box marginBlock="4" />
            <Link
              display="block"
              href="/examples/simultaneous-cursors"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <ExampleThumbnailImage fileName="vanilla-quill.jpg" alt="vanilla-quill" />
              <Box
                mt="3"
                lineHeight="tight"
                borderWidth="1px"
                borderTop="1px"
                borderCollapse="collapse"
                paddingInline="4"
                paddingBlock="4"
              >
                <Heading as="h3" fontSize="2xl">
                  Simultaneous Cursors
                </Heading>
                <Text marginTop="4" fontSize="sm">
                  This demo shows the real-time collaborative version of simple drawing, cursor animation with Yorkie
                  and React.
                </Text>
              </Box>
            </Link>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Examples;
