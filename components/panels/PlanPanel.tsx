"use client";

import { ModulesSection } from "@/components/sections/ModulesSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { Panel, PanelHeader } from "@/components/ui/Section";

export function PlanPanel() {
  return (
    <div className="space-y-12">
      <Panel>
        <PanelHeader
          num="05"
          title="Что строим и в каком порядке"
          subtitle="10 модулей — рабочие инструменты, не IT-проект. Три этапа по месяцам."
        />
      </Panel>
      <ModulesSection embedded />
      <RoadmapSection embedded />
    </div>
  );
}
