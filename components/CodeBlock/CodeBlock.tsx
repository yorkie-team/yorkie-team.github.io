import { ReactNode } from 'react';
import { CopyButton, Icon } from '@/components';
import { Button } from 'yorkie-ui-test';
import { PrismCodeProps, PrismCode } from './PrismCode';

export function CodeBlock({ withCopyButton, ...restProps }: { withCopyButton?: boolean } & PrismCodeProps) {
  if (withCopyButton) {
    return (
      <div className="codeblock_box">
        <div className="codeblock">
          <PrismCode {...restProps} />
        </div>
        <CopyButtonBox value={restProps.code} />
      </div>
    );
  }

  return (
    <div className="codeblock">
      <PrismCode {...restProps} />
    </div>
  );
}

function CopyButtonBox({ value, timeout = 1000 }: { value: string; timeout?: number }) {
  return (
    <div className="btn_area">
      <CopyButton value={value} timeout={timeout}>
        {({ copied, copy }) => (
          <>
            <Button size="sm" variant="outline" colorPalette="white" onClick={copy} title="Copy to clipboard">
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

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="codeblock_content">{children}</div>;
}

function ContentWrapper({ children }: { children: ReactNode }) {
  return <div className="codeblock_wrap">{children}</div>;
}

CodeBlock.Wrapper = Wrapper;
CodeBlock.ContentWrapper = ContentWrapper;
