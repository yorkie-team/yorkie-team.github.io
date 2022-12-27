import React, { forwardRef } from 'react';

export interface TabsListProps extends React.ComponentPropsWithoutRef<'div'> {
  /** <Tabs.Tab /> components */
  children: React.ReactNode;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({ children, ...others }, ref) => {
  return (
    <div {...others} ref={ref} role="tablist">
      {children}
    </div>
  );
});

TabsList.displayName = 'TabsList';
