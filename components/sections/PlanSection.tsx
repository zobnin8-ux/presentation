"use client";

import { useState } from "react";
import clsx from "clsx";
import { planStages, systemModules } from "@/lib/content";
import { FadeUp } from "@/components/ui/Section";
import { Check } from "lucide-react";

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
            {stage.stage} · {stage.period}
          </p>
          <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{stage.title}</h3>
          <p className="mt-3 text-base font-medium leading-relaxed text-slate-800">{stage.headline}</p>

          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            Модули системы:{" "}
            {stage.modules
              .map((n) => systemModules.find((m) => m.num === n)?.num)
              .filter(Boolean)
              .join(", ")}
          </p>

          {"notDoing" in stage && stage.notDoing && (
            <p className="mt-5 rounded-lg border border-violet-200 bg-violet-50/60 px-4 py-3 text-sm leading-relaxed text-violet-950">
              <span className="font-bold">Не делаем: </span>
              {stage.notDoing}
            </p>
          )}

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Работы</p>
            <ul className="mt-3 space-y-2">
              {stage.works.map((work) => (
                <li key={work} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {work}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Что уже работает на выходе этапа
            </p>
            <ul className="mt-3 space-y-2">
              {stage.running.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 border-t border-slate-100 pt-6 text-base font-semibold leading-relaxed text-slate-900">
            {stage.outcome}
          </p>
        </div>
      </FadeUp>
    </div>
  );
}
