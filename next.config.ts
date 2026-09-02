import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: "/desktop", destination: "/", permanent: true },
      { source: "/mobile", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/Adarsh_Shankar_Resume.pdf", headers: [{ key: "X-Robots-Tag", value: "noindex, noarchive" }] }];
  },
};

export default nextConfig;
