import { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';

interface Element extends Node {
  type: 'element';
  tagName: string;
  properties: {
    className: string | string[];
  };
  children: Node[];
}

export default function rehypeWrapContents() {
  return async function transformer(tree: Node): Promise<Node> {
    visit(tree, (node) => {
      if (node.type !== 'root') return;

      const root = node as Parent<Element>;
      const [toc, ...restChildren] = root.children;

      if (toc.type !== 'element' || toc.properties.className !== 'pagination') {
        root.children = [
          {
            type: 'element',
            tagName: 'div',
            properties: {
              className: 'section_content_box',
            },
            children: root.children,
          },
        ];
        return;
      }

      root.children = [
        toc,
        {
          type: 'element',
          tagName: 'div',
          properties: {
            className: 'section_content_box',
          },
          children: restChildren,
        },
      ];
    });

    return tree;
  };
}
