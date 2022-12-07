import { cloneElement } from 'react';
import { isElement } from '@/utils/isElement';
import { usePopoverContext } from './Popover.context';

export interface PopoverDropdownProps {
  children: React.ReactNode;
}

export const PopoverDropdown = ({ children, ...others }: PopoverDropdownProps) => {
  if (!isElement(children)) {
    throw new Error('PopoverDropdown must have a single child element.');
  }

  const ctx = usePopoverContext();
  if (!ctx.opened) {
    return null;
  }
  return cloneElement(children, {
    ...others,
    ref: ctx.dropdownRef,
  });
};

PopoverDropdown.displayName = 'PopoverDropdown';
