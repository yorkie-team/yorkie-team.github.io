import { cloneElement } from 'react';
import { isElement } from '@/utils/isElement';
import { usePopoverContext } from './Popover.context';

export interface PopoverTargetProps {
  children: React.ReactNode;
}

export const PopoverTarget = ({ children, ...others }: PopoverTargetProps) => {
  if (!isElement(children)) {
    throw new Error('PopoverTarget must have a single child element.');
  }

  const ctx = usePopoverContext();
  return cloneElement(children, {
    ...others,
    onClick: () => {
      ctx.onToggle();
    },
    ref: ctx.targetRef,
  });
};

PopoverTarget.displayName = 'PopoverTarget';
