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

  // Keep the latest close handler for the key listener without re-subscribing on every render.
  const closeRef = useRef(_onClose);
  closeRef.current = _onClose;

  // Escape closes the popover.
  useEffect(() => {
    if (!_opened) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [_opened]);

  // When it closes while focus was inside it (Escape, or choosing an item), the focused element is gone;
  // return focus to the trigger instead of dropping it to the top of the page.
  const wasOpened = useRef(_opened);
  useEffect(() => {
    if (wasOpened.current && !_opened) {
      const active = document.activeElement;
      if (!active || active === document.body) targetRef.current?.focus();
    }
    wasOpened.current = _opened;
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
