import { ImageResponse } from "next/og";

export const alt = "Adarsh Shankar — AI-native product and growth marketer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f3f5f2", color: "#172128", padding: "64px 72px", border: "18px solid #172128" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: "0.08em", textTransform: "uppercase" }}><span>Adarsh Shankar</span><span style={{ color: "#a83f2b" }}>Dubai / 2026</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}><span style={{ fontSize: 26, color: "#56646b" }}>AI-native product &amp; growth marketer</span><span style={{ fontSize: 76, lineHeight: 0.98, letterSpacing: "-0.04em", maxWidth: 930 }}>I build the systems behind measurable growth.</span></div>
      <div style={{ display: "flex", gap: 36, fontSize: 22 }}><span>Product marketing</span><span>Growth systems</span><span>AI-native delivery</span></div>
    </div>,
    size,
  );
}
