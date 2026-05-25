"use client";

import { sectionHeaders } from "@/lib/content";
import { PlanSection } from "@/components/sections/PlanSection";
import { FadeUp, Panel, PanelHeader } from "@/components/ui/Section";

export function PlanPanel() {
  return (
    <div className="space-y-10">
      <Panel>
        <PanelHeader
          num="05"
          title={sectionHeaders.plan.title}
          subtitle={sectionHeaders.plan.subtitle}
        />
      </Panel>
      <PlanSection />
    </div>
  );
}
