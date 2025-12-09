"use client";
import React from "react";

const TYPEFORM_ID = process.env.NEXT_PUBLIC_TYPEFORM_ID;

export default function Demo() {
    return (
        <section id="demo" aria-labelledby="demo-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <h2 id="demo-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Get Your Free Audit</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-2xl">Tell us about your AWS setup and we’ll show how much you could save.</p>
                    {TYPEFORM_ID ? (
                <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <iframe
                        title="StackSage Demo Form"
                        src={`https://form.typeform.com/to/${TYPEFORM_ID}`}
                        className="h-full w-full"
                        allow="camera; microphone; autoplay; encrypted-media;"
                    />
                </div>
            ) : (
                        <div className="mt-6 max-w-xl text-zinc-300">
                            <p>
                                Our demo form is hosted on Typeform. Add <code className="px-1 py-0.5 rounded bg-zinc-800">NEXT_PUBLIC_TYPEFORM_ID</code> to your
                                environment to enable the embedded form here. Or contact us directly at <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
                            </p>
                        </div>
            )}
        </section>
    );
}
