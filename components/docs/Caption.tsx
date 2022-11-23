import { ReactNode } from 'react';

export function Caption({ children }: { children: ReactNode }) {
  return <p className="caption">{children}</p>;
}
