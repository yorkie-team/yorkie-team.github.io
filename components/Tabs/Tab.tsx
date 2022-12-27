import React from 'react';
import { useTabsContext } from './Tabs.context';

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
    <button
      data-active={isActive || undefined}
      type="button"
      role="tab"
      id={ctx.getTabId(value)}
      onClick={activateTab}
      {...others}
    >
      <div className="tablabel">{children}</div>
    </button>
  );
};

Tab.displayName = 'Tab';
