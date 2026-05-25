"use client";

import { motion } from "framer-motion";
import {
  modulesChapterA,
  modulesChapterB,
  modulesChapterC,
} from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";
import { ModuleMock } from "@/components/sections/ModuleMock";

const chapters = [
  {
    label: "Глава A · Месяц 1 · Фундамент",
    color: "border-blue-500 bg-blue-50/50",
    accent: "text-blue-700",
    intro: "Пока нет приёма заявок и CRM — любой маркетинг сливают бюджет. Это запускается первым.",
    modules: modulesChapterA,
  },
  {
    label: "Глава B · Месяц 2–3 · Рост",
    color: "border-emerald-500 bg-emerald-50/50",
    accent: "text-emerald-700",
    intro: "Фундамент работает — нужен приток: чтобы вас находили и вы выходили первыми.",
    modules: modulesChapterB,
  },
  {
    label: "Глава C · Месяц 4–6 · Масштаб",
    color: "border-purple-500 bg-purple-50/50",
    accent: "text-purple-700",
    intro: "Крупные остановки, допуск на площадки и удержание клиентов.",
    modules: modulesChapterC,
  },
];

export function ModulesSection() {
  return (
    <SectionWrapper id="modules" className="bg-slate-50">
      <SectionHeader
        label="05 · Модули"
        title="Что автоматизируем — по порядку приоритета"
        subtitle="Не IT-проект, а рабочие инструменты для продаж, выезда и удержания клиентов в США."
      />

      <div className="space-y-16">
        {chapters.map((chapter) => (
          <div key={chapter.label} className={`rounded-2xl border-t-4 p-6 md:p-8 ${chapter.color}`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${chapter.accent}`}>
              {chapter.label}
            </p>
            <p className="mt-2 text-sm text-slate-600">{chapter.intro}</p>

            <div className="mt-8 space-y-8">
              {chapter.modules.map((mod, i) => (
                <FadeUp key={mod.title} delay={i * 0.05}>
                  <div className="relative grid gap-6 overflow-hidden rounded-2xl bg-white p-6 shadow-sm md:grid-cols-5">
                    <span className="pointer-events-none absolute -right-4 -top-6 font-display text-8xl font-bold text-slate-100">
                      {mod.num}
                    </span>
                    <motion.div className="md:col-span-3">
                      <h3 className="font-display text-lg font-semibold text-slate-900">
                        {mod.num} {mod.title}
                      </h3>
                      <div className="mt-4 space-y-3 text-sm">
                        <p>
                          <span className="font-semibold text-red-500">Боль: </span>
                          <span className="text-slate-600">{mod.pain}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-blue-600">Решение: </span>
                          <span className="text-slate-600">{mod.solution}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-emerald-600">Результат: </span>
                          <span className="text-slate-600">{mod.result}</span>
                        </p>
                      </div>
                    </motion.div>
                    <div className="md:col-span-2">
                      <ModuleMock type={mod.mock} />
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
