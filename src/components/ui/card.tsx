import React from "react";
import { cn } from "@/lib/utils";

type CardProps = {
    title: string;
    icon?: React.ReactNode;
    highlight?: boolean;
    children?: React.ReactNode;
    className?: string;
};

export function Card({ title, icon, highlight, children, className }: CardProps) {
    return (
        <section
            className={cn(
                "rounded-2xl border border-zinc-200/60 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-900/60",
                highlight && "ring-2 ring-indigo-400",
                className
            )}
            aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
        >
            <div className="flex items-center gap-3">
                {icon && <div aria-hidden>{icon}</div>}
                <h3 id={title.replace(/\s+/g, "-").toLowerCase()} className="text-lg font-semibold">
                    {title}
                </h3>
            </div>
            {children && <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{children}</div>}
        </section>
    );
}
