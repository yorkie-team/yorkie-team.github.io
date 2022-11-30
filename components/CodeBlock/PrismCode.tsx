import Highlight, { defaultProps, Language, Prism } from 'prism-react-renderer';
import theme from './prismThemeLight';

// NOTE(chacha912): By default prism-react-renderer only includes
// an arbitrary subset of the languages that Prism supports.
// To include more languages, you need to import them from the main prismjs package.
// https://github.com/FormidableLabs/prism-react-renderer#faq
// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-kotlin');
require('prismjs/components/prism-swift');
require('prismjs/components/prism-markup');

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
