"use client";

import { motion } from "framer-motion";
import { roadmap } from "@/lib/content";
import { FadeUp, SectionHeader } from "@/components/ui/Section";

export function RoadmapSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <div>
      {!embedded && (
        <SectionHeader
          label="08 · Внедрение"
          title="Как это запускается — поэтапно, без хаоса"
          subtitle="Не всё сразу. Сначала фундамент — потом рост — потом масштаб."
        />
      )}

      {embedded && (
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-amber-700">
          Этапы внедрения
        </p>
      )}

      <div className="relative">
        <div className="absolute left-0 top-8 hidden h-0.5 w-full bg-amber-300/70 md:block" />

        <div className="grid gap-6 md:grid-cols-3">
          {roadmap.map((phase, i) => (
            <FadeUp key={phase.phase} delay={i * 0.1}>
              <div className="relative pt-4">
                <div className="absolute -top-1 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white shadow-lg md:left-1/2 md:-translate-x-1/2">
                  {phase.phase}
                </div>
                <div className="card-solid mt-8 md:mt-12 md:text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    {phase.period}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-slate-900">
                    {phase.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{phase.items}</p>
                  <p className="mt-4 text-sm font-medium text-emerald-700">{phase.result}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      <FadeUp className="mt-8">
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-6">
          <h3 className="font-display text-lg font-bold text-slate-900">
            Быстрый старт — 3–4 недели
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Приём заявок (intake) + AI Estimator + CRM с правильной воронкой (pipeline) + 20 переведённых
            кейсов + запуск прямого контакта (outreach). Минимум, с которого система уже работает.
          </p>
        </div>
      </FadeUp>
    </div>
  );
}
