'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '@/components';
import CommunitySVG from '@/public/assets/icons/community_help.svg';
import { Button, Box, Heading, Text, Flex, Container, IconDiscord, IconGitHub } from 'yorkie-ui';

const Community: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Community · Yorkie</title>
      </Head>
      <Container
        margin="auto"
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
      >
        <Flex
          justifyContent="space-between"
          flexDirection="column"
          paddingInline={{ base: '6', lg: '0' }}
          paddingBlock={{ base: '12', lg: '40' }}
        >
          <Heading as="h2" fontSize={{ base: '3xl', lg: '6xl' }} color="neutral.a12">
            Join our community
          </Heading>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ base: 'column-reverse', lg: 'row' }}
          >
            <Box>
              <Box fontWeight="semibold" paddingBottom="10" lineHeight="normal">
                If you have any questions along the way,
                <Text display={{ base: 'block', lg: 'none' }} /> please don’t hesitate to ask us
                <Text display={{ base: 'block', sm: 'none' }} /> through our
                <Text display={{ base: 'block', lg: 'none' }} />
                <Text display={{ base: 'block', lg: 'none' }} />
                channels.
                <Text display={{ base: 'block' }} /> You can sign up for our Discord or
                <Text display={{ base: 'block', lg: 'none' }} /> raise GitHub
                <Text display={{ base: 'block', sm: 'none' }} /> discussions.
              </Box>
              <Flex gap="6" justifyContent={{ base: 'space-evenly', lg: 'flex-start' }}>
                <Button
                  icon={<IconDiscord />}
                  className="fillSVG"
                  stroke="neutral.11"
                  href="https://discord.gg/MVEAwz9sBy"
                  as="link"
                  variant="outline"
                  position="start"
                  size="lg"
                >
                  Discord
                </Button>
                <Button
                  icon={<IconGitHub />}
                  stroke="neutral.11"
                  className="fillSVG"
                  href="https://github.com/yorkie-team/dashboard/issues"
                  as="link"
                  variant="outline"
                  position="start"
                  size="lg"
                >
                  GitHub
                </Button>
              </Flex>
            </Box>
            <Box paddingBlock={{ base: '12', lg: '0' }}>
              <CommunitySVG />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Community;
