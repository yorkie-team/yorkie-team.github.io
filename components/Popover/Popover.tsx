import { ReactNode, useEffect, useRef } from 'react';
import { useUncontrolled, useOutsideClick } from '@/hooks';
import { PopoverContextProvider } from './Popover.context';
import { PopoverTarget } from './PopoverTarget';
import { PopoverDropdown } from './PopoverDropdown';

export function Popover({
  opened,
  defaultOpened,
  children,
  closeOnClickOutside = true,
  onChange,
  onOpen,
  onClose,
}: {
  opened?: boolean;
  defaultOpened?: boolean;
  children: ReactNode;
  closeOnClickOutside?: boolean;
  onChange?(opened: boolean): void;
  onOpen?: () => void;
  onClose?: () => void;
}) {
  const [_opened, setOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange,
  });

  const _onOpen = () => {
    onOpen && onOpen();
    setOpened(true);
  };

  const _onClose = () => {
    onClose && onClose();
    setOpened(false);
  };

  const _onToggle = () => {
    if (_opened) {
      onClose && onClose();
      setOpened(false);
    } else {
      onOpen && onOpen();
      setOpened(true);
    }
  };

  const targetRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLElement | null>(null);

  useOutsideClick(
    targetRef,
    () => {
      if (closeOnClickOutside) {
        _onClose();
      }
    },
    dropdownRef,
  );

  // Escape closes the popover and returns focus to its trigger.
  useEffect(() => {
    if (!_opened) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      onClose && onClose();
      setOpened(false);
      targetRef.current?.focus();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_opened]);

  return (
    <PopoverContextProvider
      value={{
        opened: _opened,
        targetRef,
        dropdownRef,
        onToggle: _onToggle,
        onOpen: _onOpen,
        onClose: _onClose,
      }}
    >
      {children}
    </PopoverContextProvider>
  );
}

Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
Popover.displayName = 'Popover';
