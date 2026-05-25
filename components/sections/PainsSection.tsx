"use client";

import { motion } from "framer-motion";
import { PhoneOff, Search, FileX } from "lucide-react";
import { pains } from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";

const icons = [PhoneOff, Search, FileX];

export function PainsSection() {
  return (
    <SectionWrapper id="pains" className="border-b-4 border-red-500 bg-red-50/80">
      <SectionHeader
        label="03 · Без системы"
        title="Что ломается при выходе в США без автоматизации"
        subtitle="Три типичных сценария, из-за которых теряются деньги — ещё до того, как станок выехал на объект."
      />

      <div className="space-y-6">
        {pains.map((pain, i) => {
          const Icon = icons[i];
          return (
            <FadeUp key={pain.title} delay={i * 0.12}>
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="card-solid flex gap-5 border-l-4 border-l-red-500"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{pain.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{pain.text}</p>
                </div>
              </motion.div>
            </FadeUp>
          );
        })}
      </div>

      <FadeUp className="mt-12 text-center">
        <p className="text-lg font-medium text-slate-700">
          Решение — не «ещё один AI», а{" "}
          <span className="text-blue-600">сервисная инфраструктура</span> вокруг уже работающего
          Estimator.
        </p>
      </FadeUp>
    </SectionWrapper>
  );
}
