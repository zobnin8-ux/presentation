"use client";

import { sectionHeaders } from "@/lib/content";
import { SystemSection } from "@/components/sections/SystemSection";
import { LifecycleDemoSection } from "@/components/sections/DemoSection";
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
        <FadeUp className="mt-6">
          <Callout variant="insight">{sectionHeaders.system.insight}</Callout>
        </FadeUp>
      </Panel>
      <SystemSection />
      <LifecycleDemoSection />
    </div>
  );
}
