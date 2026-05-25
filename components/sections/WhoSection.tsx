"use client";

import { motion } from "framer-motion";
import { Truck, Factory, Layers, Database } from "lucide-react";
import { caseMarquee, sectionHeaders, whoCards, assetsMarketsNote } from "@/lib/content";
import { Callout, FadeUp, Panel, PanelHeader } from "@/components/ui/Section";
import clsx from "clsx";

const icons = { truck: Truck, factory: Factory, layers: Layers, database: Database };

export function WhoSection() {
  return (
    <Panel>
      <PanelHeader
        num="01"
        title={sectionHeaders.who.title}
        subtitle={sectionHeaders.who.subtitle}
      />

      <FadeUp className="mb-8">
        <Callout variant="insight">{assetsMarketsNote}</Callout>
      </FadeUp>

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

      <FadeUp className="mt-10 space-y-4">
        <Callout variant="insight">{sectionHeaders.who.insight}</Callout>
        <Callout variant="punchline">{sectionHeaders.who.punchline}</Callout>
      </FadeUp>
    </Panel>
  );
}
