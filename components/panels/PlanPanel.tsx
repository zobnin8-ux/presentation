"use client";

import { planOverview, sectionHeaders } from "@/lib/content";
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
        <FadeUp className="mt-8">
          <div className="rounded-2xl border-2 border-amber-200/80 bg-gradient-to-br from-amber-50 to-white px-6 py-6 lg:px-8">
            <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
              <p className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {planOverview.headline}
              </p>
              <p className="pb-1 text-sm text-slate-500">{planOverview.footnote}</p>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
              {planOverview.summary}
            </p>
          </div>
        </FadeUp>
      </Panel>
      <PlanSection />
    </div>
  );
}
