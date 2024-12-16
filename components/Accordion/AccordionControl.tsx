'use client';

import { forwardRef } from 'react';
import classNames from 'classnames';
import { useAccordionContext } from './Accordion.context';
import { useAccordionItemContext } from './AccordionItem.context';

export interface AccordionControlProps extends React.ComponentPropsWithoutRef<'button'> {
  children?: React.ReactNode;
}

export const AccordionControl = forwardRef<HTMLButtonElement, AccordionControlProps>(
  ({ children, className, ...restProps }: AccordionControlProps, ref) => {
    const { value } = useAccordionItemContext();
    const ctx = useAccordionContext();
    const { iconPosition, icon } = ctx;
    const isActive = ctx.isItemActive(value);

    return (
      <button
        {...restProps}
        ref={ref}
        className={classNames('accordion_btn', { is_active: isActive }, className)}
        onClick={() => {
          ctx.onChange(value);
        }}
        type="button"
        data-active={isActive || undefined}
      >
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </button>
    );
  },
);

AccordionControl.displayName = 'AccordionControl';
