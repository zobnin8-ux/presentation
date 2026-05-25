"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ctaQuestions, siteConfig } from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";
import { HelpCircle, Check } from "lucide-react";

export function CtaSection() {
  const [copied, setCopied] = useState<number | null>(null);

  const copyQuestion = (q: string, i: number) => {
    navigator.clipboard.writeText(q);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <SectionWrapper id="cta" className="bg-gradient-to-b from-indigo-50/50 to-white pb-32">
      <SectionHeader
        label="09 · Следующий шаг"
        title="Вопросы на наш разговор"
        subtitle="Откройте эту страницу перед созвоном. Приходите с вопросами — не с «расскажите ещё раз»."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ctaQuestions.map((q, i) => (
          <FadeUp key={q} delay={i * 0.06}>
            <button
              onClick={() => copyQuestion(q, i)}
              className="group card flex h-full w-full items-start gap-3 text-left"
            >
              <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500 transition group-hover:rotate-90" />
              <span className="text-sm text-slate-700">{q}</span>
              {copied === i && (
                <Check className="ml-auto h-4 w-4 shrink-0 text-emerald-500" />
              )}
            </button>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-16 text-center">
        <h2 className="font-display text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
          Вы чините на объекте. Система чинит всё до и после выезда — чтобы в США вас{" "}
          <span className="gradient-text">находили</span>, отвечали за{" "}
          <span className="gradient-text">минуты</span> и{" "}
          <span className="gradient-text">возвращались</span> снова.
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
          <a href={`mailto:${siteConfig.author.email}`} className="hover:text-blue-600">
            {siteConfig.author.email}
          </a>
          <span>·</span>
          <span>{siteConfig.author.telegram}</span>
        </div>

        <p className="mt-8 text-xs text-slate-400">{siteConfig.footer}</p>
      </FadeUp>
    </SectionWrapper>
  );
}
