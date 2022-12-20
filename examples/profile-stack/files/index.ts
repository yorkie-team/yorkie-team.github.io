import * as styleCss from './style.css';
import * as mainJs from './main.js';
import * as packageJson from './package.json';
import * as indexHtml from './index.html';
import * as utilJs from './util.js';
import * as env from './.env.production.js';

import { Language } from 'prism-react-renderer';

export const files: { [key: string]: { language: Language; content: string } } = {
  'style.css': { language: styleCss.language, content: styleCss.content },
  'main.js': { language: mainJs.language, content: mainJs.content },
  'package.json': { language: packageJson.language, content: packageJson.content },
  'index.html': { language: indexHtml.language, content: indexHtml.content },
  'util.js': { language: utilJs.language, content: utilJs.content },
  '.env.production': { language: env.language, content: env.content },
};
