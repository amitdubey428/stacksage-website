"use client";

import { useState } from "react";

type CodeBlockProps = {
    children: string;
};

export default function CodeBlock({ children }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="relative mt-4">
            <button
                type="button"
                onClick={handleCopy}
                className="absolute right-3 top-3 rounded-lg border border-zinc-200/60 dark:border-zinc-800 bg-white/80 dark:bg-black/40 px-2 py-1 text-[11px] text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-black/60"
                aria-label={copied ? "Copied" : "Copy to clipboard"}
            >
                {copied ? "Copied" : "Copy"}
            </button>
            <pre className="overflow-x-auto rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-white/70 dark:bg-black/30 p-4 text-xs text-zinc-800 dark:text-zinc-100">
                <code className="font-mono">{children}</code>
            </pre>
        </div>
    );
}
