import React from 'react';
import { useTabsContext } from './Tabs.context';
import { Button, ButtonProps, Text } from 'yorkie-ui';

export interface TabProps extends ButtonProps {
  /** Value that is used to connect Tab with associated panel */
  value: string;

  /** Tab label */
  children?: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ value, children, onClick, ...others }) => {
  const ctx = useTabsContext();

  const activateTab = (event: any) => {
    ctx.onTabChange(value);
    onClick?.(event);
  };

  return (
    <Button size="sm" type="button" role="tab" id={ctx.getTabId(value)} onClick={activateTab} {...others}>
      <Text fontSize="sm" fontWeight="semibold">
        {children}
      </Text>
    </Button>
  );
};

Tab.displayName = 'Tab';
