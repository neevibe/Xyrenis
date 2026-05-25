import React from 'react';

export function CinematicBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#05070A]">
      {/* 
        This uses a placeholder cinematic tech video.
        To use the video you uploaded in the chat, please upload it to the `public/` directory 
        using the file explorer on the left, and change this `src` to something like `"/my-video.mp4"`.
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-loop-27402-large.mp4"
      />
      
      {/* Dark Vignette to keep focus on the center/right UI */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#05070A]/50 to-[#05070A] pointer-events-none"></div>
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(5,7,10,1)] pointer-events-none"></div>
    </div>
  );
}

