"use client";

import { motion } from "framer-motion";
import { roadmap } from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";

export function RoadmapSection() {
  return (
    <SectionWrapper id="roadmap">
      <SectionHeader
        label="08 · Внедрение"
        title="Как это запускается — поэтапно, без хаоса"
        subtitle="Не всё сразу. Сначала фундамент — потом рост — потом масштаб."
      />

      <div className="relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-0 top-8 hidden h-0.5 w-full origin-left bg-blue-300 md:block"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {roadmap.map((phase, i) => (
            <FadeUp key={phase.phase} delay={i * 0.15}>
              <div className="relative pt-4">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, type: "spring" }}
                  className="absolute -top-1 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg md:left-1/2 md:-translate-x-1/2"
                >
                  {phase.phase}
                </motion.div>
                <div className="card mt-8 md:mt-12 md:text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
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

      <FadeUp className="mt-12">
        <div className="shimmer-border p-[2px]">
          <div className="rounded-[14px] bg-white p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-slate-900">
              Быстрый старт — 3–4 недели
            </h3>
            <p className="mt-3 text-slate-600">
              AI-intake + CRM с правильным pipeline + 20 переведённых кейсов + запуск outreach.
              Минимум, с которого система уже работает — не презентация, а реальный инструмент.
            </p>
          </div>
        </div>
      </FadeUp>

      <FadeUp className="mt-8 text-center">
        <p className="text-slate-600">
          К концу 6-го месяца — полный цикл: от первого касания до повторного контракта.
        </p>
      </FadeUp>
    </SectionWrapper>
  );
}
