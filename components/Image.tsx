import { ImageProps } from 'next/image';
import ExportedImage from 'next-image-export-optimizer';
import { prefix } from '@/utils/prefix';

export function Image({ src, alt, width, height, ...rest }: ImageProps) {
  return <ExportedImage src={`${prefix}${src}`} alt={alt} width={width} height={height} {...rest} />;
}
