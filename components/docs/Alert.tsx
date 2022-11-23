import { ReactNode } from 'react';
import classNames from 'classnames';
import { Icon } from '@/components';

export function Alert({
  children,
  status,
}: {
  children: ReactNode;
  status: 'danger' | 'success' | 'warning' | 'info';
}) {
  return (
    <div
      className={classNames('alert', {
        alert_danger: status === 'danger',
        alert_success: status === 'success',
        alert_warning: status === 'warning',
        alert_info: status === 'info',
      })}
    >
      <Icon type={status} />
      {children}
    </div>
  );
}

function Box({ children }: { children: ReactNode }) {
  return <div className="alert_box">{children}</div>;
}

Alert.Box = Box;
