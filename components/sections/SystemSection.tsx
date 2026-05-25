"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  scenarioPlanned,
  scenarioEmergency,
  commonPath,
  backgroundEngines,
} from "@/lib/content";
import { FadeUp } from "@/components/ui/Section";
import { User, Cog, Zap, Clock } from "lucide-react";
import clsx from "clsx";

type Mode = "planned" | "emergency";

function ScenarioBlock({ mode }: { mode: Mode }) {
  const scenario = mode === "planned" ? scenarioPlanned : scenarioEmergency;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 text-white"
      >
        <div className="border-b border-slate-700 px-4 py-3 text-center">
          <p className="font-display text-base font-bold">{scenario.title}</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Сайт · Телефон 24/7 · LinkedIn · outreach · SEO
          </p>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="border-b border-slate-700 p-4 md:border-b-0 md:border-r">
            <div className="mb-3 flex items-center gap-2 text-emerald-400">
              <User className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wide">Клиент видит</span>
            </div>
            <ol className="space-y-2">
              {scenario.clientSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-2 rounded-lg bg-slate-800/80 p-2.5 text-xs leading-snug text-slate-200"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="p-4">
            <div className="mb-3 flex items-center gap-2 text-blue-400">
              <Cog className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wide">Система делает</span>
            </div>
            <ol className="space-y-2">
              {scenario.systemSteps.map((step, i) => (
                <li
                  key={step}
                  className={clsx(
                    "flex gap-2 rounded-lg p-2.5 text-xs font-semibold leading-snug",
                    step.includes("EMERGENCY") || step.includes("SMS")
                      ? "bg-amber-500/20 text-amber-100"
                      : step.includes("Estimator")
                        ? "bg-violet-500/25 text-violet-100"
                        : "bg-blue-600/15 text-slate-100"
                  )}
                >
                  <span
                    className={clsx(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                      step.includes("EMERGENCY") || step.includes("SMS")
                        ? "bg-amber-500 text-slate-900"
                        : step.includes("Estimator")
                          ? "bg-violet-500 text-white"
                          : "bg-blue-600 text-white"
                    )}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function SystemSection() {
  const [mode, setMode] = useState<Mode>("planned");

  return (
    <FadeUp>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-0 lg:overflow-hidden lg:rounded-2xl lg:border-2 lg:border-slate-200 lg:bg-white lg:shadow-sm">
        <div className="lg:border-r lg:border-slate-200 lg:p-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            Событие · заявка
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode("planned")}
              className={clsx(
                "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all",
                mode === "planned"
                  ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-300"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              )}
            >
              <Clock className="h-4 w-4" />
              Плановая · 14:30
            </button>
            <button
              type="button"
              onClick={() => setMode("emergency")}
              className={clsx(
                "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all",
                mode === "emergency"
                  ? "bg-amber-500 text-slate-900 shadow-md ring-2 ring-amber-300"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              )}
            >
              <Zap className="h-4 w-4" />
              Авария · 2:47
            </button>
          </div>
          <ScenarioBlock mode={mode} />
        </div>

        <div className="lg:bg-slate-50 lg:p-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            Постоянно · не ждут заявки
          </p>

          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-700">
            Общий путь — оба сценария
          </p>
          <ul className="space-y-3">
            {commonPath.map((step) => (
              <li key={step.label} className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{step.desc}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.detail}</p>
              </li>
            ))}
          </ul>

          <p className="mb-3 mt-8 text-xs font-bold uppercase tracking-widest text-violet-700">
            В фоне
          </p>
          <ul className="space-y-3">
            {backgroundEngines.map((eng) => (
              <li key={eng.label} className="rounded-lg border border-violet-200 bg-violet-50/50 p-3">
                <p className="text-sm font-semibold text-slate-900">{eng.label}</p>
                <p className="mt-0.5 text-xs text-violet-700">{eng.desc}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{eng.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeUp>
  );
}
