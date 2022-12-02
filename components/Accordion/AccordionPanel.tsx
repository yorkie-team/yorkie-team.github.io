export interface AccordionPanelProps extends React.ComponentPropsWithoutRef<'p'> {
  children?: React.ReactNode;
}

export function AccordionPanel({ children, className, ...restProps }: AccordionPanelProps) {
  return (
    <p className={`accordion_content ${className}`} {...restProps}>
      {children}
    </p>
  );
}

AccordionPanel.displayName = 'AccordionPanel';
