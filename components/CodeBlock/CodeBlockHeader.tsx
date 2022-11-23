import { ReactNode } from 'react';
import { CopyButton, Button, Icon } from '@/components';

export function CodeBlockHeader({ children }: { children: ReactNode }) {
  return <div className="codeblock_header">{children}</div>;
}

function LeftBox({ children }: { children: ReactNode }) {
  return <div className="box_left">{children}</div>;
}

function RightBox({ children }: { children: ReactNode }) {
  return <div className="box_right">{children}</div>;
}

function CopyButtonBox({ value, timeout = 1000 }: { value: string; timeout?: number }) {
  return (
    <div className="btn_area">
      <CopyButton value={value} timeout={timeout}>
        {({ copied, copy }) => (
          <>
            <Button icon={<Icon type="copy" />} className="gray50" outline onClick={copy} title="Copy to clipboard" />
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
