import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
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
          background: "linear-gradient(135deg, #090d16 0%, #111827 50%, #1e1b4b 100%)",
          borderRadius: "8px",
          border: "1.5px solid rgba(56, 189, 248, 0.7)",
          fontWeight: 900,
          fontFamily: "monospace",
          fontSize: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        <span style={{ color: "#38bdf8", marginRight: "1px" }}>T</span>
        <span style={{ color: "#f43f5e" }}>A</span>
      </div>
    ),
    {
      ...size,
    }
  );
}

