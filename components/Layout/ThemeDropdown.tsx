'use client';

import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Popover, Icon } from 'components';
import { ThemeOption, useTheme } from '@/hooks/useTheme';

export function ThemeDropdown() {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [themeOption, setThemeOption] = useState<ThemeOption>('system');
  const { setTheme } = useTheme();

  useEffect(() => {
    const themeOption = (window.localStorage.getItem('theme') || 'system') as ThemeOption;
    setThemeOption(themeOption);
  }, [setTheme]);

  return (
    <Popover opened={dropdownOpened} onChange={setDropdownOpened}>
      <Popover.Target>
        <button type="button" className="btn btn_small">
          <span className="filter_title">Theme:</span>
          <span className="text">{themeOption.replace(/^[a-z]/, (char) => char.toUpperCase())}</span>
          <Icon type="arrow" />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="dropdown">
          <ul
            className="dropdown_list"
            onClick={(e) => {
              const target = (e.target as Element).closest('.dropdown_item');
              if (!target) return;
              const option = target.getAttribute('data-option') as ThemeOption;
              if (themeOption !== option) {
                setThemeOption(option);
                setTheme(option);
              }
              setDropdownOpened(false);
            }}
          >
            <li className="dropdown_item" data-option="system">
              <button className={classNames('dropdown_menu', { is_active: themeOption === 'system' })}>
                <span className="dropdown_text">System</span>
              </button>
            </li>
            <li className="dropdown_item" data-option="light">
              <button className={classNames('dropdown_menu', { is_active: themeOption === 'light' })}>
                <span className="dropdown_text">Light</span>
              </button>
            </li>
            <li className="dropdown_item" data-option="dark">
              <button className={classNames('dropdown_menu', { is_active: themeOption === 'dark' })}>
                <span className="dropdown_text">Dark</span>
              </button>
            </li>
          </ul>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
