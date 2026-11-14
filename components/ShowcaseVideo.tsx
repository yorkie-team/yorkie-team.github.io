import { useEffect, useRef, useState } from 'react';

type ShowcaseVideoProps = {
  src: string;
  poster: string;
  label: string;
};

// A muted, looping screen recording that plays only while it is on screen.
// Under reduced motion it rests on its poster and offers controls instead.
export function ShowcaseVideo({ src, poster, label }: ShowcaseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      setReduceMotion(motion.matches);
      if (visible && !motion.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    sync();
    observer.observe(video);
    motion.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', sync);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="showcase_video"
      src={src}
      poster={poster}
      width={1200}
      height={800}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reduceMotion}
      aria-label={label}
    />
  );
}
