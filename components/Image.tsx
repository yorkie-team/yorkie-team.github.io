import React from 'react';
import { ImageProps as NextImageProps, StaticImageData } from 'next/image';
import dynamic from 'next/dynamic';
import { prefix } from '@/utils/prefix';

export type ImageProps = {
  src: string | StaticImageData;
} & Omit<NextImageProps, 'src'>;

// Use dynamic import for the ExportedImage component
const ExportedImage = dynamic(() => import('next-image-export-optimizer'), { ssr: false });

export function Image({ src, alt, width, height, ...rest }: ImageProps) {
  const isInternalLink = typeof src === 'string' && src.startsWith('/');

  return (
    <ExportedImage src={isInternalLink ? `${prefix}${src}` : src} alt={alt} width={width} height={height} {...rest} />
  );
}
