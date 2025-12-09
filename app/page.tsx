import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Demo from "@/components/Demo";
import FAQ from "@/components/FAQ";

export default function Home() {
    return (
        <div>
            <Hero />
            <Features />
            <HowItWorks />
            <Pricing />
            <Demo />
            <FAQ />
        </div>
    );
}
