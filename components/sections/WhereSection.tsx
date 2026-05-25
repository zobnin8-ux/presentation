"use client";

import { motion } from "framer-motion";
import { chainSteps, whereColumns } from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";

export function WhereSection() {
  return (
    <SectionWrapper id="where" className="bg-gradient-to-b from-slate-50 to-indigo-50/30">
      <SectionHeader
        label="02 · Куда идёте"
        title="В США выигрывает не только тот, у кого лучше станок"
        subtitle="Выигрывает тот, кого находят первым, кто отвечает за минуты и выглядит как надёжный подрядчик с первого касания."
      />

      <motion.div className="grid gap-8 md:grid-cols-3">
        {whereColumns.map((col, i) => (
          <FadeUp key={col.title} delay={i * 0.12}>
            <div className="card h-full">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-600">
                {i + 1}
              </motion.div>
              <h3 className="font-display text-lg font-semibold text-slate-900">{col.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{col.text}</p>
            </div>
          </FadeUp>
        ))}
      </motion.div>

      <FadeUp className="mt-16">
        <ChainDiagram />
      </FadeUp>
    </SectionWrapper>
  );
}

function ChainDiagram() {
  return (
    <motion.div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
      {chainSteps.map((step, i) => (
        <div key={step} className="flex items-center gap-4 md:flex-1">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, type: "spring" }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/30">
              {i + 1}
            </div>
            <p className="mt-2 max-w-[120px] text-xs font-medium text-slate-700">{step}</p>
          </motion.div>
          {i < chainSteps.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 + 0.15, duration: 0.5 }}
              className="hidden h-0.5 flex-1 origin-left bg-blue-300 md:block"
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
