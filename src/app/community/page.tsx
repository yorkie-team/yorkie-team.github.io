'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '@/components';
import CommunitySVG from '@/public/assets/icons/community_help.svg';
import { Button, Box, Icon, Heading, Text, Flex, Container } from 'yorkie-ui';
import { DiscordIcon, GitHubIcon } from '@/components/Icons/Icons';

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
        <Flex justifyContent="space-between">
          <Box>
            <Heading as="h2" fontSize="6xl" color="black.a9">
              Join our community
            </Heading>
            <Text fontWeight="semibold" paddingBlock="10" lineHeight="normal">
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
            <Flex gap="6">
              <Button
                icon={<DiscordIcon />}
                href="https://discord.gg/MVEAwz9sBy"
                as="link"
                variant="outline"
                position="start"
                size="lg"
              >
                Discord
              </Button>
              <Button
                icon={<GitHubIcon />}
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
          <Box>
            <CommunitySVG />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Community;
