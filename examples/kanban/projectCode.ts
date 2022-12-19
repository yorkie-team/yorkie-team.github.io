import { ProjectCodeType } from '@/components/BasicExample';
import { files } from './files';

export const ProjectCode: ProjectCodeType = {
  name: 'vuejs-kanban',
  children: [
    {
      isFile: false,
      name: 'src',
      children: [
        {
          isFile: false,
          name: 'assets',
          children: [
            {
              isFile: true,
              isOpen: false,
              language: files['main.css'].language,
              name: 'main.css',
              content: files['main.css'].content,
            },
          ],
        },
        {
          isFile: true,
          isOpen: true,
          language: files['App.vue'].language,
          name: 'App.vue',
          content: files['App.vue'].content,
        },
        {
          isFile: true,
          isOpen: false,
          language: files['main.js'].language,
          name: 'main.js',
          content: files['main.js'].content,
        },
      ],
    },
    {
      isFile: true,
      isOpen: false,
      language: files['index.html'].language,
      name: 'index.html',
      content: files['index.html'].content,
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
      language: files['vite.config.js'].language,
      name: 'vite.config.js',
      content: files['vite.config.js'].content,
    },
  ],
};
