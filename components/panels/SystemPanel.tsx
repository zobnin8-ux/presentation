"use client";

import { sectionHeaders } from "@/lib/content";
import { SystemSection } from "@/components/sections/SystemSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { EstimatorBlock } from "@/components/sections/EstimatorBlock";
import { Callout, FadeUp, Panel, PanelHeader } from "@/components/ui/Section";

export function SystemPanel() {
  return (
    <div className="space-y-10">
      <Panel>
        <PanelHeader
          num="04"
          title={sectionHeaders.system.title}
          subtitle={sectionHeaders.system.subtitle}
        />
        <FadeUp className="mt-6 space-y-4">
          <Callout variant="insight">{sectionHeaders.system.insight}</Callout>
        </FadeUp>
      </Panel>
      <SystemSection />
      <EstimatorBlock />
      <DemoSection />
    </div>
  );
}
