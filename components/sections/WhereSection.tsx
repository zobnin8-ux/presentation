"use client";

import { chainSteps, whereColumns } from "@/lib/content";
import { FadeUp, Panel, PanelHeader } from "@/components/ui/Section";

export function WhereSection() {
  return (
    <Panel>
      <PanelHeader
        num="02"
        title="В США выигрывает не только тот, у кого лучше станок"
        subtitle="Выигрывает тот, кого находят первым, кто отвечает за минуты и выглядит как надёжный подрядчик с первого касания."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {whereColumns.map((col, i) => (
          <FadeUp key={col.title} delay={i * 0.1}>
            <div className="card-solid h-full">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-sm font-bold text-amber-800">
                {i + 1}
              </div>
              <h3 className="font-display text-lg font-semibold text-slate-900">{col.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{col.text}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-12">
        <ChainDiagram />
      </FadeUp>
    </Panel>
  );
}

function ChainDiagram() {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
      {chainSteps.map((step, i) => (
        <div key={step} className="flex items-center gap-4 md:flex-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white shadow-lg">
              {i + 1}
            </div>
            <p className="mt-2 max-w-[120px] text-xs font-medium text-slate-700">{step}</p>
          </div>
          {i < chainSteps.length - 1 && (
            <div className="hidden h-0.5 flex-1 bg-amber-300/70 md:block" />
          )}
        </div>
      ))}
    </div>
  );
}
