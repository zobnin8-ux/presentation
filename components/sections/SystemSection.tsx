"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  scenarioPlanned,
  scenarioEmergency,
  commonPath,
  backgroundEngines,
} from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";
import { ArrowDown, User, Cog, Zap, Clock } from "lucide-react";
import clsx from "clsx";

type Mode = "planned" | "emergency";

export function SystemSection() {
  const [mode, setMode] = useState<Mode>("planned");
  const scenario = mode === "planned" ? scenarioPlanned : scenarioEmergency;

  return (
    <SectionWrapper id="system" className="bg-slate-900 text-white">
      <SectionHeader
        dark
        label="05 · Как работает система"
        title="Два сценария — одна инфраструктура"
        subtitle="Переключите режим. Estimator в центре потока: intake → расчёт → CRM → выезд → память компании."
      />

      <FadeUp>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setMode("planned")}
            className={clsx(
              "flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all",
              mode === "planned"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 ring-2 ring-blue-400"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            )}
          >
            <Clock className="h-4 w-4" />
            Плановая заявка · 14:30
          </button>
          <button
            onClick={() => setMode("emergency")}
            className={clsx(
              "flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all",
              mode === "emergency"
                ? "bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/40 ring-2 ring-amber-300 animate-pulse"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            )}
          >
            <Zap className="h-4 w-4" />
            Авария · 2:47 ночи
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-800/80 shadow-2xl"
          >
            <div className="border-b border-slate-700 bg-slate-800 px-6 py-4 text-center">
              <p className="text-lg font-bold">{scenario.title}</p>
            </div>

            <p className="border-b border-slate-700 bg-slate-800/50 px-6 py-2 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
              Откуда приходит заявка: Сайт · Телефон 24/7 · LinkedIn · Outreach · SEO
            </p>

            <div className="grid md:grid-cols-2">
              <div className="border-b border-slate-700 p-6 md:border-b-0 md:border-r">
                <div className="mb-4 flex items-center gap-2 text-emerald-400">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wide">Клиент видит</span>
                </div>
                <ol className="space-y-3">
                  {scenario.clientSteps.map((step, i) => (
                    <motion.li
                      key={step}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-3 rounded-lg bg-slate-900/60 p-3 ring-1 ring-slate-600"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-snug text-slate-200">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center gap-2 text-blue-400">
                  <Cog className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wide">Система делает</span>
                </div>
                <ol className="space-y-3">
                  {scenario.systemSteps.map((step, i) => (
                    <motion.li
                      key={step}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={clsx(
                        "flex gap-3 rounded-lg p-3 ring-1",
                        step.includes("EMERGENCY") || step.includes("SMS")
                          ? "bg-amber-500/15 ring-amber-500/50"
                          : step.includes("Estimator")
                            ? "bg-violet-500/20 ring-violet-400/50"
                            : "bg-blue-600/10 ring-blue-500/40"
                      )}
                    >
                      <span
                        className={clsx(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          step.includes("EMERGENCY") || step.includes("SMS")
                            ? "bg-amber-500 text-slate-900"
                            : step.includes("Estimator")
                              ? "bg-violet-500 text-white"
                              : "bg-blue-600 text-white"
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold leading-snug text-white">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="my-8 flex justify-center">
          <ArrowDown className="h-8 w-8 text-blue-500" />
        </div>

        <div className="rounded-2xl border-2 border-blue-500/50 bg-gradient-to-r from-blue-950 to-slate-900 p-6">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-blue-400">
            Общий путь — оба сценария сходятся здесь
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {commonPath.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={clsx(
                  "rounded-xl p-4 text-center ring-2",
                  step.color === "green" && "bg-emerald-600 ring-emerald-400",
                  step.color === "blue" && "bg-blue-600 ring-blue-400",
                  step.color === "purple" && "bg-violet-600 ring-violet-400"
                )}
              >
                <p className="font-display text-sm font-bold text-white">{step.label}</p>
                <p className="mt-1 text-xs text-white/80">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-violet-500/40 bg-violet-950/50 p-6">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-violet-300">
            Постоянно в фоне — не ждут заявки
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {backgroundEngines.map((eng) => (
              <div
                key={eng.label}
                className="rounded-xl bg-violet-900/60 px-4 py-3 text-center ring-1 ring-violet-500/50"
              >
                <p className="font-bold text-violet-100">{eng.label}</p>
                <p className="mt-1 text-xs text-violet-300">{eng.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
