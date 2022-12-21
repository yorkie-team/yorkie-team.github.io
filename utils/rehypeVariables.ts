import { Node } from 'unist';
import { visit } from 'unist-util-visit';

interface TextNode extends Node {
  type: 'text';
  value: string;
}

interface ElementNode extends Node {
  type: 'element';
  tagName: string;
  properties: {
    [key: string]: any;
  };
}

function isTextNode(node: Node): node is TextNode {
  return node.type === 'text';
}

function isElementNode(node: Node): node is ElementNode {
  return node.type === 'element';
}

function isAnchorNode(node: Node): node is ElementNode {
  return isElementNode(node) && node.tagName === 'a';
}

type VariablePair = {
  pattern: string;
  value: string;
};

function replaceVariables(text: string, pairs: Array<VariablePair>): string {
  let result = text;
  for (const { pattern, value } of pairs) {
    result = result.replace(new RegExp(`{{${pattern}}}`, 'gi'), value);
  }
  return result;
}

export default function rehypeVariables(options: { variables: Array<VariablePair> }) {
  return async function transformer(tree: Node): Promise<Node> {
    visit(tree, (node: Node) => {
      if (isTextNode(node)) {
        node.value = replaceVariables(node.value, options.variables);
      } else if (isAnchorNode(node)) {
        node.properties.href = encodeURI(replaceVariables(decodeURI(node.properties.href), options.variables));
      }
    });

    return tree;
  };
}
