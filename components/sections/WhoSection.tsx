"use client";

import { motion } from "framer-motion";
import { Truck, Factory, Layers, Database } from "lucide-react";
import { caseMarquee, whoCards } from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";
import clsx from "clsx";

const icons = { truck: Truck, factory: Factory, layers: Layers, database: Database };

export function WhoSection() {
  return (
    <SectionWrapper id="who" className="border-b border-slate-200 bg-white">
      <SectionHeader
        label="01 · Кто вы"
        title="Не стартап. Внешнее ремонтное подразделение — с 2005 года."
        subtitle="Ваш главный актив — не сайт, а опыт выездного ремонта и сотни реальных проектов."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {whoCards.map((card, i) => {
          const Icon = icons[card.icon as keyof typeof icons];
          return (
            <FadeUp key={card.title} delay={i * 0.1}>
              <div
                className={clsx(
                  "card h-full",
                  card.featured && "gradient-border bg-gradient-to-br from-blue-50/50 to-emerald-50/30"
                )}
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.text}</p>
              </div>
            </FadeUp>
          );
        })}
      </div>

      <div className="relative mt-12 overflow-hidden rounded-xl bg-slate-100 py-3">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...caseMarquee, ...caseMarquee].map((item, i) => (
            <span key={i} className="mx-6 text-sm text-slate-500">
              {item} ·
            </span>
          ))}
        </div>
      </div>

      <FadeUp className="mt-12 border-l-4 border-blue-600 pl-6">
        <p className="text-lg font-medium text-slate-800">
          В России вас знают как тех, кто приезжает со станком и решает задачу на месте. В США нужна
          система, которая делает то же самое — до и после выезда бригады.
        </p>
      </FadeUp>
    </SectionWrapper>
  );
}
