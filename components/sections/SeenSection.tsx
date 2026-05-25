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
  siteDoctorUrl,
} from "@/lib/content";
import { Callout, FadeUp, Panel, PanelHeader } from "@/components/ui/Section";
import { Mail, Send, Globe, ExternalLink, BarChart3 } from "lucide-react";

function AuthorSidebar() {
  const { author } = siteConfig;

  return (
    <div className="lg:sticky lg:top-8 lg:self-start">
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm">
        <div className="mx-auto w-fit overflow-hidden rounded-xl bg-gradient-to-br from-amber-600 to-slate-800 p-1 shadow-md">
          <Image
            src={author.photo}
            alt={author.name}
            width={140}
            height={140}
            className="h-36 w-36 rounded-[10px] object-cover object-center"
          />
        </div>
        <p className="mt-4 font-display text-lg font-bold text-slate-900">{author.name}</p>
        <p className="text-sm font-medium text-amber-800">{author.role}</p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          Анализ · черновики · US demo
        </p>
        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 text-sm">
          <a
            href={`mailto:${author.email}`}
            className="inline-flex items-center gap-2 font-medium text-slate-700 hover:text-amber-700"
          >
            <Mail className="h-4 w-4 shrink-0 text-amber-600" />
            {author.email}
          </a>
          <a
            href={author.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-slate-700 hover:text-amber-700"
          >
            <Send className="h-4 w-4 shrink-0 text-amber-600" />
            {author.telegramLabel}
          </a>
          <a
            href={author.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-slate-700 hover:text-amber-700"
          >
            <Globe className="h-4 w-4 shrink-0 text-amber-600" />
            {author.websiteLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

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
      <div className="card-solid flex h-full flex-col">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <a
              href={siteDoctorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-amber-700 hover:underline"
            >
              Site Doctor
            </a>
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

        <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-slate-600">
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
          Полный отчёт
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </FadeUp>
  );
}

function DraftUsBlock() {
  return (
    <FadeUp delay={0.06}>
      <div className="flex h-full flex-col rounded-2xl border-2 border-amber-500/60 bg-gradient-to-br from-amber-50/90 to-white p-5 shadow-md lg:p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-700">На основе анализа · US</p>
        <h3 className="mt-1 font-display text-lg font-bold text-slate-900">{siteDraftUs.title}</h3>
        <p className="text-sm text-slate-600">{siteDraftUs.subtitle}</p>
        <p className="mt-3 text-sm italic text-slate-700">&ldquo;{siteDraftUs.hero}&rdquo;</p>
        <ul className="mt-4 flex-1 space-y-1.5 text-sm text-slate-700">
          {siteDraftUs.pages.slice(0, 4).map((page) => (
            <li key={page.path}>
              <span className="font-mono text-xs text-slate-400">{page.path}</span>
              <span className="ml-2">{page.label.split("·")[0].trim()}</span>
            </li>
          ))}
          <li className="font-semibold text-amber-950">/contact — intake gateway</li>
        </ul>
        <a
          href={siteDraftUs.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-amber-500"
        >
          Открыть US demo
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </FadeUp>
  );
}

function DraftRuBlock() {
  return (
    <FadeUp delay={0.08}>
      <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50/80 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">На основе анализа · RU</p>
        <h3 className="mt-1 font-display text-base font-semibold text-slate-900">{siteDraftRu.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{siteDraftRu.points[0]}</p>
        <p className="mt-auto text-xs text-slate-400">{siteDraftRu.note}</p>
        <a
          href={siteDraftRu.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:underline"
        >
          grc-rus.vercel.app
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </FadeUp>
  );
}

export function SeenSection() {
  return (
    <Panel>
      <PanelHeader
        num="00"
        title={sectionHeaders.seen.title}
        subtitle={sectionHeaders.seen.subtitle}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(220px,260px)_1fr]">
        <AuthorSidebar />

        <div>
          <FadeUp className="mb-8">
            <Callout variant="insight">{sectionHeaders.seen.insight}</Callout>
          </FadeUp>

          <div className="grid gap-6 sm:grid-cols-2">
            <AuditBlock audit={siteAuditGrc} />
            <AuditBlock audit={siteAuditTiss} delay={0.04} />
            <DraftUsBlock />
            <DraftRuBlock />
          </div>

          <FadeUp className="mt-10">
            <Callout variant="punchline">{sectionHeaders.seen.punchline}</Callout>
          </FadeUp>
        </div>
      </div>
    </Panel>
  );
}
