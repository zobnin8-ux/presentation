"use client";

import Image from "next/image";
import { seenFindings, sectionHeaders, siteConfig } from "@/lib/content";
import { Callout, FadeUp, Panel, PanelHeader } from "@/components/ui/Section";
import { Mail, Send, Globe } from "lucide-react";

export function SeenSection() {
  const { author } = siteConfig;

  return (
    <Panel>
      <PanelHeader
        num="00"
        title={sectionHeaders.seen.title}
        subtitle={sectionHeaders.seen.subtitle}
      />

      <FadeUp className="mb-8">
        <Callout variant="insight">{sectionHeaders.seen.insight}</Callout>
      </FadeUp>

      <div className="grid gap-4 sm:grid-cols-2">
        {seenFindings.map((item, i) => (
          <FadeUp key={item.title} delay={i * 0.06}>
            <div className="card-solid h-full">
              <h3 className="font-display text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-10">
        <Callout variant="punchline">{sectionHeaders.seen.punchline}</Callout>
      </FadeUp>

      <FadeUp className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-200 pt-8">
        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-amber-600 to-slate-800 p-1 shadow-md">
          <Image
            src={author.photo}
            alt={author.name}
            width={72}
            height={72}
            className="h-[72px] w-[72px] rounded-[10px] object-cover object-top"
          />
        </div>
        <div>
          <p className="font-semibold text-slate-900">
            {author.name} · {author.role}
          </p>
          <p className="mt-1 text-sm text-slate-500">Анализ 1grc.ru · предложение для GRC → US</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <a
              href={`mailto:${author.email}`}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-amber-700"
            >
              <Mail className="h-3.5 w-3.5" />
              {author.email}
            </a>
            <a
              href={author.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-amber-700"
            >
              <Send className="h-3.5 w-3.5" />
              {author.telegramLabel}
            </a>
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-amber-700"
            >
              <Globe className="h-3.5 w-3.5" />
              {author.websiteLabel}
            </a>
          </div>
        </div>
      </FadeUp>
    </Panel>
  );
}
