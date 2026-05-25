"use client";

import Image from "next/image";
import clsx from "clsx";
import {
  siteAuditGrc,
  siteAuditTiss,
  siteDraftRu,
  siteDraftUs,
  sectionHeaders,
  siteConfig,
} from "@/lib/content";
import { Callout, FadeUp, Panel, PanelHeader } from "@/components/ui/Section";
import { Mail, Send, Globe, ExternalLink, BarChart3 } from "lucide-react";

function ScoreBadge({ score, status }: { score: number; status: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-display text-4xl font-bold text-slate-900">{score}</span>
      <span className="text-sm text-slate-400">/100</span>
      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
        {status}
      </span>
    </div>
  );
}

function MetricRow({ metrics }: { metrics: { label: string; value: number }[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {metrics.map((m) => (
        <span
          key={m.label}
          className={clsx(
            "rounded-lg px-2.5 py-1 text-xs font-medium",
            m.value < 40 ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"
          )}
        >
          {m.label} {m.value}
        </span>
      ))}
    </div>
  );
}

function AuditBlock({
  audit,
  delay = 0,
}: {
  audit: typeof siteAuditGrc;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="card-solid h-full">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Site Doctor</p>
            <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">{audit.title}</h3>
            <a
              href={audit.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-sm text-amber-700 hover:underline"
            >
              {audit.site}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <BarChart3 className="h-8 w-8 text-slate-200" />
        </div>

        <div className="mt-4">
          <ScoreBadge score={audit.score} status={audit.status} />
          <MetricRow metrics={audit.metrics} />
        </div>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
          {audit.findings.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-slate-300">·</span>
              {f}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm font-medium text-slate-800">{audit.takeaway}</p>

        <a
          href={audit.reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-800"
        >
          Полный отчёт Site Doctor
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </FadeUp>
  );
}

function DraftRuBlock() {
  return (
    <FadeUp delay={0.08}>
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Сделано</p>
        <h3 className="mt-1 font-display text-base font-semibold text-slate-900">{siteDraftRu.title}</h3>
        <p className="text-sm text-slate-500">{siteDraftRu.subtitle}</p>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
          {siteDraftRu.points.map((p) => (
            <li key={p}>· {p}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-400">{siteDraftRu.note}</p>
        <a
          href={siteDraftRu.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:underline"
        >
          Открыть demo · grc-rus.vercel.app
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </FadeUp>
  );
}

function DraftUsBlock() {
  return (
    <FadeUp delay={0.12}>
      <div className="rounded-2xl border-2 border-amber-500/60 bg-gradient-to-br from-amber-50/90 to-white p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Главный фокус · US</p>
        <h3 className="mt-1 font-display text-xl font-bold text-slate-900">{siteDraftUs.title}</h3>
        <p className="text-sm text-slate-600">{siteDraftUs.subtitle}</p>

        <p className="mt-4 text-sm italic text-slate-700">&ldquo;{siteDraftUs.hero}&rdquo;</p>
        <p className="mt-2 text-xs text-slate-500">
          CTA: {siteDraftUs.ctas.join(" · ")}
        </p>

        <ul className="mt-5 space-y-2">
          {siteDraftUs.pages.map((page) => (
            <li
              key={page.path}
              className={clsx(
                "rounded-lg px-3 py-2 text-sm",
                page.highlight
                  ? "border border-amber-300 bg-amber-100/80 font-semibold text-amber-950"
                  : "bg-white/80 text-slate-700"
              )}
            >
              <span className="font-mono text-xs text-slate-400">{page.path}</span>
              <span className="ml-2">{page.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-amber-200/60 pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Почему бьём TISS</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {siteDraftUs.vsCompetitor.map((v) => (
              <li key={v}>· {v}</li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-xs text-slate-500">{siteDraftUs.note}</p>

        <a
          href={siteDraftUs.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-amber-500"
        >
          Открыть US demo
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </FadeUp>
  );
}

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

      <div className="space-y-8">
        <section>
          <AuditBlock audit={siteAuditGrc} />
          <div className="mt-4 ml-0 sm:ml-4">
            <DraftRuBlock />
          </div>
        </section>

        <section>
          <AuditBlock audit={siteAuditTiss} delay={0.05} />
        </section>

        <section>
          <DraftUsBlock />
        </section>
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
          <p className="mt-1 text-sm text-slate-500">
            Анализ · черновики · предложение GRC → US
          </p>
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
