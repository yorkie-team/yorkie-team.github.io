import { ReactNode } from 'react';
import { CopyButton } from '@/components';
import { Icon, IconCopy, Button, Box } from 'yorkie-ui';
import React from 'react';

export function CodeBlockHeader({ children }: { children: ReactNode }) {
  return <div className="codeblock_header">{children}</div>;
}

function LeftBox({ children }: { children: ReactNode }) {
  return <div className="box_left">{children}</div>;
}

function RightBox({ children }: { children: ReactNode }) {
  return <div className="box_right">{children}</div>;
}

function CopyButtonBox({ value, timeout = 1000 }: { value?: string; timeout?: number }) {
  return (
    <div className="btn_area">
      <CopyButton value={value} timeout={timeout}>
        {({ copied, copy }) => (
          <>
            <Button size="xs" onClick={copy} variant="outline" title="Copy to clipboard">
              <Icon icon={<IconCopy />} stroke="neutral.12" size={{ base: 'lg', lg: '2xl' }} />
            </Button>
            {copied && (
              <Box className="toast_box shadow_l" fontSize="sm">
                <Icon icon={<IconCopy />} stroke="#fff" position="start" size="lg" />
                Copied
              </Box>
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
