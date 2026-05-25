"use client";

import { PhoneOff, Search, FileX } from "lucide-react";
import { pains } from "@/lib/content";
import { FadeUp, Panel, PanelHeader } from "@/components/ui/Section";

const icons = [PhoneOff, Search, FileX];

export function PainsSection() {
  return (
    <Panel>
      <PanelHeader
        num="03"
        title="Что ломается при выходе в США без системы"
        subtitle="Три типичных сценария, из-за которых теряются деньги — ещё до того, как станок выехал на объект."
      />

      <div className="space-y-5">
        {pains.map((pain, i) => {
          const Icon = icons[i];
          return (
            <FadeUp key={pain.title} delay={i * 0.1}>
              <div className="card-solid flex gap-5 border-l-4 border-l-red-500 bg-red-50/30">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{pain.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{pain.text}</p>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>

      <FadeUp className="mt-10 rounded-xl border border-amber-200 bg-amber-50/60 px-6 py-5">
        <p className="text-base font-medium leading-relaxed text-slate-800">
          Все три проблемы решаются одной{" "}
          <span className="font-semibold text-amber-900">сервисной инфраструктурой</span> — не
          тремя разными людьми и не разрозненными чатами.
        </p>
      </FadeUp>
    </Panel>
  );
}
