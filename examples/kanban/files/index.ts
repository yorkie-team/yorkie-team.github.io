import * as mainCss from './main.css';
import * as AppVue from './App.vue';
import * as mainJs from './main.js';
import * as packageJson from './package.json';
import * as indexHtml from './index.html';
import * as viteConfigJs from './vite.config.js';

import { Language } from 'prism-react-renderer';

export const files: { [key: string]: { language: Language; content: string } } = {
  'main.css': { language: mainCss.language, content: mainCss.content },
  'App.vue': { language: AppVue.language, content: AppVue.content },
  'main.js': { language: mainJs.language, content: mainJs.content },
  'package.json': { language: packageJson.language, content: packageJson.content },
  'index.html': { language: indexHtml.language, content: indexHtml.content },
  'vite.config.js': { language: viteConfigJs.language, content: viteConfigJs.content },
};
