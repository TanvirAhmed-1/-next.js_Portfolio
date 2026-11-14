import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer 3D Hexagonal Metallic Shield Frame */}
          <polygon
            points="60,3 110,31.5 110,88.5 60,117 10,88.5 10,31.5"
            fill="#10b981"
          />
          <polygon
            points="60,7.5 106,33.8 106,86.2 60,112.5 14,86.2 14,33.8"
            fill="#090d16"
          />

          {/* 3D Isometric Cube Faces */}
          <polygon points="60,11 103,35.5 60,60 17,35.5" fill="#1e293b" />
          <polygon points="17,35.5 60,60 60,109 17,84.5" fill="#0f172a" />
          <polygon points="60,60 103,35.5 103,84.5 60,109" fill="#042f2e" />

          {/* Isometric Seam Lines */}
          <path
            d="M60 11 V60 M17 35.5 L60 60 L103 35.5 M60 60 V109"
            stroke="#34d399"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />

          {/* Side Code Chevrons */}
          <path
            d="M23 51 L15 60 L23 69"
            stroke="#34d399"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M97 51 L105 60 L97 69"
            stroke="#22d3ee"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3D 'T' Blade */}
          <path
            d="M26 36 H64 L59.2 47.5 H48.5 V85 H36 V47.5 H26 Z"
            fill="#34d399"
          />
          <path
            d="M26 36 H64 L62.3 40 H28.5 V47.5 H26 Z"
            fill="#ecfdf5"
          />

          {/* 3D Interlocking 'A' Blade */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M66.8 36 H78 L94 85 H81.5 L78.2 73.5 H63.8 L60 85 H48.5 L66.8 36 Z M71 50.5 L66.6 64 H75.2 L71 50.5 Z"
            fill="#22d3ee"
          />
          <path
            d="M66.8 36 H70.5 L52.2 85 H48.5 L66.8 36 Z"
            fill="#cffafe"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
