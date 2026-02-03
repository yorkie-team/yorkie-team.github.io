import { CodeBlock } from '@/components';
import { Mermaid } from '@/components/Mermaid';

export function CustomCodeBlock(props: any) {
  const code = props.children.props.children.replace(/\n$/, '');
  let language = props.children.props.className?.replace(/language-/, '') || '';

  // Handle mermaid diagrams
  if (language === 'mermaid') {
    return <Mermaid chart={code} />;
  }

  language = language === 'js' ? 'javascript' : language === 'ts' ? 'typescript' : language;

  return (
    <CodeBlock
      code={code}
      language={language}
      withLineNumbers={['javascript', 'typescript'].includes(language)}
      withCopyButton
    />
  );
}
