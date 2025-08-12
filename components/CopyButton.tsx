import { useClipboard } from 'hooks';
import { cleanCliValue } from '@/utils/clipboardUtils';

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
  const copy = () => {
    const cleanedValue = cleanCliValue(value);
    clipboard.copy(cleanedValue);
  };

  return <>{children({ copy, copied: clipboard.copied })}</>;
}
