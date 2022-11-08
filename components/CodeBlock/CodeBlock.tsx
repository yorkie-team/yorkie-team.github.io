import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from './prismThemeLight';

function PrismCode({
  code,
  language,
  withLineNumbers,
}: {
  code: string;
  language: Language;
  withLineNumbers?: boolean;
}) {
  return (
    <Highlight {...defaultProps} code={code} theme={theme} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {withLineNumbers && <span className='line-number'>{i + 1}</span>}
              <span className='line-content'>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export function CodeBlock(props: any) {
  const language = props.children.props.className?.replace(/language-/, '') || '';
  const code = props.children.props.children.replace(/\n$/, '');

  return (
    <div className='codeblock'>
      <PrismCode
        code={code}
        language={language}
        withLineNumbers={['js', 'ts', 'javascript', 'typescript'].includes(language)}
      />
    </div>
  );
}
