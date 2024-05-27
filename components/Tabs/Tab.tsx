import React from 'react';
import { useTabsContext } from './Tabs.context';
import { Button, Text } from 'yorkie-ui';

export interface TabProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Value that is used to connect Tab with associated panel */
  value: string;

  /** Tab label */
  children?: React.ReactNode;
}

export const Tab = ({ value, children, onClick, ...others }: TabProps) => {
  const ctx = useTabsContext();
  const isActive = value === ctx.value;

  const activateTab = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
