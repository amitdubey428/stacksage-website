import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StackSage — AWS Audit in GitHub Actions",
  description:
    "Run an AWS waste & hygiene audit in your GitHub Actions runner. No SaaS ingestion of AWS credentials. Outputs: HTML + JSON/CSV artifacts.",
  keywords: [
    "AWS cost audit",
    "AWS cost optimization",
    "FinOps",
    "GitHub Actions",
    "cloud cost",
    "AWS waste",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StackSage — AWS Audit in GitHub Actions",
    description:
      "Run an AWS waste & hygiene audit in your GitHub Actions runner. No SaaS ingestion of AWS credentials. Outputs: HTML + JSON/CSV artifacts.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StackSage",
      },
    ],
  },
  metadataBase: (() => {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stacksageai.com";
    try {
      return new URL(base);
    } catch {
      return new URL("https://stacksageai.com");
    }
  })(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-white text-zinc-900 dark:bg-black dark:text-zinc-100`}>
        <header role="banner">
          <Navigation />
        </header>
        <main role="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
