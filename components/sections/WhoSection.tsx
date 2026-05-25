"use client";

import { motion } from "framer-motion";
import { Truck, Factory, Layers, Database } from "lucide-react";
import { caseMarquee, whoCards } from "@/lib/content";
import { FadeUp, Panel, PanelHeader } from "@/components/ui/Section";
import clsx from "clsx";

const icons = { truck: Truck, factory: Factory, layers: Layers, database: Database };

export function WhoSection() {
  return (
    <Panel>
      <PanelHeader
        num="01"
        title="Не стартап. Внешнее ремонтное подразделение — с 2005 года."
        subtitle="Главный актив — опыт выездного ремонта и сотни реальных проектов."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {whoCards.map((card, i) => {
          const Icon = icons[card.icon as keyof typeof icons];
          return (
            <FadeUp key={card.title} delay={i * 0.08}>
              <motion.div
                className={clsx(
                  "card h-full",
                  card.featured && "border-amber-200 bg-gradient-to-br from-amber-50/40 to-white"
                )}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.text}</p>
              </motion.div>
            </FadeUp>
          );
        })}
      </div>

      <div className="relative mt-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 py-3">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...caseMarquee, ...caseMarquee].map((item, i) => (
            <span key={i} className="mx-6 text-sm text-slate-500">
              {item} ·
            </span>
          ))}
        </div>
      </div>

      <FadeUp className="mt-10 border-l-4 border-amber-600 pl-5">
        <p className="text-base font-medium leading-relaxed text-slate-800">
          В России вас знают как тех, кто приезжает со станком и решает задачу на месте. В США нужна
          система, которая делает то же самое — до и после выезда бригады.
        </p>
      </FadeUp>
    </Panel>
  );
}
