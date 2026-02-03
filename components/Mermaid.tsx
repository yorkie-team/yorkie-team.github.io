import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

type MermaidProps = {
  chart: string;
};

let mermaidInitialized = false;

function MermaidComponent({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(`mermaid-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`);

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit',
      });
      mermaidInitialized = true;
    }

    const renderDiagram = async () => {
      if (ref.current && chart) {
        try {
          const { svg } = await mermaid.render(idRef.current, chart);
          ref.current.innerHTML = svg;
        } catch (error) {
          console.error('Failed to render mermaid diagram:', error);
          ref.current.innerHTML = `<pre>Error rendering diagram: ${error}</pre>`;
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return <div ref={ref} className="mermaid" />;
}

import dynamic from 'next/dynamic';
export const Mermaid = dynamic(() => Promise.resolve(MermaidComponent), {
  ssr: false,
});
