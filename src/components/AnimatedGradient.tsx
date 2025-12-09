"use client";
import React from "react";

export default function AnimatedGradient() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            <div className="absolute -top-40 left-1/2 h-[28rem] w-[120rem] -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-sky-500 opacity-25 blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 left-1/3 h-[18rem] w-[60rem] -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-sky-500 opacity-10 blur-2xl animate-[pulse_8s_ease-in-out_infinite]" />
        </div>
    );
}
