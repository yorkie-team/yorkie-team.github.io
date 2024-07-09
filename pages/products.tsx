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
import { Button, Box, Icon, Heading, Text, Flex, Container, Grid, Link, GridItem, Icons } from 'yorkie-ui';

const Products: NextPage = () => {
  const [documentType, setDocumentType] = useState<keyof typeof DOCUMENT_CODE>('common');
  return (
    <Layout className="product_page">
      <Head>
        <title>Products · Yorkie</title>
      </Head>
      <Container
        paddingBlock={{ base: '6', lg: '20' }}
        margin="auto"
        paddingInline={{ base: '6', lg: '0' }}
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
      >
        <Flex justifyContent="space-between" alignItems="center" flexDirection={{ base: 'column-reverse', lg: 'row' }}>
          <Box>
            <Heading as="h2" fontWeight="bold" fontSize={{ base: '4xl', lg: '5xl' }}>
              Ship faster,
              <br />
              Stay in control
            </Heading>
            <Box fontSize="md" marginTop="6" lineHeight="normal" fontWeight="semibold" color="grey.a9">
              Yorkie provides synchronization primitives such as JSON-like document{' '}
              <Box display={{ base: 'inline', lg: 'block' }} />
              and Peer Awareness API. Dashboard allows for efficient management of documents{' '}
              <Box display={{ base: 'inline', lg: 'block' }} />
              as a document store.
            </Box>
            <Button
              width="100w"
              wLink={{ base: '100w', lg: 'fit' }}
              as="link"
              href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
              icon={<Icons.IconStar />}
              position="start"
              size="xl"
              marginTop="6"
            >
              Start for free
            </Button>
          </Box>
          <Box className="svg-responsive img_box">
            <ProductBannerSVG />
          </Box>
        </Flex>
      </Container>
      <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" borderColor="gray.a5" borderTop="none" />
      <Container
        paddingInline={{ base: '6', lg: '0' }}
        paddingBlock="20"
        margin="auto"
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
      >
        <Grid gridTemplateColumns={{ base: '0', lg: '2' }} alignItems="center">
          <Link href="#document-and-presence">
            <Heading as="h2" fontSize={{ base: '3xl', lg: '5xl' }}>
              Turn anything <br />
              into multiplayer.
            </Heading>
          </Link>
          <Text fontSize="md" lineHeight="relaxed" fontWeight={{ base: 'regular', lg: 'semibold' }}>
            Yorkie allow you to build multiplayer products without the need for database configuration and conflict
            management. This saves time and money.
          </Text>
        </Grid>
        <Box
          borderWidth="1px"
          borderRadius="2xl"
          overflow="hidden"
          marginBlock={{ base: '6', lg: '16' }}
          borderColor="gray.a5"
          borderTop="none"
        />

        <Text fontWeight="semibold" fontSize={{ base: 'xl', lg: '3xl' }} marginTop={{ base: '20', lg: '0' }}>
          Conflict-free state sharing
        </Text>
        <Text marginTop="10" lineHeight="normal" fontWeight={{ base: 'regular', lg: 'semibold' }}>
          Yorkie implements real-time collaboration based on the Conflict-free Replicated Data Type(CRDT) algorithm.
          CRDTs offer a clean and reliable way to resolve conflicts when editing concurrent data, unlike Operational
          Transformation(OT) algorithms which can be complex and may not always ensure convergence. Yorkie&apos;s use of
          the well-proven CRDT algorithm ensures reliable services.
        </Text>
        <Box margin="auto" width="fit" marginTop="14" className="svg-responsive img_box">
          <StateSharingDetailMotion />
        </Box>
        <Text fontWeight="semibold" fontSize={{ base: 'xl', lg: '3xl' }} marginTop="14">
          Document
        </Text>
        <Text marginTop="10" lineHeight="normal" fontWeight={{ base: 'regular', lg: 'semibold' }}>
          Yorkie provides a general-purpose JSON-like{' '}
          <Link href="/docs/js-sdk#document" textDecoration="underline" textDecorationColor="neutral.a12">
            Document
          </Link>{' '}
          to enable complex application models while some CRDT libraries that only offer basic data types.
        </Text>
        <Flex display={{ base: 'block', lg: 'flex' }} gap="4" alignItems="center" marginTop="10">
          <CodeBlock.Wrapper>
            <CodeBlockHeader>
              <CodeBlockHeader.LeftBox>
                <Button
                  variant="ghost"
                  color={documentType == 'common' ? 'neutral.1' : ''}
                  background={documentType == 'common' ? 'neutral.a12' : ''}
                  onClick={() => {
                    setDocumentType('common');
                  }}
                >
                  Common
                </Button>
                <Button
                  variant="ghost"
                  color={documentType == 'text' ? 'neutral.1' : ''}
                  background={documentType == 'text' ? 'neutral.a12' : ''}
                  onClick={() => {
                    setDocumentType('text');
                  }}
                >
                  Text
                </Button>
                <Button
                  variant="ghost"
                  color={documentType == 'counter' ? 'neutral.1' : ''}
                  background={documentType == 'counter' ? 'neutral.a12' : ''}
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
          <Box className="svg-responsive img_box" marginTop={{ base: '6', lg: '0' }}>
            <FlexibleDocumentMotion />
          </Box>
        </Flex>
        <Link href="#collaboration-awareness" fontWeight="semibold" fontSize={{ base: 'xl', lg: '3xl' }} marginTop="14">
          Presence
        </Link>
        <Text marginTop="10" lineHeight="normal" fontWeight={{ base: 'regular', lg: 'semibold' }}>
          You can build a sense of presence by tracking the status of users who are editing the same document with{' '}
          <Link href="/docs/js-sdk#presence" className="link">
            Presence
          </Link>
          .
        </Text>
        <Flex display={{ base: 'block', lg: 'flex' }} gap="4" justifyContent="space-between" marginTop="10">
          <Box className="svg-responsive img_box">
            <ProductAwarenessLeftSVG />
          </Box>
          <Box className="svg-responsive img_box" marginTop={{ base: '6', lg: '0' }}>
            <ProductAwarenessRightSVG />
          </Box>
        </Flex>
        <Link href="#collaboration-awareness" fontWeight="semibold" fontSize={{ base: 'xl', lg: '3xl' }} marginTop="14">
          More features of Yorkie SDK
        </Link>
        <Grid gridTemplateColumns={{ base: '0', lg: '3' }} marginTop="10" gap="6">
          <GridItem borderWidth="1px" borderRadius="md" overflow="hidden" padding="8" borderColor="gray.a11">
            <Text fontSize="lg" fontWeight="semibold" color="neutral.a12">
              SDKs for Mobile &amp; Web
            </Text>
            <Text marginTop="6" fontSize="xs">
              Yorkie SDKs support development for{' '}
              <Link href="/docs/ios-sdk" textDecoration="underline" textDecorationColor="neutral.a12">
                iOS
              </Link>
              ,{' '}
              <Link href="/docs/android-sdk" textDecoration="underline" textDecorationColor="neutral.a12">
                Android
              </Link>{' '}
              and{' '}
              <Link href="/docs/js-sdk" textDecoration="underline" textDecorationColor="neutral.a12">
                Web
              </Link>{' '}
              applications.
            </Text>
          </GridItem>
          <GridItem borderWidth="1px" borderRadius="md" overflow="hidden" padding="8" borderColor="gray.a11">
            <Text fontSize="lg" fontWeight="semibold" color="neutral.a12">
              Size optimization
            </Text>
            <Text marginTop="6" fontSize="xs">
              Yorkie uses{' '}
              <Link
                href="https://github.com/yorkie-team/yorkie/blob/main/design/garbage-collection.md"
                textDecoration="underline"
                textDecorationColor="neutral.a12"
              >
                Garbage Collection
              </Link>{' '}
              and{' '}
              <Link
                href="https://en.wikipedia.org/wiki/Lamport_timestamp"
                textDecoration="underline"
                textDecorationColor="neutral.a12"
              >
                Lamport timestamps
              </Link>{' '}
              to reduce the size of documents.
            </Text>
          </GridItem>
          <GridItem borderWidth="1px" borderRadius="md" overflow="hidden" padding="8" borderColor="gray.a11">
            <Text fontSize="lg" fontWeight="semibold" color="neutral.a12">
              Security
            </Text>
            <Text marginTop="6" fontSize="xs">
              Yorkie uses{' '}
              <Link href="/docs/cli#auth-webhook" textDecoration="underline" textDecorationColor="neutral.a12">
                Auth Webhook
              </Link>{' '}
              allows users to verify the authorization of clients to access documents from an external service.
            </Text>
          </GridItem>
        </Grid>
        <Grid gridTemplateColumns={{ base: '0', lg: '2' }} alignItems="center" marginTop="36">
          <Link href="#dashboard">
            <Heading as="h2" fontSize={{ base: '3xl', lg: '5xl' }} color="neutral.a12">
              Real-time monitoring
              <br />
              anytime, anywhere.
            </Heading>
          </Link>
          <Text fontSize="md" lineHeight="relaxed" fontWeight="semibold" marginTop={{ base: '6', lg: '0' }}>
            Dashboard allows project members to browse stored documents and supervise the data warehouse easily.
          </Text>
        </Grid>
        <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" marginBlock="16" borderColor="gray.a10" />
        <Link href="#collaboration-awareness" fontWeight="semibold" fontSize={{ base: 'xl', lg: '3xl' }} marginTop="6">
          <Icon icon={<Icons.IconCloud />} stroke="#F27B2F" size={{ base: 'lg', lg: 'xl' }} />
          Dashboard
        </Link>
        <Text marginTop={{ base: '6', lg: '10' }} lineHeight="normal" fontWeight="semibold">
          Dashboard in Cloud is accessible from any device without the need for installation.
        </Text>
        <Flex justifyContent="space-between" marginTop="10" gap="2">
          <Box borderWidth="1px" borderRadius="sm" className="svg-responsive img_box" borderColor="gray.a10">
            <ProductPCSVG />
          </Box>
          <Box borderWidth="1px" borderRadius="sm" className="svg-responsive img_box" borderColor="gray.a10">
            <ProductMobileSVG />
          </Box>
        </Flex>
        <Grid gridTemplateColumns={{ base: '0', lg: '2' }} alignItems="center" marginTop="36">
          <Link href="#self-hosted-server">
            <Heading as="h2" fontSize="5xl" color="neutral.a12">
              Build your own
              <br />
              Cluster
            </Heading>
          </Link>
          <Text fontSize="md" lineHeight="relaxed" fontWeight="semibold">
            If needed, Yorkie open source packages allow you to build self-hosted server locally.
          </Text>
        </Grid>
        <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" marginBlock="16" borderColor="gray.a10" />
        <Flex display={{ base: 'flex', lg: 'block' }} flexDirection="column">
          <Box display="inline-block">
            <Flex alignItems="center" gap="4" width="fit">
              <Icon icon={<Icons.IconPackage />} size="2xl" />
              <Text fontWeight="semibold" fontSize="3xl">
                Yorkie open-source package
              </Text>
            </Flex>
          </Box>
          <Box order={{ base: 4, lg: 0 }} display="inline-block" marginTop={{ base: '6', lg: '0' }} float="right">
            <Button
              width="100w"
              wLink={{ base: '100w', lg: 'fit' }}
              float="right"
              marginRight="auto"
              backgroundColor="neutral.a10"
              as="link"
              href="/docs/self-hosted-server"
              icon={<Icons.IconBook />}
              position="start"
              size="xl"
            >
              How to build self-hosted server
            </Button>
          </Box>
          <Text fontWeight="semibold" marginTop="10">
            Yorkie open-source package includes SDKs, a server, and a database, making it easy to implement the
            co-editing feature.
          </Text>
          <Flex marginTop="16" justifyContent="center" className="svg-responsive img_box">
            <ProductPackageSVG />
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Products;
