"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { demoSteps } from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";
import { RotateCcw, Brain, Database, Radio } from "lucide-react";
import clsx from "clsx";

const panelMeta = {
  intake: { label: "Intake · сбор данных", icon: Radio, color: "border-slate-300 bg-slate-50" },
  estimator: { label: "AI Estimator · расчёт КП", icon: Brain, color: "border-blue-400 bg-blue-50" },
  crm: { label: "CRM · объект · база", icon: Database, color: "border-violet-300 bg-violet-50" },
  dispatch: { label: "Dispatch · задача инженеру", icon: Radio, color: "border-emerald-300 bg-emerald-50" },
};

export function DemoSection() {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          setPlayed(true);
          setPlaying(true);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [played]);

  useEffect(() => {
    if (!playing) return;
    setStep(-1);
    const timers: ReturnType<typeof setTimeout>[] = [];
    demoSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), i * 2400));
    });
    timers.push(setTimeout(() => setPlaying(false), demoSteps.length * 2400 + 500));
    return () => timers.forEach(clearTimeout);
  }, [playing]);

  const replay = () => {
    setStep(-1);
    setPlaying(true);
  };

  const activePanel = step >= 0 ? demoSteps[Math.min(step, demoSteps.length - 1)].panel : "intake";
  const meta = panelMeta[activePanel as keyof typeof panelMeta];
  const Icon = meta.icon;

  return (
    <SectionWrapper id="demo" className="bg-slate-100">
      <div ref={sectionRef}>
        <SectionHeader
          label="07 · Как это работает"
          title="Emergency 2:47 — данные через Estimator в CRM за минуту"
          subtitle="Не чат-бот. Структурированный поток: сбор → расчёт → система → dispatch."
        />

        <FadeUp>
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-800 px-4 py-2">
                  <span className="text-xs font-semibold text-white">GRC Service Infrastructure</span>
                  <span className="rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-slate-900">
                    2:47 AM · EMERGENCY
                  </span>
                </div>

                <div className={clsx("border-b px-4 py-3", meta.color)}>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-700">
                    <Icon className="h-4 w-4" />
                    {meta.label}
                  </p>
                </div>

                <div className="min-h-[320px] space-y-3 p-4">
                  {demoSteps.map((s, i) =>
                    i <= step ? (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={clsx(
                          "rounded-xl border p-3",
                          s.panel === "estimator" && "border-blue-300 bg-blue-50/80",
                          s.panel === "intake" && "border-slate-200 bg-slate-50",
                          s.panel === "crm" && "border-violet-200 bg-violet-50/80",
                          s.panel === "dispatch" && "border-emerald-200 bg-emerald-50/80"
                        )}
                      >
                        <p className="text-sm font-semibold text-slate-900">{s.text}</p>
                        <p className="mt-1 text-xs text-slate-600">{s.detail}</p>
                      </motion.div>
                    ) : null
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:col-span-2">
              <div className="rounded-xl border-2 border-blue-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  AI Estimator · ядро
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  {step >= 1
                    ? "Анализ · похожие кейсы · pre-estimate → CRM"
                    : "Ожидание структурированного пакета..."}
                </p>
                {step >= 2 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-xs font-semibold text-emerald-600"
                  >
                    ✓ Estimate сохранён · не потерян в переписке
                  </motion.p>
                )}
              </div>

              <div className="rounded-xl bg-slate-900 p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Время до dispatch</span>
                  <span className="font-display text-2xl font-bold text-emerald-400">
                    {step >= 4 ? "0:47" : "—:—"}
                  </span>
                </div>
                <div className="mt-2">
                  <span
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      step >= 4 ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-400"
                    )}
                  >
                    {step >= 4 ? "✓ Инженер видит полный пакет" : "Ожидание..."}
                  </span>
                </div>
              </div>

              <button
                onClick={replay}
                className="inline-flex items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Повторить demo
              </button>
            </div>
          </div>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
