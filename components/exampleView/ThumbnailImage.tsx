import { Image } from '@/components';
import { EXAMPLES, type ExamplePlatform, type ThumbnailLayout } from '@/codes/examples';

type ThumbnailImageProps = {
  fileName: string;
  alt?: string;
  // Defaults to the platform and layout registered for `fileName` in `EXAMPLES`.
  platform?: ExamplePlatform;
  layout?: ThumbnailLayout;
};

// Rendered widths: a grid card is at most ~560px wide, a phone frame about a third of it.
const SIZES = {
  browser: '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 560px',
  landscape: '(max-width: 639px) 80vw, (max-width: 1023px) 40vw, 420px',
  phone: '(max-width: 639px) 40vw, (max-width: 1023px) 20vw, 200px',
} as const;

/**
 * Example screenshot presented on a shared stage: web examples sit in a minimal browser window,
 * Android and iOS examples in a phone frame. The screenshot keeps its own aspect ratio.
 */
export function ExampleThumbnailImage({
  fileName,
  alt = 'Yorkie example screenshot',
  platform,
  layout,
}: ThumbnailImageProps) {
  const example = EXAMPLES.find(({ thumbnail }) => thumbnail === fileName);
  const resolvedPlatform = platform ?? example?.platform ?? 'web';
  const resolvedLayout = layout ?? example?.thumbnailLayout;
  const frame =
    resolvedPlatform === 'web' ? 'browser' : resolvedLayout?.orientation === 'landscape' ? 'landscape' : 'phone';

  return (
    <div className={`example_thumb example_thumb--${frame}`}>
      <div className="example_thumb_frame">
        {frame === 'browser' && (
          <div className="example_thumb_bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
        <div className="example_thumb_screen">
          <Image
            className="example_thumb_img"
            src={`/assets/images/examples/${fileName}`}
            width={1200}
            height={750}
            sizes={SIZES[frame]}
            alt={alt}
            style={resolvedLayout?.position ? { objectPosition: resolvedLayout.position } : undefined}
          />
        </div>
      </div>
    </div>
  );
}
