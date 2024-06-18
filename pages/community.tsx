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
          <Heading as="h2" fontSize={{ base: '3xl', lg: '6xl' }} color="black.a9">
            Join our community
          </Heading>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ base: 'column-reverse', lg: 'row' }}
          >
            <Box>
              <Text fontWeight="semibold" paddingBottom="10" lineHeight="normal">
                If you have any questions along the way,
                <br className="br_mo" /> please don’t hesitate to ask us
                <br className="br_tablet" /> through our
                <br className="br_mo" />
                <br className="br_pc" />
                channels.
                <br className="br_mo_xs" /> You can sign up for our Discord or
                <br className="br_mo" /> raise GitHub
                <br className="br_tablet" /> discussions.
              </Text>
              <Flex gap="6" justifyContent={{ base: 'space-evenly', lg: 'flex-start' }}>
                <Button
                  icon={<IconDiscord />}
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
