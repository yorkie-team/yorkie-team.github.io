import { useUncontrolled } from '@/hooks';
import { Icon } from 'yorkie-ui';
import { AccordionContextProvider } from './Accordion.context';
import { AccordionItem } from './AccordionItem';
import { AccordionControl } from './AccordionControl';
import { AccordionPanel } from './AccordionPanel';
import { ArrowIcon } from '@/components/Icons/Icons';

export type AccordionIconPosition = 'left' | 'right';
type AccordionValue<Multiple extends boolean> = Multiple extends true ? string[] : string | null;

interface AccordionProps<Multiple extends boolean = false> {
  /** Accordion content */
  children: React.ReactNode;

  /** Determines whether multiple items can be opened at a time */
  multiple?: Multiple;

  /** Value for controlled component */
  value?: AccordionValue<Multiple>;

  /** Default value for uncontrolled component */
  defaultValue?: AccordionValue<Multiple>;

  /** Callback for controlled component */
  onChange?(value: AccordionValue<Multiple>): void;

  /** Determines position of the arrow icon */
  iconPosition?: AccordionIconPosition;

  /** Replaces arrow icon on all items */
  icon?: React.ReactNode;
}

export function Accordion<Multiple extends boolean = false>({
  children,
  multiple,
  value,
  defaultValue,
  onChange,
  iconPosition = 'right',
  icon = <Icon icon={<ArrowIcon />}/>,
}: AccordionProps<Multiple>) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: multiple ? ([] as any) : null,
    onChange,
  });

  const isItemActive = (itemValue: string) =>
    Array.isArray(_value) ? _value.includes(itemValue) : itemValue === _value;

  const handleItemChange = (itemValue: string) => {
    const nextValue: AccordionValue<Multiple> = Array.isArray(_value)
      ? _value.includes(itemValue)
        ? _value.filter((selectedValue) => selectedValue !== itemValue)
        : [..._value, itemValue]
      : itemValue === _value
      ? null
      : (itemValue as any);

    handleChange(nextValue);
  };

  return (
    <AccordionContextProvider
      value={{
        isItemActive,
        onChange: handleItemChange,
        iconPosition,
        icon,
      }}
    >
      <ul className="accordion_list">{children}</ul>
    </AccordionContextProvider>
  );
}

Accordion.Item = AccordionItem;
Accordion.Control = AccordionControl;
Accordion.Panel = AccordionPanel;
Accordion.displayName = 'Accordion';
