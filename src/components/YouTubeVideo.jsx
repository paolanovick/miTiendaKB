// src/components/YouTubeVideo.jsx
import React from "react";
import YouTube from "react-youtube";

const YouTubeVideo = () => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId="OghBQ0vvhW8" opts={opts} />;
};

export default YouTubeVideo;
