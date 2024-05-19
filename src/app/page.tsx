'use client';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout, CodeBlock, CodeBlockHeader } from '@/components';
import { Button, Box, Icon, Heading, Text, Flex, Accordion, Container, Grid, GridItem } from 'yorkie-ui';
import { StarIcon, BookIcon, MessageSquareIcon, TwinkleIcon, SmileIcon } from '@/components/Icons/Icons';
import { ChartMotion, StateSharingMotion, ServerMotion, MainBannerMotion } from '@/components/motions';
import UserGroupSVG from '@/public/assets/icons/icon_service_main_users_group.svg';
import CollaboProfileSVG from '@/public/assets/icons/icon_collaborate_profile.svg';
import CollaboCursorSVG from '@/public/assets/icons/icon_collaborate_cursor.svg';
import CollaboSelectionSVG from '@/public/assets/icons/icon_collaborate_selection.svg';
import CollaboEditingSVG from '@/public/assets/icons/icon_collaborate_editing.svg';
import { FEATURES_CODE } from '@/codes/features';

type FeatureType = keyof typeof FEATURES_CODE;
const Home: NextPage = () => {
  const [bannerActive, setBannerActive] = useState(false);
  const [activeFeatureCard, setActiveFeatureCard] = useState<FeatureType>('profile');
  const [activeFeatureCode, setActiveFeatureCode] = useState({ type: 'js', info: FEATURES_CODE.profile.js });
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Svelte', value: 'svelte', disabled: true },
    { label: 'Vue', value: 'vue' },
  ];
  useEffect(() => {
    const handleVisualSize = () => {
      const $visual = document.querySelector('.homepage svg') as HTMLElement;
      if (!$visual) return;

      const SVG_ASPECT_RATIO = 1512 / 868;
      const HEADER_HEIGHT = 64;
      const scale = window.innerWidth / ((window.innerHeight - HEADER_HEIGHT) * SVG_ASPECT_RATIO);
      $visual.style.setProperty('scale', scale < 1 ? '1' : `${scale}`);
    };
    window.addEventListener('resize', handleVisualSize);
    handleVisualSize();

    return () => {
      window.removeEventListener('resize', handleVisualSize);
    };
  }, []);

  const onClickOne = (e: any) => {
    const target = (e.target as Element).closest('.service_card_menu');
    if (!target) return;

    const featureType = target.getAttribute('data-item') as FeatureType;
    const codeType = FEATURES_CODE[featureType].tabOrder[0];
    setActiveFeatureCard(featureType);
    setActiveFeatureCode({
      type: codeType,
      info: (FEATURES_CODE[featureType] as any)[codeType],
    });
  };
  const handleClick = () => {
    console.log('Button clicked');
  };
  // TODO(hackerwins): Remove examples condition when examples are ready.
  return (
    <Layout>
      <Head>
        <title>Yorkie</title>
      </Head>

      <Box position="relative">
        <Box margin="auto" width="screen" className="homepage">
          <MainBannerMotion bannerActive={bannerActive} />
        </Box>
        <Box position="absolute" margin="auto" top="0" left="0" bottom="0" right="0" width="fit" height="fit">
          <Heading as="h2" align="center" fontWeight="bold" fontSize={{ base: 'sm', md: '5xl', lg: '8xl' }}>
            Bring
            <Box color="orange.default" className={classNames('point', { is_hover: bannerActive })}>
              collaboration
              <Box className="bg"></Box>
            </Box>
            <Box className="text">to your app</Box>
          </Heading>
          <Flex justifyContent="center">
            <Button
              as="link"
              marginTop="10"
              onClick={handleClick}
              onPointerOver={() => setBannerActive(true)}
              onPointerOut={() => setBannerActive(false)}
              icon={<StarIcon />}
              position="start"
              size="xl"
            >
              Start for free
            </Button>
          </Flex>
          <Text fontSize="md" fontWeight="semibold" marginTop="10">
            Unlock the full potential of real-time collaboration with open-source SDKs and API package.
          </Text>
        </Box>
      </Box>
      <Container
        margin="auto"
        width={{ sm: 'breakpoint-sm', md: 'breakpoint-md', lg: 'breakpoint-lg', xl: 'breakpoint-xl' }}
      >
        <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" marginTop="60">
          <Flex
            borderWidth="1px"
            borderBottom="1px"
            justifyContent="space-between"
            alignItems="center"
            paddingInline="8"
            paddingBlock="5"
          >
            <Heading align="center" as="h2" fontWeight="semibold" fontSize="xl">
              Extend Your App with Yorkie
            </Heading>
            <span className="icon">
              <UserGroupSVG />
            </span>
          </Flex>
          <Box className="homepage__bg-point" position="relative" paddingBlock="24">
            <Box zIndex="xs" position="relative">
              <Text fontSize="6xl" fontWeight="semibold" align="center">
                Make your product
              </Text>
              <Box display="flex" justifyContent="center">
                <Text
                  fontSize="6xl"
                  fontWeight="semibold"
                  position="relative"
                  borderX="md"
                  borderY="md"
                  overflow="hidden"
                  borderStyle="dashed"
                  borderColor="orange.default"
                  borderRadius="2xl"
                  paddingInline="2"
                  marginRight="3"
                >
                  collaborative
                </Text>
                <Text fontSize="6xl" fontWeight="semibold" paddingTop="1">
                  in a flash!
                </Text>
              </Box>
            </Box>
            <Text align="center" color="black.a8" fontWeight="semibold" marginTop="8" fontSize="md" lineHeight="normal">
              Easily add collaboration to your apps with our API-based services. <br /> Sign up now and start building
              powerful, high-performance collaborative features in no time.
            </Text>
            <Flex gap="6" marginTop="12" justifyContent="center">
              <Button as="link" href="/docs/getting-started" icon={<BookIcon />} position="start" size="xl">
                Getting Started
              </Button>
              <Button as="link" href="/docs" variant="outline" icon={<BookIcon />} position="start" size="xl">
                Read documentation
              </Button>
            </Flex>
          </Box>
        </Box>
        <Box marginTop="40">
          <Text fontSize="6xl" fontWeight="semibold" align="center">
            Variety of <br className="br_mo" /> collaboration features <br /> for your app
          </Text>
          <Text align="center" color="black.a8" fontWeight="semibold" marginTop="8" fontSize="md" lineHeight="normal">
            Easily add stable and diverse collaborative features <br className="br_mo" />
            to your product with Yorkie. <br />
            Transform your local-based product into a <br className="br_mo" /> collaborative online experience with our
            powerful tools. <br />
            Sign up now and start providing your users <br className="br_mo" /> with a completely new real-time
            experience.
          </Text>
          <Grid gridTemplateColumns={6} gap={4} marginTop="32">
            <GridItem gridColumnStart={1} gridColumnEnd={3} gridColumn={2} display="grid">
              <Box className="service_card_list">
                <div
                  onClick={(e) => onClickOne(e)}
                  className={classNames('service_card_item', { is_active: activeFeatureCard === 'profile' })}
                >
                  <button type="button" className="service_card_menu" data-item="profile">
                    <span className="img_box">
                      <CollaboProfileSVG />
                    </span>
                    <Text fontSize="xl" fontWeight="semibold" paddingTop="28">
                      Profile Stack
                    </Text>
                    <Text fontSize="sm" lineHeight="normal" marginTop="4">
                      The Profile Stack feature shows the profile of the current users in real-time to announce that
                      multiple users are connected at the same time.
                    </Text>
                  </button>
                </div>
                <div className={classNames('service_card_item', { is_active: activeFeatureCard === 'cursor' })}>
                  <Box className="service_card_menu" data-item="cursor">
                    <span className="img_box">
                      <CollaboCursorSVG />
                    </span>
                    <Text fontSize="xl" fontWeight="semibold" paddingTop="28">
                      Multi-Cursor
                    </Text>
                    <Text fontSize="sm" lineHeight="normal" marginTop="4">
                      The Multi-Cursor shows the location of the cursor of the users who accessed the same canvas in
                      real-time. Each cursor shows the user&#39;s nickname and role as needed.
                    </Text>
                  </Box>
                </div>
                {/* {process.env.NODE_ENV === 'development' && (
                <>
                  <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'selection' })}>
                    <Box className="service_card_menu" data-item="selection">
                      <span className="img_box">
                        <CollaboSelectionSVG />
                      </span>
                      <Text fontSize="xl" fontWeight="semibold" paddingTop="28">
                        Live Selection
                      </Text>
                      <Text fontSize="sm" lineHeight="normal" marginTop="4">
                        Live Selection displays the object selected by each user who accesses the same canvas. Users can
                        see what each other is doing in real-time.
                      </Text>
                    </Box>
                  </li>
                  <li className={classNames('service_card_item', { is_active: activeFeatureCard === 'editing' })}>
                    <Box className="service_card_menu" data-item="editing">
                      <span className="img_box">
                        <CollaboEditingSVG />
                      </span>
                      <Text fontSize="xl" fontWeight="semibold" paddingTop="28">
                        Multiplayer Editing
                      </Text>
                      <Text fontSize="sm" lineHeight="normal" marginTop="4">
                        Interact in real-time with the presence of others and edit material together. Any real-time
                        interaction, such as texting, drawing, commenting, or expressing emotion, could be shared with
                        Yorkie.
                      </Text>
                    </Box>
                  </li>
                </>
              )} */}
              </Box>
            </GridItem>
            <GridItem
              gridColumnStart={3}
              gridColumnEnd={8}
              gridColumn={4}
              display="grid"
              fontSize="xs"
              className="homepage__codeblock"
              height="90"
            >
              <CodeBlock.Wrapper>
                <CodeBlockHeader>
                  <CodeBlockHeader.LeftBox>
                    {FEATURES_CODE[activeFeatureCard].tabOrder.map((codeType) => (
                      <Button
                        type="button"
                        key={codeType}
                        className={classNames('btn_item', { is_active: activeFeatureCode.type === codeType })}
                        onClick={() =>
                          setActiveFeatureCode({
                            type: codeType,
                            info: (FEATURES_CODE[activeFeatureCard] as any)[codeType],
                          })
                        }
                      >
                        {(FEATURES_CODE[activeFeatureCard] as any)[codeType].title}
                      </Button>
                    ))}
                  </CodeBlockHeader.LeftBox>
                  <CodeBlockHeader.RightBox>
                    <CodeBlockHeader.CopyButton value={activeFeatureCode.info.code} />
                  </CodeBlockHeader.RightBox>
                </CodeBlockHeader>
                <CodeBlock
                  code={activeFeatureCode.info.code}
                  language={activeFeatureCode.info.language as any}
                  withLineNumbers
                />
              </CodeBlock.Wrapper>
            </GridItem>
          </Grid>
        </Box>
        {/* {process.env.NODE_ENV === 'development' && (
          <section className="section">
            <h2 className="section_title">
              What experiences <br />
              can you create
              <br className="br_mo_xs" /> with Yorkie?
            </h2>
            <p className="section_desc">Test our examples to add diverse collaborative features to your product.</p>
            <div className="section_content draw">
              <div className="draw_box"></div>
              <div className="draw_box"></div>
            </div>
            <Button as="link" href="/examples" className="orange_0" icon={<Icon type="bulb" />}>
              View all examples
            </Button>
          </section>
        )} */}
        <Box marginTop="40">
          <Heading as="h2" fontSize="6xl" fontWeight="semibold" align="center">
            Stable.
            <br />
            Reliable.
            <br />
            Manageable.
          </Heading>
          <Grid gridTemplateColumns={10} justifyContent="space-between" marginTop="24">
            <GridItem gridColumnStart={1} gridColumnEnd={10} gridColumn={6}>
              <Flex>
                <StateSharingMotion />
              </Flex>
            </GridItem>
            <GridItem gridColumnStart={11} gridColumnEnd={12} gridColumn={3}>
              <Box>
                <Text fontSize="2xl" fontWeight="semibold" color="black.a9">
                  Document and Presence
                </Text>
                <Text fontSize="md" marginTop="6" fontWeight="medium" color="black.a9">
                  Document is stored using conflict-free replicated data types(CRDTs), which ensures that multiple users
                  can edit the same data concurrently without encountering conflicts. Presence represents a peer&apos;s
                  awareness of the data being edited. It is used to track which users are currently editing the
                  document.
                </Text>
                <Button
                  as="link"
                  href="/products#document-and-presence"
                  backgroundColor="black.a9"
                  icon={<BookIcon />}
                  position="start"
                  size="lg"
                  marginTop="6"
                >
                  Learn more about Document and Presence
                </Button>
              </Box>
            </GridItem>
          </Grid>
          <Grid gridTemplateColumns={10} justifyContent="space-between" marginTop="24">
            <GridItem gridColumnStart={1} gridColumnEnd={10} gridColumn={6}>
              <Box>
                <ChartMotion />
              </Box>
            </GridItem>
            <GridItem gridColumnStart={11} gridColumnEnd={12} gridColumn={3}>
              <Box>
                <Text fontSize="xl" fontWeight="semibold" color="black.a9">
                  Data Warehouse with Dashboard
                </Text>
                <Text fontSize="md" marginTop="6" fontWeight="medium" color="black.a9">
                  Dashboard allows users to easily browse stored documents and monitor the data warehouse in real-time.
                  With Dashboard, users can quickly and easily supervise the data warehouse and ensure that it is
                  functioning properly.
                </Text>
                <Button
                  as="link"
                  href="/products#dashboard"
                  backgroundColor="black.a9"
                  icon={<BookIcon />}
                  position="start"
                  size="lg"
                  marginTop="6"
                >
                  Learn more about Dashboard
                </Button>
              </Box>
            </GridItem>
          </Grid>
          <Grid gridTemplateColumns={10} justifyContent="space-between" marginTop="24">
            <GridItem gridColumnStart={1} gridColumnEnd={10} gridColumn={6}>
              <Box>
                <ServerMotion />
              </Box>
            </GridItem>
            <GridItem gridColumnStart={11} gridColumnEnd={12} gridColumn={3}>
              <Box>
                <Text fontSize="xl" fontWeight="semibold" color="black.a9">
                  Cloud or Self-Hosted Server
                </Text>
                <Text fontSize="md" marginTop="6" fontWeight="medium" color="black.a9">
                  Yorkie offers flexible deployment options, allowing user to use a cloud or host the server on your own
                  premises. Whether you want the convenience of cloud or the control of a self-hosted server, Yorkie has
                  you covered.
                </Text>
                <Button
                  as="link"
                  href="/products#self-hosted-server"
                  backgroundColor="black.a9"
                  icon={<BookIcon />}
                  position="start"
                  size="lg"
                  marginTop="6"
                >
                  Learn more about Self-Hosted Server
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </Box>
        <Box marginBlock="40">
          <Heading as="h2" fontSize="6xl" align="center">
            FAQ
          </Heading>
          <Accordion.Root collapsible marginTop="14">
            <Accordion.Item value="question-one">
              <Accordion.ItemTrigger>
                <Flex alignItems="center" gap="3">
                  <Icon icon={<MessageSquareIcon />} position="start" size="lg" />
                  <Text color="black.a8" size="3xl">
                    Can we use the Yorkie for free?
                  </Text>
                </Flex>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Text size="md" lineHeight="normal" color="black.a11">
                  Yes, Yorkie is free to use. <br />
                  <br />
                  You can access it at no cost. Please note that the availability of the service and any associated
                  features may be subject to change without notice. It is always a good idea to check the latest
                  information on the service&apos;s website to ensure that it is still available and meets your needs.
                </Text>
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="question-two">
              <Accordion.ItemTrigger>
                <Flex alignItems="center" gap="3">
                  <Icon icon={<MessageSquareIcon />} position="start" size="lg" />
                  <Text color="black.a8" size="3xl">
                    Is the Yorkie production ready?
                  </Text>
                </Flex>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Text size="md" lineHeight="normal" color="black.a11">
                  No, Yorkie is not yet production ready. <br />
                  <br />
                  While the CRDT algorithm has been verified, not all of the code has been fully battle-tested. The
                  developers of the service currently estimate that the right time to use it in a production environment
                  will be <b>around summer of &apos;24</b>. Until then, it is recommended to carefully evaluate the
                  service&apos;s capabilities and reliability before using it in a production setting. It is also
                  important to note that the availability and features of the service may change without notice, so it
                  is always best to check the latest information on the service&apos;s website before using it.
                </Text>
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="question-three">
              <Accordion.ItemTrigger>
                <Flex alignItems="center" gap="3">
                  <Icon icon={<MessageSquareIcon />} position="start" size="lg" />
                  <Text color="black.a8" size="3xl">
                    How can I contribute to the Yorkie project?
                  </Text>
                </Flex>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Text size="md" lineHeight="normal" color="black.a11">
                  Yorkie is an open source project, so there are many ways to contribute to its development. <br />
                  <br />
                  One way to contribute is by reporting any bugs you encounter while using the service. You can also
                  submit pull requests with improvements or new features that you have developed. If you plan to use
                  Yorkie in your company, you can also consider donating to the Yorkie community to support its
                  continued development. You can learn more about how to contribute to the Yorkie project on its website
                  or by visiting our{' '}
                  <u>
                    <a href="https://discord.com/invite/MVEAwz9sBy">Discord</a>
                  </u>
                  .
                </Text>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
          <Flex gap="6" marginTop="16" justifyContent="center">
            <Button
              as="link"
              href="https://discord.gg/MVEAwz9sBy"
              variant="outline"
              icon={<SmileIcon />}
              position="start"
              size="xl"
            >
              Contact
            </Button>
            <Button
              as="link"
              href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}
              icon={<TwinkleIcon />}
              position="start"
              size="xl"
            >
              Start for free
            </Button>
          </Flex>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
