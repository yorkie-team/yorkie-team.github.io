import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { Icon } from '@/components';
import { SidebarContextProvider, useSidebarContext } from './Sidebar.context';
import { SidebarTabs, SidebarTabsList, SidebarTabsTab, SidebarTabsPanel } from './SidebarTabs';
import { Button, Flex } from 'yorkie-ui-test';

export function Sidebar({
  defaultOpened = true,
  wide = false,
  children,
}: {
  defaultOpened?: boolean;
  wide?: boolean;
  children?: React.ReactNode;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(defaultOpened);

  useEffect(() => {
    setIsOpened(defaultOpened);
  }, [defaultOpened]);

  return (
    <SidebarContextProvider
      value={{
        isOpened,
        setIsOpened,
        wide,
      }}
    >
      <div className={classNames('sidebar', { type_shadow: !defaultOpened, is_hide: !isOpened, type_wide: wide })}>
        {children}
      </div>
    </SidebarContextProvider>
  );
}

function SidebarTop({ children }: { children?: React.ReactNode }) {
  const { isOpened, setIsOpened } = useSidebarContext();
  return (
    <div className="sidebar_top">
      {children}
      <Button
        variant="outline"
        size="sm"
        colorPalette="transparent"
        onClick={() => setIsOpened((opened) => !opened)}
        ml={isOpened ? 'auto' : '0'}
      >
        {isOpened ? <Icon type="arrowLeft" /> : <Icon type="arrowRight" />}
      </Button>
    </div>
  );
}

function SidebarBottom({
  codeURL,
  shareButton = false,
  children,
}: {
  codeURL: string;
  shareButton?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="sidebar_bottom">
      <Flex gap="200" mt="400">
        <Button asChild colorPalette="gray" flex="1">
          <Link href={codeURL} target="_blank" rel="noreferrer">
            GitHub
          </Link>
        </Button>
        {shareButton && (
          <Button asChild colorPalette="gray" flex="2">
            <Link href="#">Share to invite other</Link>
          </Button>
        )}
      </Flex>
      {children}
    </div>
  );
}

function GuideTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="guide_title">{children}</h2>;
}

function GuideSubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="guide_sub_title">{children}</h3>;
}

function GuideDescription({ children }: { children: React.ReactNode }) {
  return <p className="guide_desc">{children}</p>;
}

Sidebar.Top = SidebarTop;
Sidebar.Bottom = SidebarBottom;
Sidebar.Tabs = SidebarTabs;
Sidebar.TabsList = SidebarTabsList;
Sidebar.TabsTab = SidebarTabsTab;
Sidebar.TabsPanel = SidebarTabsPanel;
Sidebar.GuideTitle = GuideTitle;
Sidebar.GuideSubTitle = GuideSubTitle;
Sidebar.GuideDescription = GuideDescription;
