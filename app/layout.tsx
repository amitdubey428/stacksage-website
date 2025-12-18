import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EasterEggs from "@/components/EasterEggs";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "StackSage — Stop Overpaying for AWS",
    description:
        "StackSage finds hidden cost savings in your infrastructure. Privacy-first, read-only access. No code changes.",
    icons: {
        icon: "/logo.svg",
        shortcut: "/logo.svg",
        apple: "/logo.svg",
    },
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
            <head>
                {/* Google Analytics (GA4) - raw tags per Google's detector requirements */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-SF9V5FHLEX"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', 'G-SF9V5FHLEX');
                                ` }} />
            </head>
            <body className={`${inter.variable} antialiased bg-black text-zinc-100`}>
                <AnnouncementBanner />
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
