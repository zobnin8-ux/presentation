"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { demoSteps, demoSummary, scenarioEmergency } from "@/lib/content";
import { Play, Square, Zap, X } from "lucide-react";

const STEP_MS = 2200;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function LifecycleDemoModal({ open, onClose }: Props) {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!open) {
      setRunning(false);
      setStep(-1);
      setFinished(false);
    }
  }, [open]);

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const start = () => {
    setFinished(false);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    setStep(-1);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-labelledby="lifecycle-demo-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="fixed inset-4 z-50 mx-auto flex max-h-[calc(100vh-2rem)] max-w-4xl flex-col overflow-hidden rounded-2xl border-4 border-amber-500/80 bg-slate-900 shadow-2xl md:inset-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-700 px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  Иллюстрация · не вся система
                </p>
                <h2
                  id="lifecycle-demo-title"
                  className="mt-1 font-display text-lg font-bold text-white"
                >
                  Пример одного прохода заявки · {scenarioEmergency.title}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Emergency-поток: intake → Estimator → CRM → dispatch (~15 сек)
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 px-5 py-3">
              <p className="text-xs text-slate-500">Полное описание — в восьми модулях на слайде</p>
              <div className="flex items-center gap-2">
                {running && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-300">
                    <Zap className="h-3 w-3" />
                    LIVE
                  </span>
                )}
                {!running ? (
                  <button
                    type="button"
                    onClick={start}
                    className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    {finished ? "Снова" : "Запустить"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stop}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-4 py-2 text-sm font-bold text-white"
                  >
                    <Square className="h-4 w-4" />
                    Стоп
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="grid gap-5 lg:grid-cols-5">
                <div className="space-y-2 lg:col-span-3">
                  {!running && step < 0 && !finished && (
                    <p className="rounded-lg border border-dashed border-slate-600 px-4 py-6 text-center text-sm text-slate-500">
                      Запустите — один проход заявки
                    </p>
                  )}
                  {demoSteps.map((s, i) => {
                    const visible = finished || i <= step;
                    const active = running && i === step;
                    if (!visible) return null;
                    return (
                      <div
                        key={i}
                        className={clsx(
                          "rounded-lg border-l-4 p-3 text-sm",
                          active
                            ? "border-l-amber-500 bg-amber-500/10"
                            : "border-l-slate-600 bg-slate-800/80"
                        )}
                      >
                        <p className="font-bold text-white">{s.text}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{s.detail}</p>
                        {(active || finished) && (
                          <p className="mt-1 text-xs text-amber-200/90">{s.meaning}</p>
                        )}
                      </div>
                    );
                  })}
                  {finished && (
                    <p className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300">
                      ✓ {demoSummary}
                    </p>
                  )}
                </div>
                <div className="space-y-3 lg:col-span-2">
                  <div className="rounded-lg bg-slate-800 p-4 ring-1 ring-slate-700">
                    <p className="text-xs font-bold uppercase text-slate-400">До dispatch</p>
                    <p
                      className={clsx(
                        "mt-1 font-display text-4xl font-bold tabular-nums",
                        step >= 4 || finished ? "text-emerald-400" : "text-slate-600"
                      )}
                    >
                      {step >= 4 || finished ? "0:47" : "—:—"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-violet-500/40 bg-violet-950/50 p-3">
                    <p className="text-xs font-bold uppercase text-violet-300">AI Estimator · у GRC</p>
                    <p className="mt-1 text-xs text-violet-100">
                      {step >= 2 || finished
                        ? "Pre-estimate в CRM"
                        : "Ожидание запуска"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
