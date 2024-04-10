'use client';

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { type DocsOrderList } from '@/utils/mdxUtils';
import { Layout, Navigator } from '@/components';

export default function DocsPage({ source, navList }: { source: React.ReactElement; navList: DocsOrderList }) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<Array<Element>>([]);
  const [headingTops, setHeadingTops] = useState<Array<{ id: string; top: number }>>([]);

  const updateHeadingPositions = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const headingTops = [...headings].map((heading) => {
      const top = heading.getBoundingClientRect().top + scrollTop;
      return {
        id: heading.id,
        top,
      };
    });
    setHeadingTops(headingTops);
  }, [headings]);

  useEffect(() => {
    setHeadings(Array.from(document.querySelectorAll('.documentation_page .heading')));
  }, [source]);

  useEffect(() => {
    if (headings.length === 0) return;

    const setActiveTOCLink = () => {
      const scrollTop = document.documentElement.scrollTop;
      const yOffset = 150;

      const currentHeading =
        scrollTop < 10
          ? headingTops.find((headingTop) => {
              return scrollTop >= headingTop.top - yOffset;
            })
          : [...headingTops].reverse().find((headingTop) => {
              return scrollTop >= headingTop.top - yOffset;
            });

      setActiveId(currentHeading?.id || '');
    };

    window.addEventListener('scroll', setActiveTOCLink);
    setActiveTOCLink();
    return () => {
      window.removeEventListener('scroll', setActiveTOCLink);
    };
  }, [headings, headingTops]);

  useEffect(() => {
    updateHeadingPositions();
    document.querySelector(`.toc-item.is_active`)?.classList.remove('is_active');
    document.querySelector(`[data-heading="${activeId}"]`)?.classList.add('is_active');
  }, [activeId, updateHeadingPositions]);

  return (
    <Layout className="documentation_page">
      <Head>
        <title>Documentation · Yorkie</title>
      </Head>
      <div className="content">
        <Navigator navList={navList} />
        <section className="section">{source}</section>
      </div>
    </Layout>
  );
}
