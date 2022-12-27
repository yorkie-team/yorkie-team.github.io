import { ProjectCodeType } from '@/components/exampleView';
import { files } from './files';

export const ProjectCode: ProjectCodeType = {
  name: 'profile-stack',
  children: [
    {
      isFile: true,
      isOpen: false,
      language: files['index.html'].language,
      name: 'index.html',
      content: files['index.html'].content,
    },
    {
      isFile: true,
      isOpen: true,
      language: files['main.js'].language,
      name: 'main.js',
      content: files['main.js'].content,
    },
    {
      isFile: true,
      isOpen: false,
      language: files['style.css'].language,
      name: 'style.css',
      content: files['style.css'].content,
    },
    {
      isFile: true,
      isOpen: false,
      language: files['util.js'].language,
      name: 'util.js',
      content: files['util.js'].content,
    },
    {
      isFile: true,
      isOpen: false,
      language: files['package.json'].language,
      name: 'package.json',
      content: files['package.json'].content,
    },
    {
      isFile: true,
      isOpen: false,
      language: files['.env.production'].language,
      name: '.env.production',
      content: files['.env.production'].content,
    },
  ],
};
