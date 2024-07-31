import { ReactNode } from 'react';
import { CopyButton, Icon } from '@/components';
import { Button } from 'yorkie-ui-test';

export function CodeBlockHeader({ children }: { children: ReactNode }) {
  return <div className="codeblock_header">{children}</div>;
}

function LeftBox({ children }: { children: ReactNode }) {
  return <div className="box_left">{children}</div>;
}

function RightBox({ children }: { children: ReactNode }) {
  return <div className="box_right">{children}</div>;
}

function CopyButtonBox({
  value,
  size = 'sm',
  timeout = 1000,
}: {
  value: string;
  size?: 'sm' | 'md' | 'lg';
  timeout?: number;
}) {
  return (
    <div className="btn_area">
      <CopyButton value={value} timeout={timeout}>
        {({ copied, copy }) => (
          <>
            <Button variant="outline" size={size} colorPalette="transparent" onClick={copy} title="Copy to clipboard">
              <Icon type="copy" />
            </Button>
            {copied && (
              <div className="toast_box shadow_l">
                <Icon type="check" />
                Copied
              </div>
            )}
          </>
        )}
      </CopyButton>
    </div>
  );
}

CodeBlockHeader.LeftBox = LeftBox;
CodeBlockHeader.RightBox = RightBox;
CodeBlockHeader.CopyButton = CopyButtonBox;
