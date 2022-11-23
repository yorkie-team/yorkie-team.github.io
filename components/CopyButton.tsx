import { useClipboard } from 'hooks';

export function CopyButton({
  children,
  timeout,
  value,
}: {
  children(payload: { copied: boolean; copy(): void }): React.ReactNode;
  timeout?: number;
  value: string;
}) {
  const clipboard = useClipboard({ timeout });
  const copy = () => clipboard.copy(value);

  return <>{children({ copy, copied: clipboard.copied })}</>;
}
