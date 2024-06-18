import { ReactNode } from 'react';
import { CopyButton } from '@/components';
import { PrismCodeProps, PrismCode } from './PrismCode';
import { Box, IconCopy, IconCheck, Icon, Button } from 'yorkie-ui';
import React from 'react';

export function CodeBlock({ withCopyButton, ...restProps }: { withCopyButton?: boolean } & PrismCodeProps) {
  if (withCopyButton) {
    return (
      <Box className="codeblock_box" fontSize="sm">
        <Box className="codeblock" fontSize="sm">
          <PrismCode {...restProps} />
        </Box>
        <CopyButtonBox value={restProps.code} />
      </Box>
    );
  }

  return (
    <Box className="codeblock">
      <PrismCode {...restProps} />
    </Box>
  );
}

function CopyButtonBox({ value, timeout = 1000 }: { value: string; timeout?: number }) {
  return (
    <div className="btn_area">
      <CopyButton value={value} timeout={timeout}>
        {({ copied, copy }) => (
          <>
            <Button size="lg" onClick={copy} variant="outline" title="Copy to clipboard">
              <Icon icon={<IconCopy stroke="#000" />} stroke="orange.default" position="start" size="lg" />
              All examples
            </Button>
            {copied && (
              <div className="toast_box shadow_l">
                <Icon icon={<IconCheck stroke="#000" />} stroke="orange.default" position="start" size="lg" />
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
