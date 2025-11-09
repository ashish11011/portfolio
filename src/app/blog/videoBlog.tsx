import React from 'react';

const VideoBlog = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <video
        className="h-full w-full object-cover"
        loop={true}
        muted={true}
        autoPlay={true}
      >
        <source src={'./blogvideo.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBlog;
