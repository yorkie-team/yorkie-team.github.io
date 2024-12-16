'use client';

import { createSafeContext } from '@/utils/createSafeContext';
import { ACCORDION_ERRORS } from './Accordion.errors';
import { AccordionIconPosition } from './Accordion';

interface AccordionContext {
  iconPosition: AccordionIconPosition;
  icon: React.ReactNode;
  onChange(value: string): void;
  isItemActive(value: string): boolean;
}

export const [AccordionContextProvider, useAccordionContext] = createSafeContext<AccordionContext>(
  ACCORDION_ERRORS.context,
);
