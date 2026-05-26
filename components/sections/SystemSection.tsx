"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  architectureSlide,
  systemContour,
  systemModules,
  systemSiteUnit,
  sectionHeaders,
} from "@/lib/content";
import { Callout, FadeUp } from "@/components/ui/Section";
import { ExternalLink, Server, Brain, Play, ZoomIn } from "lucide-react";
import { LifecycleDemoModal } from "@/components/sections/LifecycleDemoModal";
import { ArchitectureSlideModal } from "@/components/sections/ArchitectureSlideModal";

function ArchitecturePreview({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex max-w-[min(100%,20rem)] items-stretch gap-3 rounded-xl border-2 border-amber-500 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-2 pr-4 shadow-lg ring-2 ring-amber-400/40 transition hover:scale-[1.02] hover:shadow-xl hover:ring-amber-500"
    >
      <span className="relative h-[4.5rem] w-[8rem] shrink-0 overflow-hidden rounded-lg ring-2 ring-amber-500/60">
        <Image
          src={architectureSlide.image}
          alt=""
          fill
          className="object-cover object-center transition duration-300 group-hover:scale-105"
          sizes="128px"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-slate-950/30 transition group-hover:bg-slate-950/50">
          <ZoomIn className="h-7 w-7 text-amber-400 drop-shadow-lg transition group-hover:scale-110" />
        </span>
      </span>
      <span className="flex min-w-0 flex-col justify-center text-left">
        <span className="font-display text-sm font-bold leading-snug text-amber-400">
          {architectureSlide.previewLabel}
        </span>
        <span className="mt-0.5 text-xs font-medium text-slate-400 group-hover:text-amber-200/90">
          {architectureSlide.previewHint}
        </span>
      </span>
    </button>
  );
}

function ContourDiagram({
  onOpenArchitecture,
  onOpenDemo,
}: {
  onOpenArchitecture: () => void;
  onOpenDemo: () => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 lg:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Контур системы · один хребет
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <ArchitecturePreview onOpen={onOpenArchitecture} />
          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 rounded-full border-2 border-amber-500 bg-white px-4 py-2 text-sm font-bold text-amber-800 shadow-sm transition hover:bg-amber-50"
          >
            <Play className="h-4 w-4 fill-amber-600" />
            Пример одного прохода заявки
          </button>
        </div>
      </div>
      <div className="flex min-w-[640px] flex-wrap items-center gap-1 md:min-w-0 md:flex-nowrap">
        {systemContour.steps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <div
              className={clsx(
                "rounded-lg px-2.5 py-2 text-center",
                step.label.includes("planned")
                  ? "border border-amber-300 bg-amber-50"
                  : step.label.includes("Estimator")
                    ? "border border-violet-200 bg-violet-50"
                    : step.label.includes("US-сайт")
                      ? "border-2 border-amber-500 bg-white"
                      : "border border-slate-200 bg-white"
              )}
            >
              <p className="text-xs font-bold text-slate-900">{step.label}</p>
              <p className="text-[10px] text-slate-500">{step.sub}</p>
            </div>
            {i < systemContour.steps.length - 1 && (
              <span className="mx-0.5 text-slate-300">→</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <p className="rounded-lg border border-blue-200 bg-blue-50/60 px-3 py-2 text-xs leading-relaxed text-slate-700">
          <span className="font-bold">Память ОС:</span> {systemContour.memory.os}
        </p>
        <p className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs leading-relaxed text-slate-700">
          <span className="font-bold">Память объекта:</span> {systemContour.memory.object}
        </p>
      </div>
    </div>
  );
}

function ModuleCard({ mod }: { mod: (typeof systemModules)[number] }) {
  return (
    <div className="card-solid flex h-full flex-col">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
        {mod.num}
      </span>
      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-slate-900">
        {mod.title}
      </h3>
      <div className="mt-4 flex-1 space-y-3 text-sm leading-relaxed">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-red-600">Боль</p>
          <p className="mt-1 text-slate-600">{mod.pain}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Решение</p>
          <p className="mt-1 text-slate-700">{mod.solution}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Результат</p>
          <p className="mt-1 font-medium text-slate-800">{mod.result}</p>
        </div>
      </div>
    </div>
  );
}

export function SystemSection() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [architectureOpen, setArchitectureOpen] = useState(false);

  return (
    <div className="space-y-10">
      <LifecycleDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      <ArchitectureSlideModal
        open={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
        src={architectureSlide.image}
        alt={architectureSlide.alt}
      />
      <FadeUp>
        <ContourDiagram
          onOpenArchitecture={() => setArchitectureOpen(true)}
          onOpenDemo={() => setDemoOpen(true)}
        />
      </FadeUp>

      <FadeUp>
        <div className="grid gap-5 sm:grid-cols-2">
          {systemModules.map((mod, i) => (
            <FadeUp key={mod.num} delay={i * 0.03}>
              <ModuleCard mod={mod} />
            </FadeUp>
          ))}
        </div>
      </FadeUp>

      <FadeUp>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-50/80 to-white p-6">
            <div className="flex items-center gap-2 text-amber-700">
              <Server className="h-5 w-5" />
              <p className="text-xs font-bold uppercase tracking-widest">{systemSiteUnit.title}</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
              {systemSiteUnit.points.map((p) => (
                <li key={p}>· {p}</li>
              ))}
            </ul>
            <a
              href={systemSiteUnit.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:underline"
            >
              grc-eta.vercel.app
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-2xl border-2 border-violet-200 bg-violet-50/40 p-6">
            <div className="flex items-center gap-2 text-violet-700">
              <Brain className="h-5 w-5" />
              <p className="text-xs font-bold uppercase tracking-widest">AI Estimator · уже у GRC</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              Не разрабатываем с нуля. Инженерный модуль уже работает внутри компании — подключаем к
              US-потоку: intake → структурированный пакет → расчёт → CRM.
            </p>
            <p className="mt-3 text-sm font-medium text-violet-900">
              Инженер получает не хаос из переписки, а подготовленную карточку задачи.
            </p>
          </div>
        </div>
      </FadeUp>

      <FadeUp>
        <Callout variant="punchline">{sectionHeaders.system.punchline}</Callout>
      </FadeUp>
    </div>
  );
}
