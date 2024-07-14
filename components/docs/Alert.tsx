import { ReactNode } from 'react';
import classNames from 'classnames';
import { Icons, Icon } from 'yorkie-ui';

export function Alert({
  children,
  status,
}: {
  children: ReactNode;
  status: 'danger' | 'success' | 'warning' | 'info';
}) {
  const statusIcons = {
    danger: <Icons.IconAlertDanger />,
    warning: <Icons.IconAlertWarning />,
    success: <Icons.IconAlertSuccess />,
    info: <Icons.IconAlertInfo />,
  };
  return (
    <div
      className={classNames('alert', {
        alert_danger: status === 'danger',
        alert_success: status === 'success',
        alert_warning: status === 'warning',
        alert_info: status === 'info',
      })}
    >
      <Icon icon={statusIcons[status]} />
      {children}
    </div>
  );
}

function Box({ children }: { children: ReactNode }) {
  return <div className="alert_box">{children}</div>;
}

Alert.Box = Box;
