import { CodeBlock } from '@/components';

export function CustomCodeBlock(props: any) {
  const code = props.children.props.children.replace(/\n$/, '');
  let language = props.children.props.className?.replace(/language-/, '') || '';
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
