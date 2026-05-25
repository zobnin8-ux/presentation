"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { demoSteps } from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";
import { RotateCcw } from "lucide-react";

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
      timers.push(setTimeout(() => setStep(i), i * 2200));
    });
    timers.push(setTimeout(() => setPlaying(false), demoSteps.length * 2200 + 500));
    return () => timers.forEach(clearTimeout);
  }, [playing]);

  const replay = () => {
    setStep(-1);
    setPlaying(true);
  };

  const showSms = step >= 4;
  const showStatus = step >= 5;

  return (
    <SectionWrapper id="demo" className="bg-amber-50/40">
      <div ref={sectionRef}>
        <SectionHeader
          label="06 · Как это работает"
          title="2:47 ночи. Линия встала. Что делает система."
          subtitle="Симуляция реального сценария — от запроса до dispatch за меньше минуты."
        />

        <FadeUp>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative mx-auto w-full max-w-sm">
              <motion.div className="absolute -right-2 -top-2 rounded-full bg-slate-800 px-3 py-1 text-xs font-mono text-white">
                2:47 AM
              </motion.div>
              <div className="overflow-hidden rounded-[2rem] border-8 border-slate-800 bg-white shadow-2xl">
                <motion.div className="bg-slate-800 px-4 py-2 text-center text-[10px] text-white">
                  AI-Intake · Emergency
                </motion.div>
                <div className="min-h-[280px] space-y-3 p-4">
                  {demoSteps.slice(0, 4).map((s, i) =>
                    i <= step ? (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs ${
                          s.role === "client"
                            ? "bg-slate-100 text-slate-800"
                            : s.role === "system"
                              ? "bg-amber-100 font-semibold text-amber-800"
                              : "ml-auto bg-blue-600 text-white"
                        }`}
                      >
                        {s.text}
                      </motion.div>
                    ) : null
                  )}
                  {step >= 5 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-auto max-w-[85%] rounded-2xl bg-emerald-100 px-3 py-2 text-xs text-emerald-800"
                    >
                      {demoSteps[5].text}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={showSms ? { x: 0, opacity: 1 } : {}}
                className="relative rounded-xl border border-amber-200 bg-white p-4 shadow-lg"
              >
                {showSms && (
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ repeat: 2, duration: 1 }}
                    className="absolute -left-1 -top-1 h-4 w-4 rounded-full bg-amber-400"
                  />
                )}
                <p className="text-xs font-semibold text-slate-500">SMS диспетчеру</p>
                <p className="mt-2 text-sm text-slate-800">
                  {showSms ? demoSteps[4].text : "Ожидание..."}
                </p>
              </motion.div>

              <motion.div
                animate={showStatus ? { scale: [1, 1.02, 1] } : {}}
                className="rounded-xl bg-slate-900 p-4 text-white"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Response time</span>
                  <span className="font-display text-2xl font-bold text-emerald-400">
                    {showStatus ? "0:47" : "—:—"}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <motion.span
                    animate={showStatus ? { opacity: 1 } : { opacity: 0.3 }}
                    className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300"
                  >
                    {showStatus ? "✓ Dispatched" : "Waiting..."}
                  </motion.span>
                </div>
              </motion.div>

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
