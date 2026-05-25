"use client";

import { motion } from "framer-motion";
import { PhoneOff, Search, FileX } from "lucide-react";
import { pains } from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";

const icons = [PhoneOff, Search, FileX];

export function PainsSection() {
  return (
    <SectionWrapper id="pains">
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
                className="flex gap-5 rounded-2xl border border-red-100 bg-white p-6 shadow-sm"
                style={{ borderLeftWidth: 4, borderLeftColor: "#FECACA" }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <Icon className="h-5 w-5" />
                </div>
                <motion.div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{pain.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{pain.text}</p>
                </motion.div>
              </motion.div>
            </FadeUp>
          );
        })}
      </div>

      <FadeUp className="mt-12 text-center">
        <p className="text-lg font-medium text-slate-700">
          Все три проблемы решаются <span className="text-blue-600">одной системой</span> — не тремя
          разными людьми.
        </p>
      </FadeUp>
    </SectionWrapper>
  );
}
