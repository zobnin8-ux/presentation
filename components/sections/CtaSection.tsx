"use client";

import { useState } from "react";
import { ctaQuestions, sectionHeaders, siteConfig } from "@/lib/content";
import { Callout, FadeUp } from "@/components/ui/Section";
import { HelpCircle, Check } from "lucide-react";

export function CtaSection({ embedded = false }: { embedded?: boolean }) {
  const [copied, setCopied] = useState<number | null>(null);

  const copyQuestion = (q: string, i: number) => {
    navigator.clipboard.writeText(q);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={embedded ? "" : "pb-16"}>
      {embedded && (
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-amber-700">
          Вопросы на разговор
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {ctaQuestions.map((q, i) => (
          <FadeUp key={q} delay={i * 0.05}>
            <button
              type="button"
              onClick={() => copyQuestion(q, i)}
              className="group card-solid flex h-full w-full items-start gap-3 text-left"
            >
              <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 transition group-hover:rotate-90" />
              <span className="text-sm text-slate-700">{q}</span>
              {copied === i && (
                <Check className="ml-auto h-4 w-4 shrink-0 text-emerald-500" />
              )}
            </button>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-12 space-y-6">
        <Callout variant="punchline">{sectionHeaders.discuss.punchline}</Callout>
        <Callout variant="warning">{sectionHeaders.discuss.warning}</Callout>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm">
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="font-medium text-slate-700 hover:text-amber-700"
          >
            {siteConfig.author.email}
          </a>
          <span className="text-slate-300">·</span>
          <a
            href={siteConfig.author.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-700 hover:text-amber-700"
          >
            {siteConfig.author.telegramLabel}
          </a>
          <span className="text-slate-300">·</span>
          <a
            href={siteConfig.author.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-700 hover:text-amber-700"
          >
            {siteConfig.author.websiteLabel}
          </a>
        </div>

        {!embedded && <p className="mt-8 text-center text-xs text-slate-400">{siteConfig.footer}</p>}
      </FadeUp>
    </div>
  );
}
