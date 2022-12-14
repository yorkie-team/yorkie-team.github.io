import { Node } from 'unist';
import { visit } from 'unist-util-visit';

interface TextNode extends Node {
  type: 'text';
  value: string;
}

function isTextNode(node: Node): node is TextNode {
  return node.type === 'text';
}

type VARIABLE_MAP = {
  pattern: string;
  value: string;
};

function replaceVariables(text: string, map: VARIABLE_MAP[]): string {
  let result = text;
  for (const { pattern, value } of map) {
    result = result.replace(new RegExp(`{{${pattern}}}`, 'gi'), value);
  }
  return result;
}

export default function rehypeVariables(options: { variables: VARIABLE_MAP[] }) {
  return async function transformer(tree: Node): Promise<Node> {
    visit(tree, (node: Node) => {
      if (isTextNode(node)) {
        node.value = replaceVariables(node.value, options.variables);
      }
    });

    return tree;
  };
}
