import { AccordionItemContextProvider } from './AccordionItem.context';

export function AccordionItem({ children, value }: { children: React.ReactNode; value: string }) {
  return (
    <AccordionItemContextProvider value={{ value }}>
      <li className="accordion_item">{children}</li>
    </AccordionItemContextProvider>
  );
}

AccordionItem.displayName = 'AccordionItem';
