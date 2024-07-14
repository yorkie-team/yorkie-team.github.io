import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '@/components';
import { Button, Icon, Box, Heading, Text, Flex, Icons, Container } from 'yorkie-ui';
import Error404SVG from '@/public/assets/icons/error_404.svg';

const Custom404: NextPage = () => {
  return (
    <Layout shortFooter>
      <Head>
        <title>Page not found · Yorkie</title>
      </Head>
      <Container
        paddingBlock={{ base: '6', lg: '20' }}
        margin="auto"
        paddingInline={{ base: '6', lg: '0' }}
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
      >
        <Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent="space-evenly">
          <Heading as="h2" fontSize="3xl" display="none">
            404 : not found
          </Heading>
          <div>
            <Error404SVG />
          </div>
          <Box>
            <Text fontSize="4xl" fontWeight="semibold">
              Oops! Wait a minute... <br />
              Yorkie ate your request
            </Text>
            <Text marginBlock="10">
              The page you are looking for might be
              <br className="br_mo" /> removed or is temporarily unavailable.
            </Text>
            <Flex gap="6" flexDirection={{ base: 'column', lg: 'row' }}>
              <Button as="link" href="/" position="start" icon={<Icon icon={<Icons.IconBackHome />} />}>
                Back to home
              </Button>
              <Button
                as="link"
                href="https://discord.gg/MVEAwz9sBy"
                background="grey.a9"
                variant="outline"
                position="start"
                stroke="neutral.11"
                className="fillSVG"
                icon={<Icons.IconDiscord />}
              >
                Discord
              </Button>
              <Button
                as="link"
                href="https://github.com/yorkie-team/dashboard/issues"
                background="grey.a9"
                stroke="neutral.11"
                className="fillSVG"
                variant="outline"
                position="start"
                icon={<Icons.IconGithub />}
              >
                GitHub
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Custom404;
