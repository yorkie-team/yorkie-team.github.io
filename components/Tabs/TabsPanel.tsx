import React, { forwardRef } from 'react';
import { useTabsContext } from './Tabs.context';

export interface TabsPanelProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Panel content */
  children: React.ReactNode;

  /** Value of associated control */
  value: string;
}

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(({ value, children, ...others }, ref) => {
  const ctx = useTabsContext();
  const active = ctx.value === value;

  return (
    <div
      {...others}
      ref={ref}
      role="tabpanel"
      id={ctx.getPanelId(value)}
      style={{ display: !active ? 'none' : undefined }}
    >
      {children}
    </div>
  );
});

TabsPanel.displayName = 'TabsPanel';
