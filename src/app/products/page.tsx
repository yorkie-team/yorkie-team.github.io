'use client';

import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classNames from 'classnames';
import { Layout, CodeBlock, CodeBlockHeader } from '@/components';
import { StateSharingDetailMotion, FlexibleDocumentMotion } from '@/components/motions';
import ProductBannerSVG from '@/public/assets/images/banner/img_product_banner.svg';
import ProductAwarenessLeftSVG from '@/public/assets/images/banner/img_product_awareness_left.svg';
import ProductAwarenessRightSVG from '@/public/assets/images/banner/img_product_awareness_right.svg';
import ProductPCSVG from '@/public/assets/images/banner/img_product_pc.svg';
import ProductMobileSVG from '@/public/assets/images/banner/img_product_mobile.svg';
import ProductPackageSVG from '@/public/assets/images/banner/img_product_package.svg';
import { DOCUMENT_CODE } from '@/codes/document';
import { Button, Box, Icon, Heading, Text, Flex, Container, Grid, Link, GridItem } from 'yorkie-ui';
import { StarIcon, CloudIcon, PackageIcon, BookIcon, SmileIcon } from '@/components/Icons/Icons';

const Products: NextPage = () => {
  const [documentType, setDocumentType] = useState<keyof typeof DOCUMENT_CODE>('common');
  return (
    <Layout className="product_page">
      <Head>
        <title>Products · Yorkie</title>
      </Head>
      <Container
        paddingBlock="20"
        margin="auto"
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Heading as="h2" fontWeight="bold" fontSize={{ base: 'sm', md: '5xl', lg: '67xl' }}>
              Ship faster,
              <br />
              Stay in control
            </Heading>
            <Text fontSize="md" marginTop="6" lineHeight="normal">
              Yorkie provides synchronization primitives such as JSON-like document{' '}
              <Box display={{ base: 'inline', lg: 'block' }} />
              and Peer Awareness API. Dashboard allows for efficient management of documents{' '}
              <Box display={{ base: 'inline', lg: 'block' }} />
              as a document store.
            </Text>
            <Button
              as="link"
              href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
              icon={<StarIcon />}
              position="start"
              size="xl"
              marginTop="6"
            >
              Start for free
            </Button>
          </Box>
          <ProductBannerSVG />
        </Flex>
      </Container>
      <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" />
      <Container
        paddingBlock="20"
        margin="auto"
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
      >
        <Grid columns="2" alignItems="center">
          <Link href="#document-and-presence">
            <Heading as="h2" fontSize="6xl">
              Turn anything <br />
              into multiplayer.
            </Heading>
          </Link>
          <Text fontSize="md" lineHeight="relaxed" fontWeight="semibold">
            Yorkie allow you to build multiplayer products without the need for database configuration and conflict
            management. This saves time and money.
          </Text>
        </Grid>
        <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" marginBlock="16" />

        <Text fontWeight="semibold" fontSize="3xl">
          Conflict-free state sharing
        </Text>
        <Text marginTop="10" lineHeight="normal" fontWeight="semibold">
          Yorkie implements real-time collaboration based on the Conflict-free Replicated Data Type(CRDT) algorithm.
          CRDTs offer a clean and reliable way to resolve conflicts when editing concurrent data, unlike Operational
          Transformation(OT) algorithms which can be complex and may not always ensure convergence. Yorkie&apos;s use of
          the well-proven CRDT algorithm ensures reliable services.
        </Text>
        <Box margin="auto" width="fit" marginTop="14">
          <StateSharingDetailMotion />
        </Box>
        <Text fontWeight="semibold" fontSize="3xl" marginTop="14">
          Document
        </Text>
        <Text marginTop="10" lineHeight="normal" fontWeight="semibold">
          Yorkie provides a general-purpose JSON-like{' '}
          <Link href="/docs/js-sdk#document" textDecoration="underline" textDecorationColor="black.a9">
            Document
          </Link>{' '}
          to enable complex application models while some CRDT libraries that only offer basic data types.
        </Text>
        <Flex gap="4" alignItems="center" marginTop="10">
          <CodeBlock.Wrapper>
            <CodeBlockHeader>
              <CodeBlockHeader.LeftBox>
                <Button
                  variant="ghost"
                  color={documentType == 'common' ? 'white' : ''}
                  background={documentType == 'common' ? 'black.a9' : ''}
                  onClick={() => {
                    setDocumentType('common');
                  }}
                >
                  Common
                </Button>
                <Button
                  variant="ghost"
                  color={documentType == 'text' ? 'white' : ''}
                  background={documentType == 'text' ? 'black.a9' : ''}
                  onClick={() => {
                    setDocumentType('text');
                  }}
                >
                  Text
                </Button>
                <Button
                  variant="ghost"
                  color={documentType == 'counter' ? 'white' : ''}
                  background={documentType == 'counter' ? 'black.a9' : ''}
                  onClick={() => {
                    setDocumentType('counter');
                  }}
                >
                  Counter
                </Button>
              </CodeBlockHeader.LeftBox>
              <CodeBlockHeader.RightBox>
                <CodeBlockHeader.CopyButton value={DOCUMENT_CODE[documentType]} />
              </CodeBlockHeader.RightBox>
            </CodeBlockHeader>
            <CodeBlock code={DOCUMENT_CODE[documentType]} language="javascript" withLineNumbers />
          </CodeBlock.Wrapper>
          <Box>
            <FlexibleDocumentMotion />
          </Box>
        </Flex>
        <Link href="#collaboration-awareness" fontWeight="semibold" fontSize="3xl" marginTop="14">
          Presence
        </Link>
        <Text marginTop="10" lineHeight="normal" fontWeight="semibold">
          You can build a sense of presence by tracking the status of users who are editing the same document with{' '}
          <Link href="/docs/js-sdk#presence" className="link">
            Presence
          </Link>
          .
        </Text>
        <Flex gap="4" justifyContent="space-between" marginTop="10">
          <Box>
            <ProductAwarenessLeftSVG />
          </Box>
          <Box>
            <ProductAwarenessRightSVG />
          </Box>
        </Flex>
        <Link href="#collaboration-awareness" fontWeight="semibold" fontSize="3xl" marginTop="14">
          More features of Yorkie SDK
        </Link>
        <Grid columns="3" marginTop="10" gap="6">
          <GridItem borderWidth="1px" borderRadius="md" overflow="hidden" padding="8">
            <Text fontSize="lg" fontWeight="semibold" color="black.a9">
              SDKs for Mobile &amp; Web
            </Text>
            <Text marginTop="6" fontSize="xs">
              Yorkie SDKs support development for{' '}
              <Link href="/docs/ios-sdk" textDecoration="underline" textDecorationColor="black.a9">
                iOS
              </Link>
              ,{' '}
              <Link href="/docs/android-sdk" textDecoration="underline" textDecorationColor="black.a9">
                Android
              </Link>{' '}
              and{' '}
              <Link href="/docs/js-sdk" textDecoration="underline" textDecorationColor="black.a9">
                Web
              </Link>{' '}
              applications.
            </Text>
          </GridItem>
          <GridItem borderWidth="1px" borderRadius="md" overflow="hidden" padding="8">
            <Text fontSize="lg" fontWeight="semibold" color="black.a9">
              Size optimization
            </Text>
            <Text marginTop="6" fontSize="xs">
              Yorkie uses{' '}
              <Link
                href="https://github.com/yorkie-team/yorkie/blob/main/design/garbage-collection.md"
                textDecoration="underline"
                textDecorationColor="black.a9"
              >
                Garbage Collection
              </Link>{' '}
              and{' '}
              <Link
                href="https://en.wikipedia.org/wiki/Lamport_timestamp"
                textDecoration="underline"
                textDecorationColor="black.a9"
              >
                Lamport timestamps
              </Link>{' '}
              to reduce the size of documents.
            </Text>
          </GridItem>
          <GridItem borderWidth="1px" borderRadius="md" overflow="hidden" padding="8">
            <Text fontSize="lg" fontWeight="semibold" color="black.a9">
              Security
            </Text>
            <Text marginTop="6" fontSize="xs">
              Yorkie uses{' '}
              <Link href="/docs/cli#auth-webhook" textDecoration="underline" textDecorationColor="black.a9">
                Auth Webhook
              </Link>{' '}
              allows users to verify the authorization of clients to access documents from an external service.
            </Text>
          </GridItem>
        </Grid>
        <Grid columns="2" alignItems="center" marginTop="36">
          <Link href="#dashboard">
            <Heading as="h2" fontSize="5xl" color="black.a9">
              Real-time monitoring
              <br />
              anytime, anywhere.
            </Heading>
          </Link>
          <Text fontSize="md" lineHeight="relaxed" fontWeight="semibold">
            Dashboard allows project members to browse stored documents and supervise the data warehouse easily.
          </Text>
        </Grid>
        <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" marginBlock="16" />
        <Link href="#collaboration-awareness" fontWeight="semibold" fontSize="3xl" marginTop="6">
          <Icon icon={<CloudIcon />} stroke="#F27B2F" size="xl" />
          Dashboard
        </Link>
        <Text marginTop="10" lineHeight="normal" fontWeight="semibold">
          Dashboard in Cloud is accessible from any device without the need for installation.
        </Text>
        <Flex justifyContent="space-between" marginTop="10">
          <Box borderWidth="1px" borderRadius="sm">
            <ProductPCSVG />
          </Box>
          <Box borderWidth="1px" borderRadius="sm">
            <ProductMobileSVG />
          </Box>
        </Flex>
        <Grid columns="2" alignItems="center" marginTop="36">
          <Link href="#self-hosted-server">
            <Heading as="h2" fontSize="5xl" color="black.a9">
              Build your own
              <br />
              Cluster
            </Heading>
          </Link>
          <Text fontSize="md" lineHeight="relaxed" fontWeight="semibold">
            If needed, Yorkie open source packages allow you to build self-hosted server locally.
          </Text>
        </Grid>
        <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" marginBlock="16" />
        <Flex justifyContent="space-between">
          <Flex alignItems="center" gap="4">
            <Icon icon={<PackageIcon />} size="2xl" />
            <Text fontWeight="semibold" fontSize="3xl">
              Yorkie open-source package
            </Text>
          </Flex>
          <Button
            backgroundColor="black.a9"
            as="link"
            href="/docs/self-hosted-server"
            icon={<BookIcon />}
            position="start"
            size="xl"
          >
            How to build self-hosted server
          </Button>
        </Flex>
        <Text fontWeight="semibold" marginTop="10">
          Yorkie open-source package includes SDKs, a server, and a database, making it easy to implement the co-editing
          feature.
        </Text>
        <Flex marginTop="16" justifyContent="center">
          <ProductPackageSVG />
        </Flex>
      </Container>
    </Layout>
  );
};

export default Products;
