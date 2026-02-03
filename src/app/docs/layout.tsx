import { Metadata } from "next";
import DocsLayout from "@/components/docs/DocsLayout";

export const metadata: Metadata = {
    title: "Documentation - StackSage",
    description: "Complete documentation for StackSage AWS audit tool",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DocsLayout>{children}</DocsLayout>;
}
