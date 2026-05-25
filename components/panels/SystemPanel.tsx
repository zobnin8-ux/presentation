"use client";

import { SystemSection } from "@/components/sections/SystemSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { EstimatorBlock } from "@/components/sections/EstimatorBlock";
import { Panel, PanelHeader } from "@/components/ui/Section";

export function SystemPanel() {
  return (
    <div className="space-y-12">
      <Panel>
        <PanelHeader
          num="04"
          title="Как работает система"
          subtitle="Два сценария — одна инфраструктура. Intake → расчёт → CRM → выезд → память компании."
        />
      </Panel>
      <SystemSection embedded />
      <EstimatorBlock />
      <DemoSection embedded />
    </div>
  );
}
