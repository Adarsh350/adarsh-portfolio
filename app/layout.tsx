import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@fontsource-variable/instrument-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

const deploymentHost = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL ?? "localhost:3000";
const productionUrl = deploymentHost.startsWith("http") ? deploymentHost : `${deploymentHost === "localhost:3000" ? "http" : "https"}://${deploymentHost}`;

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: "Adarsh Shankar — AI-Native Product & Growth Marketer",
  description: "Portfolio of Adarsh Shankar: product marketing, growth systems, marketing analytics, and AI-native delivery.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Adarsh Shankar — AI-Native Product & Growth Marketer",
    description: "I build the systems behind measurable growth.",
    url: "/",
    siteName: "Adarsh Shankar",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Adarsh Shankar", description: "I build the systems behind measurable growth." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Analytics /><SpeedInsights /></body></html>;
}
