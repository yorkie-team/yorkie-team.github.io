// Video Player Component
export function VideoPlayer({videoSrc}: { videoSrc: string }) {
  return (
    <div className="content"
         style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
      <video
          controls
          autoPlay
          loop
          muted
          style={{
            maxWidth: '100%',
            maxHeight: 'calc(100vh - 112px)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
      >
        <source src={videoSrc} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

