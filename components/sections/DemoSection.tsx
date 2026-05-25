"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { demoSteps, demoSummary, scenarioPlanned, scenarioEmergency } from "@/lib/content";
import { FadeUp } from "@/components/ui/Section";
import { Play, Square, Zap, Clock } from "lucide-react";

const STEP_MS = 2200;

type Mode = "planned" | "emergency";

export function LifecycleDemoSection() {
  const [mode, setMode] = useState<Mode>("emergency");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [finished, setFinished] = useState(false);

  const scenario = mode === "planned" ? scenarioPlanned : scenarioEmergency;

  useEffect(() => {
    if (!running) return;
    setStep(-1);
    setFinished(false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    demoSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), i * STEP_MS));
    });
    timers.push(
      setTimeout(() => {
        setRunning(false);
        setFinished(true);
      }, demoSteps.length * STEP_MS + 400)
    );
    return () => timers.forEach(clearTimeout);
  }, [running]);

  const start = () => {
    setFinished(false);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    setStep(-1);
  };

  return (
    <FadeUp>
      <div
        className={clsx(
          "overflow-hidden rounded-2xl border-4 transition-shadow duration-300",
          running
            ? "border-amber-500 bg-slate-950 shadow-[0_0_40px_rgba(245,158,11,0.25)]"
            : "border-slate-300 bg-slate-900"
        )}
      >
        <div className="border-b border-slate-700 px-6 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Пример одного прохода заявки
          </p>
          <p className="mt-1 font-display text-lg font-bold text-white">{scenario.title}</p>
          <p className="mt-2 text-sm text-slate-400">
            Не вся система — один пример заявки. Полное описание — в восьми модулях выше.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode("planned")}
              className={clsx(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all",
                mode === "planned"
                  ? "bg-blue-600 text-white ring-2 ring-blue-400"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              )}
            >
              <Clock className="h-4 w-4" />
              Плановая
            </button>
            <button
              type="button"
              onClick={() => setMode("emergency")}
              className={clsx(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all",
                mode === "emergency"
                  ? "bg-amber-500 text-slate-900 ring-2 ring-amber-400"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              )}
            >
              <Zap className="h-4 w-4" />
              Аварийная
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 px-6 py-3">
          <p className="text-sm text-slate-400">
            {mode === "emergency"
              ? "Emergency · intake → Estimator → CRM → dispatch"
              : "Planned · тот же хребет после intake"}
          </p>
          <div className="flex items-center gap-3">
            {running && (
              <span className="flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 animate-pulse">
                <Zap className="h-3.5 w-3.5" />
                LIVE
              </span>
            )}
            {!running ? (
              <button
                type="button"
                onClick={start}
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-amber-400"
              >
                <Play className="h-4 w-4 fill-current" />
                {finished ? "Запустить снова" : "Запустить"}
              </button>
            ) : (
              <button
                type="button"
                onClick={stop}
                className="inline-flex items-center gap-2 rounded-full border border-slate-500 bg-slate-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-700"
              >
                <Square className="h-4 w-4" />
                Остановить
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-3">
            {!running && step < 0 && !finished && (
              <p className="rounded-xl border border-dashed border-slate-600 px-4 py-8 text-center text-sm text-slate-500">
                Нажмите «Запустить» — один проход заявки через intake, Estimator и CRM
              </p>
            )}

            {demoSteps.map((s, i) => {
              const visible = finished || i <= step;
              const active = running && i === step;
              if (!visible) return null;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={clsx(
                    "rounded-xl border-l-4 p-4 transition-all",
                    active && running
                      ? "border-l-amber-500 bg-amber-500/10 ring-1 ring-amber-500/40"
                      : "border-l-slate-600 bg-slate-800/80"
                  )}
                >
                  <p className="text-sm font-bold text-white">{s.text}</p>
                  <p className="mt-1 text-xs text-slate-400">{s.detail}</p>
                  {(active || finished) && (
                    <p className="mt-2 text-sm font-medium text-amber-200/90">{s.meaning}</p>
                  )}
                </motion.div>
              );
            })}

            {finished && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300"
              >
                ✓ {demoSummary}
              </motion.p>
            )}
          </div>

          <div className="flex flex-col justify-center gap-4 lg:col-span-2">
            <div className="rounded-xl bg-slate-800 p-5 ring-1 ring-slate-700">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {mode === "emergency" ? "Время до dispatch" : "Следующий шаг клиента"}
              </p>
              <p
                className={clsx(
                  "mt-2 font-display text-5xl font-bold tabular-nums",
                  step >= 4 || finished ? "text-emerald-400" : running ? "text-amber-400" : "text-slate-600"
                )}
              >
                {mode === "emergency" && (step >= 4 || finished) ? "0:47" : mode === "emergency" ? "—:—" : "КП"}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {step >= 4 || finished
                  ? "Инженер получил полный пакет"
                  : mode === "planned"
                    ? "После intake → scope → quote → Purchase order"
                    : "Таймер при аварийном режиме"}
              </p>
            </div>

            <div className="rounded-xl border border-violet-500/40 bg-violet-950/50 p-4">
              <p className="text-xs font-bold uppercase text-violet-300">AI Estimator · у GRC</p>
              <p className="mt-2 text-sm text-violet-100">
                {step >= 2 || finished
                  ? "Pre-estimate в CRM · похожие кейсы из архива"
                  : "Ожидание запуска..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

/** @deprecated use LifecycleDemoSection */
export const DemoSection = LifecycleDemoSection;
