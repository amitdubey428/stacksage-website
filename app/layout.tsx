import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EasterEggs from "@/components/EasterEggs";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "StackSage — Stop Overpaying for AWS",
    description:
        "StackSage finds hidden cost savings in your infrastructure. Privacy-first, read-only access. No code changes.",
    openGraph: {
        title: "StackSage — Stop Overpaying for AWS",
        description:
            "StackSage finds hidden cost savings in your infrastructure. Privacy-first, read-only access. No code changes.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "StackSage",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "StackSage — Stop Overpaying for AWS",
        description:
            "StackSage finds hidden cost savings in your infrastructure. Privacy-first, read-only access. No code changes.",
        images: ["/og-image.png"],
    },
    metadataBase: (() => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
        try {
            return new URL(base);
        } catch {
            return new URL("https://example.com");
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
            <body className={`${inter.variable} antialiased bg-black text-zinc-100`}>
                <header role="banner">
                    <Navigation />
                </header>
                <main role="main">{children}</main>
                <Footer />
                <EasterEggs />
                <Analytics />
                {/* Tally embed script to support dynamicHeight for the iframe */}
                <script async src="https://tally.so/widgets/embed.js"></script>
            </body>
        </html>
    );
}
