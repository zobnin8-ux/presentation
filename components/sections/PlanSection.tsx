"use client";

import { useState } from "react";
import clsx from "clsx";
import { planStages } from "@/lib/content";
import { FadeUp } from "@/components/ui/Section";

export function PlanSection() {
  const [active, setActive] = useState<(typeof planStages)[number]["id"]>("1");
  const stage = planStages.find((s) => s.id === active) ?? planStages[0];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row">
        {planStages.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={clsx(
                "flex-1 rounded-xl border-2 px-4 py-4 text-left transition-all",
                isActive
                  ? "border-amber-600 bg-amber-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-amber-200"
              )}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">{s.stage}</p>
              <p className="mt-1 font-display text-lg font-bold text-slate-900">{s.period}</p>
              <p className="text-sm font-medium text-slate-600">{s.title}</p>
            </button>
          );
        })}
      </div>

      <FadeUp key={stage.id}>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
            {stage.stage} · {stage.period} · {stage.title}
          </p>
          <p className="mt-4 text-lg font-medium leading-relaxed text-slate-800">{stage.outcome}</p>

          {stage.id === "1" && "quickStart" in stage && (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50/60 px-4 py-3 text-sm leading-relaxed text-slate-700">
              {stage.quickStart}
            </p>
          )}

          <ul className="mt-8 space-y-4">
            {stage.modules.map((mod, i) => (
              <li
                key={mod.title}
                className="flex gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-slate-900">{mod.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{mod.result}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </div>
  );
}
