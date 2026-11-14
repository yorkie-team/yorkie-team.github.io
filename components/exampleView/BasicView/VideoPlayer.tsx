import { useEffect, useRef } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Preview of a mobile example: a screen recording in place of the live app.
 *
 * The recording plays muted and looped on load, unless the visitor prefers reduced motion; then it
 * stays paused on its first frame and the controls start it.
 */
export function VideoPlayer({ videoSrc }: { videoSrc: string }) {
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
    <section className="content video_preview_view">
      <div className="video_preview_media">
        <video ref={videoRef} className="video_preview_video" controls loop muted playsInline preload="metadata">
          {/* `#t=0.1` makes browsers that skip the first frame (iOS Safari) show it while paused. */}
          <source src={`${videoSrc}#t=0.1`} type="video/mp4" />
          <p className="video_preview_fallback">
            Your browser cannot play this recording.{' '}
            <a href={videoSrc} className="link">
              Download the video (MP4)
            </a>
            .
          </p>
        </video>
      </div>
    </section>
  );
}
