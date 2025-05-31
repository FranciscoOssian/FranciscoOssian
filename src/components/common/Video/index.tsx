'use client';

import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({
  src,
  isPlaying,
  className,
}: {
  src: string;
  isPlaying: boolean;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, [src]);

  return (
    <div
      className={`z-[500] select-none flex justify-center items-centerrelative aspect-[9/20] rounded-3xl w-48 overflow-hidden bg-white ${className}`}>
      <video ref={videoRef} width="99%" height="99%" playsInline autoPlay={isPlaying} muted loop>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
