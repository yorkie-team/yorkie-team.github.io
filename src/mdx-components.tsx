import type { MDXComponents } from 'mdx/types';
import { Heading, HeadingProps, Button, Icon } from 'yorkie-ui';
import { Image } from '@/components';
import { CodeBlock } from '@/components';
import { Breadcrumb, Caption, ImageWrap, Blockquote } from '@/components/docs';
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <Heading as="h1" fontSize={{ base: '3xl', lg: '5xl' }} fontWeight="semibold">
        {props.children}
      </Heading>
    ),
    h2: (props) => (
      <Heading as="h2" fontSize={{ base: '2xl', lg: '4xl' }} fontWeight="semibold">
        {props.children}
      </Heading>
    ),
    h3: (props) => (
      <Heading as="h3" fontSize={{ base: 'xl', lg: '3xl' }} fontWeight="semibold">
        {props.children}
      </Heading>
    ),
    h4: (props) => (
      <Heading as="h4" fontSize={{ base: 'lg', lg: '2xl' }} fontWeight="semibold">
        {props.children}
      </Heading>
    ),
    h5: (props) => (
      <Heading as="h4" fontSize={{ base: 'md', lg: 'xl' }} fontWeight="semibold">
        {props.children}
      </Heading>
    ),
    h6: (props) => (
      <Heading as="h6" fontSize={{ base: 'md', lg: 'xl' }} fontWeight="semibold">
        {props.children}
      </Heading>
    ),
    Button,
    Icon,
    blockquote: (props) => <Blockquote {...props} />,
    img: ({ src, alt, title, width, height }) => (
      <Image src={src!} alt={alt || ''} title={title} width={width as number} height={height as number} />
    ),
    Image,
    ImageWrap,
    Breadcrumb,
    Caption,
    CodeBlock,
  };
}
