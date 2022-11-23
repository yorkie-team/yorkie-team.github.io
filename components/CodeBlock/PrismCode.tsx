import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from './prismThemeLight';

export type PrismCodeProps = {
  code: string;
  language: Language;
  withLineNumbers?: boolean;
};

export function PrismCode({ code, language, withLineNumbers }: PrismCodeProps) {
  return (
    <Highlight {...defaultProps} code={code} theme={theme} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {withLineNumbers && <span className="line-number">{i + 1}</span>}
              <span className="line-content">
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
