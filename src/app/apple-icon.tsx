import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e1b4b 100%)",
          borderRadius: "40px",
          border: "4px solid rgba(56, 189, 248, 0.6)",
          fontWeight: 900,
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 72 }}>
          <span style={{ color: "#38bdf8" }}>T</span>
          <span style={{ color: "#f43f5e" }}>A</span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#94a3b8",
            letterSpacing: "4px",
            marginTop: 4,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          TANVIR AHMED
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

