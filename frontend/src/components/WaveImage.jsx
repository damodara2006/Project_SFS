// components/WaveImage.js
import React from "react";

const WaveImage = ({ src, alt, className = "" }) => (
  <svg
    viewBox="0 0 1200 200"
    width="100%"
    height="160"
    className={`w-full ${className}`}
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <clipPath id="wave-clip">
        <path d="
          M0,120
          Q200,200 400,120
          T800,140
          T1200,120
          V200
          H0
          Z
        " />
      </clipPath>
    </defs>
    <image
      href={src}
      alt={alt}
      width="1200"
      height="200"
      clipPath="url(#wave-clip)"
      preserveAspectRatio="xMidYMid slice"
    />
  </svg>
);

export default WaveImage;
