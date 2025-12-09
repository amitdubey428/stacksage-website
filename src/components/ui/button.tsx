"use client";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default:
                    "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400",
                secondary:
                    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 focus-visible:ring-zinc-400",
                outline:
                    "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-400",
                ghost:
                    "bg-transparent text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 focus-visible:ring-indigo-400",
            },
            size: {
                sm: "h-9 px-3 text-sm",
                default: "h-11 px-5 text-base",
                lg: "h-12 px-6 text-lg",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size }), className, "active:scale-[0.98]")}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { buttonVariants };
