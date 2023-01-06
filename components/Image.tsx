import { ImageProps as NextImageProps, StaticImageData } from 'next/image';
import ExportedImage from 'next-image-export-optimizer';
import { prefix } from '@/utils/prefix';

export type ImageProps = {
  src: string | StaticImageData;
} & Omit<NextImageProps, 'src'>;

export function Image({ src, alt, width, height, ...rest }: ImageProps) {
  const isInternalLink = typeof src === 'string' && src.startsWith('/');

  // TODO(chacha912): Fix the 404 error that occurs for image files
  // because `next export` is not performed in the development environment.
  return (
    <ExportedImage src={isInternalLink ? `${prefix}${src}` : src} alt={alt} width={width} height={height} {...rest} />
  );
}
