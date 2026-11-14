import { useEffect, useRef } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

type VideoPlayerProps = {
  /** Path to the MP4 recording. */
  videoSrc: string;
  /** Example title, used to give the video an accessible name, e.g. "TodoMVC iOS". */
  title: string;
  /** What the recording shows. Keep it to what is visible in the video. */
  description: string;
  /** Link to the example's source code, offered when the video cannot play. */
  codeURL?: string;
};

/**
 * Preview of a mobile example. The iOS and Android examples cannot run in the page, so the right
 * side shows a screen recording instead of a live app. The bar above it says so, because on web
 * examples the same area is live and visitors expect to interact with it.
 *
 * The recording plays muted and looped on load, unless the visitor prefers reduced motion; then it
 * stays paused on its first frame and the controls start it.
 */
export function VideoPlayer({ videoSrc, title, description, codeURL }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof window.matchMedia !== 'function') return;

    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => {
      if (query.matches) {
        video.pause();
        return;
      }
      // Browsers only allow autoplay for muted media. React does not reliably reflect `muted`
      // to the element, so set the property before playing.
      video.muted = true;
      video.play().catch(() => {
        // Autoplay can still be blocked (e.g. data saver); the controls remain available.
      });
    };

    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return (
    <section className="content video_preview_view" aria-label="Recorded demo">
      <div className="preview_bar">
        <p className="preview_note">
          <strong className="video_preview_label">Recorded demo.</strong> {description}
        </p>
      </div>
      <div className="video_preview_media">
        <video
          ref={videoRef}
          className="video_preview_video"
          aria-label={`Screen recording of the ${title} example`}
          controls
          loop
          muted
          playsInline
          preload="metadata"
        >
          {/* `#t=0.1` makes browsers that skip the first frame (iOS Safari) show it while paused. */}
          <source src={`${videoSrc}#t=0.1`} type="video/mp4" />
          <p className="video_preview_fallback">
            Your browser cannot play this recording.{' '}
            <a href={videoSrc} className="link">
              Download the video (MP4)
            </a>
            {codeURL && (
              <>
                {' '}
                or{' '}
                <a href={codeURL} className="link" target="_blank" rel="noreferrer">
                  view the code on GitHub
                </a>
              </>
            )}
            .
          </p>
        </video>
      </div>
    </section>
  );
}
