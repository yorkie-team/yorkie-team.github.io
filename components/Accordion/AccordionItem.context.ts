import { createSafeContext } from '@/utils/create-safe-context';
import { ACCORDION_ERRORS } from './Accordion.errors';

interface AccordionItemContext {
  value: string;
}

export const [AccordionItemContextProvider, useAccordionItemContext] = createSafeContext<AccordionItemContext>(
  ACCORDION_ERRORS.itemContext,
);
