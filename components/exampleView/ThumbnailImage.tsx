import { Image } from '@/components';

export function ExampleThumbnailImage({ fileName, alt = 'yorkie example' }: { fileName: string; alt?: string }) {
  return <Image src={`/assets/images/examples/${fileName}`} width={1200} height={750} alt={alt} />;
}
