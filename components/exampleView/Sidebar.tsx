import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Icon, CodeBlock, Accordion } from '@/components';

export function Sidebar({
  defaultOpened = true,
  title,
  description,
  features,
  code,
}: {
  defaultOpened?: boolean;
  title: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  code: string;
}) {
  const [viewType, setViewType] = useState<'about' | 'code'>('about');
  const [isOpened, setIsOpened] = useState<boolean>(defaultOpened);

  useEffect(() => {
    setIsOpened(defaultOpened);
  }, [defaultOpened]);

  return (
    <div className={classNames('sidebar', { type_shadow: !defaultOpened }, { is_hide: !isOpened })}>
      <div className="sidebar_top">
        <div className="codeblock_navigator">
          <button
            type="button"
            onClick={() => {
              setViewType('about');
            }}
            className={classNames('item', { is_active: viewType === 'about' })}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => {
              setViewType('code');
            }}
            className={classNames('item', { is_active: viewType === 'code' })}
          >
            Live Code
          </button>
        </div>
        <button type="button" className="btn btn_toggle" onClick={() => setIsOpened(!isOpened)}>
          <Icon type="arrow" />
          <span className="blind">Close sidebar</span>
        </button>
      </div>
      {viewType === 'about' && (
        <div className="guide_box">
          <h2 className="guide_title">{title}</h2>
          <p className="guide_desc">{description}</p>
          <em className="guide_sub_title">Try this!</em>
          <Accordion defaultValue={[]} multiple>
            {features.map(({ title, description }) => (
              <Accordion.Item key={title} value={title}>
                <Accordion.Control>{title}</Accordion.Control>
                <Accordion.Panel>{description}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      )}
      {viewType === 'code' && (
        <div className="codeblock_box">
          <CodeBlock code={code} language="javascript" withLineNumbers />
        </div>
      )}
      <div className="sidebar_bottom">
        <div className="btn_box full_width">
          <a href="#" className="btn gray600 ">
            Github
          </a>
          {viewType === 'about' && (
            <a href="#" className="btn gray900 btn_share">
              Share to invite other
            </a>
          )}
        </div>
        <p className="guide_desc">Last updated 4 days ago</p>
      </div>
    </div>
  );
}
