import { SmoothScroll } from "@/components/SmoothScroll";
import { ProgressBar } from "@/components/ProgressBar";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoSection } from "@/components/sections/WhoSection";
import { WhereSection } from "@/components/sections/WhereSection";
import { PainsSection } from "@/components/sections/PainsSection";
import { SystemSection } from "@/components/sections/SystemSection";
import { ModulesSection } from "@/components/sections/ModulesSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { AuthorSection } from "@/components/sections/AuthorSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <SmoothScroll>
      <ProgressBar />
      <Navigation />
      <main className="grid-bg relative">
        <HeroSection />
        <WhoSection />
        <WhereSection />
        <PainsSection />
        <SystemSection />
        <ModulesSection />
        <DemoSection />
        <RoadmapSection />
        <AuthorSection />
        <CtaSection />
      </main>
    </SmoothScroll>
  );
}
